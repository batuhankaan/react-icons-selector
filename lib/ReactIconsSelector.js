"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _libraries = _interopRequireDefault(require("./libraries"));
require("./IconSelector.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var ReactIconsSelector = function ReactIconsSelector(_ref) {
  var _ref$icons = _ref.icons,
    icons = _ref$icons === void 0 ? Object.keys(_libraries["default"]).filter(function (library) {
      return library !== "Home";
    }) : _ref$icons,
    _ref$language = _ref.language,
    language = _ref$language === void 0 ? {
      homeText: "Home",
      headerText: "Icon Selector",
      noIconsFoundText: "No icons found.",
      homeSearchText: "Please enter at least 2 characters..",
      buttonText: "Select Icon"
    } : _ref$language,
    value = _ref.value,
    onChange = _ref.onChange,
    _ref$buttonStyle = _ref.buttonStyle,
    buttonStyle = _ref$buttonStyle === void 0 ? {} : _ref$buttonStyle,
    _ref$buttonClassName = _ref.buttonClassName,
    buttonClassName = _ref$buttonClassName === void 0 ? "" : _ref$buttonClassName;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    modalIsOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var _useState3 = (0, _react.useState)("Home"),
    _useState4 = _slicedToArray(_useState3, 2),
    activeLibrary = _useState4[0],
    setActiveLibrary = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    searchTerm = _useState6[0],
    setSearchTerm = _useState6[1];
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    debouncedSearchTerm = _useState8[0],
    setDebouncedSearchTerm = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    displayedIcons = _useState10[0],
    setDisplayedIcons = _useState10[1];
  var openModal = function openModal() {
    setModalIsOpen(true);
    resetState();
  };
  var closeModal = function closeModal() {
    setModalIsOpen(false);
    setActiveLibrary("Home");
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };
  var resetState = function resetState() {
    setDisplayedIcons([]);
  };
  var handleLibraryChange = (0, _react.useCallback)(function (library) {
    setActiveLibrary(library);
    resetState();
  }, []);
  var debounceSearch = debounce(function (value) {
    setDebouncedSearchTerm(value);
  }, 300);
  var handleSearchChange = function handleSearchChange(e) {
    var value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      debounceSearch(value);
    } else {
      setDebouncedSearchTerm("");
      setDisplayedIcons([]);
    }
  };
  var loadIcons = (0, _react.useCallback)(function () {
    if (activeLibrary === "Home") {
      if (debouncedSearchTerm.length < 2) {
        setDisplayedIcons([]);
        return;
      }
      var iconsList = [];
      icons.forEach(function (libraryName) {
        var lib = _libraries["default"][libraryName];
        Object.keys(lib).forEach(function (icon) {
          if (icon.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) {
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
      var lib = _libraries["default"][activeLibrary];
      var allIcons = Object.keys(lib).filter(function (icon) {
        return icon.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      });
      setDisplayedIcons(allIcons.map(function (icon) {
        return {
          name: icon,
          IconComponent: lib[icon]
        };
      }));
    }
  }, [debouncedSearchTerm, activeLibrary, icons]);
  (0, _react.useEffect)(function () {
    loadIcons();
  }, [debouncedSearchTerm, activeLibrary]);
  var memoizedIconsList = (0, _react.useMemo)(function () {
    return displayedIcons;
  }, [displayedIcons]);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: buttonClassName,
    style: buttonStyle,
    onClick: openModal
  }, value ? /*#__PURE__*/_react["default"].createElement(_libraries["default"][value.library][value.name]) : language.buttonText), modalIsOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-modal-overlay",
    onClick: closeModal
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-modal-content",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-modal-header"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, language.headerText), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "riselector-close-modal",
    onClick: closeModal
  }, /*#__PURE__*/_react["default"].createElement(_libraries["default"]["Ionicons 4"]["IoIosClose"], {
    size: 25
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
    onChange: handleSearchChange
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-search-icon"
  }, /*#__PURE__*/_react["default"].createElement(_libraries["default"]["Material Design Icons"]["MdOutlineSearch"], {
    size: 25
  }))), /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", {
    className: activeLibrary === "Home" ? "active" : "",
    onClick: function onClick() {
      return handleLibraryChange("Home");
    }
  }, language.homeText), icons.map(function (library, key) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: key,
      className: activeLibrary === library ? "active" : "",
      onClick: function onClick() {
        return handleLibraryChange(library);
      }
    }, library);
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-icon-display"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "riselector-icon-grid"
  }, memoizedIconsList.length === 0 && searchTerm.length >= 2 && /*#__PURE__*/_react["default"].createElement("p", null, language.noIconsFoundText), memoizedIconsList.length > 0 && memoizedIconsList.map(function (_ref2, index) {
    var name = _ref2.name,
      IconComponent = _ref2.IconComponent,
      libraryName = _ref2.libraryName;
    if (typeof IconComponent !== "function") return null;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "riselector-icon-item",
      onClick: function onClick() {
        onChange({
          name: name,
          library: libraryName || activeLibrary
        });
        closeModal();
      }
    }, /*#__PURE__*/_react["default"].createElement(IconComponent, {
      size: 35
    }), /*#__PURE__*/_react["default"].createElement("p", null, name));
  }))))))));
};
var _default = exports["default"] = ReactIconsSelector;