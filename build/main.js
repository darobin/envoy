/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  cb({
    statusCode: 200,
    mimeType: 'text/html',
    headers: {
      // 'content-type': 'text/html',
    },
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
      background: red;
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




let mainWindow;

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
electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(() => {
  electron__WEBPACK_IMPORTED_MODULE_0__.protocol.registerStreamProtocol('ipfs', _ipfs_handler_js__WEBPACK_IMPORTED_MODULE_1__.ipfsProtocolHandler);
  const { width, height } = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
    width,
    height,
    show: false,
    backgroundColor: '#fff',
    title: 'Nytive',
    titleBarStyle: 'hidden',
    icon: './img/icon.png',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3FDO0FBQ007O0FBRTNDO0FBQ0E7QUFDQSxpQkFBaUIsK0NBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBZ0I7QUFDNUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7OztBQ2hEQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMaUU7QUFDVDs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBb0M7QUFDcEMsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsdURBQWlCO0FBQ2pCLG1EQUFhO0FBQ2IsRUFBRSxxRUFBK0IsU0FBUyxpRUFBbUI7QUFDN0QsVUFBVSxnQkFBZ0IsRUFBRSw4REFBd0I7QUFDcEQsbUJBQW1CLG1EQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxVQUFVLGNBQWM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0YsRUFBRTtBQUN0RjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbnZveS8uL3NyYy9pcGZzLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vZW52b3kvZXh0ZXJuYWwgY29tbW9uanMyIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9lbnZveS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2Vudm95L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly9lbnZveS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbnZveS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lbnZveS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZW52b3kvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbnZveS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Vudm95Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgUGFzc1Rocm91Z2ggfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgY3JlYXRlUmVhZFN0cmVhbSB9IGZyb20gJ25vZGU6ZnMnO1xuXG4vLyB0aGlzIGlzIHNvIHRoYXQgd2UgY2FuIHNlbmQgc3RyaW5ncyBhcyBzdHJlYW1zXG5mdW5jdGlvbiBjcmVhdGVTdHJlYW0gKHRleHQpIHtcbiAgY29uc3QgcnYgPSBuZXcgUGFzc1Rocm91Z2goKTtcbiAgcnYucHVzaCh0ZXh0KTtcbiAgcnYucHVzaChudWxsKTtcbiAgcmV0dXJuIHJ2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXBmc1Byb3RvY29sSGFuZGxlciAocmVxLCBjYikge1xuICBjb25zb2xlLmxvZyhgZ290IHJlcXVlc3RgLCByZXEsIGNiKTtcbiAgaWYgKC9wbmcvLnRlc3QocmVxLnVybCkpIHtcbiAgICByZXR1cm4gY2Ioe1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgbWltZVR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgZGF0YTogY3JlYXRlUmVhZFN0cmVhbSgnL1VzZXJzL3JvYmluL0NvZGUvZXRzYXVyLnBuZycpLFxuICAgIH0pO1xuICB9XG4gIGNiKHtcbiAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgbWltZVR5cGU6ICd0ZXh0L2h0bWwnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIC8vICdjb250ZW50LXR5cGUnOiAndGV4dC9odG1sJyxcbiAgICB9LFxuICAgIGRhdGE6IGNyZWF0ZVN0cmVhbShgPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aFwiPlxuICA8dGl0bGU+U3VjY2VzczwvdGl0bGU+XG4gIDxzdHlsZT5cbiAgICBib2R5IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgfVxuICA8L3N0eWxlPlxuPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8cD5PayE8L3A+XG4gIDwvYm9keT5cbjwvaHRtbD5cbmApLFxuICB9KTtcbiAgY29uc29sZS5sb2coYERPTkUhYCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgeyBhcHAsIHByb3RvY29sLCBCcm93c2VyV2luZG93LCBzY3JlZW4gfSAgZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgaXBmc1Byb3RvY29sSGFuZGxlciB9IGZyb20gJy4vaXBmcy1oYW5kbGVyLmpzJztcblxubGV0IG1haW5XaW5kb3c7XG5cbi8vIEkgYW0gbm90IGNsZWFyIGF0IGFsbCBhcyB0byB3aGF0IHRoZSBwcml2aWxlZ2VzIG1lYW4uIFRoZXkgYXJlIGxpc3RlZCBhdFxuLy8gaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9sYXRlc3QvYXBpL3N0cnVjdHVyZXMvY3VzdG9tLXNjaGVtZSBidXQgdGhhdCBpcyBoYXJsZHlcbi8vIGluZm9ybWF0aXZlLiBodHRwczovL3d3dy5lbGVjdHJvbmpzLm9yZy9kb2NzL2xhdGVzdC9hcGkvcHJvdG9jb2wjcHJvdG9jb2xyZWdpc3RlcnNjaGVtZXNhc3ByaXZpbGVnZWRjdXN0b21zY2hlbWVzXG4vLyBpcyBwcmV0dHkgY2xlYXIgdGhhdCB0aGUgYmVoYXZpb3VyIHdlIHdhbnQgcmVxdWlyZXMgYXQgbGVhc3QgYHN0YW5kYXJkYC5cbnByb3RvY29sLnJlZ2lzdGVyU2NoZW1lc0FzUHJpdmlsZWdlZChbXG4gIHtzY2hlbWU6ICdpcGZzJywgcHJpdmlsZWdlczoge1xuICAgIHN0YW5kYXJkOiB0cnVlLFxuICAgIHNlY3VyZTogZmFsc2UsXG4gICAgYnlwYXNzQ1NQOiBmYWxzZSxcbiAgICBhbGxvd1NlcnZpY2VXb3JrZXJzOiBmYWxzZSxcbiAgICBzdXBwb3J0RmV0Y2hBUEk6IHRydWUsXG4gICAgY29yc0VuYWJsZWQ6IGZhbHNlLFxuICAgIHN0cmVhbTogdHJ1ZSxcbiAgfSB9LFxuXSk7XG5hcHAuZW5hYmxlU2FuZGJveCgpO1xuYXBwLndoZW5SZWFkeSgpLnRoZW4oKCkgPT4ge1xuICBwcm90b2NvbC5yZWdpc3RlclN0cmVhbVByb3RvY29sKCdpcGZzJywgaXBmc1Byb3RvY29sSGFuZGxlcik7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc2NyZWVuLmdldFByaW1hcnlEaXNwbGF5KCkud29ya0FyZWFTaXplO1xuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBzaG93OiBmYWxzZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICB0aXRsZTogJ055dGl2ZScsXG4gICAgdGl0bGVCYXJTdHlsZTogJ2hpZGRlbicsXG4gICAgaWNvbjogJy4vaW1nL2ljb24ucG5nJyxcbiAgfSk7XG4gIG1haW5XaW5kb3cubG9hZEZpbGUoJ2luZGV4Lmh0bWwnKTtcbiAgbWFpbldpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICB9KTtcbiAgY29uc3QgeyB3ZWJDb250ZW50cyB9ID0gbWFpbldpbmRvdztcbiAgLy8gcmVsb2FkaW5nXG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2NtZCtSJywgcmVsb2FkKSk7XG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2N0cmwrUicsIHJlbG9hZCkpO1xuICB3ZWJDb250ZW50cy5vbignYmVmb3JlLWlucHV0LWV2ZW50JywgbWFrZUtleURvd25NYXRjaGVyKCdjbWQrYWx0K0knLCBvcGVuRGV2VG9vbHMpKTtcbn0pO1xuXG5mdW5jdGlvbiByZWxvYWQgKCkge1xuICBjb25zb2xlLmxvZygnUkVMT0FEJyk7XG4gIG1haW5XaW5kb3cucmVsb2FkKCk7XG59XG5cbmZ1bmN0aW9uIG9wZW5EZXZUb29scyAoKSB7XG4gIG1haW5XaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG59XG5cbi8vIGZ1bmN0aW9uIG1ha2VLZXlVcE1hdGNoZXIgKHNjLCBjYikge1xuLy8gICByZXR1cm4gbWFrZUtleU1hdGNoZXIoJ2tleVVwJywgc2MsIGNiKTtcbi8vIH1cblxuZnVuY3Rpb24gbWFrZUtleURvd25NYXRjaGVyIChzYywgY2IpIHtcbiAgcmV0dXJuIG1ha2VLZXlNYXRjaGVyKCdrZXlEb3duJywgc2MsIGNiKTtcbn1cblxuZnVuY3Rpb24gbWFrZUtleU1hdGNoZXIgKHR5cGUsIHNjLCBjYikge1xuICBsZXQgcGFydHMgPSBzYy5zcGxpdCgvWystXS8pXG4gICAgLCBrZXkgPSBwYXJ0cy5wb3AoKS50b0xvd2VyQ2FzZSgpXG4gICAgLCBtb2RpZmllcnMgPSB7XG4gICAgICAgIHNoaWZ0OiBmYWxzZSxcbiAgICAgICAgY29udHJvbDogZmFsc2UsXG4gICAgICAgIG1ldGE6IGZhbHNlLFxuICAgICAgICBhbHQ6IGZhbHNlLFxuICAgICAgfVxuICA7XG4gIHBhcnRzLmZvckVhY2gocCA9PiB7XG4gICAgcCA9IHAudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAocCA9PT0gJ2N0cmwnKSBwID0gJ2NvbnRyb2wnO1xuICAgIGlmIChwID09PSAnY21kJykgcCA9ICdtZXRhJztcbiAgICBpZiAodHlwZW9mIG1vZGlmaWVyc1twXSAhPT0gJ2Jvb2xlYW4nKSBjb25zb2xlLndhcm4oYFVua25vd24gY29tbWFuZCBtb2RpZmllciAke3B9LmApO1xuICAgIG1vZGlmaWVyc1twXSA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gKGV2dCwgaW5wdXQpID0+IHtcbiAgICBpZiAodHlwZSAhPT0gaW5wdXQudHlwZSkgcmV0dXJuO1xuICAgIGlmIChrZXkgIT09IGlucHV0LmtleSkgcmV0dXJuO1xuICAgIGxldCBiYWRNb2QgPSBmYWxzZTtcbiAgICBPYmplY3Qua2V5cyhtb2RpZmllcnMpLmZvckVhY2gobW9kID0+IHtcbiAgICAgIGlmIChpbnB1dFttb2RdICE9PSBtb2RpZmllcnNbbW9kXSkgYmFkTW9kID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBpZiAoYmFkTW9kKSByZXR1cm47XG4gICAgY2IoKTtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==