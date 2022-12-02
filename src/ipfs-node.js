
import { join } from 'path';
import { readFile, writeFile } from "fs/promises";
import process from 'process';
import { create as createNode } from 'ipfs-core';
import sanitize from 'sanitize-filename';
import { base58btc } from "multiformats/bases/base58";
import { base32 } from "multiformats/bases/base32";
import { CID } from 'multiformats';
import loadJSON from './load-json.js';
import saveJSON from './save-json.js';
import { dataDir } from './data-source.js';

// 🚨🚨🚨 WARNING 🚨🚨🚨
// nothing here is meant to be safe, this is all demo code, the keys are just stored on disk, etc.
const password = 'Steps to an Ecology of Mind';
const cachePath = join(dataDir, 'ipns-cache.json');
let ipnsCache = {};

export const node = await createNode();

export async function shutdown () {
  await node.stop();
}
process.on('SIGINT', async () => {
  try {
    await shutdown();
  }
  catch (err) {/**/}
  process.exit();
});

function cleanID (id) {
  return sanitize(id.replace(/:/g, '_'));
}

export async function initIPNSCache () {
  try {
    ipnsCache = await loadJSON(cachePath);
  }
  catch (err) {
    await saveJSON(cachePath, {});
  }
}

export async function saveIPNSCache () {
  return saveJSON(cachePath, ipnsCache);
}

export async function putBlockAndPin (buffer) {
  const cid = await node.block.put(new Uint8Array(buffer), { format: 'raw', pin: true, version: 1 });
  // await node.pin.add(cid, { recursive: false });
  return cid;
}

export async function putDagAndPin (obj) {
  const cid = await node.dag.put(obj, { pin: true });
  // await node.pin.add(cid);
  return cid;
}

export async function getDag (cid, path) {
  if (typeof cid === 'string') cid = CID.parse(cid);
  const { value } = await node.dag.get(cid, { path });
  return value;
}

export async function dirCryptoKey (keyDir, name) {
  const cleanName = cleanID(name);
  const keyFile = join(keyDir, `${cleanName}.pem`);
  const keys = await node.key.list();
  if (keys.find(({ name }) => name === cleanName)) {
    return provideKey(keyFile, cleanName);
  }
  try {
    await node.key.import(cleanName, await readFile(keyFile), password);
    return;
  }
  catch (err) {
    // console.warn(`generating key with name "${name}"`);
    await node.key.gen(cleanName);
    await provideKey(keyFile, cleanName);
  }
}

async function provideKey (keyFile, cleanName) {
  await writeFile(keyFile, await node.key.export(cleanName, password));
}

// js-ipfs always produces (and only accepts) IPNS names that base58btc, unprefixed (because YOLO).
// That doesn't work in URLs because the origin part has to be case-insensitive.
// So we convert to base32, and then convert back (removing the prefix) for resolution.
export async function publishIPNS (keyDir, name, cid) {
  await dirCryptoKey(keyDir, name);
  if (typeof cid === 'string') cid = CID.parse(cid);
  const { name: ipnsName } = await node.name.publish(cid, { key: cleanID(name) });
  const b32name = base32.encode(base58btc.decode(`z${ipnsName}`));
  ipnsCache[b32name] = cid.toString(base32);
  await saveIPNSCache();
  return b32name;
}

export async function resolveIPNS (ipns) {
  try {
    const b58IPNS = base58btc.encode(base32.decode(ipns)).replace(/^z/, '');
    const resolved = await node.name.resolve(`/ipns/${b58IPNS}`, { recursive: true });
    // we get an iterable array back
    let res;
    for await (const target of resolved) res = target;
    return res.replace('/ipfs/', '');
  }
  catch (err) {
    if (ipnsCache[ipns]) return CID.parse(ipnsCache[ipns]);
  }
}
