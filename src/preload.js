
const { contextBridge, ipcRenderer } = require('electron');

const { invoke } = ipcRenderer;

contextBridge.exposeInMainWorld('envoyage',{
  // identities
  loadIdentities: () => invoke('identities:load'),
  createIdentity: () => invoke('identities:create'),
  // saveIdentity: (person) => invoke('identities:save', person),
  // deleteIdentity: (did) => invoke('identities:delete', did),
});
