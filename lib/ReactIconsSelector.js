"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RenderIcon = void 0;
var _react = _interopRequireWildcard(require("react"));
var _libraries = _interopRequireDefault(require("./libraries"));
require("./IconSelector.css");
var _server = require("react-dom/server");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Helper function to render selected icon
var RenderIcon = exports.RenderIcon = function RenderIcon(_ref) {
  var iconData = _ref.iconData,
    size = _ref.size,
    color = _ref.color,
    style = _ref.style,
    className = _ref.className;
  if (!iconData || !iconData.name || !iconData.library) return null;
  var IconComponent = _libraries["default"][iconData.library][iconData.name];
  if (!IconComponent) return null;
  return /*#__PURE__*/_react["default"].createElement(IconComponent, {
    size: size || 24,
    color: color,
    style: style,
    className: className
  });
};
var debounce = function debounce(func, delay) {
  var timeoutId;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(void 0, args);
    }, delay);
  };
};
var ReactIconsSelector = function ReactIconsSelector(_ref2) {
  var _ref2$icons = _ref2.icons,
    icons = _ref2$icons === void 0 ? Object.keys(_libraries["default"]).filter(function (library) {
      return library !== "Home";
    }) : _ref2$icons,
    _ref2$language = _ref2.language,
    language = _ref2$language === void 0 ? {
      homeText: "All Icons",
      headerText: "Icon Selector",
      noIconsFoundText: "No icons found.",
      homeSearchText: "Search icons (min 2 chars)",
      buttonText: "Select Icon"
    } : _ref2$language,
    value = _ref2.value,
    onChange = _ref2.onChange,
    _ref2$buttonStyle = _ref2.buttonStyle,
    buttonStyle = _ref2$buttonStyle === void 0 ? {} : _ref2$buttonStyle,
    _ref2$buttonClassName = _ref2.buttonClassName,
    buttonClassName = _ref2$buttonClassName === void 0 ? "" : _ref2$buttonClassName,
    onSvgExport = _ref2.onSvgExport,
    _ref2$iconSize = _ref2.iconSize,
    iconSize = _ref2$iconSize === void 0 ? 35 : _ref2$iconSize;
  // Memoize the onChange callback to prevent recreation on render
  var memoizedOnChange = (0, _react.useMemo)(function () {
    return onChange;
  }, [onChange]);
  // Store all state and functions in a ref to avoid recreating them on each render
  var stateRef = (0, _react.useRef)({
    modalIsOpen: false,
    activeLibrary: "Home",
    searchTerm: "",
    debouncedSearchTerm: "",
    displayedIcons: [],
    tooltipPosition: null
  });

  // DOM refs
  var buttonRef = (0, _react.useRef)(null);
  var modalRef = (0, _react.useRef)(null);
  var sidebarRef = (0, _react.useRef)(null);

  // State for controlled inputs only - kept to minimum
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchTerm = _useState2[0],
    setSearchTerm = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    modalIsOpen = _useState4[0],
    setModalIsOpen = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    displayedIcons = _useState6[0],
    setDisplayedIcons = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    tooltipPosition = _useState8[0],
    setTooltipPosition = _useState8[1];
  var _useState9 = (0, _react.useState)("Home"),
    _useState10 = _slicedToArray(_useState9, 2),
    activeLibrary = _useState10[0],
    setActiveLibrary = _useState10[1];

  // Function refs - these don't change between renders
  var funcRef = (0, _react.useRef)({
    handleClickOutside: null,
    openModal: null,
    closeModal: null,
    resetState: null,
    handleLibraryChange: null,
    getSvgString: null,
    handleIconSelect: null,
    loadIcons: null,
    debounceSearch: null
  });

  // Initialize function refs only once
  if (!funcRef.current.resetState) {
    funcRef.current.resetState = function () {
      setDisplayedIcons([]);
    };
    funcRef.current.closeModal = function () {
      setModalIsOpen(false);
      setActiveLibrary("Home");
      setSearchTerm("");
      // Reset displayed icons on close
      setDisplayedIcons([]);
    };
    funcRef.current.handleClickOutside = function (event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        funcRef.current.closeModal();
      }
    };
    funcRef.current.openModal = function () {
      setModalIsOpen(true);
      funcRef.current.resetState();
      if (buttonRef.current) {
        var rect = buttonRef.current.getBoundingClientRect();
        var windowWidth = window.innerWidth;
        // Use a smaller fixed width for more consistent appearance
        var tooltipWidth = Math.min(350, Math.max(280, rect.width * 1.2));

        // Calculate left position to center tooltip relative to button
        var buttonCenter = rect.left + rect.width / 2;
        var left = buttonCenter - tooltipWidth / 2;

        // Ensure tooltip doesn't go offscreen
        if (left < 10) left = 10;
        if (left + tooltipWidth > windowWidth - 10) left = windowWidth - tooltipWidth - 10;
        setTooltipPosition({
          top: rect.bottom + window.scrollY + 5,
          left: left,
          width: tooltipWidth
        });
      }
    };
    funcRef.current.handleLibraryChange = function (library) {
      setActiveLibrary(library);
      funcRef.current.resetState();
    };
    funcRef.current.getSvgString = function (iconComponent) {
      if (!iconComponent) return null;
      var element = /*#__PURE__*/_react["default"].createElement(iconComponent, {
        size: iconSize
      });
      var svg = (0, _server.renderToStaticMarkup)(element);
      return svg;
    };
    funcRef.current.handleIconSelect = function (name, libraryName) {
      var selectedLibrary = libraryName || activeLibrary;
      var iconData = {
        name: name,
        library: selectedLibrary
      };

      // Eğer yeni seçilen ikon mevcut değerle aynı değilse onChange'i çağır
      // Bu, sonsuz döngüleri önler
      if (!value || value.name !== iconData.name || value.library !== iconData.library) {
        memoizedOnChange(iconData);
      }
      if (onSvgExport) {
        var iconComponent = _libraries["default"][selectedLibrary][name];
        var svgString = funcRef.current.getSvgString(iconComponent);
        onSvgExport(svgString, iconData);
      }
      funcRef.current.closeModal();
    };
    funcRef.current.loadIcons = function (debouncedSearchTermParam, activeLibraryParam) {
      var term = debouncedSearchTermParam || "";
      var library = activeLibraryParam || "Home";
      if (library === "Home") {
        if (term.length < 2) {
          setDisplayedIcons([]);
          return;
        }
        var iconsList = [];
        icons.forEach(function (libraryName) {
          var lib = _libraries["default"][libraryName];
          Object.keys(lib).forEach(function (icon) {
            if (icon.toLowerCase().includes(term.toLowerCase())) {
              iconsList.push({
                name: icon,
                IconComponent: lib[icon],
                libraryName: libraryName
              });
            }
          });
        });
        setDisplayedIcons(iconsList);
      } else {
        var lib = _libraries["default"][library];
        var allIcons = Object.keys(lib).filter(function (icon) {
          return icon.toLowerCase().includes(term.toLowerCase());
        });
        setDisplayedIcons(allIcons.map(function (icon) {
          return {
            name: icon,
            IconComponent: lib[icon]
          };
        }));
      }
    };

    // Create a stable debounced function
    funcRef.current.debounceSearch = debounce(function (value) {
      funcRef.current.loadIcons(value, activeLibrary);
    }, 300);
  }

  // Update internal state when props change
  (0, _react.useEffect)(function () {
    stateRef.current = _objectSpread(_objectSpread({}, stateRef.current), {}, {
      modalIsOpen: modalIsOpen,
      activeLibrary: activeLibrary,
      searchTerm: searchTerm,
      displayedIcons: displayedIcons
    });
  }, [modalIsOpen, activeLibrary, searchTerm, displayedIcons]);

  // Handle outside clicks
  (0, _react.useEffect)(function () {
    if (modalIsOpen) {
      document.addEventListener('mousedown', funcRef.current.handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', funcRef.current.handleClickOutside);
    };
  }, [modalIsOpen]);

  // Load icons when search term or library changes
  (0, _react.useEffect)(function () {
    // We need to call loadIcons directly with the current state values
    // to ensure it always has the latest values
    funcRef.current.loadIcons(searchTerm, activeLibrary);
  }, [searchTerm, activeLibrary]);

  // Handle search input changes
  var handleSearchChange = function handleSearchChange(e) {
    var value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      // Call the stable debounced function
      funcRef.current.debounceSearch(value);
    } else {
      setDisplayedIcons([]);
    }
  };

  // Memoize icons list to prevent unnecessary re-renders
  var memoizedIconsList = (0, _react.useMemo)(function () {
    return displayedIcons;
  }, [displayedIcons]);

  // Modal content component
  var renderModalContent = function renderModalContent() {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-modal-header"
    }, /*#__PURE__*/_react["default"].createElement("h3", null, language.headerText), /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      className: "riselector-close-modal",
      onClick: funcRef.current.closeModal
    }, /*#__PURE__*/_react["default"].createElement(_libraries["default"]["Ionicons 4"]["IoIosClose"], {
      size: 18
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-modal-body"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-sidebar"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-search-container"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      placeholder: language.homeSearchText,
      value: searchTerm,
      onChange: handleSearchChange,
      autoFocus: true
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-search-icon"
    }, /*#__PURE__*/_react["default"].createElement(_libraries["default"]["Material Design Icons"]["MdOutlineSearch"], {
      size: 16
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-sidebar-container",
      ref: sidebarRef
    }, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", {
      className: activeLibrary === "Home" ? "active" : "",
      onClick: function onClick() {
        return funcRef.current.handleLibraryChange("Home");
      }
    }, language.homeText), icons.map(function (library, key) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: key,
        className: activeLibrary === library ? "active" : "",
        onClick: function onClick() {
          return funcRef.current.handleLibraryChange(library);
        }
      }, library);
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-icons-container"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "riselector-icon-grid"
    }, memoizedIconsList.length === 0 && searchTerm.length >= 2 && /*#__PURE__*/_react["default"].createElement("p", null, language.noIconsFoundText), memoizedIconsList.length > 0 && memoizedIconsList.map(function (_ref3, index) {
      var name = _ref3.name,
        IconComponent = _ref3.IconComponent,
        libraryName = _ref3.libraryName;
      if (typeof IconComponent !== "function") return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index,
        className: "riselector-icon-item",
        onClick: function onClick() {
          return funcRef.current.handleIconSelect(name, libraryName);
        },
        title: name
      }, /*#__PURE__*/_react["default"].createElement(IconComponent, {
        size: Math.min(20, iconSize - 15)
      }), /*#__PURE__*/_react["default"].createElement("p", null, name));
    })))));
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: buttonClassName,
    style: buttonStyle,
    onClick: funcRef.current.openModal,
    ref: buttonRef
  }, value ? /*#__PURE__*/_react["default"].createElement(RenderIcon, {
    iconData: value,
    size: iconSize
  }) : language.buttonText), modalIsOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-tooltip",
    style: tooltipPosition ? {
      top: "".concat(tooltipPosition.top, "px"),
      left: "".concat(tooltipPosition.left, "px"),
      width: "".concat(tooltipPosition.width, "px")
    } : {},
    ref: modalRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-modal-content",
    style: {
      width: '100%',
      margin: 0,
      maxHeight: '60vh',
      boxSizing: 'border-box',
      maxWidth: '100%',
      borderRadius: '8px'
    }
  }, renderModalContent())));
};
var _default = exports["default"] = ReactIconsSelector;