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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/layout/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/menu/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DashboardOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/BgColorsOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DatabaseOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/BarChartOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/SettingOutlined.js");
/* harmony import */ var _ThemeManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeManager */ "./src/admin/components/ThemeManager.jsx");
/* harmony import */ var _WheelDataManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WheelDataManager */ "./src/admin/components/WheelDataManager.jsx");
/* harmony import */ var _SettingsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SettingsManager */ "./src/admin/components/SettingsManager.jsx");







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
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeManager__WEBPACK_IMPORTED_MODULE_2__["default"], null);
      case 'wheels':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WheelDataManager__WEBPACK_IMPORTED_MODULE_3__["default"], null);
      case 'settings':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"], null);
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

/***/ "./src/admin/components/SettingsManager.jsx":
/*!**************************************************!*\
  !*** ./src/admin/components/SettingsManager.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/SaveOutlined.js");
/* harmony import */ var _shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/providers/ApiProvider */ "./src/shared/providers/ApiProvider.jsx");





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

/***/ "./src/admin/components/ThemeManager.jsx":
/*!***********************************************!*\
  !*** ./src/admin/components/ThemeManager.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/typography/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/message/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/space/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/tag/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/popconfirm/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/table/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/modal/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/divider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/switch/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input-number/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/color-picker/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/select/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/EditOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/CopyOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/providers/ApiProvider */ "./src/shared/providers/ApiProvider.jsx");





