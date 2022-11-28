/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data-source.js":
/*!****************************!*\
  !*** ./src/data-source.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initDataSource": () => (/* binding */ initDataSource)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _save_json_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save-json.js */ "./src/save-json.js");
/* harmony import */ var _load_json_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./load-json.js */ "./src/load-json.js");








const { handle } = electron__WEBPACK_IMPORTED_MODULE_3__.ipcMain;
const dataDir = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,node_os__WEBPACK_IMPORTED_MODULE_0__.homedir)(), '.envoyage');

async function initDataSource () {
  await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir)(dataDir, { recursive: true });
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
  return (0,_load_json_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dataDir, 'identities.json'));
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


/***/ }),

/***/ "./src/ipfs-handler.js":
/*!*****************************!*\
  !*** ./src/ipfs-handler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ipfsProtocolHandler": () => (/* binding */ ipfsProtocolHandler)
/* harmony export */ });
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stream */ "stream");
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stream__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);




// this is so that we can send strings as streams
function createStream (text) {
  const rv = new stream__WEBPACK_IMPORTED_MODULE_0__.PassThrough();
  rv.push(text);
  rv.push(null);
  return rv;
}

function ipfsProtocolHandler (req, cb) {
  console.log(`got request`, req, cb);
  if (/png/.test(req.url)) {
    return cb({
      statusCode: 200,
      mimeType: 'image/png',
      data: (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.createReadStream)('/Users/robin/Code/etsaur.png'),
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


/***/ }),

/***/ "./src/load-json.js":
/*!**************************!*\
  !*** ./src/load-json.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadJSON)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);



async function loadJSON (url) {
  const data = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)(url);
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(data));
    }
    catch (err) {
      reject(err);
    }
  });
}


/***/ }),

/***/ "./src/rel.js":
/*!********************!*\
  !*** ./src/rel.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ makeRel)
/* harmony export */ });

// call with makeRel(import.meta.url), returns a function that resolves relative paths
function makeRel (importURL) {
  return (pth) => new URL(pth, importURL).toString().replace(/^file:\/\//, '');
}


/***/ }),

/***/ "./src/save-json.js":
/*!**************************!*\
  !*** ./src/save-json.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ saveJSON)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);



async function saveJSON (url, obj) {
  return (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.writeFile)(url, JSON.stringify(obj, null, 2));
}


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ipfs_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ipfs-handler.js */ "./src/ipfs-handler.js");
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-source.js */ "./src/data-source.js");
/* harmony import */ var _rel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rel.js */ "./src/rel.js");






let mainWindow;
const rel = (0,_rel_js__WEBPACK_IMPORTED_MODULE_3__["default"])("file:///Users/robin/Code/darobin/envoyage/src/index.js");

// there can be only one
const singleInstanceLock = electron__WEBPACK_IMPORTED_MODULE_0__.app.requestSingleInstanceLock();
if (!singleInstanceLock) {
  electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
}
else {
  electron__WEBPACK_IMPORTED_MODULE_0__.app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}


