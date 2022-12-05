
import { join, resolve } from 'path';
import { mkdir, readdir } from "fs/promises";
import { ipcMain } from 'electron';
import { nanoid } from 'nanoid';
import { getDag, putDagAndPin, publishIPNS, resolveIPNS } from './ipfs-node.js';
import { dataDir, did2keyDir } from './data-source.js';
import loadJSON from './load-json.js';

const { handle } = ipcMain;
const intentsDir = join(dataDir, 'intents');
const db = {};

export async function initIntents () {
  await mkdir(intentsDir, { recursive: true });
  try {
    await loadIntents();
  }
  catch (err) {/**/}
  handle('intent:show-matching-intents', showMatchingIntents);
  handle('intent:create-feed', createFeed);
}

async function loadIntents () {
  const savedIntents = (await readdir(intentsDir)).filter(dir => !/^\./.test(dir));
  for (const nt of savedIntents) {
    registerIntent(await loadJSON(join(intentsDir, nt)));
  }
  // add the native ones
  registerIntent({
    name: 'Create Feed',
    url: 'native:create-feed',
    icon: {
      $type: 'Image',
      mediaType: 'image/svg+xml',
      src: 'img/feed-icon.svg',
    },
    actions: {
      create: {
        types: ['envoyager/feed'],
      },
    },
  });
}

// intents come in like this:
// {
//   name: 'Photo Album',
//   url: ...
//   icon: {
//     $type: 'Image',
//     mediaType: 'image/png',
//     src: ...,
//   },
//   actions: {
//     pick: {
//       name: 'Pick Image',
//       types: ['image/*'],
//       path: '/picker.html',
//       icon: {
//           $type: 'Image',
//           mediaType: 'image/png',
//           src: ...,
//       },
//     },
//   }
// }
// If the intent is native its url will be native:$name and there will be no paths.
// This allows the intent rendering component to bring in the right thing without
// making it available otherwise.
function registerIntent (intent) {
  const defaultName = intent.name;
  const defaultIcon = intent.icon;
  const url = intent.url;
  Object.keys(intent.actions || {}).forEach(action => {
    if (!db[action]) db[action] = {};
    const handler = {
      name: intent.actions[action].name || defaultName || action,
      icon: intent.actions[action].icon || defaultIcon,
      url,
    };
    if (intent.actions[action].path && !/native:/.test(url)) {
      handler.url = new URL(intent.actions[action].path, url).href;
    }
    const seenTypes = new Set();
    (intent.actions[action].types || []).forEach(t => {
      if (seenTypes.has(t)) return;
      seenTypes.add(t);
      if (!db[action][t]) db[action][t] = [];
      db[action][t].push(handler);
    });
  });
}

async function showMatchingIntents (ev, action, type, data, id) {
  console.warn(`showMatchingIntents`, action, type, data, id);
  const intents = [];
  const win = ev.senderFrame.top;
  const done = () => win.send('intent-list', intents, action, type, data, id);
  // make sure to match foo/* in both directions
  console.warn(`in db`, db[action]);
  if (!db[action]) return done();
  // get all those that start with foo/
  if (/\/\*$/.test(type)) {
    const [major,] = type.split('/');
    Object.keys(db[action])
      .filter(type => type.startsWith(`${major}/`))
      .forEach(type => intents.push(...db[action][type]))
    ;
  }
  // get foo/bar and foo/*
  else {
    intents.push(...(db[action][type] || []), ...(db[action][type.replace(/\/.*/, '/*')] || []));
  }
  console.warn(`found intents`, intents);
  return done();
}

async function createFeed (ev, data) {
  const creatorDID = data.creator?.$id;
  if (!creatorDID) throw new Error(`Cannot create a feed that does not have a creator with an $id.`);
  const keyDir = did2keyDir(creatorDID);
  const feed = {
    $type: 'Feed',
    $id: `envoyager:feed.${nanoid()}`,
    name: data.name,
    creator: data.creator?.url,
    items: [],
  };
  console.warn(`creating feed`, feed);
  const tempCID = await putDagAndPin(feed);
  const ipns = await publishIPNS(keyDir, feed.$id, tempCID);
  feed.url = `ipns://${ipns}/`;
  console.warn(`published to ${feed.url}`);
  const cid = await putDagAndPin(feed);
  await publishIPNS(keyDir, feed.$id, cid);
  console.warn(`republished`);
  if (data.parent) {
    console.warn(`PARENT`);
    let cid;
    if (/^ipns:/.test(data.parent)) cid = await resolveIPNS(data.parent.replace(/^ipns:\/\//, '').replace(/\/.*/, ''));
    else if (/^ipfs:/.test(data.parent)) cid = data.parent.replace(/^ipfs:\/\//, '').replace(/\/.*/, '');
    console.warn(`parent cid=${cid}`);
    const parentFeed = await getDag(cid);
    if (!parentFeed.items) parentFeed.items = [];
    if (data.position === 'prepend') parentFeed.items.unshift(feed.url);
    else parentFeed.items.push(feed.url);
    console.warn(`parent updated feed`, parentFeed);
    const newCID = await putDagAndPin(parentFeed);
    if (/^ipns:/.test(data.parent)) await publishIPNS(keyDir, parentFeed.$id || `${creatorDID}.root-feed`, newCID);
    console.warn(`parent republished`);
    return newCID;
  }
}
