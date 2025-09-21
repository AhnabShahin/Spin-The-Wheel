/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/AdminApp.jsx":
/*!*******************************************!*\
  !*** ./src/admin/components/AdminApp.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DashboardOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/BgColorsOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DatabaseOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/BarChartOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/SettingOutlined.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/layout/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/menu/index.js");
/* harmony import */ var _Roulette_CustomRouletteList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Roulette/CustomRouletteList */ "./src/admin/components/Roulette/CustomRouletteList.jsx");
/* harmony import */ var _Settings_SettingsManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings/SettingsManager */ "./src/admin/components/Settings/SettingsManager.jsx");
/* harmony import */ var _WheelDataManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WheelDataManager */ "./src/admin/components/WheelDataManager.jsx");







const {
  Title,
  Paragraph
} = antd__WEBPACK_IMPORTED_MODULE_5__["default"];
const {
  Sider,
  Content
} = antd__WEBPACK_IMPORTED_MODULE_6__["default"];
const AdminApp = () => {
  // Get initial tab from localStorage or default to 'dashboard'
  const getInitialTab = () => {
    try {
      return localStorage.getItem('spinTheWheelAdminTab') || 'dashboard';
    } catch (error) {
      return 'dashboard';
    }
  };
  const [currentTab, setCurrentTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(getInitialTab);

  // Persist tab changes to localStorage
  const handleTabChange = newTab => {
    setCurrentTab(newTab);
    try {
      localStorage.setItem('spinTheWheelAdminTab', newTab);
    } catch (error) {
      console.warn('Could not save tab state to localStorage:', error);
    }
  };

  // Listen for storage changes (if multiple tabs are open)
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleStorageChange = e => {
      if (e.key === 'spinTheWheelAdminTab' && e.newValue) {
        setCurrentTab(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const menuItems = [{
    key: 'dashboard',
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__["default"], null),
    label: 'Dashboard'
  }, {
    key: 'themes',
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__["default"], null),
    label: 'Theme Manager'
  }, {
    key: 'wheels',
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__["default"], null),
    label: 'Wheel Data'
  }, {
    key: 'analytics',
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__["default"], null),
    label: 'Analytics'
  }, {
    key: 'settings',
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_11__["default"], null),
    label: 'Settings'
  }];
  const renderContent = () => {
    switch (currentTab) {
      case 'themes':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Roulette_CustomRouletteList__WEBPACK_IMPORTED_MODULE_2__["default"], null);
      case 'wheels':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WheelDataManager__WEBPACK_IMPORTED_MODULE_4__["default"], null);
      case 'settings':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Settings_SettingsManager__WEBPACK_IMPORTED_MODULE_3__["default"], null);
      case 'analytics':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
          level: 3
        }, "Analytics Dashboard"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, "Analytics dashboard will show spin statistics, popular prizes, user engagement metrics, and more."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            padding: 40,
            background: '#f5f5f5',
            borderRadius: 8,
            textAlign: 'center'
          }
        }, "\uD83D\uDCCA Analytics charts and data visualization will be implemented here"));
      default:
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], {
          direction: "vertical",
          size: "large",
          style: {
            width: '100%'
          }
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
          level: 2
        }, "\uD83C\uDFAF Spin The Wheel - Admin Dashboard"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, "Welcome to the Spin The Wheel plugin administration panel. Create and manage wheel themes, configure wheel data, view analytics, and adjust settings.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
          level: 3
        }, "Quick Actions"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], {
          wrap: true,
          size: "large"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
          type: "primary",
          size: "large",
          onClick: () => handleTabChange('themes')
        }, "\uD83C\uDFA8 Manage Themes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
          size: "large",
          onClick: () => handleTabChange('wheels')
        }, "\uD83C\uDFAA Create Wheel Data"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
          size: "large",
          onClick: () => handleTabChange('analytics')
        }, "\uD83D\uDCCA View Analytics"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
          size: "large",
          onClick: () => handleTabChange('settings')
        }, "\u2699\uFE0F Settings"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
          level: 3
        }, "Plugin Status"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], {
          direction: "vertical"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 Plugin successfully reorganized and optimized"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 Modern React architecture implemented"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 PHP classes restructured with PSR-4 autoloading"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 Caching and performance optimizations enabled"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 Error boundaries and logging configured"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 Theme management system ready"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "\u2705 Wheel data management available"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
          level: 3
        }, "Getting Started"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "1. Create a Theme:"), " Go to Theme Manager to create custom wheel themes with colors, fonts, and styling."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "2. Set Up Wheel Data:"), " Use Wheel Data manager to define wheel segments and prizes."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "3. Configure Settings:"), " Adjust plugin behavior, limits, and preferences."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Paragraph, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "4. Monitor Analytics:"), " Track user engagement and spin results.")));
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    style: {
      minHeight: '70vh',
      background: 'transparent'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Sider, {
    width: 250,
    style: {
      background: '#fff',
      borderRight: '1px solid #f0f0f0',
      borderRadius: '8px 0 0 8px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '16px',
      borderBottom: '1px solid #f0f0f0'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 4,
    style: {
      margin: 0,
      textAlign: 'center'
    }
  }, "\uD83C\uDFAF Spin The Wheel")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_15__["default"], {
    mode: "inline",
    selectedKeys: [currentTab],
    items: menuItems,
    onClick: ({
      key
    }) => handleTabChange(key),
    style: {
      borderRight: 0
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Content, {
    style: {
      padding: '24px',
      background: '#fff',
      borderRadius: '0 8px 8px 0'
    }
  }, renderContent())), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", {
    jsx: true,
    global: true
  }, `
                .ant-menu-item-selected {
                    background-color: #5148ea !important;
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected .ant-menu-title-content {
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected .anticon {
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected::after {
                    border-right-color: #5148ea !important;
                }
                
                .ant-menu-item-selected:hover {
                    background-color: #6f5ef7 !important;
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected:hover .ant-menu-title-content {
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected:hover .anticon {
                    color: #ffffff !important;
                }
            `));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminApp);

