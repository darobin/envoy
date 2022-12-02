
const { contextBridge, ipcRenderer } = require('electron');

const { invoke } = ipcRenderer;

contextBridge.exposeInMainWorld('envoyage',{
  // identities
  loadIdentities: () => invoke('identities:load'),
  createIdentity: (data) => invoke('identities:create', data),
  // saveIdentity: (person) => invoke('identities:save', person),
  // deleteIdentity: (did) => invoke('identities:delete', did),
  // intents
  intent: (action, type, data) => invoke('intent:show-matching-intents', action, type, data),
  onIntentList: (cb) => ipcRenderer.on('intent-list', cb),
});
