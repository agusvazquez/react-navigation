import { CommonActions, DrawerActions, useLinkTools } from '@react-navigation/native';
import * as React from 'react';
import { DrawerItem } from './DrawerItem';
/**
 * Component that renders the navigation list in the drawer.
 */
export function DrawerItemList(_ref) {
  let {
    state,
    navigation,
    descriptors
  } = _ref;
  const {
    buildHref
  } = useLinkTools();
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const {
    drawerActiveTintColor,
    drawerInactiveTintColor,
    drawerActiveBackgroundColor,
    drawerInactiveBackgroundColor
  } = focusedOptions;
  return state.routes.map((route, i) => {
    const focused = i === state.index;
    const onPress = () => {
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true
      });
      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused ? DrawerActions.closeDrawer() : CommonActions.navigate(route)),
          target: state.key
        });
      }
    };
    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle,
      drawerAllowFontScaling
    } = descriptors[route.key].options;
    return /*#__PURE__*/React.createElement(DrawerItem, {
      key: route.key,
      route: route,
      href: buildHref(route.name, route.params),
      label: drawerLabel !== undefined ? drawerLabel : title !== undefined ? title : route.name,
      icon: drawerIcon,
      focused: focused,
      activeTintColor: drawerActiveTintColor,
      inactiveTintColor: drawerInactiveTintColor,
      activeBackgroundColor: drawerActiveBackgroundColor,
      inactiveBackgroundColor: drawerInactiveBackgroundColor,
      allowFontScaling: drawerAllowFontScaling,
      labelStyle: drawerLabelStyle,
      style: drawerItemStyle,
      onPress: onPress
    });
  });
}
//# sourceMappingURL=DrawerItemList.js.map