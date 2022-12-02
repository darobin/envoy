
const { contextBridge, ipcRenderer } = require('electron');
const { invoke } = ipcRenderer;

// XXX note that this will cause some weird issues, we're not set up to manage this well
// from inside items yet
let intentID = 1;

contextBridge.exposeInMainWorld('envoyager',{
  // 🚨🚨🚨 SHARED WITH <webview> PRELOADS 🚨🚨🚨
  // always copy changes here over there
  intent: (action, type, data) => {
    const id = 'x' + intentID++;
    invoke('intent:show-matching-intents', action, type, data, id);
    return id;
  },
});
