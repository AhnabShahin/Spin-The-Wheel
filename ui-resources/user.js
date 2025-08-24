/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/components/FrontendApp.jsx":
/*!*************************************************!*\
  !*** ./src/frontend/components/FrontendApp.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/alert/index.js");
/* harmony import */ var _providers_WheelProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/WheelProvider */ "./src/frontend/providers/WheelProvider.jsx");
/* harmony import */ var _providers_AnalyticsProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../providers/AnalyticsProvider */ "./src/frontend/providers/AnalyticsProvider.jsx");





const {
  Title,
  Paragraph
} = antd__WEBPACK_IMPORTED_MODULE_4__["default"];
const FrontendApp = () => {
  const {
    wheelData,
    isSpinning,
    result,
    spinWheel
  } = (0,_providers_WheelProvider__WEBPACK_IMPORTED_MODULE_2__.useWheel)();
  const {
    trackSpin
  } = (0,_providers_AnalyticsProvider__WEBPACK_IMPORTED_MODULE_3__.useAnalytics)();
  const [hasSpun, setHasSpun] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const handleSpin = () => {
    const sampleWheelData = {
      data: [{
        option: 'Prize 1',
        style: {
          backgroundColor: '#ff8f43',
          textColor: '#ffffff'
        }
      }, {
        option: 'Prize 2',
        style: {
          backgroundColor: '#70bbe0',
          textColor: '#ffffff'
        }
      }, {
        option: 'Prize 3',
        style: {
          backgroundColor: '#0b7ec8',
          textColor: '#ffffff'
        }
      }, {
        option: 'Prize 4',
        style: {
          backgroundColor: '#ffd23f',
          textColor: '#000000'
        }
      }]
    };
    spinWheel(sampleWheelData);
    setHasSpun(true);

    // Track analytics
    trackSpin('wheel_started');
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "stw-wheel-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    direction: "vertical",
    size: "large",
    style: {
      width: '100%',
      textAlign: 'center'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 2
  }, "\uD83C\uDFAF Spin The Wheel"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, "Welcome to the optimized Spin The Wheel! This new version includes enhanced performance, better animations, and improved user experience.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "stw-wheel-wrapper",
    style: {
      width: '300px',
      height: '300px',
      margin: '0 auto',
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '5px solid #000'
    }
  }, isSpinning ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      animation: 'spin 3s ease-out'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 3
  }, "\uD83C\uDFAA Spinning...")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 3
  }, "\uD83C\uDFAF Ready to Spin!")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    direction: "vertical",
    style: {
      marginTop: '20px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    type: "primary",
    size: "large",
    loading: isSpinning,
    onClick: handleSpin,
    disabled: isSpinning
  }, isSpinning ? 'Spinning...' : 'Spin the Wheel!'), result && hasSpun && !isSpinning && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: "Congratulations!",
    description: `You won: ${result.option}`,
    type: "success",
    showIcon: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 3
  }, "New Features"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    direction: "vertical"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2728 Smooth animations and transitions"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\uD83D\uDCF1 Mobile-responsive design"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\uD83C\uDFA8 Customizable themes and colors"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\uD83D\uDCCA Analytics tracking (if enabled)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\uD83D\uDD27 Better error handling")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", {
    jsx: true
  }, `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(1080deg); }
                }
            `));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FrontendApp);

/***/ }),

/***/ "./src/frontend/index.jsx":
/*!********************************!*\
  !*** ./src/frontend/index.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var antd_dist_reset_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/dist/reset.css */ "./node_modules/antd/dist/reset.css");
/* harmony import */ var _components_FrontendApp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FrontendApp */ "./src/frontend/components/FrontendApp.jsx");
/* harmony import */ var _shared_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/ErrorBoundary */ "./src/shared/components/ErrorBoundary.jsx");
/* harmony import */ var _providers_WheelProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./providers/WheelProvider */ "./src/frontend/providers/WheelProvider.jsx");
/* harmony import */ var _providers_AnalyticsProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./providers/AnalyticsProvider */ "./src/frontend/providers/AnalyticsProvider.jsx");
/* harmony import */ var _shared_config_themeConfig_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/config/themeConfig.json */ "./src/shared/config/themeConfig.json");











// Initialize frontend app
const container = document.getElementById('spin-the-wheel-user');
if (container) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.StrictMode, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__.ErrorBoundary, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    theme: _shared_config_themeConfig_json__WEBPACK_IMPORTED_MODULE_7__
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_providers_AnalyticsProvider__WEBPACK_IMPORTED_MODULE_6__.AnalyticsProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_providers_WheelProvider__WEBPACK_IMPORTED_MODULE_5__.WheelProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_FrontendApp__WEBPACK_IMPORTED_MODULE_3__["default"], null)))))));
}

/***/ }),

/***/ "./src/frontend/providers/AnalyticsProvider.jsx":
/*!******************************************************!*\
  !*** ./src/frontend/providers/AnalyticsProvider.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsProvider: () => (/* binding */ AnalyticsProvider),
/* harmony export */   useAnalytics: () => (/* binding */ useAnalytics)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



// Analytics Context
const AnalyticsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const AnalyticsProvider = ({
  children
}) => {
  const trackEvent = (eventName, eventData) => {
    if (window.stwData?.config?.enable_analytics) {
      // Track event logic here
      console.log('Analytics Event:', eventName, eventData);
    }
  };
  const trackSpin = result => {
    trackEvent('wheel_spin', {
      result: result,
      timestamp: new Date().toISOString()
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(AnalyticsContext.Provider, {
    value: {
      trackEvent,
      trackSpin
    }
  }, children);
};
const useAnalytics = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

/***/ }),

/***/ "./src/frontend/providers/WheelProvider.jsx":
/*!**************************************************!*\
  !*** ./src/frontend/providers/WheelProvider.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WheelProvider: () => (/* binding */ WheelProvider),
/* harmony export */   useWheel: () => (/* binding */ useWheel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



// Wheel Context
const WheelContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const WheelProvider = ({
  children
}) => {
  const [wheelData, setWheelData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [isSpinning, setIsSpinning] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [result, setResult] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const spinWheel = async wheelConfig => {
    setIsSpinning(true);
    // Simulate spinning animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wheelConfig.data.length);
      setResult(wheelConfig.data[randomIndex]);
      setIsSpinning(false);
    }, 3000);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WheelContext.Provider, {
    value: {
      wheelData,
      setWheelData,
      isSpinning,
      result,
      spinWheel
    }
  }, children);
};
const useWheel = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(WheelContext);
  if (!context) {
    throw new Error('useWheel must be used within WheelProvider');
  }
  return context;
};

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"user": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkspin_the_wheel"] = globalThis["webpackChunkspin_the_wheel"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors","shared"], () => (__webpack_require__("./src/frontend/index.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;