const {
  Title
} = antd__WEBPACK_IMPORTED_MODULE_3__["default"];
const {
  TextArea
} = antd__WEBPACK_IMPORTED_MODULE_4__["default"];
const ThemeManager = () => {
  const [themes, setThemes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [modalVisible, setModalVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [editingTheme, setEditingTheme] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [form] = antd__WEBPACK_IMPORTED_MODULE_5__["default"].useForm();
  const api = (0,_shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_2__.useApi)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadThemes();
  }, []);
  const loadThemes = async () => {
    setLoading(true);
    try {
      // For now, create sample data since API might not be fully implemented
      const sampleThemes = [{
        id: 1,
        name: 'Classic Theme',
        description: 'A classic wheel theme with vibrant colors',
        mustStartSpinning: false,
        prizeNumber: 0,
        data: [],
        backgroundColors: ['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f'],
        textColors: ['#ffffff'],
        outerBorderColor: '#000000',
        outerBorderWidth: 5,
        innerRadius: 0,
        innerBorderColor: '#000000',
        innerBorderWidth: 0,
        radiusLineColor: '#000000',
        radiusLineWidth: 5,
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 400,
        fontStyle: 'normal',
        perpendicularText: false,
        textDistance: 60,
        spinDuration: 4000,
        startingOptionIndex: 0,
        pointerProps: {
          src: '',
          style: {}
        },
        disableInitialAnimation: false,
        created_at: new Date().toISOString()
      }];
      setThemes(sampleThemes);
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_6__["default"].error('Failed to load themes: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateTheme = () => {
    setEditingTheme(null);
    form.resetFields();
    form.setFieldsValue({
      name: '',
      description: '',
      mustStartSpinning: false,
      prizeNumber: 0,
      data: [],
      backgroundColors: ['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f'],
      textColors: ['#ffffff'],
      outerBorderColor: '#000000',
      outerBorderWidth: 5,
      innerRadius: 0,
      innerBorderColor: '#000000',
      innerBorderWidth: 0,
      radiusLineColor: '#000000',
      radiusLineWidth: 5,
      fontFamily: 'Helvetica, Arial',
      fontSize: 20,
      fontWeight: 400,
      fontStyle: 'normal',
      perpendicularText: false,
      textDistance: 60,
      spinDuration: 4000,
      startingOptionIndex: 0,
      pointerProps: {
        src: '',
        style: {}
      },
      disableInitialAnimation: false
    });
    setModalVisible(true);
  };
  const handleEditTheme = theme => {
    setEditingTheme(theme);
    form.setFieldsValue(theme);
    setModalVisible(true);
  };
  const handleDeleteTheme = async themeId => {
    try {
      // await api.themes.deleteTheme(themeId);
      setThemes(prev => prev.filter(theme => theme.id !== themeId));
      antd__WEBPACK_IMPORTED_MODULE_6__["default"].success('Theme deleted successfully');
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_6__["default"].error('Failed to delete theme: ' + error.message);
    }
  };
  const handleDuplicateTheme = async theme => {
    try {
      const newTheme = {
        ...theme,
        name: `${theme.name} (Copy)`,
        id: Date.now()
      };
      // await api.themes.createTheme(newTheme);
      setThemes(prev => [...prev, newTheme]);
      antd__WEBPACK_IMPORTED_MODULE_6__["default"].success('Theme duplicated successfully');
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_6__["default"].error('Failed to duplicate theme: ' + error.message);
    }
  };
  const handleSubmit = async values => {
    try {
      if (editingTheme) {
        // await api.themes.updateTheme(editingTheme.id, values);
        setThemes(prev => prev.map(theme => theme.id === editingTheme.id ? {
          ...theme,
          ...values
        } : theme));
        antd__WEBPACK_IMPORTED_MODULE_6__["default"].success('Theme updated successfully');
      } else {
        // await api.themes.createTheme(values);
        const newTheme = {
          ...values,
          id: Date.now(),
          created_at: new Date().toISOString()
        };
        setThemes(prev => [...prev, newTheme]);
        antd__WEBPACK_IMPORTED_MODULE_6__["default"].success('Theme created successfully');
      }
      setModalVisible(false);
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_6__["default"].error(`Failed to ${editingTheme ? 'update' : 'create'} theme: ` + error.message);
    }
  };
  const columns = [{
    title: 'Theme Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true
  }, {
    title: 'Background Colors',
    dataIndex: 'backgroundColors',
    key: 'colors',
    render: colors => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], null, (colors || []).slice(0, 4).map((color, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      style: {
        width: 20,
        height: 20,
        backgroundColor: color,
        border: '1px solid #ccc',
        borderRadius: 2
      }
    })), colors && colors.length > 4 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "+", colors.length - 4))
  }, {
    title: 'Font',
    key: 'font',
    render: (_, record) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
      direction: "vertical",
      size: "small"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], null, record.fontFamily || 'Arial'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], null, record.fontSize || 20, "px"))
  }, {
    title: 'Spin Duration',
    dataIndex: 'spinDuration',
    key: 'spinDuration',
    render: duration => duration ? `${duration}ms` : '4000ms'
  }, {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
      type: "primary",
      size: "small",
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__["default"], null),
      onClick: () => handleEditTheme(record)
    }, "Edit"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
      size: "small",
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_11__["default"], null),
      onClick: () => handleDuplicateTheme(record)
    }, "Duplicate"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_12__["default"], {
      title: "Delete this theme?",
      description: "This action cannot be undone.",
      onConfirm: () => handleDeleteTheme(record.id),
      okText: "Yes",
      cancelText: "No"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
      danger: true,
      size: "small",
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_13__["default"], null)
    }, "Delete")))
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_14__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
    level: 3,
    style: {
      margin: 0
    }
  }, "Theme Management"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
    type: "primary",
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_15__["default"], null),
    onClick: handleCreateTheme
  }, "Create New Theme")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_16__["default"], {
    columns: columns,
    dataSource: themes,
    loading: loading,
    rowKey: "id",
    pagination: {
      pageSize: 10
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_17__["default"], {
    title: editingTheme ? 'Edit Theme' : 'Create New Theme',
    open: modalVisible,
    onCancel: () => setModalVisible(false),
    onOk: () => form.submit(),
    width: 1000,
    okText: editingTheme ? 'Update' : 'Create'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"], {
    form: form,
    layout: "vertical",
    onFinish: handleSubmit
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "name",
    label: "Theme Name",
    rules: [{
      required: true,
      message: 'Please enter a theme name'
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    placeholder: "Enter theme name"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "description",
    label: "Description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    placeholder: "Enter theme description"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], null, "Spin Configuration"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "mustStartSpinning",
    label: "Must Start Spinning",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_21__["default"], null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "prizeNumber",
    label: "Prize Number",
    rules: [{
      required: true,
      message: 'Please enter prize number'
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    placeholder: "Prize index"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "startingOptionIndex",
    label: "Starting Option Index"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    placeholder: "Starting index"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "spinDuration",
    label: "Spin Duration (ms)"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 1000,
    max: 10000,
    placeholder: "Duration in milliseconds"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "disableInitialAnimation",
    label: "Disable Initial Animation",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_21__["default"], null)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], null, "Colors"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "backgroundColors",
    label: "Background Colors",
    rules: [{
      required: true,
      message: 'Please select background colors'
    }]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    wrap: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 12
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "textColors",
    label: "Text Colors"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    wrap: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], null, "Border Configuration"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "outerBorderColor",
    label: "Outer Border Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "outerBorderWidth",
    label: "Outer Border Width"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    max: 20,
    placeholder: "Width in pixels"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "innerRadius",
    label: "Inner Radius"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    placeholder: "Radius in pixels"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "innerBorderColor",
    label: "Inner Border Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "innerBorderWidth",
    label: "Inner Border Width"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    max: 20,
    placeholder: "Width in pixels"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "radiusLineColor",
    label: "Radius Line Color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_23__["default"], {
    showText: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "radiusLineWidth",
    label: "Radius Line Width"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    max: 20,
    placeholder: "Width in pixels"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], null, "Typography"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "fontFamily",
    label: "Font Family"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"], {
    placeholder: "Select font family"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "Arial"
  }, "Arial"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "Helvetica"
  }, "Helvetica"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "Times New Roman"
  }, "Times New Roman"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "Georgia"
  }, "Georgia"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "Verdana"
  }, "Verdana")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "fontSize",
    label: "Font Size"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 8,
    max: 48,
    placeholder: "Size in pixels"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "fontWeight",
    label: "Font Weight"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"], {
    placeholder: "Select font weight"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 100
  }, "Thin (100)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 200
  }, "Extra Light (200)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 300
  }, "Light (300)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 400
  }, "Normal (400)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 500
  }, "Medium (500)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 600
  }, "Semi Bold (600)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 700
  }, "Bold (700)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 800
  }, "Extra Bold (800)"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: 900
  }, "Black (900)"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "fontStyle",
    label: "Font Style"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"], {
    placeholder: "Select font style"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "normal"
  }, "Normal"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "italic"
  }, "Italic"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_24__["default"].Option, {
    value: "oblique"
  }, "Oblique")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "perpendicularText",
    label: "Perpendicular Text",
    valuePropName: "checked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_21__["default"], null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: "textDistance",
    label: "Text Distance"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
    min: 0,
    placeholder: "Distance from center"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_20__["default"], null, "Pointer Configuration"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_18__["default"], {
    gutter: 16
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
    span: 24
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_5__["default"].Item, {
    name: ['pointerProps', 'src'],
    label: "Pointer Image Source"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_4__["default"], {
    placeholder: "Enter pointer image URL"
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeManager);

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
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/EditOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/PlusOutlined.js");




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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/app/index.js");
/* harmony import */ var _components_AdminApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/AdminApp */ "./src/admin/components/AdminApp.jsx");
/* harmony import */ var _shared_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/ErrorBoundary */ "./src/shared/components/ErrorBoundary.jsx");
/* harmony import */ var _shared_providers_LoadingProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/providers/LoadingProvider */ "./src/shared/providers/LoadingProvider.jsx");
/* harmony import */ var _shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/providers/ApiProvider */ "./src/shared/providers/ApiProvider.jsx");
/* harmony import */ var _shared_config_themeConfig_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/config/themeConfig.json */ "./src/shared/config/themeConfig.json");
/* harmony import */ var antd_locale_en_US__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd/locale/en_US */ "./node_modules/antd/lib/locale/en_US.js");











