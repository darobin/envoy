
import { contextBridge, ipcRenderer } from 'electron';

const { invoke } = ipcRenderer

contextBridge.exposeInMainWorld('envoyage',{
  // identities
  loadIdentities: () => invoke('identities:load'),
  saveIdentity: (person) => invoke('identities:save', person),
  deleteIdentity: (did) => invoke('identities:delete', did),
});