/***/ }),

/***/ "./src/admin/components/Roulette/CustomRouletteForm.jsx":
/*!**************************************************************!*\
  !*** ./src/admin/components/Roulette/CustomRouletteForm.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/collapse/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/message/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/color-picker/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input-number/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/switch/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/select/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);




const {
  Panel
} = antd__WEBPACK_IMPORTED_MODULE_1__["default"];
const CustomRouletteForm = ({
  form,
  handleSubmit,
  handleFormValuesChange
}) => {
  const handleSliceAdd = () => {
    const slices = form.getFieldValue("slices") || [];
    const newSlices = [...slices, {
      option: "",
      image: {
        uri: "",
        offsetX: 0,
        offsetY: 0,
        sizeMultiplier: 1,
        landscape: false
      },
      style: {
        backgroundColor: "#ff8f43",
        textColor: "#ffffff",
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: 400,
        fontStyle: "normal"
      },
      optionSize: 1,
      couponId: ""
    }];
    form.setFieldsValue({
      slices: newSlices
    });
  };
  const handleSliceRemove = index => {
    const slices = form.getFieldValue("slices") || [];
    if (slices.length <= 1) {
      antd__WEBPACK_IMPORTED_MODULE_2__["default"].warning("At least one slice is required");
      return;
    }
    const newSlices = slices.filter((_, i) => i !== index);
    form.setFieldsValue({
      slices: newSlices
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"], {
    form: form,
    layout: "vertical",
    onFinish: handleSubmit,
    onValuesChange: (changedValues, allValues) => {
      if (typeof handleFormValuesChange === "function") {
        handleFormValuesChange(changedValues, allValues);
      }
    },
    initialValues: {
      slices: [{
        option: "",
        image: {
          uri: "",
          offsetX: 0,
          offsetY: 0,
          sizeMultiplier: 1,
          landscape: false
        },
        style: {
          backgroundColor: "#ff8f43",
          textColor: "#ffffff",
          fontFamily: "Arial",
          fontSize: 16,
          fontWeight: 400,
          fontStyle: "normal"
        },
        optionSize: 1,
        couponId: ""
      }],
      mustStartSpinning: false,
      prizeNumber: 0,
      outerBorderColor: "#000000",
      outerBorderWidth: 5,
      innerRadius: 0,
      innerBorderColor: "#000000",
      innerBorderWidth: 0,
      radiusLineColor: "#000000",
      radiusLineWidth: 5,
      fontFamily: "Arial",
      fontSize: 20,
      fontWeight: 400,
      fontStyle: "normal",
      perpendicularText: false,
      textDistance: 60,
      spinDuration: 1000,
      startingOptionIndex: 0,
      disableInitialAnimation: false
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Basic Information",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "name",
    label: "Roulette Name",
    rules: [{
      required: true,
      message: "Please enter a roulette name"
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    placeholder: "Enter roulette name"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "description",
    label: "Description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    placeholder: "Enter description"
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Wheel Slices",
    style: {
      marginBottom: 16
    },
    extra: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
      type: "primary",
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__["default"], null),
      onClick: handleSliceAdd
    }, "Add Slice")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].List, {
    name: "slices"
  }, (fields, {
    add,
    remove
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, fields.map((field, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: field.key,
    size: "small",
    title: `Slice ${index + 1}`,
    style: {
      marginBottom: 16
    },
    extra: fields.length > 1 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
      type: "text",
      danger: true,
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__["default"], null),
      onClick: () => {
        remove(field.name);
        handleSliceRemove(index);
      }
    }) : null
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "option"],
    label: "Slice Text",
    rules: [{
      required: true,
      message: "Please enter slice text"
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    placeholder: "Enter slice text"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "style", "backgroundColor"],
    label: "Background Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    },
    presets: [{
      label: "Recommended",
      colors: ["#ff8f43", "#70bbe0", "#0b7ec8", "#ffd23f", "#e74c3c", "#f39c12", "#9b59b6", "#2ecc71"]
    }]
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "style", "textColor"],
    label: "Text Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    },
    presets: [{
      label: "Common",
      colors: ["#ffffff", "#000000", "#333333", "#666666", "#999999", "#cccccc", "#ff0000", "#00ff00"]
    }]
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ghost: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    header: "Advanced Slice Settings",
    key: "1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "image", "uri"],
    label: "Image URL"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    placeholder: "Enter image URL"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "optionSize"],
    label: "Option Size"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0.1,
    max: 10,
    step: 0.1,
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "couponId"],
    label: "Coupon ID"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    placeholder: "Coupon ID"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "image", "offsetX"],
    label: "Image Offset X"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "image", "offsetY"],
    label: "Image Offset Y"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "image", "sizeMultiplier"],
    label: "Image Size"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0.1,
    max: 5,
    step: 0.1,
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "image", "landscape"],
    label: "Landscape",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], null)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "style", "fontFamily"],
    label: "Font Family"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
    placeholder: "Select font family"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Arial"
  }, "Arial"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Helvetica"
  }, "Helvetica"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Times New Roman"
  }, "Times New Roman"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Georgia"
  }, "Georgia"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Verdana"
  }, "Verdana")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "style", "fontSize"],
    label: "Font Size"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 8,
    max: 48,
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: [field.name, "style", "fontWeight"],
    label: "Font Weight"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
    placeholder: "Select font weight"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 100
  }, "100 - Thin"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 200
  }, "200 - Extra Light"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 300
  }, "300 - Light"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 400
  }, "400 - Normal"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 500
  }, "500 - Medium"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 600
  }, "600 - Semi Bold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 700
  }, "700 - Bold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 800
  }, "800 - Extra Bold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 900
  }, "900 - Black")))))))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Wheel Configuration",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "prizeNumber",
    label: "Prize Number",
    rules: [{
      required: true,
      message: "Please enter prize number"
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0,
    placeholder: "Prize index",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "startingOptionIndex",
    label: "Starting Option Index"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0,
    placeholder: "Starting index",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "spinDuration",
    label: "Spin Duration (ms)"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 1000,
    max: 10000,
    placeholder: "Duration",
    style: {
      width: "100%"
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "mustStartSpinning",
    label: "Must Start Spinning",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "disableInitialAnimation",
    label: "Disable Initial Animation",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], null))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Appearance Configuration",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_1__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    header: "Border Settings",
    key: "borders"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "outerBorderColor",
    label: "Outer Border Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "outerBorderWidth",
    label: "Outer Border Width"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0,
    max: 20,
    placeholder: "Width in pixels",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "innerRadius",
    label: "Inner Radius"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0,
    placeholder: "Radius in pixels",
    style: {
      width: "100%"
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "innerBorderColor",
    label: "Inner Border Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "innerBorderWidth",
    label: "Inner Border Width"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0,
    max: 20,
    placeholder: "Width in pixels",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "radiusLineWidth",
    label: "Radius Line Width"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 0,
    max: 20,
    placeholder: "Width in pixels",
    style: {
      width: "100%"
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "radiusLineColor",
    label: "Radius Line Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    }
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    header: "Typography Settings",
    key: "typography"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "fontFamily",
    label: "Font Family"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
    placeholder: "Select font family"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Arial"
  }, "Arial"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Helvetica"
  }, "Helvetica"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Times New Roman"
  }, "Times New Roman"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Georgia"
  }, "Georgia"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "Verdana"
  }, "Verdana")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "fontSize",
    label: "Font Size"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 8,
    max: 48,
    placeholder: "Size in pixels",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "fontWeight",
    label: "Font Weight"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
    placeholder: "Select font weight"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 100
  }, "100 - Thin"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 200
  }, "200 - Extra Light"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 300
  }, "300 - Light"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 400
  }, "400 - Normal"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 500
  }, "500 - Medium"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 600
  }, "600 - Semi Bold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 700
  }, "700 - Bold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 800
  }, "800 - Extra Bold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: 900
  }, "900 - Black"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "fontStyle",
    label: "Font Style"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
    placeholder: "Select font style"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "normal"
  }, "Normal"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "italic"
  }, "Italic"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"].Option, {
    value: "oblique"
  }, "Oblique")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "textDistance",
    label: "Text Distance"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    min: 10,
    max: 200,
    placeholder: "Distance in pixels",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "perpendicularText",
    label: "Perpendicular Text",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_13__["default"], null))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    header: "Pointer Settings",
    key: "pointer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"].Item, {
    name: "pointerImageSource",
    label: "Pointer Image URL"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    placeholder: "Enter pointer image URL",
    style: {
      width: "100%"
    }
  }))))));
};
CustomRouletteForm.propTypes = {
  form: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object).isRequired,
  handleSubmit: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func).isRequired,
  handleFormValuesChange: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomRouletteForm);

/***/ }),