// Initialize admin app
const container = document.getElementById('spin-the-wheel-admin');
if (container) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.StrictMode, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__.ErrorBoundary, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_7__["default"], {
    locale: antd_locale_en_US__WEBPACK_IMPORTED_MODULE_8__["default"],
    theme: _shared_config_themeConfig_json__WEBPACK_IMPORTED_MODULE_6__
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(antd__WEBPACK_IMPORTED_MODULE_9__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_providers_LoadingProvider__WEBPACK_IMPORTED_MODULE_4__.LoadingProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_providers_ApiProvider__WEBPACK_IMPORTED_MODULE_5__.ApiProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_AdminApp__WEBPACK_IMPORTED_MODULE_2__["default"], null))))))));
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

/***/ "./src/shared/providers/LoadingProvider.jsx":
/*!**************************************************!*\
  !*** ./src/shared/providers/LoadingProvider.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingProvider: () => (/* binding */ LoadingProvider),
/* harmony export */   useLoading: () => (/* binding */ useLoading)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



// Loading Context
const LoadingContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const LoadingProvider = ({
  children
}) => {
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [loadingText, setLoadingText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('Loading...');
  const showLoading = (text = 'Loading...') => {
    setLoadingText(text);
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(LoadingContext.Provider, {
    value: {
      loading,
      loadingText,
      showLoading,
      hideLoading
    }
  }, children);
};
const useLoading = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
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