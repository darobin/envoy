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
    webPreferences: {
      webviewTag: true, // I know that this isn't great, but the alternatives aren't there yet
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3FDO0FBQ007O0FBRTNDO0FBQ0E7QUFDQSxpQkFBaUIsK0NBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBZ0I7QUFDNUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUNBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xpRTtBQUNUOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUFvQztBQUNwQyxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx1REFBaUI7QUFDakIsbURBQWE7QUFDYixFQUFFLHFFQUErQixTQUFTLGlFQUFtQjtBQUM3RCxVQUFVLGdCQUFnQixFQUFFLDhEQUF3QjtBQUNwRCxtQkFBbUIsbURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFVBQVUsY0FBYztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixFQUFFO0FBQ3RGO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Vudm95YWdlLy4vc3JjL2lwZnMtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9lbnZveWFnZS9leHRlcm5hbCBjb21tb25qczIgXCJlbGVjdHJvblwiIiwid2VicGFjazovL2Vudm95YWdlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInN0cmVhbVwiIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbnZveWFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Vudm95YWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW52b3lhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBQYXNzVGhyb3VnaCB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtIH0gZnJvbSAnbm9kZTpmcyc7XG5cbi8vIHRoaXMgaXMgc28gdGhhdCB3ZSBjYW4gc2VuZCBzdHJpbmdzIGFzIHN0cmVhbXNcbmZ1bmN0aW9uIGNyZWF0ZVN0cmVhbSAodGV4dCkge1xuICBjb25zdCBydiA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuICBydi5wdXNoKHRleHQpO1xuICBydi5wdXNoKG51bGwpO1xuICByZXR1cm4gcnY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpcGZzUHJvdG9jb2xIYW5kbGVyIChyZXEsIGNiKSB7XG4gIGNvbnNvbGUubG9nKGBnb3QgcmVxdWVzdGAsIHJlcSwgY2IpO1xuICBpZiAoL3BuZy8udGVzdChyZXEudXJsKSkge1xuICAgIHJldHVybiBjYih7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBtaW1lVHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICBkYXRhOiBjcmVhdGVSZWFkU3RyZWFtKCcvVXNlcnMvcm9iaW4vQ29kZS9ldHNhdXIucG5nJyksXG4gICAgfSk7XG4gIH1cbiAgbGV0IGJhY2tncm91bmQgPSAvaXBmczpcXC9cXC9kZWFkYjMzZlxcL1xcdysvLnRlc3QocmVxLnVybCkgPyByZXEudXJsLnJlcGxhY2UoJ2lwZnM6Ly9kZWFkYjMzZi8nLCAnJykgOiAncmVkJ1xuICBjYih7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIG1pbWVUeXBlOiAndGV4dC9odG1sJyxcbiAgICBkYXRhOiBjcmVhdGVTdHJlYW0oYDwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG48aGVhZD5cbiAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGhcIj5cbiAgPHRpdGxlPlN1Y2Nlc3M8L3RpdGxlPlxuICA8c3R5bGU+XG4gICAgYm9keSB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kfTtcbiAgICB9XG4gIDwvc3R5bGU+XG48L2hlYWQ+XG4gIDxib2R5PlxuICAgIDxwPk9rITwvcD5cbiAgPC9ib2R5PlxuPC9odG1sPlxuYCksXG4gIH0pO1xuICBjb25zb2xlLmxvZyhgRE9ORSFgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCB7IGFwcCwgcHJvdG9jb2wsIEJyb3dzZXJXaW5kb3csIHNjcmVlbiB9ICBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBpcGZzUHJvdG9jb2xIYW5kbGVyIH0gZnJvbSAnLi9pcGZzLWhhbmRsZXIuanMnO1xuXG5sZXQgbWFpbldpbmRvdztcblxuLy8gSSBhbSBub3QgY2xlYXIgYXQgYWxsIGFzIHRvIHdoYXQgdGhlIHByaXZpbGVnZXMgbWVhbi4gVGhleSBhcmUgbGlzdGVkIGF0XG4vLyBodHRwczovL3d3dy5lbGVjdHJvbmpzLm9yZy9kb2NzL2xhdGVzdC9hcGkvc3RydWN0dXJlcy9jdXN0b20tc2NoZW1lIGJ1dCB0aGF0IGlzIGhhcmxkeVxuLy8gaW5mb3JtYXRpdmUuIGh0dHBzOi8vd3d3LmVsZWN0cm9uanMub3JnL2RvY3MvbGF0ZXN0L2FwaS9wcm90b2NvbCNwcm90b2NvbHJlZ2lzdGVyc2NoZW1lc2FzcHJpdmlsZWdlZGN1c3RvbXNjaGVtZXNcbi8vIGlzIHByZXR0eSBjbGVhciB0aGF0IHRoZSBiZWhhdmlvdXIgd2Ugd2FudCByZXF1aXJlcyBhdCBsZWFzdCBgc3RhbmRhcmRgLlxucHJvdG9jb2wucmVnaXN0ZXJTY2hlbWVzQXNQcml2aWxlZ2VkKFtcbiAge3NjaGVtZTogJ2lwZnMnLCBwcml2aWxlZ2VzOiB7XG4gICAgc3RhbmRhcmQ6IHRydWUsXG4gICAgc2VjdXJlOiBmYWxzZSxcbiAgICBieXBhc3NDU1A6IGZhbHNlLFxuICAgIGFsbG93U2VydmljZVdvcmtlcnM6IGZhbHNlLFxuICAgIHN1cHBvcnRGZXRjaEFQSTogdHJ1ZSxcbiAgICBjb3JzRW5hYmxlZDogZmFsc2UsXG4gICAgc3RyZWFtOiB0cnVlLFxuICB9IH0sXG5dKTtcbmFwcC5lbmFibGVTYW5kYm94KCk7XG5hcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XG4gIHByb3RvY29sLnJlZ2lzdGVyU3RyZWFtUHJvdG9jb2woJ2lwZnMnLCBpcGZzUHJvdG9jb2xIYW5kbGVyKTtcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzY3JlZW4uZ2V0UHJpbWFyeURpc3BsYXkoKS53b3JrQXJlYVNpemU7XG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHNob3c6IGZhbHNlLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgIHRpdGxlOiAnTnl0aXZlJyxcbiAgICB0aXRsZUJhclN0eWxlOiAnaGlkZGVuJyxcbiAgICBpY29uOiAnLi9pbWcvaWNvbi5wbmcnLFxuICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICB3ZWJ2aWV3VGFnOiB0cnVlLCAvLyBJIGtub3cgdGhhdCB0aGlzIGlzbid0IGdyZWF0LCBidXQgdGhlIGFsdGVybmF0aXZlcyBhcmVuJ3QgdGhlcmUgeWV0XG4gICAgfSxcbiAgfSk7XG5cbiAgbWFpbldpbmRvdy5sb2FkRmlsZSgnaW5kZXguaHRtbCcpO1xuICBtYWluV2luZG93Lm9uY2UoJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiB7XG4gICAgbWFpbldpbmRvdy5zaG93KCk7XG4gIH0pO1xuICBjb25zdCB7IHdlYkNvbnRlbnRzIH0gPSBtYWluV2luZG93O1xuICAvLyByZWxvYWRpbmdcbiAgd2ViQ29udGVudHMub24oJ2JlZm9yZS1pbnB1dC1ldmVudCcsIG1ha2VLZXlEb3duTWF0Y2hlcignY21kK1InLCByZWxvYWQpKTtcbiAgd2ViQ29udGVudHMub24oJ2JlZm9yZS1pbnB1dC1ldmVudCcsIG1ha2VLZXlEb3duTWF0Y2hlcignY3RybCtSJywgcmVsb2FkKSk7XG4gIHdlYkNvbnRlbnRzLm9uKCdiZWZvcmUtaW5wdXQtZXZlbnQnLCBtYWtlS2V5RG93bk1hdGNoZXIoJ2NtZCthbHQrSScsIG9wZW5EZXZUb29scykpO1xufSk7XG5cbmZ1bmN0aW9uIHJlbG9hZCAoKSB7XG4gIGNvbnNvbGUubG9nKCdSRUxPQUQnKTtcbiAgbWFpbldpbmRvdy5yZWxvYWQoKTtcbn1cblxuZnVuY3Rpb24gb3BlbkRldlRvb2xzICgpIHtcbiAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcbn1cblxuLy8gZnVuY3Rpb24gbWFrZUtleVVwTWF0Y2hlciAoc2MsIGNiKSB7XG4vLyAgIHJldHVybiBtYWtlS2V5TWF0Y2hlcigna2V5VXAnLCBzYywgY2IpO1xuLy8gfVxuXG5mdW5jdGlvbiBtYWtlS2V5RG93bk1hdGNoZXIgKHNjLCBjYikge1xuICByZXR1cm4gbWFrZUtleU1hdGNoZXIoJ2tleURvd24nLCBzYywgY2IpO1xufVxuXG5mdW5jdGlvbiBtYWtlS2V5TWF0Y2hlciAodHlwZSwgc2MsIGNiKSB7XG4gIGxldCBwYXJ0cyA9IHNjLnNwbGl0KC9bKy1dLylcbiAgICAsIGtleSA9IHBhcnRzLnBvcCgpLnRvTG93ZXJDYXNlKClcbiAgICAsIG1vZGlmaWVycyA9IHtcbiAgICAgICAgc2hpZnQ6IGZhbHNlLFxuICAgICAgICBjb250cm9sOiBmYWxzZSxcbiAgICAgICAgbWV0YTogZmFsc2UsXG4gICAgICAgIGFsdDogZmFsc2UsXG4gICAgICB9XG4gIDtcbiAgcGFydHMuZm9yRWFjaChwID0+IHtcbiAgICBwID0gcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChwID09PSAnY3RybCcpIHAgPSAnY29udHJvbCc7XG4gICAgaWYgKHAgPT09ICdjbWQnKSBwID0gJ21ldGEnO1xuICAgIGlmICh0eXBlb2YgbW9kaWZpZXJzW3BdICE9PSAnYm9vbGVhbicpIGNvbnNvbGUud2FybihgVW5rbm93biBjb21tYW5kIG1vZGlmaWVyICR7cH0uYCk7XG4gICAgbW9kaWZpZXJzW3BdID0gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiAoZXZ0LCBpbnB1dCkgPT4ge1xuICAgIGlmICh0eXBlICE9PSBpbnB1dC50eXBlKSByZXR1cm47XG4gICAgaWYgKGtleSAhPT0gaW5wdXQua2V5KSByZXR1cm47XG4gICAgbGV0IGJhZE1vZCA9IGZhbHNlO1xuICAgIE9iamVjdC5rZXlzKG1vZGlmaWVycykuZm9yRWFjaChtb2QgPT4ge1xuICAgICAgaWYgKGlucHV0W21vZF0gIT09IG1vZGlmaWVyc1ttb2RdKSBiYWRNb2QgPSB0cnVlO1xuICAgIH0pO1xuICAgIGlmIChiYWRNb2QpIHJldHVybjtcbiAgICBjYigpO1xuICB9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9