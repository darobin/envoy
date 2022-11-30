
import { join } from 'path';
import { readFile, writeFile } from "fs/promises";
import process from 'process';
import { create as createNode } from 'ipfs-core';
import sanitize from 'sanitize-filename';

// 🚨🚨🚨 WARNING 🚨🚨🚨
// nothing here is meant to be safe, this is all demo code, the keys are just stored on disk, etc.
const password = 'Steps to an Ecology of Mind';

export const node = await createNode();

export async function shutdown () {
  await node.stop();
}
process.on('SIGINT', shutdown);

function cleanID (id) {
  return sanitize(id.replace(/:/g, '_'));
}

// XXX it might not be possible to recursively pin a non-DAG
export async function putBlockAndPin (buffer) {
  const cid = await node.block.put(new Uint8Array(buffer));
  node.pin.add(cid);
  return cid;
}

export async function putDagAndPin (obj) {
  const cid = await node.dag.put(obj);
  node.pin.add(cid);
  return cid;
}

export async function getDag (cid, path) {
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
    console.warn(`generating key with name "${name}"`);
    await node.key.gen(cleanName);
    await provideKey(keyFile, cleanName);
  }
}

async function provideKey (keyFile, cleanName) {
  await writeFile(keyFile, await node.key.export(cleanName, password));
}

export async function publishIPNS (keyDir, name, cid) {
  await dirCryptoKey(keyDir, name);
  const { name: ipnsName } = node.name.publish(cid, { key: cleanID(name) });
  return ipnsName;
}

export async function resolveIPNS (ipns) {
  const resolved = node.name.resolve(`/ipns/${ipns}`, { recursive: true });
  // we can an iterable array back
  let res;
  for await (const target of resolved) res = target;
  return res.replace('/ipfs/', '');
}
