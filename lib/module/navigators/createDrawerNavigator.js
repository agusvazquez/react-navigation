function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createNavigatorFactory, DrawerRouter, useNavigationBuilder } from '@react-navigation/native';
import * as React from 'react';
import { DrawerView } from '../views/DrawerView';
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
  } = useNavigationBuilder(DrawerRouter, {
    id,
    initialRouteName,
    defaultStatus,
    backBehavior,
    children,
    screenListeners,
    screenOptions
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(DrawerView, _extends({}, rest, {
    defaultStatus: defaultStatus,
    state: state,
    descriptors: descriptors,
    navigation: navigation
  })));
}
export const createDrawerNavigator = createNavigatorFactory(DrawerNavigator);
//# sourceMappingURL=createDrawerNavigator.js.map