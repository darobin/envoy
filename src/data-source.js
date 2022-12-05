
import { join } from 'path';
import { mkdir, access, writeFile, readdir } from "fs/promises";
import { Buffer } from 'buffer';
import { ipcMain } from 'electron';
import mime from 'mime-types';
import saveJSON from './save-json.js';
import loadJSON from './load-json.js';
import { putBlockAndPin, putDagAndPin, dirCryptoKey, publishIPNS } from './ipfs-node.js';
import { identitiesDir } from './profile-data.js';

const { handle } = ipcMain;
const didRx = /^did:[\w-]+:\S+/;
const ipnsFile = 'ipns.json';

export async function initDataSource () {
  await mkdir(identitiesDir, { recursive: true });
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
  const ids = (await readdir(identitiesDir)).filter(dir => !/^\./.test(dir));
  const identities = [];
  for (const idDir of ids) {
    identities.push(await loadJSON(join(identitiesDir, idDir, ipnsFile)));
  }
  return identities;
}

async function createIdentity (evt, { name, did, avatar, banner } = {}) {
  try {
    if (!name) return 'Missing name.';
    if (!did || !didRx.test(did)) return 'Invalid or missing DID.';
    const didDir = join(identitiesDir, encodeURIComponent(did));
    const keyDir = join(didDir, 'keys');
    try {
      await access(didDir);
      // eventually we'll have to check actual ownership of that DID…
      return 'DID already exists here.';
    }
    catch (err) { /* noop */ }
    await mkdir(keyDir, { recursive: true });
    const person = {
      $type: 'Person',
      $id: did,
      name,
    };
    const applyImage = async (name, source) => {
      writeFile(join(didDir, `${name}.${mime.extension(source.mediaType)}`), Buffer.from(source.buffer));
      person[name] = {
        $type: 'Image',
        mediaType: source.mediaType,
        src: await putBlockAndPin(source.buffer),
      };
    };
    if (avatar) await applyImage('avatar', avatar);
    if (banner) await applyImage('banner', banner);
    await dirCryptoKey(keyDir, did);
    // we have to ping pong so as to get a two-way IPNS: create a partial feed, get its IPNS, set that on the Person,
    // create the person, get their IPNS, set that on feed, update feed, republish its IPNS.
    const feed = {
      $type: 'Feed',
      $id: `${did}.root-feed`,
      items: [],
    };
    const tmpFeedCID = await putDagAndPin(feed);
    const feedIPNS = await publishIPNS(keyDir, feed.$id, tmpFeedCID);
    person.feed = `ipns://${feedIPNS}`;
    const personCID = await putDagAndPin(person);
    const personIPNS = await publishIPNS(keyDir, did, personCID);
    feed.creator = `ipns://${personIPNS}`;
    const feedCID = await putDagAndPin(feed);
    await publishIPNS(keyDir, feed.$id, feedCID);
    await saveJSON(join(didDir, ipnsFile), { ipns: personIPNS });
    return '';
  }
  catch (err) {
    return err.message;
  }
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
