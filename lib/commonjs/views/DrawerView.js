"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerView = DrawerView;
var _elements = require("@react-navigation/elements");
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDrawerLayout = require("react-native-drawer-layout");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _useLatestCallback = _interopRequireDefault(require("use-latest-callback"));
var _DrawerPositionContext = require("../utils/DrawerPositionContext");
var _DrawerStatusContext = require("../utils/DrawerStatusContext");
var _getDrawerStatusFromState = require("../utils/getDrawerStatusFromState");
var _DrawerContent = require("./DrawerContent");
var _DrawerToggleButton = require("./DrawerToggleButton");
var _ScreenFallback = require("./ScreenFallback");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DrawerViewBase(_ref) {
  let {
    state,
    navigation,
    descriptors,
    defaultStatus,
    drawerContent = props => /*#__PURE__*/React.createElement(_DrawerContent.DrawerContent, props),
    detachInactiveScreens = _reactNative.Platform.OS === 'web' || _reactNative.Platform.OS === 'android' || _reactNative.Platform.OS === 'ios'
  } = _ref;
  const focusedRouteKey = state.routes[state.index].key;
  const {
    drawerHideStatusBarOnOpen,
    drawerPosition = _reactNative.I18nManager.getConstants().isRTL ? 'right' : 'left',
    drawerStatusBarAnimation,
    drawerStyle,
    drawerType,
    gestureHandlerProps,
    keyboardDismissMode,
    overlayColor = 'rgba(0, 0, 0, 0.5)',
    swipeEdgeWidth,
    swipeEnabled = _reactNative.Platform.OS !== 'web' && _reactNative.Platform.OS !== 'windows' && _reactNative.Platform.OS !== 'macos',
    swipeMinDistance,
    overlayAccessibilityLabel
  } = descriptors[focusedRouteKey].options;
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);
  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }
  const dimensions = (0, _reactNativeSafeAreaContext.useSafeAreaFrame)();
  const {
    colors
  } = (0, _native.useTheme)();
  const drawerStatus = (0, _getDrawerStatusFromState.getDrawerStatusFromState)(state);
  const handleDrawerOpen = (0, _useLatestCallback.default)(() => {
    navigation.dispatch({
      ..._native.DrawerActions.openDrawer(),
      target: state.key
    });
  });
  const handleDrawerClose = (0, _useLatestCallback.default)(() => {
    navigation.dispatch({
      ..._native.DrawerActions.closeDrawer(),
      target: state.key
    });
  });
  const handleGestureStart = (0, _useLatestCallback.default)(() => {
    navigation.emit({
      type: 'gestureStart',
      target: state.key
    });
  });
  const handleGestureEnd = (0, _useLatestCallback.default)(() => {
    navigation.emit({
      type: 'gestureEnd',
      target: state.key
    });
  });
  const handleGestureCancel = (0, _useLatestCallback.default)(() => {
    navigation.emit({
      type: 'gestureCancel',
      target: state.key
    });
  });
  const handleTransitionStart = (0, _useLatestCallback.default)(closing => {
    navigation.emit({
      type: 'transitionStart',
      data: {
        closing
      },
      target: state.key
    });
  });
  const handleTransitionEnd = (0, _useLatestCallback.default)(closing => {
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
    if (_reactNative.Platform.OS === 'web') {
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
    const subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => {
      var _subscription$remove;
      subscription === null || subscription === void 0 ? void 0 : (_subscription$remove = subscription.remove) === null || _subscription$remove === void 0 ? void 0 : _subscription$remove.call(subscription);
    };
  }, [defaultStatus, drawerStatus, drawerType, handleDrawerClose, handleDrawerOpen, navigation]);
  const renderDrawerContent = () => {
    return /*#__PURE__*/React.createElement(_DrawerPositionContext.DrawerPositionContext.Provider, {
      value: drawerPosition
    }, drawerContent({
      state: state,
      navigation: navigation,
      descriptors: descriptors
    }));
  };
  const renderSceneContent = () => {
    return /*#__PURE__*/React.createElement(_ScreenFallback.MaybeScreenContainer, {
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
          return /*#__PURE__*/React.createElement(_elements.Header, _extends({}, options, {
            layout: layout,
            title: (0, _elements.getHeaderTitle)(options, route.name),
            headerLeft: options.headerLeft ?? (props => /*#__PURE__*/React.createElement(_DrawerToggleButton.DrawerToggleButton, props))
          }));
        },
        headerShown,
        headerStatusBarHeight,
        headerTransparent,
        sceneContainerStyle
      } = descriptor.options;
      return /*#__PURE__*/React.createElement(_ScreenFallback.MaybeScreen, {
        key: route.key,
        style: [_reactNative.StyleSheet.absoluteFill, {
          zIndex: isFocused ? 0 : -1
        }],
        visible: isFocused,
        enabled: detachInactiveScreens,
        freezeOnBlur: freezeOnBlur
      }, /*#__PURE__*/React.createElement(_elements.Screen, {
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
  return /*#__PURE__*/React.createElement(_DrawerStatusContext.DrawerStatusContext.Provider, {
    value: drawerStatus
  }, /*#__PURE__*/React.createElement(_reactNativeDrawerLayout.Drawer, {
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
      borderRightWidth: _reactNative.StyleSheet.hairlineWidth
    } : {
      borderLeftColor: colors.border,
      borderLeftWidth: _reactNative.StyleSheet.hairlineWidth
    }), drawerStyle],
    overlayStyle: {
      backgroundColor: overlayColor
    },
    renderDrawerContent: renderDrawerContent
  }, renderSceneContent()));
}
function DrawerView(_ref3) {
  let {
    navigation,
    ...rest
  } = _ref3;
  return /*#__PURE__*/React.createElement(_elements.SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(DrawerViewBase, _extends({
    navigation: navigation
  }, rest)));
}
const styles = _reactNative.StyleSheet.create({
  content: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerView.js.map