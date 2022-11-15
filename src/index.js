
import { app, protocol, BrowserWindow, BrowserView, screen, ipcMain }  from 'electron';
import { nanoid } from 'nanoid';
import { ipfsProtocolHandler } from './ipfs-handler.js';

const liveBV = {};
let mainWindow;

// I am not clear at all as to what the privileges mean. They are listed at
// https://www.electronjs.org/docs/latest/api/structures/custom-scheme but that is harldy
// informative. https://www.electronjs.org/docs/latest/api/protocol#protocolregisterschemesasprivilegedcustomschemes
// is pretty clear that the behaviour we want requires at least `standard`.
protocol.registerSchemesAsPrivileged([
  {scheme: 'ipfs', privileges: {
    standard: true,
    secure: false,
    bypassCSP: false,
    allowServiceWorkers: false,
    supportFetchAPI: true,
    corsEnabled: false,
    stream: true,
  } },
]);
app.enableSandbox();
app.whenReady().then(() => {
  protocol.registerStreamProtocol('ipfs', ipfsProtocolHandler);
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width,
    height,
    show: false,
    backgroundColor: '#fff',
    title: 'Nytive',
    titleBarStyle: 'hidden',
    icon: './img/icon.png',
  });
  ipcMain.handle('card:create', async (ev) => {
    const win = ev2win(ev);
    const bv = new BrowserView();
    win.addBrowserView(bv);
    const id = nanoid();
    liveBV[id] = bv;
    return id;
  });
  ipcMain.handle('card:destroy', async (ev, id) => {
    const win = ev2win(ev);
    const bv = liveBV[id];
    if (!bv) return false;
    delete liveBV[id];
    win.removeBrowserView(bv);
    return true;
  });
  ipcMain.handle('card:load', async (ev, id, src) => {
    const bv = liveBV[id];
    if (!bv) return;
    bv.webContents.loadURL(src);
  });
  ipcMain.handle('card:resize', async (ev, id, width, height) => {
    const bv = liveBV[id];
    if (!bv) return;
    const { x, y } = bv.getBounds();
    bv.setBounds({ x, y, width, height });
  });
  // move: (id, x, y) => ipcRenderer.send('card-move', id, x, y),
  // resize: (id, w, h) => ipcRenderer.send('card-resize', id, w, h),

  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  const { webContents } = mainWindow;
  // reloading
  webContents.on('before-input-event', makeKeyDownMatcher('cmd+R', reload));
  webContents.on('before-input-event', makeKeyDownMatcher('ctrl+R', reload));
  webContents.on('before-input-event', makeKeyDownMatcher('cmd+alt+I', openDevTools));
});

function reload () {
  console.log('RELOAD');
  mainWindow.reload();
}

function openDevTools () {
  mainWindow.webContents.openDevTools();
}

// function makeKeyUpMatcher (sc, cb) {
//   return makeKeyMatcher('keyUp', sc, cb);
// }

function makeKeyDownMatcher (sc, cb) {
  return makeKeyMatcher('keyDown', sc, cb);
}

function makeKeyMatcher (type, sc, cb) {
  let parts = sc.split(/[+-]/)
    , key = parts.pop().toLowerCase()
    , modifiers = {
        shift: false,
        control: false,
        meta: false,
        alt: false,
      }
  ;
  parts.forEach(p => {
    p = p.toLowerCase();
    if (p === 'ctrl') p = 'control';
    if (p === 'cmd') p = 'meta';
    if (typeof modifiers[p] !== 'boolean') console.warn(`Unknown command modifier ${p}.`);
    modifiers[p] = true;
  });
  return (evt, input) => {
    if (type !== input.type) return;
    if (key !== input.key) return;
    let badMod = false;
    Object.keys(modifiers).forEach(mod => {
      if (input[mod] !== modifiers[mod]) badMod = true;
    });
    if (badMod) return;
    cb();
  };
}

function ev2win (ev) {
  return BrowserWindow.fromWebContents(ev.sender);
}
