
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
    await saveIdentities([]);
  }
  handle('identities:load', loadIdentities);
  handle('identities:save', saveIdentity);
  handle('identities:delete', deleteIdentity);
}

async function loadIdentities () {
  return loadJSON(join(dataDir, 'identities.json'));
}

async function saveIdentity (evt, person) {
  const ids = await loadIdentities();
  const idx = ids.findIndex(p => p.$id = person.$id);
  if (idx >= 0) ids[idx] = person;
  else ids.push(person);
  await saveIdentities(ids);
  return true;
}

async function saveIdentities (identities) {
  return saveJSON(join(dataDir, 'identities.json'), identities);
}

async function deleteIdentity (evt, did) {
  const ids = await loadIdentities();
  await saveIdentities(ids.filter(p => p.$id !== did));
  return true;
}
