/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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



let mainWindow;

electron__WEBPACK_IMPORTED_MODULE_0__.app.enableSandbox();
electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(() => {
  let { width, height } = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getPrimaryDisplay().workAreaSize;
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
  let { webContents } = mainWindow;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ0x1RDs7QUFFdkQ7O0FBRUEsdURBQWlCO0FBQ2pCLG1EQUFhO0FBQ2IsUUFBUSxnQkFBZ0IsRUFBRSw4REFBd0I7QUFDbEQsbUJBQW1CLG1EQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxRQUFRLGNBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0YsRUFBRTtBQUN0RjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbnZveS9leHRlcm5hbCBjb21tb25qczIgXCJlbGVjdHJvblwiIiwid2VicGFjazovL2Vudm95L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Vudm95L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Vudm95L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbnZveS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Vudm95L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW52b3kvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuaW1wb3J0IHsgYXBwLCBCcm93c2VyV2luZG93LCBzY3JlZW4gfSAgZnJvbSAnZWxlY3Ryb24nO1xuXG5sZXQgbWFpbldpbmRvdztcblxuYXBwLmVuYWJsZVNhbmRib3goKTtcbmFwcC53aGVuUmVhZHkoKS50aGVuKCgpID0+IHtcbiAgbGV0IHsgd2lkdGgsIGhlaWdodCB9ID0gc2NyZWVuLmdldFByaW1hcnlEaXNwbGF5KCkud29ya0FyZWFTaXplO1xuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBzaG93OiBmYWxzZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICB0aXRsZTogJ055dGl2ZScsXG4gICAgdGl0bGVCYXJTdHlsZTogJ2hpZGRlbicsXG4gICAgaWNvbjogJy4vaW1nL2ljb24ucG5nJyxcbiAgfSk7XG4gIG1haW5XaW5kb3cubG9hZEZpbGUoJ2luZGV4Lmh0bWwnKTtcbiAgbWFpbldpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICB9KTtcbiAgbGV0IHsgd2ViQ29udGVudHMgfSA9IG1haW5XaW5kb3c7XG4gIC8vIHJlbG9hZGluZ1xuICB3ZWJDb250ZW50cy5vbignYmVmb3JlLWlucHV0LWV2ZW50JywgbWFrZUtleURvd25NYXRjaGVyKCdjbWQrUicsIHJlbG9hZCkpO1xuICB3ZWJDb250ZW50cy5vbignYmVmb3JlLWlucHV0LWV2ZW50JywgbWFrZUtleURvd25NYXRjaGVyKCdjdHJsK1InLCByZWxvYWQpKTtcbiAgd2ViQ29udGVudHMub24oJ2JlZm9yZS1pbnB1dC1ldmVudCcsIG1ha2VLZXlEb3duTWF0Y2hlcignY21kK2FsdCtJJywgb3BlbkRldlRvb2xzKSk7XG59KTtcblxuZnVuY3Rpb24gcmVsb2FkICgpIHtcbiAgY29uc29sZS5sb2coJ1JFTE9BRCcpO1xuICBtYWluV2luZG93LnJlbG9hZCgpO1xufVxuXG5mdW5jdGlvbiBvcGVuRGV2VG9vbHMgKCkge1xuICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xufVxuXG4vLyBmdW5jdGlvbiBtYWtlS2V5VXBNYXRjaGVyIChzYywgY2IpIHtcbi8vICAgcmV0dXJuIG1ha2VLZXlNYXRjaGVyKCdrZXlVcCcsIHNjLCBjYik7XG4vLyB9XG5cbmZ1bmN0aW9uIG1ha2VLZXlEb3duTWF0Y2hlciAoc2MsIGNiKSB7XG4gIHJldHVybiBtYWtlS2V5TWF0Y2hlcigna2V5RG93bicsIHNjLCBjYik7XG59XG5cbmZ1bmN0aW9uIG1ha2VLZXlNYXRjaGVyICh0eXBlLCBzYywgY2IpIHtcbiAgbGV0IHBhcnRzID0gc2Muc3BsaXQoL1srLV0vKVxuICAgICwga2V5ID0gcGFydHMucG9wKCkudG9Mb3dlckNhc2UoKVxuICAgICwgbW9kaWZpZXJzID0ge1xuICAgICAgICBzaGlmdDogZmFsc2UsXG4gICAgICAgIGNvbnRyb2w6IGZhbHNlLFxuICAgICAgICBtZXRhOiBmYWxzZSxcbiAgICAgICAgYWx0OiBmYWxzZSxcbiAgICAgIH1cbiAgO1xuICBwYXJ0cy5mb3JFYWNoKHAgPT4ge1xuICAgIHAgPSBwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHAgPT09ICdjdHJsJykgcCA9ICdjb250cm9sJztcbiAgICBpZiAocCA9PT0gJ2NtZCcpIHAgPSAnbWV0YSc7XG4gICAgaWYgKHR5cGVvZiBtb2RpZmllcnNbcF0gIT09ICdib29sZWFuJykgY29uc29sZS53YXJuKGBVbmtub3duIGNvbW1hbmQgbW9kaWZpZXIgJHtwfS5gKTtcbiAgICBtb2RpZmllcnNbcF0gPSB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIChldnQsIGlucHV0KSA9PiB7XG4gICAgaWYgKHR5cGUgIT09IGlucHV0LnR5cGUpIHJldHVybjtcbiAgICBpZiAoa2V5ICE9PSBpbnB1dC5rZXkpIHJldHVybjtcbiAgICBsZXQgYmFkTW9kID0gZmFsc2U7XG4gICAgT2JqZWN0LmtleXMobW9kaWZpZXJzKS5mb3JFYWNoKG1vZCA9PiB7XG4gICAgICBpZiAoaW5wdXRbbW9kXSAhPT0gbW9kaWZpZXJzW21vZF0pIGJhZE1vZCA9IHRydWU7XG4gICAgfSk7XG4gICAgaWYgKGJhZE1vZCkgcmV0dXJuO1xuICAgIGNiKCk7XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=