/***/ "./src/admin/components/Roulette/CustomRouletteList.jsx":
/*!**************************************************************!*\
  !*** ./src/admin/components/Roulette/CustomRouletteList.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/EditOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/notification/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/table/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/drawer/index.js");
/* harmony import */ var _CustomRouletteManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomRouletteManager */ "./src/admin/components/Roulette/CustomRouletteManager.jsx");






// Enhanced UI/UX with Drawer for full-screen editing

const {
  Title
} = antd__WEBPACK_IMPORTED_MODULE_2__["default"];
const CustomRouletteList = () => {
  const [roulettes, setRoulettes] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isDrawerVisible, setIsDrawerVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedRoulette, setSelectedRoulette] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchRoulettes();
  }, []);
  const fetchRoulettes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/roulettes');
      const data = await response.json();
      setRoulettes(data);
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = () => {
    setSelectedRoulette(null);
    setIsDrawerVisible(true);
  };
  const handleEdit = roulette => {
    setSelectedRoulette(roulette);
    setIsDrawerVisible(true);
  };
  const handleDelete = id => {
    Modal.confirm({
      title: 'Are you sure you want to delete this roulette?',
      onOk: async () => {
        try {
          await fetch(`/api/roulettes/${id}`, {
            method: 'DELETE'
          });
          antd__WEBPACK_IMPORTED_MODULE_3__["default"].success({
            message: 'Deleted',
            description: 'Roulette deleted successfully.'
          });
          fetchRoulettes();
        } catch {
          antd__WEBPACK_IMPORTED_MODULE_3__["default"].error({
            message: 'Error',
            description: 'Failed to delete roulette.'
          });
        }
      }
    });
  };
  const handleSave = async newRoulette => {
    try {
      if (selectedRoulette) {
        // Update existing roulette
        await fetch(`/api/roulettes/${selectedRoulette.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRoulette)
        });
        antd__WEBPACK_IMPORTED_MODULE_3__["default"].success({
          message: 'Updated',
          description: 'Roulette updated successfully.'
        });
      } else {
        // Add new roulette
        await fetch('/api/roulettes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRoulette)
        });
        antd__WEBPACK_IMPORTED_MODULE_3__["default"].success({
          message: 'Created',
          description: 'Roulette created successfully.'
        });
      }
      fetchRoulettes();
      setIsDrawerVisible(false);
    } catch {
      antd__WEBPACK_IMPORTED_MODULE_3__["default"].error({
        message: 'Error',
        description: 'Failed to save roulette.'
      });
    }
  };
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  }, {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["default"], null),
      onClick: () => handleEdit(record)
    }, "Edit"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__["default"], null),
      danger: true,
      onClick: () => handleDelete(record.id)
    }, "Delete"))
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: 24,
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    justify: "space-between",
    align: "middle",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 3,
    style: {
      margin: 0
    }
  }, "Custom Roulette List")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "primary",
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__["default"], null),
    onClick: handleCreate
  }, "Create New Roulette"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
    columns: columns,
    dataSource: roulettes,
    rowKey: "id",
    loading: loading,
    pagination: {
      pageSize: 10
    },
    bordered: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    title: selectedRoulette ? 'Edit Roulette' : 'Create Roulette',
    visible: isDrawerVisible,
    onClose: () => setIsDrawerVisible(false),
    width: "100%",
    zIndex: 99999 // Ensures the drawer is always on top
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomRouletteManager__WEBPACK_IMPORTED_MODULE_1__["default"], {
    roulette: selectedRoulette,
    onSave: handleSave,
    onCancel: () => setIsDrawerVisible(false)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomRouletteList);

/***/ }),

/***/ "./src/admin/components/Roulette/CustomRouletteManager.jsx":
/*!*****************************************************************!*\
  !*** ./src/admin/components/Roulette/CustomRouletteManager.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/message/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var _CustomRouletteForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomRouletteForm */ "./src/admin/components/Roulette/CustomRouletteForm.jsx");
/* harmony import */ var _PreviewCustomRoulette__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PreviewCustomRoulette */ "./src/admin/components/Roulette/PreviewCustomRoulette.jsx");





const CustomRouletteManager = () => {
  const [form] = antd__WEBPACK_IMPORTED_MODULE_4__["default"].useForm();
  const [formData, setFormData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [isSubmitting, setIsSubmitting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  const handleSubmit = async values => {
    setIsSubmitting(true);
    try {
      // Make API call to save the roulette
      const response = await fetch('/wp-json/stw/v1/roulette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.stwAjax?.nonce || ''
        },
        body: JSON.stringify(values)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        antd__WEBPACK_IMPORTED_MODULE_5__["default"].success('Roulette saved successfully!');
        // Optionally redirect or update the form with the returned data
        console.log('Saved roulette:', result.data);
      } else {
        antd__WEBPACK_IMPORTED_MODULE_5__["default"].error(result.message || 'Failed to save roulette');
      }
    } catch (error) {
      console.error('Error saving roulette:', error);
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].error('An error occurred while saving the roulette');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '24px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
    gutter: 24
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    span: 14
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: "Roulette Configuration",
    style: {
      height: '100%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomRouletteForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
    form: form,
    handleSubmit: handleSubmit,
    handleFormValuesChange: handleFormValuesChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: 24,
      textAlign: 'right'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
    type: "primary",
    onClick: () => form.submit(),
    loading: isSubmitting,
    size: "large"
  }, "Save Roulette")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    span: 10
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: "Live Preview",
    style: {
      height: '100%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PreviewCustomRoulette__WEBPACK_IMPORTED_MODULE_3__["default"], {
    formData: formData
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomRouletteManager);

/***/ }),

/***/ "./src/admin/components/Roulette/PreviewCustomRoulette.css":
/*!*****************************************************************!*\
  !*** ./src/admin/components/Roulette/PreviewCustomRoulette.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/components/Roulette/PreviewCustomRoulette.jsx":
/*!*****************************************************************!*\
  !*** ./src/admin/components/Roulette/PreviewCustomRoulette.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_custom_roulette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-custom-roulette */ "./node_modules/react-custom-roulette/dist/bundle.js");
/* harmony import */ var react_custom_roulette__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_custom_roulette__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PreviewCustomRoulette_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PreviewCustomRoulette.css */ "./src/admin/components/Roulette/PreviewCustomRoulette.css");






const PreviewCustomRoulette = ({
  formData = {}
}) => {
  const [mustSpin, setMustSpin] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [prizeNumber, setPrizeNumber] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [wheelData, setWheelData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (formData?.slices && Array.isArray(formData.slices)) {
      const data = formData.slices.map((slice, index) => ({
        option: slice.option || `Item ${index + 1}`,
        style: {
          backgroundColor: slice.style?.backgroundColor || "#ff8f43",
          textColor: slice.style?.textColor || "#ffffff"
        }
      }));
      setWheelData(data);
    }
  }, [formData]);
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  if (!wheelData.length) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
      style: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, "Please add wheel slices to preview");
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "custom-roulette-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_custom_roulette__WEBPACK_IMPORTED_MODULE_2__.Wheel, {
    mustStartSpinning: mustSpin,
    prizeNumber: prizeNumber,
    data: wheelData,
    onStopSpinning: () => {
      setMustSpin(false);
    },
    outerBorderColor: formData?.outerBorderColor || "#000000",
    outerBorderWidth: formData?.outerBorderWidth || 5,
    innerBorderColor: formData?.innerBorderColor || "#000000",
    innerBorderWidth: formData?.innerBorderWidth || 3,
    radiusLineColor: formData?.radiusLineColor || "#000000",
    radiusLineWidth: formData?.radiusLineWidth || 2,
    fontSize: formData?.fontSize || 16,
    textDistance: formData?.textDistance || 60,
    spinDuration: formData?.spinDuration || 1.0
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: "20px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleSpinClick,
    disabled: mustSpin,
    style: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: mustSpin ? "not-allowed" : "pointer",
      backgroundColor: "#1890ff",
      color: "white",
      border: "none",
      borderRadius: "4px"
    }
  }, mustSpin ? "Spinning..." : "SPIN")));
};
PreviewCustomRoulette.propTypes = {
  formData: prop_types__WEBPACK_IMPORTED_MODULE_5___default().shape({
    slices: prop_types__WEBPACK_IMPORTED_MODULE_5___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_5___default().shape({
      option: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
      style: prop_types__WEBPACK_IMPORTED_MODULE_5___default().shape({
        backgroundColor: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
        textColor: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)
      })
    })),
    outerBorderColor: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    outerBorderWidth: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
    innerBorderColor: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    innerBorderWidth: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
    radiusLineColor: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    radiusLineWidth: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
    fontSize: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
    textDistance: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
    spinDuration: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number)
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreviewCustomRoulette);

/***/ }),

/***/ "./src/admin/components/Settings/SettingsManager.jsx":
/*!***********************************************************!*\
  !*** ./src/admin/components/Settings/SettingsManager.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/SaveOutlined.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/message/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/select/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input-number/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/divider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/switch/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var _shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/providers/ApiProvider */ "./src/shared/providers/ApiProvider.jsx");





const {
  Title,
  Text
} = antd__WEBPACK_IMPORTED_MODULE_3__["default"];
const SettingsManager = () => {
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [form] = antd__WEBPACK_IMPORTED_MODULE_4__["default"].useForm();
  const api = (0,_shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_2__.useApi)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadSettings();
  }, []);
  const loadSettings = async () => {
    setLoading(true);
    try {
      // Load default settings for now
      const defaultSettings = {
        enable_analytics: true,
        cache_enabled: true,
        max_spins_per_day: 10,
        default_theme: 'classic',
        show_congratulations: true,
        auto_hide_wheel: false,
        enable_sound_effects: true,
        spin_duration: 3000,
        wheel_size: 300,
        enable_mobile_responsive: true
      };
      form.setFieldsValue(defaultSettings);
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].error('Failed to load settings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async values => {
    setLoading(true);
    try {
      // await api.settings.updateSettings(values);
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].success('Settings saved successfully');
      console.log('Settings to save:', values);
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].error('Failed to save settings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 3
  }, "Plugin Settings"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    form: form,
    layout: "vertical",
    onFinish: handleSave,
    disabled: loading
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 4
  }, "General Settings"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "default_theme",
    label: "Default Theme",
    tooltip: "The default theme to use for new wheels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"].Option, {
    value: "classic"
  }, "Classic"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"].Option, {
    value: "modern"
  }, "Modern"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"].Option, {
    value: "colorful"
  }, "Colorful"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "wheel_size",
    label: "Default Wheel Size (px)",
    tooltip: "Default size for the wheel in pixels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    min: 200,
    max: 800,
    step: 50
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "spin_duration",
    label: "Spin Duration (ms)",
    tooltip: "How long the wheel spins in milliseconds"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    min: 1000,
    max: 10000,
    step: 500
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 4
  }, "User Experience"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "max_spins_per_day",
    label: "Max Spins Per Day",
    tooltip: "Maximum number of spins allowed per user per day (0 = unlimited)"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    min: 0,
    max: 100
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "show_congratulations",
    label: "Show Congratulations Message",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "auto_hide_wheel",
    label: "Auto Hide Wheel After Spin",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "enable_sound_effects",
    label: "Enable Sound Effects",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "enable_mobile_responsive",
    label: "Enable Mobile Responsive Design",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 4
  }, "Performance & Analytics"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "cache_enabled",
    label: "Enable Caching",
    tooltip: "Cache wheel data and themes for better performance",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "enable_analytics",
    label: "Enable Analytics",
    tooltip: "Track spin results and user interactions",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_11__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    type: "primary",
    htmlType: "submit",
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_13__["default"], null),
    loading: loading
  }, "Save Settings"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
    onClick: () => form.resetFields()
  }, "Reset to Defaults"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsManager);

/***/ }),

/***/ "./src/admin/components/WheelDataManager.jsx":
/*!***************************************************!*\
  !*** ./src/admin/components/WheelDataManager.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/EditOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/collapse/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/message/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/tag/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/popconfirm/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/table/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/modal/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/divider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/select/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/color-picker/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input-number/index.js");




const {
  Title
} = antd__WEBPACK_IMPORTED_MODULE_2__["default"];
const {
  Panel
} = antd__WEBPACK_IMPORTED_MODULE_3__["default"];
const WheelDataManager = () => {
  const [wheelData, setWheelData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [modalVisible, setModalVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [editingData, setEditingData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);

  // Get initial pagination state from localStorage
  const getInitialPagination = () => {
    try {
      const saved = localStorage.getItem('wheelDataManagerPagination');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          current: parsed.current || 1,
          pageSize: parsed.pageSize || 10,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        };
      }
    } catch (error) {
      console.warn('Could not restore pagination state:', error);
    }
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    };
  };
  const [pagination, setPagination] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(getInitialPagination);
  const [form] = antd__WEBPACK_IMPORTED_MODULE_4__["default"].useForm();

  // Save pagination state to localStorage
  const savePaginationState = paginationState => {
    try {
      localStorage.setItem('wheelDataManagerPagination', JSON.stringify({
        current: paginationState.current,
        pageSize: paginationState.pageSize
      }));
    } catch (error) {
      console.warn('Could not save pagination state:', error);
    }
  };

  // Helper function to convert color picker object to hex string
  const getColorValue = color => {
    if (typeof color === 'string') {
      return color;
    }
    if (color && color.metaColor && color.metaColor.r !== undefined) {
      const {
        r,
        g,
        b
      } = color.metaColor;
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return '#ff8f43'; // Default color
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const initialPagination = getInitialPagination();
    loadWheelData(initialPagination.current, initialPagination.pageSize);
  }, []);
  const loadWheelData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(`${window.stwAdminData.rest_url}/stw/v1/wheel/data?page=${page}&per_page=${pageSize}`);
      if (response.ok) {
        const responseData = await response.json();
        setWheelData(responseData.data);

        // Update pagination state with API response data
        setPagination(prev => {
          const newPaginationState = {
            ...prev,
            current: responseData.current_page,
            total: responseData.total,
            pageSize: responseData.per_page
          };

          // Save to localStorage
          savePaginationState(newPaginationState);
          return newPaginationState;
        });
      } else {
        throw new Error("Failed to fetch wheel data");
      }
    } catch (error) {
      console.error("API Error:", error);
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].error("Failed to load wheel data. Please try again.");
      setWheelData([]);
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = paginationInfo => {
    const {
      current,
      pageSize
    } = paginationInfo;

    // Save pagination state
    savePaginationState({
      current,
      pageSize
    });
    loadWheelData(current, pageSize);
  };
  const handleCreateData = () => {
    setEditingData(null);
    form.resetFields();
    form.setFieldsValue({
      name: "",
      data: [{
        option: "Prize 1",
        image: {
          uri: "",
          offsetX: 0,
          offsetY: 0,
          sizeMultiplier: 1,
          landscape: false
        },
        style: {
          backgroundColor: "#ff8f43",
          textColor: "#ffffff",
          fontFamily: "Arial",
          fontSize: 16,
          fontWeight: 400,
          fontStyle: "normal"
        },
        optionSize: 1
      }]
    });
    setModalVisible(true);
  };
  const handleEditData = data => {
    setEditingData(data);

    // Convert color objects to hex strings for form fields
    const formData = {
      ...data,
      data: data.data?.map(item => ({
        ...item,
        style: {
          ...item.style,
          backgroundColor: getColorValue(item.style?.backgroundColor),
          textColor: item.style?.textColor || "#ffffff"
        }
      })) || []
    };
    form.setFieldsValue(formData);
    setModalVisible(true);
  };
  const handleDeleteData = async dataId => {
    try {
      const response = await fetch(`${window.stwAdminData.rest_url}/stw/v1/wheel/data/${dataId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        antd__WEBPACK_IMPORTED_MODULE_5__["default"].success("Wheel data deleted successfully");
        // Reload the current page data
        loadWheelData(pagination.current, pagination.pageSize);
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].error("Failed to delete wheel data. Please try again.");
    }
  };
  const handleSubmit = async values => {
    try {
      const url = editingData ? `${window.stwAdminData.rest_url}/stw/v1/wheel/data/${editingData.id}` : `${window.stwAdminData.rest_url}/stw/v1/wheel/data`;
      const method = "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        const responseData = await response.json();
        if (editingData) {
          antd__WEBPACK_IMPORTED_MODULE_5__["default"].success("Wheel data updated successfully");
        } else {
          antd__WEBPACK_IMPORTED_MODULE_5__["default"].success("Wheel data created successfully");
        }

        // Reload the current page data
        loadWheelData(pagination.current, pagination.pageSize);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      antd__WEBPACK_IMPORTED_MODULE_5__["default"].error(`Failed to ${editingData ? 'update' : 'create'} wheel data. Please try again.`);
    }
    setModalVisible(false);
  };
  const columns = [{
    title: "Wheel Name",
    dataIndex: "name",
    key: "name",
    width: "25%"
  }, {
    title: "Prizes",
    dataIndex: "data",
    key: "data",
    width: "40%",
    render: data => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], {
      wrap: true,
      size: "small"
    }, Array.isArray(data) && data.slice(0, 3).map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
      key: index,
      color: getColorValue(item.style?.backgroundColor),
      style: {
        color: item.style?.textColor || "#fff",
        margin: "2px"
      }
    }, item.option)), Array.isArray(data) && data.length > 3 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
      color: "default"
    }, "+", data.length - 3))
  }, {
    title: "Total Prizes",
    dataIndex: "data",
    key: "count",
    width: "15%",
    render: data => Array.isArray(data) ? data.length : 0
  }, {
    title: "Created",
    dataIndex: "created_at",
    key: "created_at",
    width: "15%",
    render: date => date ? new Date(date).toLocaleDateString() : "-"
  }, {
    title: "Actions",
    key: "actions",
    width: "5%",
    render: (_, record) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
      type: "primary",
      size: "small",
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__["default"], null),
      onClick: () => handleEditData(record)
    }, "Edit"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: "Delete this wheel?",
      description: "This action cannot be undone.",
      onConfirm: () => handleDeleteData(record.id),
      okText: "Yes",
      cancelText: "No"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
      danger: true,
      size: "small",
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_11__["default"], null)
    }, "Delete")))
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 5,
    style: {
      margin: 0
    }
  }, "Wheel Data Management"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "primary",
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_13__["default"], null),
    onClick: handleCreateData
  }, "Create New Wheel")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], {
    columns: columns,
    dataSource: wheelData,
    loading: loading,
    rowKey: "id",
    pagination: pagination,
    onChange: handleTableChange
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_15__["default"], {
    title: editingData ? "Edit Wheel Data" : "Create New Wheel",
    open: modalVisible,
    onCancel: () => setModalVisible(false),
    onOk: () => form.submit(),
    width: 800,
    okText: editingData ? "Update" : "Create"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    form: form,
    layout: "vertical",
    onFinish: handleSubmit
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    name: "name",
    label: "Wheel Name",
    rules: [{
      required: true,
      message: "Please enter a wheel name"
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_16__["default"], {
    placeholder: "Enter wheel name"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_17__["default"], null, "Prize Configuration"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].List, {
    name: "data"
  }, (fields, {
    add,
    remove
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      background: "#fafafa",
      padding: "20px",
      borderRadius: "8px"
    }
  }, fields.map(({
    key,
    name,
    ...restField
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: key,
    style: {
      background: "#ffffff",
      padding: "20px",
      marginBottom: "16px",
      borderRadius: "8px",
      border: "1px solid #d9d9d9"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16,
    align: "middle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "option"],
    label: "Prize Name",
    rules: [{
      required: true,
      message: "Required!"
    }],
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_16__["default"], {
    placeholder: "Prize name"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 5
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "optionSize"],
    label: "Size",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], {
    placeholder: "Size",
    style: {
      width: "100%"
    },
    getPopupContainer: trigger => trigger.parentElement
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"].Option, {
    value: 1
  }, "One Slice"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"].Option, {
    value: 2
  }, "Two Slices"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"].Option, {
    value: 3
  }, "Three Slices")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 5
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "style", "backgroundColor"],
    label: "Background Color",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_21__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    },
    getPopupContainer: trigger => trigger.parentElement
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "text",
    danger: true,
    onClick: () => remove(name),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_11__["default"], null)
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ghost: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    header: "Advanced Settings",
    key: "1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "image", "uri"],
    label: "Image URL",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_16__["default"], {
    placeholder: "Image URL"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "image", "offsetX"],
    label: "X Offset",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    placeholder: "X",
    style: {
      width: "100%"
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 6
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "image", "offsetY"],
    label: "Y Offset",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    placeholder: "Y",
    style: {
      width: "100%"
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "style", "textColor"],
    label: "Text Color",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_21__["default"], {
    showText: true,
    format: "hex",
    style: {
      width: "100%"
    },
    getPopupContainer: trigger => trigger.parentElement
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "style", "fontFamily"],
    label: "Font",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], {
    placeholder: "Font",
    style: {
      width: "100%"
    },
    getPopupContainer: trigger => trigger.parentElement
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"].Option, {
    value: "Arial"
  }, "Arial"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"].Option, {
    value: "Helvetica"
  }, "Helvetica"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"].Option, {
    value: "Georgia"
  }, "Georgia")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    ...restField,
    name: [name, "style", "fontSize"],
    label: "Font Size",
    style: {
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 8,
    max: 48,
    style: {
      width: "100%"
    }
  })))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    style: {
      marginTop: 20
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "dashed",
    onClick: () => add({
      option: "New Prize",
      image: {
        uri: "",
        offsetX: 0,
        offsetY: 0,
        sizeMultiplier: 1,
        landscape: false
      },
      style: {
        backgroundColor: "#ff8f43",
        textColor: "#ffffff",
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: 400,
        fontStyle: "normal"
      },
      optionSize: 1
    }),
    block: true,
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_13__["default"], null)
  }, "Add Prize")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WheelDataManager);

