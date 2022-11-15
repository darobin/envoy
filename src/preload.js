
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('envoyCard', {
    create: () => ipcRenderer.invoke('card:create'),
    move: (id, x, y) => ipcRenderer.invoke('card:move', id, x, y),
    resize: (id, w, h) => ipcRenderer.invoke('card:resize', id, w, h),
    load: (id, src) => ipcRenderer.invoke('card:load', id, src),
    destroy: (id) => ipcRenderer.invoke('card:destroy', id),
});
