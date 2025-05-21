"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ReactIconsSelector = _interopRequireWildcard(require("../ReactIconsSelector"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _default = exports["default"] = {
  title: "Icon Selector Modal",
  component: _ReactIconsSelector["default"],
  argTypes: {
    iconSize: {
      control: {
        type: "range",
        min: 20,
        max: 60,
        step: 5
      },
      defaultValue: 35
    }
  }
};
var Default = exports.Default = function Default(_ref) {
  var iconSize = _ref.iconSize;
  var _useState = (0, _react.useState)({
      name: "TbAnalyze",
      library: "Tabler Icons"
    }),
    _useState2 = _slicedToArray(_useState, 2),
    selectedIcon = _useState2[0],
    setSelectedIcon = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    svgString = _useState4[0],
    setSvgString = _useState4[1];
  var containerStyles = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px"
  };
  var sectionStyles = {
    marginTop: "30px",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
  };
  var headingStyles = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "10px"
  };
  var labelStyles = {
    fontSize: "13px",
    color: "#666",
    marginBottom: "8px",
    fontWeight: "500"
  };
  var iconContainerStyles = {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "15px"
  };
  var iconBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    minWidth: "100px"
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "15px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_ReactIconsSelector["default"], {
    value: selectedIcon,
    onChange: setSelectedIcon,
    buttonStyle: {
      width: 200,
      height: 60,
      fontSize: 40,
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
    },
    iconSize: iconSize,
    onSvgExport: function onSvgExport(svg) {
      return setSvgString(svg);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: sectionStyles
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    style: headingStyles
  }, "Selected Icon"), /*#__PURE__*/_react["default"].createElement("div", {
    style: iconContainerStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: iconBoxStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: labelStyles
  }, "Default"), /*#__PURE__*/_react["default"].createElement(_ReactIconsSelector.RenderIcon, {
    iconData: selectedIcon,
    size: 50
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: iconBoxStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: labelStyles
  }, "Red Color"), /*#__PURE__*/_react["default"].createElement(_ReactIconsSelector.RenderIcon, {
    iconData: selectedIcon,
    size: 50,
    color: "red"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: iconBoxStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: labelStyles
  }, "With Shadow"), /*#__PURE__*/_react["default"].createElement(_ReactIconsSelector.RenderIcon, {
    iconData: selectedIcon,
    size: 50,
    color: "blue",
    style: {
      filter: "drop-shadow(0 0 5px rgba(0,0,0,0.5))"
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: iconBoxStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: labelStyles
  }, "Custom Style"), /*#__PURE__*/_react["default"].createElement(_ReactIconsSelector.RenderIcon, {
    iconData: selectedIcon,
    size: 50,
    style: {
      color: "green",
      transform: "rotate(15deg)",
      backgroundColor: "#f5f5f5",
      padding: 10,
      borderRadius: 8
    }
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    style: sectionStyles
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    style: headingStyles
  }, "SVG Output"), /*#__PURE__*/_react["default"].createElement("pre", {
    style: {
      background: "#f7f7f7",
      padding: "15px",
      borderRadius: "6px",
      maxHeight: "150px",
      overflow: "auto",
      fontSize: "12px",
      color: "#333",
      border: "1px solid #eee",
      fontFamily: "monospace"
    }
  }, svgString)));
};