/***/ }),

/***/ "./src/admin/index.jsx":
/*!*****************************!*\
  !*** ./src/admin/index.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/app/index.js");
/* harmony import */ var antd_dist_reset_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/dist/reset.css */ "./node_modules/antd/dist/reset.css");
/* harmony import */ var antd_locale_en_US__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd/locale/en_US */ "./node_modules/antd/lib/locale/en_US.js");
/* harmony import */ var _shared_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/ErrorBoundary */ "./src/shared/components/ErrorBoundary.jsx");
/* harmony import */ var _shared_config_themeConfig_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/config/themeConfig.json */ "./src/shared/config/themeConfig.json");
/* harmony import */ var _shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/providers/ApiProvider */ "./src/shared/providers/ApiProvider.jsx");
/* harmony import */ var _shared_providers_LoadingProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/providers/LoadingProvider */ "./src/shared/providers/LoadingProvider.jsx");
/* harmony import */ var _components_AdminApp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/AdminApp */ "./src/admin/components/AdminApp.jsx");











// Initialize admin app
const container = document.getElementById('spin-the-wheel-admin');
if (container) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.StrictMode, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__.ErrorBoundary, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
    locale: antd_locale_en_US__WEBPACK_IMPORTED_MODULE_9__["default"],
    theme: _shared_config_themeConfig_json__WEBPACK_IMPORTED_MODULE_4__,
    getPopupContainer: triggerNode => triggerNode?.parentElement || document.body
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_10__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_providers_LoadingProvider__WEBPACK_IMPORTED_MODULE_6__.LoadingProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_5__.ApiProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_AdminApp__WEBPACK_IMPORTED_MODULE_7__["default"], null))))))));
}

