"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDrawerNavigator = void 0;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _DrawerView = require("../views/DrawerView");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DrawerNavigator(_ref) {
  let {
    id,
    initialRouteName,
    defaultStatus = 'closed',
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    ...rest
  } = _ref;
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = (0, _native.useNavigationBuilder)(_native.DrawerRouter, {
    id,
    initialRouteName,
    defaultStatus,
    backBehavior,
    children,
    screenListeners,
    screenOptions
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(_DrawerView.DrawerView, _extends({}, rest, {
    defaultStatus: defaultStatus,
    state: state,
    descriptors: descriptors,
    navigation: navigation
  })));
}
const createDrawerNavigator = (0, _native.createNavigatorFactory)(DrawerNavigator);
exports.createDrawerNavigator = createDrawerNavigator;
//# sourceMappingURL=createDrawerNavigator.js.map