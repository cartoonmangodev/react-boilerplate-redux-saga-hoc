"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _ref$isReactBoilerpla = _ref.isReactBoilerplate,
      isWeb = _ref$isReactBoilerpla === void 0 ? false : _ref$isReactBoilerpla;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$apiEndPoints = _ref2.apiEndPoints,
        apiEndPoints = _ref2$apiEndPoints === void 0 ? {} : _ref2$apiEndPoints,
        _ref2$initialState = _ref2.initialState,
        initialState = _ref2$initialState === void 0 ? {} : _ref2$initialState,
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
        axiosInterceptors = _ref2.axiosInterceptors;

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

        return _objectSpread({}, acc, _defineProperty({}, key, value[_.commonConstants.CALL]));
      }, {}),
      constants: constants,
      initialState: initialState,
      axios: axiosInterceptors || _axios.default,
      resetState: resetState
    }); // eslint-disable-next-line no-unused-vars


    return function (WrapperComponent) {
      var autoLoginCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      function Authentication(props) {
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

      Authentication.propTypes = {// [reducerName]: PropTypes.object.isRequired,
      };
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
      }, isWeb);
      var authenticationSaga = (0, _injectSaga.default)({
        key: reducerName,
        saga: saga
      });
      var withConnect = (0, _reactRedux.connect)(mapStateToProps, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName));
      return (0, _redux.compose)(withConnect, authenticationReducer, authenticationSaga)(Authentication);
    };
  };
};

exports.default = _default;