/***/ }),

/***/ "./src/shared/providers/ApiProvider.jsx":
/*!**********************************************!*\
  !*** ./src/shared/providers/ApiProvider.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiProvider: () => (/* binding */ ApiProvider),
/* harmony export */   useApi: () => (/* binding */ useApi)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/api */ "./src/shared/utils/api.js");




// API Context
const ApiContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const ApiProvider = ({
  children
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ApiContext.Provider, {
    value: _utils_api__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, children);
};
const useApi = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
};

/***/ }),

/***/ "./src/shared/utils/api.js":
/*!*********************************!*\
  !*** ./src/shared/utils/api.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiError: () => (/* binding */ ApiError),
/* harmony export */   api: () => (/* binding */ api),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * API Utilities for Spin The Wheel Plugin
 */

class ApiClient {
  constructor() {
    this.baseUrl = window.stwAdminData?.rest_url || window.stwData?.rest_url || '';
    this.namespace = 'stw/v1';
    this.nonce = window.stwAdminData?.rest_nonce || window.stwData?.rest_nonce || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-WP-Nonce': this.nonce
    };
  }

  /**
   * Make HTTP request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${this.namespace}/${endpoint.replace(/^\//, '')}`;
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    };
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'Network error'
        }));
        throw new ApiError(errorData.message || 'Request failed', response.status, errorData);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 0, error);
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const searchParams = new URLSearchParams(params);
    const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;
    return this.request(url, {
      method: 'GET'
    });
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  /**
   * Upload file
   */
  async upload(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });
    return this.request(endpoint, {
      method: 'POST',
      headers: {
        'X-WP-Nonce': this.nonce
      },
      // Don't set Content-Type for FormData
      body: formData
    });
  }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
  isNetworkError() {
    return this.status === 0;
  }
  isClientError() {
    return this.status >= 400 && this.status < 500;
  }
  isServerError() {
    return this.status >= 500;
  }
}

