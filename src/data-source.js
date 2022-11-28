
import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdir } from "node:fs/promises";
import { ipcMain } from 'electron';
import saveJSON from './save-json.js';
import loadJSON from './load-json.js';

const { handle } = ipcMain;
const dataDir = join(homedir(), '.envoyage');

export async function initDataSource () {
  await mkdir(dataDir, { recursive: true });
  try {
    await loadIdentities();
  }
  catch (err) {
    // await saveIdentities([]);
  }
  handle('identities:load', loadIdentities);
  handle('identities:create', createIdentity);
  // handle('identities:save', saveIdentity);
  // handle('identities:delete', deleteIdentity);
}

async function loadIdentities () {
  // XXX
  //  - list dirs under .envoyage/identities
  //  - map each into the JSON that matches
  return loadJSON(join(dataDir, 'identities.json'));
}

// data should be: name, did
async function createIdentity (evt, { name, did }, bannerFile, imageFile) {
  //  - check that it's a valid did
  //  - check that we don't have a dir for that did
  //  - create did dir
  //  - store images
  //  - create properly shaped JSON with image objects and embedded Buffers
  //  - create key pair for the person and store it
  //  - put person on IPFS
  //  - create and store IPNS for the person, with a derived key matching the DID
}

// async function saveIdentity (evt, person) {
//   const ids = await loadIdentities();
//   const idx = ids.findIndex(p => p.$id = person.$id);
//   if (idx >= 0) ids[idx] = person;
//   else ids.push(person);
//   // XXX
//   //  - store images
//   //  - create properly shaped JSON with image objects and embedded Buffers
//   //  - check prior existence of root feed, otherwise mint one
//   //  - put person on IPFS
//   //  - create and store ipns for them, with a key matching the DID
//   await saveIdentities(ids);
//   return true;
// }

// // XXX probably eliminate this
// async function saveIdentities (identities) {
//   return saveJSON(join(dataDir, 'identities.json'), identities);
// }

// async function deleteIdentity (evt, did) {
//   const ids = await loadIdentities();
//   await saveIdentities(ids.filter(p => p.$id !== did));
//   return true;
// }
