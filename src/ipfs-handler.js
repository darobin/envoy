
import { PassThrough } from 'stream';
import { createReadStream } from 'node:fs';

// this is so that we can send strings as streams
function createStream (text) {
  const rv = new PassThrough();
  rv.push(text);
  rv.push(null);
  return rv;
}

export function ipfsProtocolHandler (req, cb) {
  console.log(`got request`, req, cb);
  if (/png/.test(req.url)) {
    return cb({
      statusCode: 200,
      mimeType: 'image/png',
      data: createReadStream('/Users/robin/Code/etsaur.png'),
    });
  }
  let background = /ipfs:\/\/deadb33f\/\w+/.test(req.url) ? req.url.replace('ipfs://deadb33f/', '') : 'red'
  cb({
    statusCode: 200,
    mimeType: 'text/html',
    data: createStream(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Success</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: ${background};
    }
  </style>
</head>
  <body>
    <p>Ok!</p>
  </body>
</html>
`),
  });
  console.log(`DONE!`);
}