// I am not clear at all as to what the privileges mean. They are listed at
// https://www.electronjs.org/docs/latest/api/structures/custom-scheme but that is harldy
// informative. https://www.electronjs.org/docs/latest/api/protocol#protocolregisterschemesasprivilegedcustomschemes
// is pretty clear that the behaviour we want requires at least `standard`.
electron__WEBPACK_IMPORTED_MODULE_0__.protocol.registerSchemesAsPrivileged([
  {scheme: 'ipfs', privileges: {
    standard: true,
    secure: false,
    bypassCSP: false,
    allowServiceWorkers: false,
    supportFetchAPI: true,
    corsEnabled: false,
    stream: true,
  } },
]);
electron__WEBPACK_IMPORTED_MODULE_0__.app.enableSandbox();
electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(async () => {
  electron__WEBPACK_IMPORTED_MODULE_0__.protocol.registerStreamProtocol('ipfs', _ipfs_handler_js__WEBPACK_IMPORTED_MODULE_1__.ipfsProtocolHandler);
  await (0,_data_source_js__WEBPACK_IMPORTED_MODULE_2__.initDataSource)();
  const { width, height } = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
    width,
    height,
    show: false,
    backgroundColor: '#fff',
    title: 'Nytive',
    titleBarStyle: 'hidden',
    icon: './img/icon.png',
    webPreferences: {
      webviewTag: true, // I know that this isn't great, but the alternatives aren't there yet
      preload: rel('../build/preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  const { webContents } = mainWindow;
  // reloading
  webContents.on('before-input-event', makeKeyDownMatcher('cmd+R', reload));
  webContents.on('before-input-event', makeKeyDownMatcher('ctrl+R', reload));
  webContents.on('before-input-event', makeKeyDownMatcher('cmd+alt+I', openDevTools));
});

function reload () {
  console.log('RELOAD');
  mainWindow.reload();
}

function openDevTools () {
  mainWindow.webContents.openDevTools();
}

// function makeKeyUpMatcher (sc, cb) {
//   return makeKeyMatcher('keyUp', sc, cb);
// }

function makeKeyDownMatcher (sc, cb) {
  return makeKeyMatcher('keyDown', sc, cb);
}

function makeKeyMatcher (type, sc, cb) {
  let parts = sc.split(/[+-]/)
    , key = parts.pop().toLowerCase()
    , modifiers = {
        shift: false,
        control: false,
        meta: false,
        alt: false,
      }
  ;
  parts.forEach(p => {
    p = p.toLowerCase();
    if (p === 'ctrl') p = 'control';
    if (p === 'cmd') p = 'meta';
    if (typeof modifiers[p] !== 'boolean') console.warn(`Unknown command modifier ${p}.`);
    modifiers[p] = true;
  });
  return (evt, input) => {
    if (type !== input.type) return;
    if (key !== input.key) return;
    let badMod = false;
    Object.keys(modifiers).forEach(mod => {
      if (input[mod] !== modifiers[mod]) badMod = true;
    });
    if (badMod) return;
    cb();
  };
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxVQUFVLGNBQWM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0YsRUFBRTtBQUN0RjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbnZveWFnZS8uL3NyYy9kYXRhLXNvdXJjZS5qcyIsIndlYnBhY2s6Ly9lbnZveWFnZS8uL3NyYy9pcGZzLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvLi9zcmMvbG9hZC1qc29uLmpzIiwid2VicGFjazovL2Vudm95YWdlLy4vc3JjL3JlbC5qcyIsIndlYnBhY2s6Ly9lbnZveWFnZS8uL3NyYy9zYXZlLWpzb24uanMiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgY29tbW9uanMyIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9lbnZveWFnZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2Vudm95YWdlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzL3Byb21pc2VzXCIiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6b3NcIiIsIndlYnBhY2s6Ly9lbnZveWFnZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInN0cmVhbVwiIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbnZveWFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBob21lZGlyIH0gZnJvbSAnbm9kZTpvcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IG1rZGlyIH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGlwY01haW4gfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgc2F2ZUpTT04gZnJvbSAnLi9zYXZlLWpzb24uanMnO1xuaW1wb3J0IGxvYWRKU09OIGZyb20gJy4vbG9hZC1qc29uLmpzJztcblxuY29uc3QgeyBoYW5kbGUgfSA9IGlwY01haW47XG5jb25zdCBkYXRhRGlyID0gam9pbihob21lZGlyKCksICcuZW52b3lhZ2UnKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXREYXRhU291cmNlICgpIHtcbiAgYXdhaXQgbWtkaXIoZGF0YURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIHRyeSB7XG4gICAgYXdhaXQgbG9hZElkZW50aXRpZXMoKTtcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgLy8gYXdhaXQgc2F2ZUlkZW50aXRpZXMoW10pO1xuICB9XG4gIGhhbmRsZSgnaWRlbnRpdGllczpsb2FkJywgbG9hZElkZW50aXRpZXMpO1xuICBoYW5kbGUoJ2lkZW50aXRpZXM6Y3JlYXRlJywgY3JlYXRlSWRlbnRpdHkpO1xuICAvLyBoYW5kbGUoJ2lkZW50aXRpZXM6c2F2ZScsIHNhdmVJZGVudGl0eSk7XG4gIC8vIGhhbmRsZSgnaWRlbnRpdGllczpkZWxldGUnLCBkZWxldGVJZGVudGl0eSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRJZGVudGl0aWVzICgpIHtcbiAgLy8gWFhYXG4gIC8vICAtIGxpc3QgZGlycyB1bmRlciAuZW52b3lhZ2UvaWRlbnRpdGllc1xuICAvLyAgLSBtYXAgZWFjaCBpbnRvIHRoZSBKU09OIHRoYXQgbWF0Y2hlc1xuICByZXR1cm4gbG9hZEpTT04oam9pbihkYXRhRGlyLCAnaWRlbnRpdGllcy5qc29uJykpO1xufVxuXG4vLyBkYXRhIHNob3VsZCBiZTogbmFtZSwgZGlkXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVJZGVudGl0eSAoZXZ0LCB7IG5hbWUsIGRpZCB9LCBiYW5uZXJGaWxlLCBpbWFnZUZpbGUpIHtcbiAgLy8gIC0gY2hlY2sgdGhhdCBpdCdzIGEgdmFsaWQgZGlkXG4gIC8vICAtIGNoZWNrIHRoYXQgd2UgZG9uJ3QgaGF2ZSBhIGRpciBmb3IgdGhhdCBkaWRcbiAgLy8gIC0gY3JlYXRlIGRpZCBkaXJcbiAgLy8gIC0gc3RvcmUgaW1hZ2VzXG4gIC8vICAtIGNyZWF0ZSBwcm9wZXJseSBzaGFwZWQgSlNPTiB3aXRoIGltYWdlIG9iamVjdHMgYW5kIGVtYmVkZGVkIEJ1ZmZlcnNcbiAgLy8gIC0gY3JlYXRlIGtleSBwYWlyIGZvciB0aGUgcGVyc29uIGFuZCBzdG9yZSBpdFxuICAvLyAgLSBwdXQgcGVyc29uIG9uIElQRlNcbiAgLy8gIC0gY3JlYXRlIGFuZCBzdG9yZSBJUE5TIGZvciB0aGUgcGVyc29uLCB3aXRoIGEgZGVyaXZlZCBrZXkgbWF0Y2hpbmcgdGhlIERJRFxufVxuXG4vLyBhc3luYyBmdW5jdGlvbiBzYXZlSWRlbnRpdHkgKGV2dCwgcGVyc29uKSB7XG4vLyAgIGNvbnN0IGlkcyA9IGF3YWl0IGxvYWRJZGVudGl0aWVzKCk7XG4vLyAgIGNvbnN0IGlkeCA9IGlkcy5maW5kSW5kZXgocCA9PiBwLiRpZCA9IHBlcnNvbi4kaWQpO1xuLy8gICBpZiAoaWR4ID49IDApIGlkc1tpZHhdID0gcGVyc29uO1xuLy8gICBlbHNlIGlkcy5wdXNoKHBlcnNvbik7XG4vLyAgIC8vIFhYWFxuLy8gICAvLyAgLSBzdG9yZSBpbWFnZXNcbi8vICAgLy8gIC0gY3JlYXRlIHByb3Blcmx5IHNoYXBlZCBKU09OIHdpdGggaW1hZ2Ugb2JqZWN0cyBhbmQgZW1iZWRkZWQgQnVmZmVyc1xuLy8gICAvLyAgLSBjaGVjayBwcmlvciBleGlzdGVuY2Ugb2Ygcm9vdCBmZWVkLCBvdGhlcndpc2UgbWludCBvbmVcbi8vICAgLy8gIC0gcHV0IHBlcnNvbiBvbiBJUEZTXG4vLyAgIC8vICAtIGNyZWF0ZSBhbmQgc3RvcmUgaXBucyBmb3IgdGhlbSwgd2l0aCBhIGtleSBtYXRjaGluZyB0aGUgRElEXG4vLyAgIGF3YWl0IHNhdmVJZGVudGl0aWVzKGlkcyk7XG4vLyAgIHJldHVybiB0cnVlO1xuLy8gfVxuXG4vLyAvLyBYWFggcHJvYmFibHkgZWxpbWluYXRlIHRoaXNcbi8vIGFzeW5jIGZ1bmN0aW9uIHNhdmVJZGVudGl0aWVzIChpZGVudGl0aWVzKSB7XG4vLyAgIHJldHVybiBzYXZlSlNPTihqb2luKGRhdGFEaXIsICdpZGVudGl0aWVzLmpzb24nKSwgaWRlbnRpdGllcyk7XG4vLyB9XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUlkZW50aXR5IChldnQsIGRpZCkge1xuLy8gICBjb25zdCBpZHMgPSBhd2FpdCBsb2FkSWRlbnRpdGllcygpO1xuLy8gICBhd2FpdCBzYXZlSWRlbnRpdGllcyhpZHMuZmlsdGVyKHAgPT4gcC4kaWQgIT09IGRpZCkpO1xuLy8gICByZXR1cm4gdHJ1ZTtcbi8vIH1cbiIsIlxuaW1wb3J0IHsgUGFzc1Rocm91Z2ggfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgY3JlYXRlUmVhZFN0cmVhbSB9IGZyb20gJ25vZGU6ZnMnO1xuXG4vLyB0aGlzIGlzIHNvIHRoYXQgd2UgY2FuIHNlbmQgc3RyaW5ncyBhcyBzdHJlYW1zXG5mdW5jdGlvbiBjcmVhdGVTdHJlYW0gKHRleHQpIHtcbiAgY29uc3QgcnYgPSBuZXcgUGFzc1Rocm91Z2goKTtcbiAgcnYucHVzaCh0ZXh0KTtcbiAgcnYucHVzaChudWxsKTtcbiAgcmV0dXJuIHJ2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXBmc1Byb3RvY29sSGFuZGxlciAocmVxLCBjYikge1xuICBjb25zb2xlLmxvZyhgZ290IHJlcXVlc3RgLCByZXEsIGNiKTtcbiAgaWYgKC9wbmcvLnRlc3QocmVxLnVybCkpIHtcbiAgICByZXR1cm4gY2Ioe1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgbWltZVR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgZGF0YTogY3JlYXRlUmVhZFN0cmVhbSgnL1VzZXJzL3JvYmluL0NvZGUvZXRzYXVyLnBuZycpLFxuICAgIH0pO1xuICB9XG4gIGxldCBiYWNrZ3JvdW5kID0gL2lwZnM6XFwvXFwvZGVhZGIzM2ZcXC9cXHcrLy50ZXN0KHJlcS51cmwpID8gcmVxLnVybC5yZXBsYWNlKCdpcGZzOi8vZGVhZGIzM2YvJywgJycpIDogJ3JlZCdcbiAgY2Ioe1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBtaW1lVHlwZTogJ3RleHQvaHRtbCcsXG4gICAgZGF0YTogY3JlYXRlU3RyZWFtKGA8IURPQ1RZUEUgaHRtbD5cbjxodG1sPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoXCI+XG4gIDx0aXRsZT5TdWNjZXNzPC90aXRsZT5cbiAgPHN0eWxlPlxuICAgIGJvZHkge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIGJhY2tncm91bmQ6ICR7YmFja2dyb3VuZH07XG4gICAgfVxuICA8L3N0eWxlPlxuPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8cD5PayE8L3A+XG4gIDwvYm9keT5cbjwvaHRtbD5cbmApLFxuICB9KTtcbiAgY29uc29sZS5sb2coYERPTkUhYCk7XG59XG4iLCJcbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGxvYWRKU09OICh1cmwpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlYWRGaWxlKHVybCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShkYXRhKSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJcbi8vIGNhbGwgd2l0aCBtYWtlUmVsKGltcG9ydC5tZXRhLnVybCksIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHJlbGF0aXZlIHBhdGhzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlUmVsIChpbXBvcnRVUkwpIHtcbiAgcmV0dXJuIChwdGgpID0+IG5ldyBVUkwocHRoLCBpbXBvcnRVUkwpLnRvU3RyaW5nKCkucmVwbGFjZSgvXmZpbGU6XFwvXFwvLywgJycpO1xufVxuIiwiXG5pbXBvcnQgeyB3cml0ZUZpbGUgfSBmcm9tICdub2RlOmZzL3Byb21pc2VzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gc2F2ZUpTT04gKHVybCwgb2JqKSB7XG4gIHJldHVybiB3cml0ZUZpbGUodXJsLCBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmcy9wcm9taXNlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuaW1wb3J0IHsgYXBwLCBwcm90b2NvbCwgQnJvd3NlcldpbmRvdywgc2NyZWVuIH0gIGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IGlwZnNQcm90b2NvbEhhbmRsZXIgfSBmcm9tICcuL2lwZnMtaGFuZGxlci5qcyc7XG5pbXBvcnQgeyBpbml0RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YS1zb3VyY2UuanMnO1xuaW1wb3J0IG1ha2VSZWwgZnJvbSAnLi9yZWwuanMnO1xuXG5sZXQgbWFpbldpbmRvdztcbmNvbnN0IHJlbCA9IG1ha2VSZWwoaW1wb3J0Lm1ldGEudXJsKTtcblxuLy8gdGhlcmUgY2FuIGJlIG9ubHkgb25lXG5jb25zdCBzaW5nbGVJbnN0YW5jZUxvY2sgPSBhcHAucmVxdWVzdFNpbmdsZUluc3RhbmNlTG9jaygpO1xuaWYgKCFzaW5nbGVJbnN0YW5jZUxvY2spIHtcbiAgYXBwLnF1aXQoKTtcbn1cbmVsc2Uge1xuICBhcHAub24oJ3NlY29uZC1pbnN0YW5jZScsICgpID0+IHtcbiAgICBpZiAobWFpbldpbmRvdykge1xuICAgICAgaWYgKG1haW5XaW5kb3cuaXNNaW5pbWl6ZWQoKSkgbWFpbldpbmRvdy5yZXN0b3JlKCk7XG4gICAgICBtYWluV2luZG93LmZvY3VzKCk7XG4gICAgfVxuICB9KTtcbn1cblxuXG4vLyBJIGFtIG5vdCBjbGVhciBhdCBhbGwgYXMgdG8gd2hhdCB0aGUgcHJpdmlsZWdlcyBtZWFuLiBUaGV5IGFyZSBsaXN0ZWQgYXRcbi8vIGh0dHBzOi8vd3d3LmVsZWN0cm9uanMub3JnL2RvY3MvbGF0ZXN0L2FwaS9zdHJ1Y3R1cmVzL2N1c3RvbS1zY2hlbWUgYnV0IHRoYXQgaXMgaGFybGR5XG4vLyBpbmZvcm1hdGl2ZS4gaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9sYXRlc3QvYXBpL3Byb3RvY29sI3Byb3RvY29scmVnaXN0ZXJzY2hlbWVzYXNwcml2aWxlZ2VkY3VzdG9tc2NoZW1lc1xuLy8gaXMgcHJldHR5IGNsZWFyIHRoYXQgdGhlIGJlaGF2aW91ciB3ZSB3YW50IHJlcXVpcmVzIGF0IGxlYXN0IGBzdGFuZGFyZGAuXG5wcm90b2NvbC5yZWdpc3RlclNjaGVtZXNBc1ByaXZpbGVnZWQoW1xuICB7c2NoZW1lOiAnaXBmcycsIHByaXZpbGVnZXM6IHtcbiAgICBzdGFuZGFyZDogdHJ1ZSxcbiAgICBzZWN1cmU6IGZhbHNlLFxuICAgIGJ5cGFzc0NTUDogZmFsc2UsXG4gICAgYWxsb3dTZXJ2aWNlV29ya2VyczogZmFsc2UsXG4gICAgc3VwcG9ydEZldGNoQVBJOiB0cnVlLFxuICAgIGNvcnNFbmFibGVkOiBmYWxzZSxcbiAgICBzdHJlYW06IHRydWUsXG4gIH0gfSxcbl0pO1xuYXBwLmVuYWJsZVNhbmRib3goKTtcbmFwcC53aGVuUmVhZHkoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgcHJvdG9jb2wucmVnaXN0ZXJTdHJlYW1Qcm90b2NvbCgnaXBmcycsIGlwZnNQcm90b2NvbEhhbmRsZXIpO1xuICBhd2FpdCBpbml0RGF0YVNvdXJjZSgpO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHNjcmVlbi5nZXRQcmltYXJ5RGlzcGxheSgpLndvcmtBcmVhU2l6ZTtcbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgc2hvdzogZmFsc2UsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgdGl0bGU6ICdOeXRpdmUnLFxuICAgIHRpdGxlQmFyU3R5bGU6ICdoaWRkZW4nLFxuICAgIGljb246ICcuL2ltZy9pY29uLnBuZycsXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgIHdlYnZpZXdUYWc6IHRydWUsIC8vIEkga25vdyB0aGF0IHRoaXMgaXNuJ3QgZ3JlYXQsIGJ1dCB0aGUgYWx0ZXJuYXRpdmVzIGFyZW4ndCB0aGVyZSB5ZXRcbiAgICAgIHByZWxvYWQ6IHJlbCgnLi4vYnVpbGQvcHJlbG9hZC5qcycpLFxuICAgIH0sXG4gIH0pO1xuXG4gIG1haW5XaW5kb3cubG9hZEZpbGUoJ2luZGV4Lmh0bWwnKTtcbiAgbWFpbldpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICB9KTtcbiAgY29uc3QgeyB3ZWJDb250ZW50cyB9ID0gbWFpbldpbmRvdztcbiAgLy8gcmVsb2FkaW5nXG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2NtZCtSJywgcmVsb2FkKSk7XG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2N0cmwrUicsIHJlbG9hZCkpO1xuICB3ZWJDb250ZW50cy5vbignYmVmb3JlLWlucHV0LWV2ZW50JywgbWFrZUtleURvd25NYXRjaGVyKCdjbWQrYWx0K0knLCBvcGVuRGV2VG9vbHMpKTtcbn0pO1xuXG5mdW5jdGlvbiByZWxvYWQgKCkge1xuICBjb25zb2xlLmxvZygnUkVMT0FEJyk7XG4gIG1haW5XaW5kb3cucmVsb2FkKCk7XG59XG5cbmZ1bmN0aW9uIG9wZW5EZXZUb29scyAoKSB7XG4gIG1haW5XaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG59XG5cbi8vIGZ1bmN0aW9uIG1ha2VLZXlVcE1hdGNoZXIgKHNjLCBjYikge1xuLy8gICByZXR1cm4gbWFrZUtleU1hdGNoZXIoJ2tleVVwJywgc2MsIGNiKTtcbi8vIH1cblxuZnVuY3Rpb24gbWFrZUtleURvd25NYXRjaGVyIChzYywgY2IpIHtcbiAgcmV0dXJuIG1ha2VLZXlNYXRjaGVyKCdrZXlEb3duJywgc2MsIGNiKTtcbn1cblxuZnVuY3Rpb24gbWFrZUtleU1hdGNoZXIgKHR5cGUsIHNjLCBjYikge1xuICBsZXQgcGFydHMgPSBzYy5zcGxpdCgvWystXS8pXG4gICAgLCBrZXkgPSBwYXJ0cy5wb3AoKS50b0xvd2VyQ2FzZSgpXG4gICAgLCBtb2RpZmllcnMgPSB7XG4gICAgICAgIHNoaWZ0OiBmYWxzZSxcbiAgICAgICAgY29udHJvbDogZmFsc2UsXG4gICAgICAgIG1ldGE6IGZhbHNlLFxuICAgICAgICBhbHQ6IGZhbHNlLFxuICAgICAgfVxuICA7XG4gIHBhcnRzLmZvckVhY2gocCA9PiB7XG4gICAgcCA9IHAudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAocCA9PT0gJ2N0cmwnKSBwID0gJ2NvbnRyb2wnO1xuICAgIGlmIChwID09PSAnY21kJykgcCA9ICdtZXRhJztcbiAgICBpZiAodHlwZW9mIG1vZGlmaWVyc1twXSAhPT0gJ2Jvb2xlYW4nKSBjb25zb2xlLndhcm4oYFVua25vd24gY29tbWFuZCBtb2RpZmllciAke3B9LmApO1xuICAgIG1vZGlmaWVyc1twXSA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gKGV2dCwgaW5wdXQpID0+IHtcbiAgICBpZiAodHlwZSAhPT0gaW5wdXQudHlwZSkgcmV0dXJuO1xuICAgIGlmIChrZXkgIT09IGlucHV0LmtleSkgcmV0dXJuO1xuICAgIGxldCBiYWRNb2QgPSBmYWxzZTtcbiAgICBPYmplY3Qua2V5cyhtb2RpZmllcnMpLmZvckVhY2gobW9kID0+IHtcbiAgICAgIGlmIChpbnB1dFttb2RdICE9PSBtb2RpZmllcnNbbW9kXSkgYmFkTW9kID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBpZiAoYmFkTW9kKSByZXR1cm47XG4gICAgY2IoKTtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==