
import { subtle } from 'node:crypto';
import { join } from 'node:path';
import { readFile, writeFile } from "node:fs/promises";

const keyParams = { name: 'ECDA', namedCurve: 'P-521' };
const keyExtractable = true;
const keyUsages = ['encrypt', 'decrypt', 'deriveKey', 'sign', 'verify'];

// this might be useful but doesn't allow derivation as initially planned, using the built-in instead
export async function dirCryptoKeyPair (personDir) {
  const privKeyFile = join(personDir, 'private.key');
  const pubKeyFile = join(personDir, 'public.key');
  try {
    const privateKey = await subtle.importKey('jwk', await readFile(privKeyFile), keyParams, keyExtractable, keyUsages);
    const publicKey = await subtle.importKey('jwk', await readFile(pubKeyFile), keyParams, keyExtractable, keyUsages);
    return { privateKey, publicKey };
  }
  catch (err) {
    const keyPair = await subtle.generateKey(keyParams, keyExtractable, keyUsages);
    await writeFile(pubKeyFile, await subtle.exportKey('jwk', keyPair.publicKey));
    await writeFile(privKeyFile, await subtle.exportKey('jwk', keyPair.privateKey));
    return keyPair;
  }
}
