"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _redux = require("redux");

var _axios = _interopRequireDefault(require("../../config/axios"));

var _constants = _interopRequireDefault(require("./constants"));

var _injectSaga = _interopRequireDefault(require("../../utils/utils/injectSaga"));

var _injectReducer = _interopRequireDefault(require("../../utils/utils/injectReducer"));

var _helpers = require("../../utils/helpers");

var _selectors = require("./selectors");

var _actions = _interopRequireDefault(require("./actions"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _generator = _interopRequireDefault(require("./generator"));

var _nullCheck = _interopRequireDefault(require("../../utils/nullCheck"));

var _utils = require("../../utils");

var _index = require("../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var safe = _nullCheck.default;

var _default = function _default(_ref) {
  var _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers,
      _ref$nextJS = _ref.nextJS,
      nextJS = _ref$nextJS === void 0 ? false : _ref$nextJS,
      _ref$createReducer = _ref.createReducer,
      createReducer = _ref$createReducer === void 0 ? null : _ref$createReducer;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$apiEndPoints = _ref2.apiEndPoints,
        apiEndPoints = _ref2$apiEndPoints === void 0 ? {} : _ref2$apiEndPoints,
        _ref2$initialState = _ref2.initialState,
        initialState = _ref2$initialState === void 0 ? {} : _ref2$initialState,
        _ref2$getDefaultConfi = _ref2.getDefaultConfig,
        getDefaultConfig = _ref2$getDefaultConfi === void 0 ? false : _ref2$getDefaultConfi,
        _ref2$dontReset = _ref2.dontReset,
        dontResetOnLogout = _ref2$dontReset === void 0 ? {} : _ref2$dontReset,
        _ref2$isMobile = _ref2.isMobile,
        isMobile = _ref2$isMobile === void 0 ? false : _ref2$isMobile,
        sagaFunction = _ref2.saga,
        _ref2$constantSaga = _ref2.constantSaga,
        constantSaga = _ref2$constantSaga === void 0 ? [] : _ref2$constantSaga,
        constantReducer = _ref2.constantReducer,
        reducerFunction = _ref2.reducer,
        reducerName = _ref2.name,
        axiosInterceptors = _ref2.axiosInterceptors,
        _ref2$useHook = _ref2.useHook,
        useHook = _ref2$useHook === void 0 ? false : _ref2$useHook;

    var ApiEndPoints = _defineProperty({}, reducerName, apiEndPoints);

    var _generateConstants = (0, _constants.default)({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout: dontResetOnLogout
    }),
        constants = _generateConstants.constants,
        InitialState = _generateConstants.initialState,
        resetState = _generateConstants.resetState,
        Action = _generateConstants.actions,
        sagaConfig = _generateConstants.sagaConfig;

    var _generateAction = (0, _actions.default)(Action),
        componentActions = _generateAction.componentActions;

    var _Saga = (0, _generator.default)({
      sagaConfig: sagaConfig,
      constants: constants,
      sagaFunction: sagaFunction,
      axiosInterceptors: axiosInterceptors,
      constantSaga: constantSaga
    }),
        saga = _Saga.saga;

    var reducer = (0, _reducer.default)({
      constants: constants,
      InitialState: (0, _helpers.newObject)(initialState, InitialState),
      reducerFunction: reducerFunction,
      resetState: resetState,
      constantReducer: constantReducer,
      isMobile: isMobile,
      handlers: handlers
    });

    var componentData = _defineProperty({}, "".concat(reducerName, "_hoc"), {
      reducerConstants: Object.entries(constants).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        return _objectSpread({}, acc, _defineProperty({}, key, value[_index.commonConstants.CALL]));
      }, {}),
      constants: constants,
      initialState: initialState,
      axios: axiosInterceptors || _axios.default,
      resetState: resetState,
      reducerName: reducerName
    }); // eslint-disable-next-line no-unused-vars


    var hoc = function hoc(WrapperComponent) {
      var autoLoginCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      function WithHoc(props) {
        // const [language, setLanguage] = useState(getLanguage('EN'));
        // useEffect(() => {
        //   if (props.authentication.language !== language)
        //     setLanguage(getLanguage(props.authentication.language));
        // }, [props.authentication.language]);
        // console.log(props, '================');
        return _react.default.createElement(WrapperComponent, _extends({
          safe: safe // language={language}

        }, props, {
          getData: _utils.getData
        }));
      }

      WithHoc.propTypes = {// [reducerName]: PropTypes.object.isRequired,
      };
      WithHoc.displayName = "withReactBoilerplateReduxSagaHoc(".concat(WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent', ")");
      var MakeSelectAuthenticationState = (0, _selectors.makeSelectAuthenticationState)({
        apiEndPoints: ApiEndPoints,
        initialState: (0, _helpers.newObject)(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants: constants
      });
      var mapStateToProps = (0, _reselect.createStructuredSelector)(_defineProperty({}, "".concat(reducerName, "_data"), MakeSelectAuthenticationState()));
      var authenticationReducer = (0, _injectReducer.default)({
        key: reducerName,
        reducer: reducer
      }, createReducer);
      var authenticationSaga = (0, _injectSaga.default)({
        key: reducerName,
        saga: saga
      });
      var withConnect = (0, _reactRedux.connect)(mapStateToProps, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName));

      if (nextJS) {
        WithHoc.getInitialProps = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
            var _ref6, res, req, store, rest, data;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref6 = props.ctx || props, res = _ref6.res, req = _ref6.req, store = _ref6.store, rest = _objectWithoutProperties(_ref6, ["res", "req", "store"]);
                    data = _objectSpread({
                      res: res,
                      req: req,
                      store: store
                    }, rest);

                    if (!WrapperComponent.getInitialProps) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return WrapperComponent.getInitialProps(_objectSpread({}, props, {}, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName)(store.dispatch)));

                  case 5:
                    data = _context.sent;

                  case 6:
                    return _context.abrupt("return", data || {});

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }();

        return withConnect(WithHoc);
      }

      return (useHook ? (0, _redux.compose)((0, _reactRedux.connect)(null, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName)), authenticationReducer, authenticationSaga) : (0, _redux.compose)(withConnect, authenticationReducer, authenticationSaga))(WithHoc);
    };

    if (nextJS && getDefaultConfig) return _objectSpread({
      hoc: hoc,
      saga: saga,
      reducer: {
        name: reducerName,
        reducer: reducer
      },
      actions: _objectSpread({}, componentActions)
    }, componentData["".concat(reducerName, "_hoc")]);
    if (nextJS) return {
      hoc: hoc,
      saga: saga,
      reducer: {
        name: reducerName,
        reducer: reducer
      }
    };

    if (getDefaultConfig) {
      return _objectSpread({
        hoc: hoc,
        actions: _objectSpread({}, componentActions)
      }, componentData["".concat(reducerName, "_hoc")]);
    }

    return hoc;
  };
};

exports.default = _default;