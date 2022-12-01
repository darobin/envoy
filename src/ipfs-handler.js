
import { PassThrough } from 'stream';
import { Buffer } from 'buffer';
import { WASMagic } from 'wasmagic';
import { resolveIPNS, getDag } from './ipfs-node.js';


// this is so that we can send strings as streams
function createStream (text) {
  const rv = new PassThrough();
  rv.push(text);
  rv.push(null);
  return rv;
}

export async function ipfsProtocolHandler (req, cb) {
  console.log(`got request`, req, cb);
  const url = new URL(req.url);
  let cid;
  if (url.protocol === 'ipns:') {
    cid = await resolveIPNS(url.hostname);
  }
  else if (url.protocol === 'ipfs:') {
    cid = url.hostname;
  }
  else {
    return cb({
      statusCode: 421, // Misdirected Request
      mimeType: 'application/json',
      data: createStream(JSON.stringify({
        err: true,
        msg: `Backend does not support requests for scheme "${url.scheme}".`,
      }, null, 2)),
    });
  }
  if (req.method !== 'GET') return cb({
    statusCode: 405, // Method Not Allowed
    mimeType: 'application/json',
    data: createStream(JSON.stringify({
      err: true,
      msg: `Request method "${req.method}" is not supported.`,
    }, null, 2)),
  });
  // Because we understand the data model used in Envoyager, we should use that when possible to obtain the correct media
  // type as specified at creation. However, for temporary expediency we use wasmagic detection.
  const value = await getDag(cid, url.pathname);
  if (value instanceof Uint8Array && value.constructor.name === 'Uint8Array') {
    let mimeType;
    // our expectation is that raw will generally be wrapped in IPLD, but that will not be true over UnixFS for instance
    // we poke for mediaType next to what we assume is src in the current path (we could restrict to that)
    if (url.pathname && url.pathname.length > 1) {
      try {
        const mtURL = new URL('mediaType', url.href);
        mimeType = await getDag(cid, mtURL.pathname);
      }
      catch (err) {/**/}
    }
    if (!mimeType) {
      const magic = await WASMagic.create();
      mimeType = magic.getMime(Buffer.from(value));
    }
    console.warn(`Value is binary, with type ${mimeType}`);
    cb({
      statusCode: 200,
      mimeType,
      data: createStream(value),
    });
  }
  else {
    console.warn(JSON.stringify(value, null, 2));
    cb({
      statusCode: 200,
      mimeType: 'application/json',
      data: createStream(JSON.stringify(value, null, 2)),
    });
  }
}