/**
 * Theme API methods
 */
class ThemeApi {
  constructor(client) {
    this.client = client;
  }
  async getThemes() {
    return this.client.get('template');
  }
  async getTheme(id) {
    return this.client.get(`template/${id}`);
  }
  async createTheme(data) {
    return this.client.post('template', data);
  }
  async updateTheme(id, data) {
    return this.client.put(`template/${id}`, data);
  }
  async deleteTheme(id) {
    return this.client.delete(`template/${id}`);
  }
  async duplicateTheme(id) {
    return this.client.post(`template/${id}/duplicate`);
  }
}

/**
 * Data API methods
 */
class DataApi {
  constructor(client) {
    this.client = client;
  }
  async getWheelData(id) {
    return this.client.get(`data/${id}`);
  }
  async updateWheelData(id, data) {
    return this.client.put(`data/${id}`, data);
  }
  async getAnalytics(params = {}) {
    return this.client.get('analytics', params);
  }
  async saveSpinResult(data) {
    return this.client.post('analytics/spin', data);
  }
}

/**
 * Settings API methods
 */
class SettingsApi {
  constructor(client) {
    this.client = client;
  }
  async getSettings() {
    return this.client.get('settings');
  }
  async updateSettings(data) {
    return this.client.put('settings', data);
  }
  async getSetting(key) {
    return this.client.get(`settings/${key}`);
  }
  async updateSetting(key, value) {
    return this.client.put(`settings/${key}`, {
      value
    });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export API instances
const api = {
  client: apiClient,
  themes: new ThemeApi(apiClient),
  data: new DataApi(apiClient),
  settings: new SettingsApi(apiClient)
};


// Default export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);

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
/******/ 			"index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors","shared"], () => (__webpack_require__("./src/admin/index.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;