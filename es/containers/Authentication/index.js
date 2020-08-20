"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _invariant = _interopRequireDefault(require("invariant"));

var _reselect = require("reselect");

var _redux = require("redux");

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _axios = _interopRequireDefault(require("../../config/axios"));

var _constants = _interopRequireDefault(require("./constants"));

var _injectSaga = _interopRequireWildcard(require("../../utils/utils/injectSaga"));

var _injectReducer = _interopRequireWildcard(require("../../utils/utils/injectReducer"));

var _helpers = require("../../utils/helpers");

var _selectors = require("./selectors");

var _actions = _interopRequireDefault(require("./actions"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _generator = _interopRequireDefault(require("./generator"));

var _nullCheck = _interopRequireDefault(require("../../utils/nullCheck"));

var _utils = require("../../utils");

var _index = require("../../index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var safe = _nullCheck.default; // const shape = {
//   reducerName: isString,
// };

var checkKey = (key, name, dataType) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var _default = (_ref) => {
  var {
    handlers = [],
    nextJS = false,
    createReducer = null,
    useHook = false,
    useHocHook = false
  } = _ref;
  return function () {
    var {
      apiEndPoints = {},
      initialState = {},
      getDefaultConfig = false,
      dontReset: dontResetOnLogout = {},
      isMobile = false,
      saga: sagaFunction,
      constantSaga = [],
      constantReducer,
      reducer: reducerFunction,
      name: reducerName,
      axiosInterceptors,
      useHook: _useHook = false // injectSaga,
      // injectReducer,

    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _invariant.default)((0, _isString.default)(reducerName) && !(0, _isEmpty.default)(reducerName), '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string');
    checkKey(apiEndPoints, 'apiEndPoints', 'object');
    checkKey(initialState, 'initialState', 'object');
    checkKey(dontResetOnLogout, 'dontReset', 'object');
    if (sagaFunction) checkKey(sagaFunction, 'saga', 'function');
    checkKey(constantSaga, 'constantSaga', 'array');
    checkKey(handlers, 'handlers', 'array');
    if (constantReducer) checkKey(constantReducer, 'constantReducer', 'function');
    if (reducerFunction) checkKey(reducerFunction, 'reducer', 'function');
    if (createReducer) checkKey(createReducer, 'createReducer', 'function');
    var ApiEndPoints = {
      [reducerName]: apiEndPoints
    };
    var {
      constants,
      initialState: InitialState,
      resetState,
      actions: Action,
      sagaConfig
    } = (0, _constants.default)({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout
    });
    var {
      componentActions // actions,
      // sagaActions,
      // cancelActions,

    } = (0, _actions.default)(Action);
    var {
      saga
    } = (0, _generator.default)({
      sagaConfig,
      constants,
      sagaFunction,
      axiosInterceptors,
      constantSaga
    });
    var reducer = (0, _reducer.default)({
      constants,
      InitialState: (0, _helpers.newObject)(initialState, InitialState),
      reducerFunction,
      resetState,
      constantReducer,
      isMobile,
      handlers
    });
    var componentData = {
      ["".concat(reducerName, "_hoc")]: {
        reducerConstants: Object.entries(constants).reduce((acc, _ref2) => {
          var [key, value] = _ref2;
          return _objectSpread({}, acc, {
            [key]: value[_index.commonConstants.CALL]
          });
        }, {}),
        constants,
        initialState,
        axios: axiosInterceptors || _axios.default,
        resetState,
        reducerName
      }
    };
    var commonProps = useHook || _useHook ? {
      safe
    } : {
      safe,
      getData: _utils.getData
    }; // eslint-disable-next-line no-underscore-dangle

    var _useHocHook = () => {
      (0, _injectSaga.useInjectSaga)({
        key: reducerName,
        saga
      });
      (0, _injectReducer.useInjectReducer)({
        key: reducerName,
        reducer
      }, createReducer);
      var dispatch = (0, _reactRedux.useDispatch)();

      var [state] = _react.default.useState(_objectSpread({}, componentData["".concat(reducerName, "_hoc")], {
        actions: (0, _redux.bindActionCreators)(componentActions, dispatch),
        dispatch
      }));

      return state;
    };

    if (useHocHook && !nextJS) return _useHocHook; // eslint-disable-next-line no-unused-vars

    var hoc = function hoc(WrapperComponent) {
      var autoLoginCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      function WithHoc(props) {
        // const [language, setLanguage] = useState(getLanguage('EN'));
        // useEffect(() => {
        //   if (props.authentication.language !== language)
        //     setLanguage(getLanguage(props.authentication.language));
        // }, [props.authentication.language]);
        // console.log(props, '================');
        return _react.default.createElement(WrapperComponent // language={language}
        , _extends({}, commonProps, props));
      }

      WithHoc.propTypes = {// [reducerName]: PropTypes.object.isRequired,
      };
      WithHoc.displayName = "withReactBoilerplateReduxSagaHoc(".concat(WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent', ")");
      var MakeSelectAuthenticationState = (0, _selectors.makeSelectAuthenticationState)({
        apiEndPoints: ApiEndPoints,
        initialState: (0, _helpers.newObject)(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants
      });
      var mapStateToProps = (0, _reselect.createStructuredSelector)({
        ["".concat(reducerName, "_data")]: MakeSelectAuthenticationState()
      });
      var authenticationReducer = (0, _injectReducer.default)({
        key: reducerName,
        reducer
      }, createReducer);
      var authenticationSaga = (0, _injectSaga.default)({
        key: reducerName,
        saga
      });
      var withConnect = (0, _reactRedux.connect)(mapStateToProps, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName));

      if (nextJS) {
        WithHoc.getInitialProps = _async(function (props) {
          var _ref3 = props.ctx || props,
              {
            res,
            req,
            store
          } = _ref3,
              rest = _objectWithoutProperties(_ref3, ["res", "req", "store"]);

          var data = _objectSpread({
            res,
            req,
            store
          }, rest);

          return _invoke(function () {
            if (WrapperComponent.getInitialProps) return _await(WrapperComponent.getInitialProps(_objectSpread({}, props, {}, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName)(store.dispatch))), function (_WrapperComponent$get) {
              data = _WrapperComponent$get;
            });
          }, function () {
            return data || {};
          });
        });
        return withConnect(WithHoc);
      }

      return (useHook || _useHook ? (0, _redux.compose)((0, _reactRedux.connect)(null, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName)), authenticationReducer, authenticationSaga) : (0, _redux.compose)(withConnect, authenticationReducer, authenticationSaga))(WithHoc);
    };

    if (nextJS && getDefaultConfig) return _objectSpread({
      hoc,
      saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer
      },
      actions: _objectSpread({}, componentActions)
    }, componentData["".concat(reducerName, "_hoc")]);
    if (nextJS) return {
      hoc,
      saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer
      }
    };

    if (getDefaultConfig) {
      return _objectSpread({
        hoc,
        actions: _objectSpread({}, componentActions)
      }, componentData["".concat(reducerName, "_hoc")]);
    }

    return hoc;
  };
};

exports.default = _default;