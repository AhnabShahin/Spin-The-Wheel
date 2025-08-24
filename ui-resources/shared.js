"use strict";
(globalThis["webpackChunkspin_the_wheel"] = globalThis["webpackChunkspin_the_wheel"] || []).push([["shared"],{

/***/ "./src/shared/components/ErrorBoundary.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/ErrorBoundary.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorBoundary: () => (/* binding */ ErrorBoundary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Error Boundary Component
 * Catches JavaScript errors and displays fallback UI
 */
class ErrorBoundary extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (true) {
      console.error('STW Error Boundary caught an error:', error, errorInfo);
    }

    // Send error to analytics if available
    if (window.stwData?.config?.enable_error_tracking) {
      this.logError(error, errorInfo);
    }
  }
  logError = async (error, errorInfo) => {
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      // Send to WordPress REST API
      await fetch(`${window.stwData?.rest_url}stw/v1/error-log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.stwData?.rest_nonce
        },
        body: JSON.stringify(errorData)
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };
  render() {
    if (this.state.hasError) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "stw-error-boundary"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "stw-error-content"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Oops! Something went wrong"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "stw-error-actions"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        onClick: this.handleRetry,
        className: "button button-primary"
      }, "Try Again"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        onClick: () => window.location.reload(),
        className: "button"
      }, "Refresh Page")),  true && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("details", {
        className: "stw-error-details"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("summary", null, "Error Details (Development)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, this.state.error && this.state.error.toString()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, this.state.errorInfo.componentStack))));
    }
    return this.props.children;
  }
}

/***/ }),

/***/ "./src/shared/config/themeConfig.json":
/*!********************************************!*\
  !*** ./src/shared/config/themeConfig.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"token":{"colorPrimary":"#5148ea","colorSuccess":"#4bc210","colorWarning":"#fdaa08","colorError":"#fc4143","colorTextBase":"#191822","fontSizeHeading1":40,"lineHeightHeading1":1.15,"fontSizeHeading2":28,"fontSizeHeading3":20,"fontSizeHeading4":16,"fontSizeHeading5":14,"lineHeightHeading2":1.24,"lineHeightHeading3":1.4,"lineHeightHeading4":1.5,"lineHeightHeading5":1.571,"lineHeight":1.414,"wireframe":false,"colorTextSecondary":"rgba(87, 87, 90, 1)","fontFamily":"\'Inter\', sans-serif;","colorPrimaryHover":"#625aec","colorInfo":"#5148ea","colorPrimaryActive":"#625aec"},"components":{"Typography":{"fontFamilyCode":"\'Inter\';"},"Message":{"zIndexPopup":9999999},"Avatar":{"groupBorderColor":"#BFBFBF"},"Button":{"colorTextDisabled":"rgb(208,213,221)","colorBgContainerDisabled":"rgb(255,255,255)","borderColorDisabled":"rgb(234,236,240)","paddingInline":24,"paddingInlineLG":24,"primaryShadow":"none","defaultShadow":"none"},"Radio":{"wireframe":true,"radioSize":20,"fontSize":16,"fontSizeLG":18,"fontFamily":"Inter","colorText":"rgb(52,64,84)","borderRadius":8,"buttonSolidCheckedBg":"rgb(244,238,255)","buttonSolidCheckedColor":"rgb(81,72,234)","buttonSolidCheckedHoverBg":"rgba(244,238,255,0.71)","buttonSolidCheckedActiveBg":"rgb(244,238,255)","buttonBg":"rgb(243,243,243)","buttonColor":"rgb(100,116,139)"},"Select":{"controlItemBgActive":"#F4F4F7","colorBorder":"#D9D9D9","colorIcon":"#263043","controlPaddingHorizontalSM":8,"controlOutlineWidth":2,"controlPaddingHorizontal":24,"lineWidth":1,"fontFamily":"\'Inter\'","multipleItemBg":"rgba(255,255,255,0)","fontSize":16,"multipleItemBorderColor":"rgb(208,213,221)","borderRadius":8,"colorTextPlaceholder":"rgb(146,157,178)"},"Input":{"fontFamily":"Inter","colorBgContainer":"transparent","hoverBorderColor":"rgb(81, 72, 234)","activeShadow":"0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #ECEBFF","colorBorder":"rgb(208,213,221)","colorTextPlaceholder":"rgb(146,157,178)","inputFontSizeSM":12,"paddingInline":12,"paddingInlineLG":12,"borderRadius":8},"InputNumber":{"fontFamily":"Inter","borderRadius":8,"inputFontSizeSM":12},"Checkbox":{"controlInteractiveSize":20,"fontFamily":"Inter","fontSize":16,"fontSizeLG":18,"colorText":"rgb(52,64,84)"},"Tabs":{"titleFontSize":12,"titleFontSizeSM":10,"titleFontSizeLG":14,"inkBarColor":"#5148EA","horizontalMargin":"0 0 24px 0","horizontalItemGutter":30,"horizontalItemMargin":"","horizontalItemPadding":"20px 0","verticalItemMargin":"16px 0 0 0","verticalItemPadding":"8px 24px","itemSelectedColor":"#5148EA","itemColor":"#191822","itemHoverColor":"#5148EA","borderRadius":4,"colorBgContainer":"#ffffff"},"Breadcrumb":{"itemColor":"rgba(147, 147, 151, 1)","lastItemColor":"rgba(25, 24, 34, 1)"},"Tag":{"marginXS":0},"Form":{"layout":"vertical","fontFamily":"\'Inter\', sans-serif;","screenXSMax":320,"verticalLabelPadding":"0 0 2px","itemMarginBottom":10},"Slider":{"trackBg":"rgb(81, 72, 234)","handleColor":"rgb(81, 72, 234)","handleActiveColor":"rgb(98, 90, 236)","trackHoverBg":"rgb(98, 90, 236)","dotActiveBorderColor":"rgb(98, 90, 236)","colorPrimaryBorderHover":"rgb(98, 90, 236)"},"Menu":{"fontSize":14,"itemSelectedBg":"#5148EA","itemSelectedColor":"#5148EA","motionDurationSlow":"0","itemHoverBg":"rgb(244, 244, 247)","itemActiveBg":"rgb(244, 244, 247)","itemBorderRadius":4,"borderRadius":4,"lineWidth":1,"iconMarginInlineEnd":9,"subMenuItemBg":"rgb(255, 255, 255)","groupTitleColor":"rgba(0, 0, 0, 0.65)","itemMarginBlock":2},"Drawer":{"colorBgMask":"rgba(16, 16, 22, 0.4)","zIndexPopup":2040},"Collapse":{"motionDurationMid":"0.4s","headerBg":"rgb(239,242,252)"},"Pagination":{"colorText":"rgb(25, 24, 34)","borderRadius":74,"colorPrimaryHover":"rgb(255, 255, 255)","fontWeightStrong":500,"colorTextDisabled":"rgb(185, 185, 188)","itemActiveBg":"rgb(81,72,234)","itemBg":"rgba(230,52,52,0)","colorPrimary":"rgb(255,255,255)","borderRadiusLG":74,"borderRadiusSM":74,"fontSize":12,"controlHeight":24},"Upload":{"motionDurationSlow":"0"},"Divider":{"colorSplit":"rgb(229, 229, 234)","margin":0,"marginLG":0,"marginXS":0},"Tooltip":{"zIndexPopupBase":9999999,"motionDurationFast":"0.3s"},"Switch":{"colorTextQuaternary":"rgb(201, 199, 216)","colorTextTertiary":"rgb(186, 185, 197)"},"Notification":{"zIndexPopup":99999,"placement":"bottomRight","duration":4.5},"Modal":{"zIndexPopupBase":9999,"colorBgMask":"rgba(0, 0, 0, 0.85)"},"Table":{"headerBg":"#EEF2FE","headerSortActiveBg":"rgb(247,247,247)","colorText":"rgb(25,24,34)","borderColor":"#DCE1F0","borderRadius":16,"headerBorderRadius":16},"Segmented":{"borderRadius":4,"itemSelectedBg":"#57575A","itemSelectedColor":"#FFFFFF","trackBg":"#F7F7FA !important","fontSize":15,"fontFamily":"Roboto","itemColor":"#57575A"},"DatePicker":{"fontSize":16,"colorTextPlaceholder":"rgb(146,157,178)","fontWeightStrong":400,"inputFontSizeSM":12,"borderRadius":8}}}');

/***/ })

}]);