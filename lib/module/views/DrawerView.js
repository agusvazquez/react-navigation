function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getHeaderTitle, Header, SafeAreaProviderCompat, Screen } from '@react-navigation/elements';
import { DrawerActions, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler, I18nManager, Platform, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import useLatestCallback from 'use-latest-callback';
import { DrawerPositionContext } from '../utils/DrawerPositionContext';
import { DrawerStatusContext } from '../utils/DrawerStatusContext';
import { getDrawerStatusFromState } from '../utils/getDrawerStatusFromState';
import { DrawerContent } from './DrawerContent';
import { DrawerToggleButton } from './DrawerToggleButton';
import { MaybeScreen, MaybeScreenContainer } from './ScreenFallback';
function DrawerViewBase(_ref) {
  let {
    state,
    navigation,
    descriptors,
    defaultStatus,
    drawerContent = props => /*#__PURE__*/React.createElement(DrawerContent, props),
    detachInactiveScreens = Platform.OS === 'web' || Platform.OS === 'android' || Platform.OS === 'ios'
  } = _ref;
  const focusedRouteKey = state.routes[state.index].key;
  const {
    drawerHideStatusBarOnOpen,
    drawerPosition = I18nManager.getConstants().isRTL ? 'right' : 'left',
    drawerStatusBarAnimation,
    drawerStyle,
    drawerType,
    gestureHandlerProps,
    keyboardDismissMode,
    overlayColor = 'rgba(0, 0, 0, 0.5)',
    swipeEdgeWidth,
    swipeEnabled = Platform.OS !== 'web' && Platform.OS !== 'windows' && Platform.OS !== 'macos',
    swipeMinDistance,
    overlayAccessibilityLabel
  } = descriptors[focusedRouteKey].options;
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);
  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }
  const dimensions = useSafeAreaFrame();
  const {
    colors
  } = useTheme();
  const drawerStatus = getDrawerStatusFromState(state);
  const handleDrawerOpen = useLatestCallback(() => {
    navigation.dispatch({
      ...DrawerActions.openDrawer(),
      target: state.key
    });
  });
  const handleDrawerClose = useLatestCallback(() => {
    navigation.dispatch({
      ...DrawerActions.closeDrawer(),
      target: state.key
    });
  });
  const handleGestureStart = useLatestCallback(() => {
    navigation.emit({
      type: 'gestureStart',
      target: state.key
    });
  });
  const handleGestureEnd = useLatestCallback(() => {
    navigation.emit({
      type: 'gestureEnd',
      target: state.key
    });
  });
  const handleGestureCancel = useLatestCallback(() => {
    navigation.emit({
      type: 'gestureCancel',
      target: state.key
    });
  });
  const handleTransitionStart = useLatestCallback(closing => {
    navigation.emit({
      type: 'transitionStart',
      data: {
        closing
      },
      target: state.key
    });
  });
  const handleTransitionEnd = useLatestCallback(closing => {
    navigation.emit({
      type: 'transitionEnd',
      data: {
        closing
      },
      target: state.key
    });
  });
  React.useEffect(() => {
    if (drawerStatus === defaultStatus || drawerType === 'permanent') {
      return;
    }
    const handleHardwareBack = () => {
      // We shouldn't handle the back button if the parent screen isn't focused
      // This will avoid the drawer overriding event listeners from a focused screen
      if (!navigation.isFocused()) {
        return false;
      }
      if (defaultStatus === 'open') {
        handleDrawerOpen();
      } else {
        handleDrawerClose();
      }
      return true;
    };
    const handleEscape = e => {
      if (e.key === 'Escape') {
        handleHardwareBack();
      }
    };
    if (Platform.OS === 'web') {
      var _document, _document$body, _document$body$addEve;
      (_document = document) === null || _document === void 0 ? void 0 : (_document$body = _document.body) === null || _document$body === void 0 ? void 0 : (_document$body$addEve = _document$body.addEventListener) === null || _document$body$addEve === void 0 ? void 0 : _document$body$addEve.call(_document$body, 'keyup', handleEscape);
      return () => {
        var _document2, _document2$body, _document2$body$remov;
        (_document2 = document) === null || _document2 === void 0 ? void 0 : (_document2$body = _document2.body) === null || _document2$body === void 0 ? void 0 : (_document2$body$remov = _document2$body.removeEventListener) === null || _document2$body$remov === void 0 ? void 0 : _document2$body$remov.call(_document2$body, 'keyup', handleEscape);
      };
    }

    // We only add the listeners when drawer opens
    // This way we can make sure that the listener is added as late as possible
    // This will make sure that our handler will run first when back button is pressed
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => {
      var _subscription$remove;
      subscription === null || subscription === void 0 ? void 0 : (_subscription$remove = subscription.remove) === null || _subscription$remove === void 0 ? void 0 : _subscription$remove.call(subscription);
    };
  }, [defaultStatus, drawerStatus, drawerType, handleDrawerClose, handleDrawerOpen, navigation]);
  const renderDrawerContent = () => {
    return /*#__PURE__*/React.createElement(DrawerPositionContext.Provider, {
      value: drawerPosition
    }, drawerContent({
      state: state,
      navigation: navigation,
      descriptors: descriptors
    }));
  };
  const renderSceneContent = () => {
    return /*#__PURE__*/React.createElement(MaybeScreenContainer, {
      enabled: detachInactiveScreens,
      hasTwoStates: true,
      style: styles.content
    }, state.routes.map((route, index) => {
      const descriptor = descriptors[route.key];
      const {
        lazy = true,
        unmountOnBlur
      } = descriptor.options;
      const isFocused = state.index === index;
      if (unmountOnBlur && !isFocused) {
        return null;
      }
      if (lazy && !loaded.includes(route.key) && !isFocused) {
        // Don't render a lazy screen if we've never navigated to it
        return null;
      }
      const {
        freezeOnBlur,
        header = _ref2 => {
          let {
            layout,
            options
          } = _ref2;
          return /*#__PURE__*/React.createElement(Header, _extends({}, options, {
            layout: layout,
            title: getHeaderTitle(options, route.name),
            headerLeft: options.headerLeft ?? (props => /*#__PURE__*/React.createElement(DrawerToggleButton, props))
          }));
        },
        headerShown,
        headerStatusBarHeight,
        headerTransparent,
        sceneContainerStyle
      } = descriptor.options;
      return /*#__PURE__*/React.createElement(MaybeScreen, {
        key: route.key,
        style: [StyleSheet.absoluteFill, {
          zIndex: isFocused ? 0 : -1
        }],
        visible: isFocused,
        enabled: detachInactiveScreens,
        freezeOnBlur: freezeOnBlur
      }, /*#__PURE__*/React.createElement(Screen, {
        focused: isFocused,
        route: descriptor.route,
        navigation: descriptor.navigation,
        headerShown: headerShown,
        headerStatusBarHeight: headerStatusBarHeight,
        headerTransparent: headerTransparent,
        header: header({
          layout: dimensions,
          route: descriptor.route,
          navigation: descriptor.navigation,
          options: descriptor.options
        }),
        style: sceneContainerStyle
      }, descriptor.render()));
    }));
  };
  return /*#__PURE__*/React.createElement(DrawerStatusContext.Provider, {
    value: drawerStatus
  }, /*#__PURE__*/React.createElement(Drawer, {
    open: drawerStatus !== 'closed',
    onOpen: handleDrawerOpen,
    onClose: handleDrawerClose,
    onGestureStart: handleGestureStart,
    onGestureEnd: handleGestureEnd,
    onGestureCancel: handleGestureCancel,
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd,
    layout: dimensions,
    gestureHandlerProps: gestureHandlerProps,
    swipeEnabled: swipeEnabled,
    swipeEdgeWidth: swipeEdgeWidth,
    swipeMinDistance: swipeMinDistance,
    hideStatusBarOnOpen: drawerHideStatusBarOnOpen,
    statusBarAnimation: drawerStatusBarAnimation,
    keyboardDismissMode: keyboardDismissMode,
    drawerType: drawerType,
    overlayAccessibilityLabel: overlayAccessibilityLabel,
    drawerPosition: drawerPosition,
    drawerStyle: [{
      backgroundColor: colors.card
    }, drawerType === 'permanent' && (drawerPosition === 'left' ? {
      borderRightColor: colors.border,
      borderRightWidth: StyleSheet.hairlineWidth
    } : {
      borderLeftColor: colors.border,
      borderLeftWidth: StyleSheet.hairlineWidth
    }), drawerStyle],
    overlayStyle: {
      backgroundColor: overlayColor
    },
    renderDrawerContent: renderDrawerContent
  }, renderSceneContent()));
}
export function DrawerView(_ref3) {
  let {
    navigation,
    ...rest
  } = _ref3;
  return /*#__PURE__*/React.createElement(SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(DrawerViewBase, _extends({
    navigation: navigation
  }, rest)));
}
const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerView.js.map