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
    await saveIdentities([]);
  }
  handle('identities:load', loadIdentities);
  handle('identities:save', saveIdentity);
  handle('identities:delete', deleteIdentity);
}

async function loadIdentities () {
  return (0,_load_json_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dataDir, 'identities.json'));
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
  return (0,_save_json_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dataDir, 'identities.json'), identities);
}

async function deleteIdentity (evt, did) {
  const ids = await loadIdentities();
  await saveIdentities(ids.filter(p => p.$id !== did));
  return true;
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0YsRUFBRTtBQUN0RjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbnZveWFnZS8uL3NyYy9kYXRhLXNvdXJjZS5qcyIsIndlYnBhY2s6Ly9lbnZveWFnZS8uL3NyYy9pcGZzLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvLi9zcmMvbG9hZC1qc29uLmpzIiwid2VicGFjazovL2Vudm95YWdlLy4vc3JjL3JlbC5qcyIsIndlYnBhY2s6Ly9lbnZveWFnZS8uL3NyYy9zYXZlLWpzb24uanMiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgY29tbW9uanMyIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9lbnZveWFnZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2Vudm95YWdlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzL3Byb21pc2VzXCIiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6b3NcIiIsIndlYnBhY2s6Ly9lbnZveWFnZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInN0cmVhbVwiIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbnZveWFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBob21lZGlyIH0gZnJvbSAnbm9kZTpvcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IG1rZGlyIH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGlwY01haW4gfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgc2F2ZUpTT04gZnJvbSAnLi9zYXZlLWpzb24uanMnO1xuaW1wb3J0IGxvYWRKU09OIGZyb20gJy4vbG9hZC1qc29uLmpzJztcblxuY29uc3QgeyBoYW5kbGUgfSA9IGlwY01haW47XG5jb25zdCBkYXRhRGlyID0gam9pbihob21lZGlyKCksICcuZW52b3lhZ2UnKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXREYXRhU291cmNlICgpIHtcbiAgYXdhaXQgbWtkaXIoZGF0YURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIHRyeSB7XG4gICAgYXdhaXQgbG9hZElkZW50aXRpZXMoKTtcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgYXdhaXQgc2F2ZUlkZW50aXRpZXMoW10pO1xuICB9XG4gIGhhbmRsZSgnaWRlbnRpdGllczpsb2FkJywgbG9hZElkZW50aXRpZXMpO1xuICBoYW5kbGUoJ2lkZW50aXRpZXM6c2F2ZScsIHNhdmVJZGVudGl0eSk7XG4gIGhhbmRsZSgnaWRlbnRpdGllczpkZWxldGUnLCBkZWxldGVJZGVudGl0eSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRJZGVudGl0aWVzICgpIHtcbiAgcmV0dXJuIGxvYWRKU09OKGpvaW4oZGF0YURpciwgJ2lkZW50aXRpZXMuanNvbicpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZUlkZW50aXR5IChldnQsIHBlcnNvbikge1xuICBjb25zdCBpZHMgPSBhd2FpdCBsb2FkSWRlbnRpdGllcygpO1xuICBjb25zdCBpZHggPSBpZHMuZmluZEluZGV4KHAgPT4gcC4kaWQgPSBwZXJzb24uJGlkKTtcbiAgaWYgKGlkeCA+PSAwKSBpZHNbaWR4XSA9IHBlcnNvbjtcbiAgZWxzZSBpZHMucHVzaChwZXJzb24pO1xuICBhd2FpdCBzYXZlSWRlbnRpdGllcyhpZHMpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZUlkZW50aXRpZXMgKGlkZW50aXRpZXMpIHtcbiAgcmV0dXJuIHNhdmVKU09OKGpvaW4oZGF0YURpciwgJ2lkZW50aXRpZXMuanNvbicpLCBpZGVudGl0aWVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlSWRlbnRpdHkgKGV2dCwgZGlkKSB7XG4gIGNvbnN0IGlkcyA9IGF3YWl0IGxvYWRJZGVudGl0aWVzKCk7XG4gIGF3YWl0IHNhdmVJZGVudGl0aWVzKGlkcy5maWx0ZXIocCA9PiBwLiRpZCAhPT0gZGlkKSk7XG4gIHJldHVybiB0cnVlO1xufVxuIiwiXG5pbXBvcnQgeyBQYXNzVGhyb3VnaCB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtIH0gZnJvbSAnbm9kZTpmcyc7XG5cbi8vIHRoaXMgaXMgc28gdGhhdCB3ZSBjYW4gc2VuZCBzdHJpbmdzIGFzIHN0cmVhbXNcbmZ1bmN0aW9uIGNyZWF0ZVN0cmVhbSAodGV4dCkge1xuICBjb25zdCBydiA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuICBydi5wdXNoKHRleHQpO1xuICBydi5wdXNoKG51bGwpO1xuICByZXR1cm4gcnY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpcGZzUHJvdG9jb2xIYW5kbGVyIChyZXEsIGNiKSB7XG4gIGNvbnNvbGUubG9nKGBnb3QgcmVxdWVzdGAsIHJlcSwgY2IpO1xuICBpZiAoL3BuZy8udGVzdChyZXEudXJsKSkge1xuICAgIHJldHVybiBjYih7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBtaW1lVHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICBkYXRhOiBjcmVhdGVSZWFkU3RyZWFtKCcvVXNlcnMvcm9iaW4vQ29kZS9ldHNhdXIucG5nJyksXG4gICAgfSk7XG4gIH1cbiAgbGV0IGJhY2tncm91bmQgPSAvaXBmczpcXC9cXC9kZWFkYjMzZlxcL1xcdysvLnRlc3QocmVxLnVybCkgPyByZXEudXJsLnJlcGxhY2UoJ2lwZnM6Ly9kZWFkYjMzZi8nLCAnJykgOiAncmVkJ1xuICBjYih7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIG1pbWVUeXBlOiAndGV4dC9odG1sJyxcbiAgICBkYXRhOiBjcmVhdGVTdHJlYW0oYDwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG48aGVhZD5cbiAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGhcIj5cbiAgPHRpdGxlPlN1Y2Nlc3M8L3RpdGxlPlxuICA8c3R5bGU+XG4gICAgYm9keSB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kfTtcbiAgICB9XG4gIDwvc3R5bGU+XG48L2hlYWQ+XG4gIDxib2R5PlxuICAgIDxwPk9rITwvcD5cbiAgPC9ib2R5PlxuPC9odG1sPlxuYCksXG4gIH0pO1xuICBjb25zb2xlLmxvZyhgRE9ORSFgKTtcbn1cbiIsIlxuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tICdub2RlOmZzL3Byb21pc2VzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbG9hZEpTT04gKHVybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVhZEZpbGUodXJsKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGRhdGEpKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KTtcbn1cbiIsIlxuLy8gY2FsbCB3aXRoIG1ha2VSZWwoaW1wb3J0Lm1ldGEudXJsKSwgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgcmVsYXRpdmUgcGF0aHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VSZWwgKGltcG9ydFVSTCkge1xuICByZXR1cm4gKHB0aCkgPT4gbmV3IFVSTChwdGgsIGltcG9ydFVSTCkudG9TdHJpbmcoKS5yZXBsYWNlKC9eZmlsZTpcXC9cXC8vLCAnJyk7XG59XG4iLCJcbmltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzYXZlSlNPTiAodXJsLCBvYmopIHtcbiAgcmV0dXJuIHdyaXRlRmlsZSh1cmwsIEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMikpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzL3Byb21pc2VzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6b3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgeyBhcHAsIHByb3RvY29sLCBCcm93c2VyV2luZG93LCBzY3JlZW4gfSAgZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgaXBmc1Byb3RvY29sSGFuZGxlciB9IGZyb20gJy4vaXBmcy1oYW5kbGVyLmpzJztcbmltcG9ydCB7IGluaXREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS5qcyc7XG5pbXBvcnQgbWFrZVJlbCBmcm9tICcuL3JlbC5qcyc7XG5cbmxldCBtYWluV2luZG93O1xuY29uc3QgcmVsID0gbWFrZVJlbChpbXBvcnQubWV0YS51cmwpO1xuXG4vLyBJIGFtIG5vdCBjbGVhciBhdCBhbGwgYXMgdG8gd2hhdCB0aGUgcHJpdmlsZWdlcyBtZWFuLiBUaGV5IGFyZSBsaXN0ZWQgYXRcbi8vIGh0dHBzOi8vd3d3LmVsZWN0cm9uanMub3JnL2RvY3MvbGF0ZXN0L2FwaS9zdHJ1Y3R1cmVzL2N1c3RvbS1zY2hlbWUgYnV0IHRoYXQgaXMgaGFybGR5XG4vLyBpbmZvcm1hdGl2ZS4gaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9sYXRlc3QvYXBpL3Byb3RvY29sI3Byb3RvY29scmVnaXN0ZXJzY2hlbWVzYXNwcml2aWxlZ2VkY3VzdG9tc2NoZW1lc1xuLy8gaXMgcHJldHR5IGNsZWFyIHRoYXQgdGhlIGJlaGF2aW91ciB3ZSB3YW50IHJlcXVpcmVzIGF0IGxlYXN0IGBzdGFuZGFyZGAuXG5wcm90b2NvbC5yZWdpc3RlclNjaGVtZXNBc1ByaXZpbGVnZWQoW1xuICB7c2NoZW1lOiAnaXBmcycsIHByaXZpbGVnZXM6IHtcbiAgICBzdGFuZGFyZDogdHJ1ZSxcbiAgICBzZWN1cmU6IGZhbHNlLFxuICAgIGJ5cGFzc0NTUDogZmFsc2UsXG4gICAgYWxsb3dTZXJ2aWNlV29ya2VyczogZmFsc2UsXG4gICAgc3VwcG9ydEZldGNoQVBJOiB0cnVlLFxuICAgIGNvcnNFbmFibGVkOiBmYWxzZSxcbiAgICBzdHJlYW06IHRydWUsXG4gIH0gfSxcbl0pO1xuYXBwLmVuYWJsZVNhbmRib3goKTtcbmFwcC53aGVuUmVhZHkoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgcHJvdG9jb2wucmVnaXN0ZXJTdHJlYW1Qcm90b2NvbCgnaXBmcycsIGlwZnNQcm90b2NvbEhhbmRsZXIpO1xuICBhd2FpdCBpbml0RGF0YVNvdXJjZSgpO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHNjcmVlbi5nZXRQcmltYXJ5RGlzcGxheSgpLndvcmtBcmVhU2l6ZTtcbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgc2hvdzogZmFsc2UsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgdGl0bGU6ICdOeXRpdmUnLFxuICAgIHRpdGxlQmFyU3R5bGU6ICdoaWRkZW4nLFxuICAgIGljb246ICcuL2ltZy9pY29uLnBuZycsXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgIHdlYnZpZXdUYWc6IHRydWUsIC8vIEkga25vdyB0aGF0IHRoaXMgaXNuJ3QgZ3JlYXQsIGJ1dCB0aGUgYWx0ZXJuYXRpdmVzIGFyZW4ndCB0aGVyZSB5ZXRcbiAgICAgIHByZWxvYWQ6IHJlbCgnLi4vYnVpbGQvcHJlbG9hZC5qcycpLFxuICAgIH0sXG4gIH0pO1xuXG4gIG1haW5XaW5kb3cubG9hZEZpbGUoJ2luZGV4Lmh0bWwnKTtcbiAgbWFpbldpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICB9KTtcbiAgY29uc3QgeyB3ZWJDb250ZW50cyB9ID0gbWFpbldpbmRvdztcbiAgLy8gcmVsb2FkaW5nXG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2NtZCtSJywgcmVsb2FkKSk7XG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2N0cmwrUicsIHJlbG9hZCkpO1xuICB3ZWJDb250ZW50cy5vbignYmVmb3JlLWlucHV0LWV2ZW50JywgbWFrZUtleURvd25NYXRjaGVyKCdjbWQrYWx0K0knLCBvcGVuRGV2VG9vbHMpKTtcbn0pO1xuXG5mdW5jdGlvbiByZWxvYWQgKCkge1xuICBjb25zb2xlLmxvZygnUkVMT0FEJyk7XG4gIG1haW5XaW5kb3cucmVsb2FkKCk7XG59XG5cbmZ1bmN0aW9uIG9wZW5EZXZUb29scyAoKSB7XG4gIG1haW5XaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG59XG5cbi8vIGZ1bmN0aW9uIG1ha2VLZXlVcE1hdGNoZXIgKHNjLCBjYikge1xuLy8gICByZXR1cm4gbWFrZUtleU1hdGNoZXIoJ2tleVVwJywgc2MsIGNiKTtcbi8vIH1cblxuZnVuY3Rpb24gbWFrZUtleURvd25NYXRjaGVyIChzYywgY2IpIHtcbiAgcmV0dXJuIG1ha2VLZXlNYXRjaGVyKCdrZXlEb3duJywgc2MsIGNiKTtcbn1cblxuZnVuY3Rpb24gbWFrZUtleU1hdGNoZXIgKHR5cGUsIHNjLCBjYikge1xuICBsZXQgcGFydHMgPSBzYy5zcGxpdCgvWystXS8pXG4gICAgLCBrZXkgPSBwYXJ0cy5wb3AoKS50b0xvd2VyQ2FzZSgpXG4gICAgLCBtb2RpZmllcnMgPSB7XG4gICAgICAgIHNoaWZ0OiBmYWxzZSxcbiAgICAgICAgY29udHJvbDogZmFsc2UsXG4gICAgICAgIG1ldGE6IGZhbHNlLFxuICAgICAgICBhbHQ6IGZhbHNlLFxuICAgICAgfVxuICA7XG4gIHBhcnRzLmZvckVhY2gocCA9PiB7XG4gICAgcCA9IHAudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAocCA9PT0gJ2N0cmwnKSBwID0gJ2NvbnRyb2wnO1xuICAgIGlmIChwID09PSAnY21kJykgcCA9ICdtZXRhJztcbiAgICBpZiAodHlwZW9mIG1vZGlmaWVyc1twXSAhPT0gJ2Jvb2xlYW4nKSBjb25zb2xlLndhcm4oYFVua25vd24gY29tbWFuZCBtb2RpZmllciAke3B9LmApO1xuICAgIG1vZGlmaWVyc1twXSA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gKGV2dCwgaW5wdXQpID0+IHtcbiAgICBpZiAodHlwZSAhPT0gaW5wdXQudHlwZSkgcmV0dXJuO1xuICAgIGlmIChrZXkgIT09IGlucHV0LmtleSkgcmV0dXJuO1xuICAgIGxldCBiYWRNb2QgPSBmYWxzZTtcbiAgICBPYmplY3Qua2V5cyhtb2RpZmllcnMpLmZvckVhY2gobW9kID0+IHtcbiAgICAgIGlmIChpbnB1dFttb2RdICE9PSBtb2RpZmllcnNbbW9kXSkgYmFkTW9kID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBpZiAoYmFkTW9kKSByZXR1cm47XG4gICAgY2IoKTtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==