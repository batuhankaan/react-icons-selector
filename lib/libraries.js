"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var FaIcons = _interopRequireWildcard(require("react-icons/fa"));
var AiIcons = _interopRequireWildcard(require("react-icons/ai"));
var BiIcons = _interopRequireWildcard(require("react-icons/bi"));
var BsIcons = _interopRequireWildcard(require("react-icons/bs"));
var CgIcons = _interopRequireWildcard(require("react-icons/cg"));
var DiIcons = _interopRequireWildcard(require("react-icons/di"));
var FiIcons = _interopRequireWildcard(require("react-icons/fi"));
var FcIcons = _interopRequireWildcard(require("react-icons/fc"));
var GiIcons = _interopRequireWildcard(require("react-icons/gi"));
var GoIcons = _interopRequireWildcard(require("react-icons/go"));
var GrIcons = _interopRequireWildcard(require("react-icons/gr"));
var HiIcons = _interopRequireWildcard(require("react-icons/hi"));
var IoIcons = _interopRequireWildcard(require("react-icons/io"));
var MdIcons = _interopRequireWildcard(require("react-icons/md"));
var RiIcons = _interopRequireWildcard(require("react-icons/ri"));
var SiIcons = _interopRequireWildcard(require("react-icons/si"));
var TbIcons = _interopRequireWildcard(require("react-icons/tb"));
var TiIcons = _interopRequireWildcard(require("react-icons/ti"));
var PhIcons = _interopRequireWildcard(require("react-icons/rx"));
var VsIcons = _interopRequireWildcard(require("react-icons/vsc"));
var WiIcons = _interopRequireWildcard(require("react-icons/wi"));
var LaIcons = _interopRequireWildcard(require("react-icons/lia"));
var IcIcons = _interopRequireWildcard(require("react-icons/im"));
var LucideIcons = _interopRequireWildcard(require("react-icons/lu"));
var CircumIcons = _interopRequireWildcard(require("react-icons/ci"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var libraries = {
  Home: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, FaIcons), AiIcons), BiIcons), BsIcons), CgIcons), DiIcons), FiIcons), FcIcons), GiIcons), GoIcons), GrIcons), HiIcons), IoIcons), MdIcons), RiIcons), SiIcons), TbIcons), TiIcons), PhIcons), VsIcons), WiIcons), LaIcons), IcIcons), LucideIcons), CircumIcons),
  "Font Awesome 5": FaIcons,
  "Ant Design Icons": AiIcons,
  BoxIcons: BiIcons,
  "Bootstrap Icons": BsIcons,
  "css.gg": CgIcons,
  Devicons: DiIcons,
  Feather: FiIcons,
  "Flat Color Icons": FcIcons,
  "Game Icons": GiIcons,
  "Github Octicons": GoIcons,
  "Grommet Icons": GrIcons,
  Heroicons: HiIcons,
  "Ionicons 4": IoIcons,
  "Ionicons 5": IoIcons,
  "Material Design Icons": MdIcons,
  "Remix Icons": RiIcons,
  "Simple Icons": SiIcons,
  "Tabler Icons": TbIcons,
  Typicons: TiIcons,
  "Phosphor Icons": PhIcons,
  "VS Code Icons": VsIcons,
  "Weather Icons": WiIcons,
  "Line Awesome": LaIcons,
  "IcoMoon Free": IcIcons,
  Lucide: LucideIcons,
  "Circum Icons": CircumIcons
};
var _default = exports["default"] = libraries;