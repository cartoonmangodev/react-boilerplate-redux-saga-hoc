'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread2'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var React = require('react');
var React__default = _interopDefault(React);
var redux = require('redux');
var reactRedux = require('react-redux');
var isEqual = _interopDefault(require('fast-deep-equal'));
var reselect = require('reselect');
var invariant = _interopDefault(require('invariant'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _createSuper = _interopDefault(require('@babel/runtime/helpers/createSuper'));
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));

var _HOC_MAIN_CLIENT_SIDE, _HOC_MAIN_SERVER_SIDE;

/* eslint-disable no-underscore-dangle */
var _FOR_INTERNAL_USE_ONLY_ = "@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@";
var _USE_TYPE_ = "@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@";
var GET_INITIAL_PROPS_DEFAULT = 'getInitialProps';
var REFETCH_API_QUERY = 'REFETCH_API_QUERY';
var REDUCER_BASE_PATH = 'app/containers/';
var IS_DEBOUNCE_API_CALL = 'is_debounce_api_call';
var DEBOUNCE_API_CALL_DELAY_IN_MS = 'debounce_api_call_delay';
var ON_CANCEL_ERROR = 'API_CANCEL_ERROR';
var ON_ERROR = 'ERROR';
var ON_SUCCESS = 'SUCCESS';
var ON_FINALLY = 'FINALLY';
var ON_CANCEL = 'CANCEL';
var ON_REQUEST = 'REQUEST';
var ON_LOADING = 'LOADING';
var ON_UNMOUNT = 'UNMOUNT';
var ON_TOAST = 'TOAST';
var ERROR = 'ERROR';
var SUCCESS = 'SUCCESS';
var CALL = 'CALL';
var CANCEL = 'CANCEL';
var CUSTOM = 'CUSTOM_TASK';
var INFINITE_DATA_HANDLER = 'Infinite-Handler';
var DATA_HANDLER = 'Data-Handler';
var DELETE_DATA_HANDLER = 'Delete-Handler';
var UPDATE_DATA_HANDLER = 'Update-Handler';
var UPDATE_DATA_KEY_HANDLER = 'Update-Key-Handler';
var DELETE_DATA_KEY_HANDLER = 'Delete-Key-Handler';
var TOGGLE_DATA_KEY_HANDLER = 'Toggle-Key-Handler';
var SPLICE_DATA_HANDLER = 'Splice-Data-Handler';
var CALLBACK_HANDLER = 'Callback-Handler';
var RESET_HANDLER = 'Reset-Handler';
var TOAST_HANDLER = 'Toast-Handler';
var ERROR_HANDLER = 'Error-Handler';
var LOADER_HANDLER = 'Loading-Handler';
var DONT_UPDATE_DATA_HANDLER = "Don't-Update-Data-Handler";
var TYPE_NULL = 'null';
var TYPE_UNDEFINED = 'undefined';
var TYPE_STRING = 'string';
var TYPE_ARRAY = 'array';
var TYPE_BOOLEAN = 'boolean';
var TYPE_OBJECT = 'object';
var TYPE_FUNCTION = 'function';
var TYPE_ERROR = 'error';
var TYPE_SYMBOL = 'symbol';
var TYPE_GENERATOR_FUNCTION = 'generatorFunction';
var FOR_INTERNAL_USE_ONLY = _FOR_INTERNAL_USE_ONLY_;
var USE_TYPE = _USE_TYPE_;
var HANDLERS = 'handlers';
var NEXT_JS = 'nextJS';
var USE_HOOK = 'useHook';
var USE_HOC_HOOK = 'useHocHook';
var HOOK_WITH_HOC = 'hookWithHoc';
var ALLOW_MAP_STATE_TO_PROPS = 'mapStateToProps';
var GET_INITIAL_PROPS_KEY = 'getInitialPropsKey';
var IS_DEVELOPMENT = 'isDevelopment';
var HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT = (_HOC_MAIN_CLIENT_SIDE = {}, _defineProperty(_HOC_MAIN_CLIENT_SIDE, HANDLERS, []), _defineProperty(_HOC_MAIN_CLIENT_SIDE, NEXT_JS, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_HOOK, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_HOC_HOOK, true), _defineProperty(_HOC_MAIN_CLIENT_SIDE, HOOK_WITH_HOC, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, ALLOW_MAP_STATE_TO_PROPS, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, GET_INITIAL_PROPS_KEY, null), _defineProperty(_HOC_MAIN_CLIENT_SIDE, IS_DEVELOPMENT, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_TYPE, FOR_INTERNAL_USE_ONLY), _defineProperty(_HOC_MAIN_CLIENT_SIDE, GET_DEFAULT_CONFIG, false), _HOC_MAIN_CLIENT_SIDE);
var HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT = (_HOC_MAIN_SERVER_SIDE = {}, _defineProperty(_HOC_MAIN_SERVER_SIDE, HANDLERS, []), _defineProperty(_HOC_MAIN_SERVER_SIDE, NEXT_JS, true), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_HOOK, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_HOC_HOOK, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, HOOK_WITH_HOC, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, ALLOW_MAP_STATE_TO_PROPS, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, GET_INITIAL_PROPS_KEY, GET_INITIAL_PROPS_DEFAULT), _defineProperty(_HOC_MAIN_SERVER_SIDE, IS_DEVELOPMENT, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_TYPE, FOR_INTERNAL_USE_ONLY), _defineProperty(_HOC_MAIN_SERVER_SIDE, GET_DEFAULT_CONFIG, false), _HOC_MAIN_SERVER_SIDE);
var GET_DEFAULT_CONFIG = 'getDefaultConfig';
var COMMON_TASKS = {
  TASK_NAME: 'name',
  SUB_KEYS_ARRAY: 'subKey',
  IS_CLEAR_PREVIOUS_DATA_ON_SUCCESS: 'clearData',
  IS_CLEAR_PREVIOUS_DATA_ON_API_START: 'clearDataOnStart'
};
var DONT_UPDATE_RESPONSE_DATA = 'dontUpdateResponseData';
var DONT_UPDATE_SUCCESS_DATA = 'dontUpdateSuccessData';
var UPDATE_CALLBACK = 'updateCallback';
var ID_REFERENCE_KEY = 'key';
var IDS = 'id';
var API_TASK_CONFIG_KEYS = {
  TASKS: 'tasks',
  TASK: {
    KEY: 'task',
    COMMON_TASK_KEYS: COMMON_TASKS,
    INFINITE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      LIMIT: 'limit',
      IS_APPEND_DATA_ON_TOP: 'isAppendTop',
      SET_INFINITE_END_KEY_TRUE_OR_FALSE: 'setInfiniteEnd',
      UPDATE_CALLBACK: UPDATE_CALLBACK
    }),
    DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      UPDATE_CALLBACK: UPDATE_CALLBACK
    }),
    DELETE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS
    }),
    UPDATE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA: DONT_UPDATE_RESPONSE_DATA,
      DONT_UPDATE_SUCCESS_DATA: DONT_UPDATE_SUCCESS_DATA
    }),
    UPDATE_DATA_KEY_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA: DONT_UPDATE_RESPONSE_DATA,
      DONT_UPDATE_SUCCESS_DATA: DONT_UPDATE_SUCCESS_DATA
    }),
    DELETE_DATA_KEY_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      DELETE_KEYS_ARRAY: 'deleteKey'
    }),
    TOGGLE_DATA_KEY_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      TOGGLE_KEYS_ARRAY: 'toggleKey'
    }),
    SPLICE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      SPLICE_VALUE_ARRAY: 'spliceKey'
    }),
    RESET_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME
    },
    CALLBACK_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      CALLBACK_FUNCTION: 'callback'
    },
    TOAST_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      TOAST_OBJECT: 'toast'
    },
    ERROR_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      ERROR_OBJECT: 'error',
      IS_ERROR: 'isError'
    },
    LOADER_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      IS_LOADING: 'loader'
    },
    DONT_UPDATE_DATA_HANDLER: _objectSpread({}, COMMON_TASKS)
  },
  FILTER_ARRAY: 'filter',
  DONT_UPDATE_REUCER: 'dontUpdateReducer',
  EXECUTE_UPDATE_STATE_CALLBACK_ON_ERROR: 'excuteUpdateStateCallbackOnError',
  UPDATE_STATE_DATA_REDUCER_KEYS: 'updateDataReducerKey',
  SET_PROXY_FOR: 'proxyFor',
  REQUEST: {
    KEY: 'request',
    ASYNC_FUNCTION: 'asyncFunction',
    ASYNC_FUNCTION_PARAMS_ARRAY: 'asyncFunctionParams',
    PAYLOAD: 'payload',
    PARAMS: 'params',
    QUERY: 'query',
    DELAY_FUNCTION: 'delayFunction',
    DONT_UPDATE_REDUCER_ON_SUCCESS: 'dontUpdateReducerOnSucess',
    DONT_UPDATE_REDUCER_ON_ERROR: 'dontUpdateReducerOnError',
    AXIOS_INTERCEPTOR: 'axios',
    PARAM_SERIALIZER: 'paramsSerializer',
    API_CANCEL_KEY: 'cancelKey',
    ON_CANCEL_TASK: 'onCancelTask',
    AXIOS_CONFIG: 'axiosConfig',
    API_QUERY_CACHE_KEY: 'key',
    USE_CACHE_DATA: 'useCache',
    IS_ERROR_DATA_HANDLING: 'errorDataHandling',
    IS_CLEAR_DATA_ON_ERROR: 'clearDataOnError',
    IS_POLLING: 'polling',
    IS_ERROR_PARSER: 'errorParser',
    DEFAULT_ERROR_PARSER_FUNCTION: 'defaultErrorParser',
    POLLING_DELAY_COUNT_IN_MS: 'delay',
    MAX_RETRY_COUNT: 'retry',
    POLLING_MAX_COUNT: 'pollingCount',
    START_POLLING_AFTER_DELAY: 'callAfterDelay'
  },
  CALLBACK: {
    KEY: 'callback',
    UPDATE_STATE_CALLBACK: 'updateStateCallback',
    SUCCESS_CALLBACK: 'successCallback',
    ERROR_CALLBACK: 'errorCallback',
    SUCCESS_CALLBACK_EXECUTE_AFTER_100_MILLISECONDS: 'logoutCallback',
    FINAL_CALLBACK: 'finalCallback',
    POLLING_CALLBACK: 'pollingCallback',
    CANCEL_CALLBACK: 'cancelCallback',
    UPDATE_CALLBACK: UPDATE_CALLBACK
  }
};
var USE_QUERY_REDUCER_CONFIG_KEYS = {
  PARENT_KEY: 'key',
  REDUCER_KEY: 'key',
  REQUIRED_DATA_KEY: 'requiredKey',
  FILTER_ARRAY: 'filter',
  QUERY_DATA_STRING_OR_ARRAY: 'initialLoaderqueryState',
  INITIAL_LOADER_STATE: 'initialLoaderState',
  GET_DEFAULT_DATA_FORMAT: 'defaultDataFormat',
  DEFAULT_DATA_OR_FORMAT: 'default'
};
var USE_QUERY_CONFIG_KEYS = {
  REDUCER_NAME: 'reducerName',
  REDUCER_KEYS_ARRAY_OR_OBJECT_OR_STRING: USE_QUERY_REDUCER_CONFIG_KEYS,
  REDUCER_KEYS_CONFIG: 'config',
  CALLBACK_FUNCTION_RETURN_DATA: 'callback',
  TRIGGER_AFTER_CALLBACK_NO_DATA_RETURN: 'callbackSuccess',
  REFRESH_KEY: 'refreshKey'
};
var API_END_POINTS_CONFIG_KEYS = {
  API_URL: 'url',
  AXIOS_INTERCEPTORS: 'axios',
  API_METHOD: 'method',
  API_RESPONSE_SUCCESS_STATUS_CODE_KEY: 'responseStatusCodeKey',
  API_RESPONSE_SUCCESS_STATUS_CODES: 'responseStatusCode',
  API_RESPONSE_SUCCESS_MESSAGE_KEY: 'responseMessageKey',
  API_RESPONSE_SUCCESS_DATA_KEY: 'responseDataKey',
  API_RESPONSE_ERROR_DATA_KEY: 'errorDataKey',
  API_RESPONSE_ERROR_STATUS_CODE_KEY: 'errorStatusKey',
  API_RESPONSE_ERROR_MESSAGE_KEY: 'errorMessageKey',
  API_ERROR_HANDLER_STATUS_CODES: 'errorHandlerStatusCode',
  DEBOUNCE_API_CALL_DELAY_IN_MS: DEBOUNCE_API_CALL_DELAY_IN_MS,
  IS_DEBOUNCE_API_CALL: IS_DEBOUNCE_API_CALL,
  SAGA_EFFECT: 'effect'
};
var API_END_POINTS_CONFIG_DEFAULT_VALUE = {
  API_URL: undefined,
  AXIOS_INTERCEPTORS: undefined,
  API_METHOD: 'GET',
  API_RESPONSE_SUCCESS_STATUS_CODE_KEY: '',
  API_RESPONSE_SUCCESS_STATUS_CODES: [],
  API_RESPONSE_SUCCESS_MESSAGE_KEY: '',
  API_RESPONSE_SUCCESS_DATA_KEY: '',
  API_RESPONSE_ERROR_DATA_KEY: 'error',
  API_RESPONSE_ERROR_STATUS_CODE_KEY: '',
  API_RESPONSE_ERROR_MESSAGE_KEY: '',
  API_ERROR_HANDLER_STATUS_CODES: [],
  SAGA_EFFECT: 'latest'
};
var ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};
var commonConstants = {
  API_END_POINTS_CONFIG_DEFAULT_VALUE: API_END_POINTS_CONFIG_DEFAULT_VALUE,
  API_END_POINTS_CONFIG_KEYS: API_END_POINTS_CONFIG_KEYS,
  USE_QUERY_CONFIG_KEYS: USE_QUERY_CONFIG_KEYS,
  API_TASK_CONFIG_KEYS: API_TASK_CONFIG_KEYS,
  ENVIRONMENT_TYPE: ENV,

  /* Don't Change any key */
  INFINITE_DATA_HANDLER: INFINITE_DATA_HANDLER,
  DATA_HANDLER: DATA_HANDLER,
  DELETE_DATA_HANDLER: DELETE_DATA_HANDLER,
  UPDATE_DATA_HANDLER: UPDATE_DATA_HANDLER,
  UPDATE_DATA_KEY_HANDLER: UPDATE_DATA_KEY_HANDLER,
  DELETE_DATA_KEY_HANDLER: DELETE_DATA_KEY_HANDLER,
  TOGGLE_DATA_KEY_HANDLER: TOGGLE_DATA_KEY_HANDLER,
  SPLICE_DATA_HANDLER: SPLICE_DATA_HANDLER,
  RESET_HANDLER: RESET_HANDLER,
  CALLBACK_HANDLER: CALLBACK_HANDLER,
  TOAST_HANDLER: TOAST_HANDLER,
  ERROR_HANDLER: ERROR_HANDLER,
  LOADER_HANDLER: LOADER_HANDLER,
  DONT_UPDATE_DATA_HANDLER: DONT_UPDATE_DATA_HANDLER,

  /* Don't Change any key */
  ON_CANCEL_ERROR: ON_CANCEL_ERROR,
  ON_ERROR: ON_ERROR,
  ON_SUCCESS: ON_SUCCESS,
  ON_FINALLY: ON_FINALLY,
  ON_CANCEL: ON_CANCEL,
  ON_REQUEST: ON_REQUEST,
  ON_LOADING: ON_LOADING,
  ON_UNMOUNT: ON_UNMOUNT,
  ON_TOAST: ON_TOAST,
  ERROR: ERROR,
  SUCCESS: SUCCESS,
  CALL: CALL,
  CANCEL: CANCEL,
  CUSTOM: CUSTOM,
  TYPE_NULL: TYPE_NULL,
  TYPE_UNDEFINED: TYPE_UNDEFINED,
  TYPE_STRING: TYPE_STRING,
  TYPE_ARRAY: TYPE_ARRAY,
  TYPE_BOOLEAN: TYPE_BOOLEAN,
  TYPE_OBJECT: TYPE_OBJECT,
  TYPE_FUNCTION: TYPE_FUNCTION,
  TYPE_ERROR: TYPE_ERROR,
  TYPE_SYMBOL: TYPE_SYMBOL,
  TYPE_GENERATOR_FUNCTION: TYPE_GENERATOR_FUNCTION
};

/* eslint-disable no-console */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-self-compare */

/* eslint-disable prefer-const */

/* eslint-disable no-var */

/* eslint-disable no-plusplus */

/* eslint-disable no-lonely-if */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-underscore-dangle */
var CONSTRUCTOR_CHECK = {
  string: String,
  number: Number,
  boolean: Boolean
};

var errorConsole = function errorConsole(parentObj, error, path) {
  var func = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var notFound = arguments.length > 4 ? arguments[4] : undefined;
  if (!func) console.log("%c".concat(notFound ? '%c key' : "".concat(parentObj, " %c is undefined"), "%c \"").concat(error, "\" %cnot found ").concat(notFound ? "in %c\"".concat(parentObj, "\"%c object") : '%c%c', " %c ").concat(path, " %c is invalid"), 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: green; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');else console.log("%c".concat(parentObj, " %c is found %c \"").concat(error, "\" %c not a function %c ").concat(path, " %c is invalid"), 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');
};

var errorLog = function errorLog() {
  var e = new Error();
  var stack = e.stack.toString().split(/\r\n|\n/);
  console.log('Error :');
  stack.splice(0, 1);
  stack.map(function (err, index) {
    return console.log("[".concat(stack[stack.length - 1 - index], " ]"));
  }); // console.log(`[ Error ${stack[stack.length - 1]} ]`);
};
/**
 * Required parameter for nullcheck
 *  @param object parent object {},[] !9
 *  @param path  path to be execute eg: a.b.c.e()[0]().f !(Required)
 *  @param default  default value to be print if it is null or error (optional)
 *  @param func  function parameters [ [1],[2]] (optional)
 *  @param errorDisplay  whether to show error in console - default false (optional)
 */


var nullCheck = function nullCheck(Error) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = arguments.length > 2 ? arguments[2] : undefined;
  var def = arguments.length > 3 ? arguments[3] : undefined;
  var callBack = arguments.length > 4 ? arguments[4] : undefined;
  var func = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var errorDisplay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var returnDefaultData = def !== undefined ? def : undefined;

  if (typeof path !== 'string') {
    if (errorDisplay) {
      console.log("%c[Object] path is invalid it should be string", 'background: #000; color: orange; font-size: 12px');
      errorLog(new Error());
    }

    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }

  var propNames = path.split(/\.|\[|\(/);
  propNames = propNames.map(function (prop) {
    return prop.replace(/\]|\(/g, '').replace(/\)/, '()');
  });
  var parent = propNames.splice(0, 1);

  if (!obj || _typeof(obj) !== 'object' || Object.keys(obj).length === 0) {
    if (errorDisplay) errorLog(new Error());
    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }

  var data = obj;
  var error = parent;
  var index = 0;
  var parentObj = error; // eslint-disable-next-line no-undef-init

  var type = undefined;

  for (var key = 0; key < propNames.length; key++) {
    if (data[propNames[key]] || typeof data === 'boolean' || Object.prototype.hasOwnProperty.call(data, propNames[key])) {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = "".concat(error, "[").concat(propNames[key], "]");else error = "".concat(error, ".").concat(propNames[key]);
      data = data[propNames[key]];
      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
      }

      if ((data || typeof data === 'boolean') && propNames[key + 1] && typeof data[propNames[key + 1]] === 'function') {
        type = data;
      }

      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }

        if (_typeof(data) !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, false);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }
    } else if (propNames[key] === '()') {
      error = "".concat(error).concat(propNames[key]);

      if (typeof data === 'function') {
        if (CONSTRUCTOR_CHECK[_typeof(type)]) {
          if (func && func[index]) data = CONSTRUCTOR_CHECK[_typeof(type)].prototype[propNames[key - 1]].apply(type, func[index]);else data = CONSTRUCTOR_CHECK[_typeof(type)].prototype[propNames[key - 1]].call(type);
        } else {
          if (func && func[index]) data = data.apply(null, _toConsumableArray(func[index]));else data = data();
        }

        if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

        if (!data && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path);
          }

          return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
        }
      } else {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path, true);
        }

        return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
      }

      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
      }

      if ((data || typeof data === 'boolean') && propNames[key + 1] && typeof data[propNames[key + 1]] === 'function') {
        type = data;
      }

      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }

        if (_typeof(data) !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }

      index += 1;
    } else {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = "".concat(error, "[").concat(propNames[key], "]");else error = "".concat(error, ".").concat(propNames[key]);

      if (errorDisplay) {
        errorLog(new Error());
        errorConsole(error, propNames[key], path, false, true);
      }

      return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
    }

    parentObj = error;
  }

  var verifyData = (data || typeof data === 'boolean') && Object.prototype.toString.call(def) !== '[object Null]' && typeof def !== 'undefined' && Object.prototype.toString.call(data) === Object.prototype.toString.call(def) ? data : typeof def !== 'undefined' && Object.prototype.toString.call(def) !== '[object Null]' ? def : data;
  return typeof callBack === 'function' ? callBack(verifyData) : verifyData;
};

var nullcheck = nullCheck.bind(null, Error);

var passwordReg = new RegExp(/^.{6,16}$/);
var emailReg = new RegExp('^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$');
var mobileReg = new RegExp(/^\d{10,10}$/);
var nameReg = new RegExp('^[a-zA-Z ]+$');
var stringReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
var numberReg = new RegExp('^[\\d]+$');
var decimalReg = new RegExp('^[+-]?([0-9]*[.])?[0-9]+');
var postiveIntegerReg = new RegExp('^([1-9][0-9]+|[0-9])$');

/* eslint-disable */

function _isEmpty(value) {
  if (value && typeof value === 'string' && value.trim()) return false;
  if (typeof value === 'number' && (value || value === 0)) return false;
  return true;
}
function _isValidPassword(value) {
  return passwordReg.test(value.trim());
}
function _isValidEmail(value) {
  return emailReg.test(value.trim());
}
function _isValidMobile(value) {
  return mobileReg.test(value.trim());
}
function _isValidNumber(value) {
  return numberReg.test(value);
}
function _isValidFloatNumber(value) {
  return decimalReg.test(value);
}
function _isPostiveInteger(value) {
  return postiveIntegerReg.test(value);
}
function _isMatching(val1, val2) {
  // return type should be boolean
  if (val1 && val2 && typeof val1 === 'string' && typeof val2 === 'string' && val1.trim() == val2.trim()) return true;
  return false;
}
function _isValidName(value) {
  return nameReg.test(value.trim());
}
function _isValidString(value) {
  return stringReg.test(value.trim());
}
function _isValidTextAreaInput(value) {
  return value.length > 4 ? false : true;
}
function _isValidArray(value) {
  return value.length > 0 ? false : true;
}

/* eslint-disable no-underscore-dangle */

function validateForm(validationData) {
  // let value = this[`${type}Ref`].value(),
  var error = {
    isError: false
  }; // eslint-disable-next-line

  Object.entries(validationData).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        formObject = _ref2[1];

    var type = formObject.type,
        value = formObject.value,
        message = formObject.message,
        _formObject$optional = formObject.optional,
        optional = _formObject$optional === void 0 ? false : _formObject$optional,
        formatMessage = formObject.formatMessage,
        emptyMessage = formObject.emptyMessage,
        length = formObject.length,
        _formObject$regex = formObject.regex,
        regex = _formObject$regex === void 0 ? {} : _formObject$regex,
        callback = formObject.callback; // const isEmpty = validate._isEmpty(validationData[value].value);

    var isEmpty;

    if (!optional || value) {
      if (Array.isArray(value)) {
        isEmpty = !value.length > 0;
      } else {
        isEmpty = _isEmpty(value);
      }

      var typeMatch = {};
      if (typeof callback === 'function' && !isEmpty) error["".concat(key)] = callback({
        type: type,
        value: value,
        message: message,
        optional: optional,
        formatMessage: formatMessage,
        emptyMessage: emptyMessage,
        length: length,
        regex: regex
      }) || null;else if (!isEmpty) {
        // Add more cases depending upon the types that need to be checked
        // eslint-disable-next-line default-case
        switch (type) {
          case 'email':
            typeMatch.hasPassed = (regex.test || _isValidEmail)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Email eg. (abc@abc.com)';
            }

            break;

          case 'mobile':
            typeMatch.hasPassed = _isValidMobile(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Mobile Number';
            }

            break;

          case 'password':
            typeMatch.hasPassed = (regex.test || _isValidPassword)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Passwords must contain at least 6 characters to 20 characters';
            }

            break;

          case 'confirmPassword':
            {
              // eslint-disable-line no-case-declarations
              // const password  = findKey(validationData, { type: 'password' });
              var password = validationData[key].compareValue;
              typeMatch.hasPassed = _isMatching(password, value);

              if (!typeMatch.hasPassed) {
                error["".concat(key)] = message || 'Password & Confirm password do not match';
              }

              break;
            }

          case 'string':
            typeMatch.hasPassed = (regex.test || _isValidString)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'name':
            typeMatch.hasPassed = (regex.test || _isValidName)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = formatMessage || 'Invalid format';
            }

            if (validationData[value] && value.length < (length === 0 ? length : 3)) {
              error["".concat(key)] = message || 'Name Must Be Greater Than 2 Characters';
            }

            break;

          case 'number':
            typeMatch.hasPassed = (regex.test || _isValidNumber)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'float':
            typeMatch.hasPassed = (regex.test || _isValidFloatNumber)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'postiveIntegerReg':
            typeMatch.hasPassed = (regex.test || _isPostiveInteger)(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Enter a valid input';
            }

            break;

          case 'array':
            typeMatch.hasPassed = _isValidArray(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please upload Images';
            }

            break;

          case 'textarea':
            typeMatch.hasPassed = _isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;

          case 'dateString':
            typeMatch.hasPassed = _isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;
        }
      } else {
        error[key] = validationData[key].type === 'mobile' ? emptyMessage || 'Please enter Valid Mobile Number' : emptyMessage || 'Please provide the necessary details';
      }
    }
  });

  if (Object.keys(error).length > 1) {
    error.isError = true;
  }

  return error;
}

function CustomError(err) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fileName = arguments.length > 2 ? arguments[2] : undefined;
  var lineNumber = arguments.length > 3 ? arguments[3] : undefined;
  var instance = new Error(message, fileName, lineNumber);
  instance = err;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError);
  }

  return instance;
}

CustomError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomError, Error);
}

var cloneObject = function cloneObject(oldState) {
  var newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({}, oldState, newState);
};
var newObject = function newObject() {
  var oldState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.reduce(function (acc, curr) {
    return cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr);
  }, cloneObject(oldState));
};

function deleteIn(obj, arr) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return function () {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map(function (data, ind) {
          if (+arr[i] === ind) {
            if (arr.length - 1 === i) {
              if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
              return Array.isArray(o) ? null : o;
            }

            return function () {
              o = data;
              i += 1;
              return update();
            }();
          }

          return data;
        }).filter(function (e) {
          return e;
        }) : function () {
          if (arr.length - 1 === i) {
            if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
            return o;
          }

          return o;
        }();
        return a;
      }();
    }

    return function () {
      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }

      return cloneObject(o, _defineProperty({}, arr[i], function () {
        o = o[arr[i]];
        i += 1;
        return update();
      }()));
    }();
  }

  return update();
}

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */
function getIn(obj, arr) {
  var i = 0;
  var o = obj;

  function get() {
    return arr.length > 0 && arr.length - 1 === i ? typeof o === 'undefined' || o === null ? o : o[arr[i]] : function () {
      if (typeof o === 'undefined' || o === null) return o;
      o = o[arr[i]];
      i += 1;
      return get();
    }();
  }

  return arr.length > 0 ? get() : obj;
}

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-continue */
function objectEquals(x, y) {
  if (x === y) return true; // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false; // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false; // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var _i = 0, _Object$entries = Object.entries(x); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 1),
        p = _Object$entries$_i[0];

    if (!(p in x)) continue; // other properties were tested using x.constructor === y.constructor

    if (!(p in y)) return false; // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue; // if they have the same strict value or identity then they are equal

    if (_typeof(x[p]) !== 'object') return false; // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!Object.equals(x[p], y[p])) return false; // Objects and Arrays must be tested recursively
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(y); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 1),
        _p = _Object$entries2$_i[0];

    if (_p in y && !(_p in x)) return false; // allows x[ p ] to be set to undefined
  }

  return true;
}

function setIn(obj, arr, value) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return function () {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map(function (data, ind) {
          if (+arr[i] === ind) {
            return arr.length - 1 === i ? value : function () {
              o = data;
              i += 1;
              return update();
            }();
          }

          return data;
        }) : function () {
          o[+arr[i]] = value;
          return o;
        }();
        return a;
      }();
    }

    return cloneObject(o, _defineProperty({}, arr[i], arr.length - 1 === i ? value : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return update();
}

function updateIn(obj) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return o.slice().map(function (data, ind) {
        if (+arr[i] === ind) {
          return arr.length - 1 === i ? callback(data) : function () {
            o = data;
            i += 1;
            return update();
          }();
        }

        return data;
      });
    }

    return cloneObject(o, _defineProperty({}, arr && arr[i], arr.length - 1 === i ? callback(o[arr[i]]) : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return arr.length > 0 ? update() : obj;
}

var generateTimeStamp = function generateTimeStamp() {
  return new Date().getTime();
};
var toCapitalize = function toCapitalize(string) {
  return string && typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : null;
};
var type = {
  '[object Null]': TYPE_NULL,
  '[object Undefined]': TYPE_UNDEFINED,
  '[object String]': TYPE_STRING,
  '[object Array]': TYPE_ARRAY,
  '[object Boolean]': TYPE_BOOLEAN,
  '[object Object]': TYPE_OBJECT,
  '[object Function]': TYPE_FUNCTION,
  '[object Error]': TYPE_ERROR,
  '[object Symbol]': TYPE_SYMBOL,
  '[object GeneratorFunction]': TYPE_GENERATOR_FUNCTION
};
var typeOf = function typeOf(_obj) {
  return typeof _obj === 'undefined' ? _typeof(_obj) : type[Object.prototype.toString.call(_obj)] || _typeof(_obj);
};
var trimStrings = function trimStrings() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value && typeof value === 'string' && String(value)) {
    var trimedString = String(value).trim();
    return isNumber ? Number(trimedString) : trimedString;
  }

  return value;
};

// <============================ common actions ==============================>

var successAction = function successAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return {
      type: actionType,
      response: {
        type: type,
        data: data,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var errorAction = function errorAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var error = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return {
      type: actionType,
      response: {
        type: type,
        error: error,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var callAction = function callAction(actionType) {
  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      type: actionType,
      payload: payload
    };
  };
};

var cancelAction = function cancelAction(actionType) {
  return function (type, method, filter, cancelKey) {
    return {
      type: cancelKey && typeOf(cancelKey) === 'string' && cancelKey.length ? "".concat(actionType, "_[").concat(cancelKey, "]") : actionType,
      response: {
        type: type,
        method: method,
        payload: {
          filter: filter
        }
      }
    };
  };
};

var customAction = function customAction(actionType) {
  return function (type, method, payload) {
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var statusCode = arguments.length > 4 ? arguments[4] : undefined;
    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        data: data,
        statusCode: statusCode || method === ON_SUCCESS ? 200 : null,
        customTask: true,
        payload: payload
      }
    };
  };
};

var actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};

var cache = {};
var cacheActions = {};
var safe = nullcheck;
var getData = function getData(data, def) {
  var loader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return _objectSpread(_objectSpread({}, safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.')), {})), {}, {
    data: safe(data, ".data".concat(filter.length ? '.' : '').concat(filter.join('.')).concat(filter.length ? '.data' : ''), def),
    loader: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".loading.status"), typeof loader !== 'boolean' ? false : loader),
    lastUpdated: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".lastUpdated")),
    isInfinite: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isInfinite"), false),
    infiniteEnd: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".infiniteEnd"), false),
    isError: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isError"), false),
    toast: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".toast"), {}),
    error: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".error"), {})
  });
};

var checkKey = function checkKey(key, name, dataType, message) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be  ").concat(message || dataType));
};

var checkKeyWithMessage = function checkKeyWithMessage(key, dataType, message) {
  invariant(typeOf(key) === dataType, message);
};

var previousData = new Map();
var initialRender = new Map();
var previousCallbackData = new Map();
var previousDependencyArrayData = new Map();
var isPreviousDependencyArrayCheckPassed = new Map();

var exeuteRequiredData = function exeuteRequiredData(_data) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var initialData = (e.requiredKey || []).reduce(function (acc, _reqKey) {
    return _objectSpread(_objectSpread({}, acc), _reqKey && typeOf(_reqKey.key || _reqKey) === 'string' ? typeOf(_reqKey) === 'string' ? _defineProperty({}, _reqKey, undefined) : _defineProperty({}, _reqKey.key, _reqKey.default) : {});
  }, {});
  return e && e.requiredKey && Array.isArray(e.requiredKey) && e.requiredKey.length > 0 && typeOf(_data) === 'object' ? e.requiredKey.reduce(function (acc, _reqKey) {
    return _objectSpread(_objectSpread({}, acc), _reqKey && typeOf(_reqKey.key || _reqKey) === 'string' ? _defineProperty({}, _reqKey.key || _reqKey, typeOf(_data[_reqKey.key || _reqKey]) !== undefined ? _data[_reqKey.key || _reqKey] : _reqKey.default) : {});
  }, _objectSpread({}, initialData)) : e && e.requiredKey ? _data || _objectSpread({}, initialData) : _data;
};

var _checkFilter = function _checkFilter(e) {
  return e && e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
};

var _getData = function _getData() {
  var ee = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isString = arguments.length > 1 ? arguments[1] : undefined;

  var _state = arguments.length > 2 ? arguments[2] : undefined;

  var name = arguments.length > 3 ? arguments[3] : undefined;
  var array = arguments.length > 4 ? arguments[4] : undefined;
  var state = _state || {};

  var _getDataFunc = function _getDataFunc(e) {
    // const regex = `app\/containers\/${name}\/+.*?_CALL`;
    var regex = REDUCER_BASE_PATH.concat(name, '/+.*?_CALL');
    var isSearchMatched = ((isString ? array : e.key) || '').search(regex) > -1;
    return (typeof e.defaultDataFormat === 'boolean' || !isSearchMatched || !(isString ? array : e.key) ? !e.defaultDataFormat || !isSearchMatched || !(isString ? array : e.key) : false) ? (isString ? array : e.key) ? safe(state, "[".concat(isString ? array : e.key, "]").concat(e.query ? e.query : ''), e.default) : // : name
    // ? safe(state, `${e.query ? e.query : ''}`, e.default)
    safe(state, "".concat(e.query ? e.query : ''), e.default) : safe(getData(safe(state, "[".concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e), e.dataQuery), "".concat(e.query && typeOf(e.query) === 'string' ? e.query : ''), e.query ? e.default !== undefined ? e.default : undefined : undefined);
  };

  return Array.isArray(ee.query) ? ee.query.reduce(function (acc, _query) {
    return acc.concat([_getDataFunc(_objectSpread(_objectSpread({}, ee), {}, {
      query: _query.key || _query,
      default: _query.default || undefined
    }))]);
  }, []) : _getDataFunc(ee);
};

var _GetData = function _GetData(_state, name, array, config) {
  var state = _state || {};
  var _data = {};

  if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-underscore-dangle
    _data = (typeOf(array) === 'object' ? [array] : array).reduce(function (acc, e) {
      if (typeOf(e) === 'object') {
        if (typeOf(array) === 'object') return exeuteRequiredData(_getData(e, undefined, state, name, array), e);

        var _arr2 = acc.slice();

        _arr2.push(exeuteRequiredData(_getData(e, undefined, state, name, array), e));

        return _arr2;
      } // Below condition ( one config for all the keys )


      if (typeOf(e) === 'string' && typeOf(config) === 'object') {
        var _config = _objectSpread({
          key: e
        }, config);

        if (typeOf(array) === 'object') return exeuteRequiredData(_getData(_config, undefined, state, name, array), _config);

        var _arr3 = acc.slice();

        _arr3.push(exeuteRequiredData(_getData(_config, undefined, state, name, array), _config));

        return _arr3;
      }

      if (typeOf(array) === 'object') return safe(state, "[".concat(e.key, "]"));

      var _arr = acc.slice();

      _arr.push(safe(state, "[".concat(e, "]")));

      return _arr;
    }, typeOf(array) === 'object' ? {} : []); // if()
  } else if (typeof array === 'string' && config && typeOf(config) === 'array') _data = config.reduce(function (acc, _config) {
    return [].concat(_toConsumableArray(acc), [exeuteRequiredData(_getData(_config, true, state, name, array), _config)]);
  }, []);else if (typeof array === 'string') _data = exeuteRequiredData(_getData(config, true, state, name, array), config);else if (name) _data = state;else _data = state || {};

  return _data;
};

var _execute = function _execute(state, name, array, config, _key, callback) {
  var _queryData = previousData.get(_key);

  var isPassed = isPreviousDependencyArrayCheckPassed.get(_key);

  if ((config && config.dependencyArray && !Array.isArray(config.dependencyArray)) && !isPassed) {
    invariant(false, "dependencyArray expected an array but got ".concat(typeOf(config.dependencyArray)));
  } else if (isPassed || config && config.dependencyArray && Array.isArray(config.dependencyArray)) {
    if (!isPassed && config.dependencyArray.filter(function (e) {
      return typeof e !== 'string';
    })[0]) invariant(false, 'dependencyArray must be array of string');else {
      if (!isPassed) isPreviousDependencyArrayCheckPassed.set(_key, true);

      var _next = config.dependencyArray.map(function (_e) {
        return safe(state, _e);
      });

      var _previous = previousDependencyArrayData.get(_key);

      previousDependencyArrayData.set(_key, _next);

      if (isEqual(_previous, _next)) {
        return {
          isEqualCheck: true,
          data: previousCallbackData.get(_key) || _queryData
        };
      }
    }
  }

  var _data = _GetData(state, name, array, config);

  var _isEqual = isEqual(_data, _queryData);

  if (!_isEqual) {
    var callbackData;
    previousData.set(_key, _data);
    if (callback && typeof callback === 'function') callbackData = callback(_data);

    if (callbackData) {
      _queryData = callbackData;
      previousCallbackData.set(_key, callbackData);
    } else {
      previousCallbackData.set(_key, null);
      _queryData = _data;
    }
  } else _queryData = previousCallbackData.get(_key) || _queryData;

  previousData.set(_key, _data);
  return {
    data: _queryData
  };
};

var useQuery = function useQuery() {
  var _name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var _array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var __config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _callback = arguments.length > 3 ? arguments[3] : undefined;

  var _callbackSuccess = arguments.length > 4 ? arguments[4] : undefined;

  var _ref21 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
      _ref21$refreshKey = _ref21.refreshKey,
      _refreshKey = _ref21$refreshKey === void 0 ? undefined : _ref21$refreshKey;

  var _ref22 = typeOf(_name) === 'object' ? _name : {
    reducerName: _name,
    key: _array,
    config: __config,
    callback: _callback,
    callbackSuccess: _callbackSuccess,
    refreshKey: _refreshKey
  },
      name = _ref22.reducerName,
      array = _ref22.key,
      config = _ref22.config,
      callback = _ref22.callback,
      callbackSuccess = _ref22.callbackSuccess,
      refreshKey = _ref22.refreshKey;

  if (name) checkKey(name, 'reducer name', 'string', 'valid string'); // const store = useStore();

  var _useState = React.useState({}),
      _useState2 = _slicedToArray(_useState, 1),
      _key = _useState2[0];

  React.useEffect(function () {
    previousData.set(_key, {});
    initialRender.set(_key, true);
    return function () {
      previousData.delete(_key);
      previousCallbackData.delete(_key);
      initialRender.delete(_key);
      previousDependencyArrayData.delete(_key);
    };
  }, []);
  var equalityCheckFunction = React.useCallback(function (e, f) {
    var _isEqual = typeof e.isEqualCheck === 'undefined' ? isEqual(e.data, f.data) : e.isEqualCheck;

    if ((!_isEqual || initialRender.get(_key)) && typeof callbackSuccess === 'function') {
      initialRender.set(_key, false);
      callbackSuccess(e.data
      /* Updated Data */
      , f.data
      /* Previous Data */
      );
    }

    return _isEqual;
  }, []);
  var selectReducerKey = React.useMemo(function () {
    var _arr = [];

    var executeRequiredKey = function executeRequiredKey(_requiredKey) {
      return _requiredKey.forEach(function (e) {
        if (typeof e === 'string') _arr.push(e);else if (typeOf(e) === 'object' && e.key) _arr.push(e.key);
      });
    };

    if (typeof array === 'string' && array) _arr.push(array);else if (Array.isArray(array) || typeOf(array) === 'object') (Array.isArray(array) ? array : [array]).forEach(function (arr) {
      if (typeof arr === 'string') _arr.push(arr);else if (typeOf(arr) === 'object') {
        if (arr.key) {
          _arr.push(arr.key);
        } else if (Array.isArray(arr.requiredKey) && arr.requiredKey.length > 0) {
          executeRequiredKey(arr.requiredKey);
        } else if (arr.query) {
          var getKey = function getKey(_query) {
            return _query[0] === '.' ? _query.split('.')[1] : _query.split('.')[0];
          };

          if (typeof arr === 'string') _arr.push(getKey(arr));else if (Array.isArray(arr.query) && arr.query.length > 0) arr.query.forEach(function (e) {
            if (typeof e === 'string') _arr.push(getKey(e));else if (typeOf(e) === 'object' && e.key) _arr.push(getKey(e.key));
          });
        }
      }
    });
    return _arr;
  }, [refreshKey]);
  var selectState = React.useMemo(function () {
    if (selectReducerKey && selectReducerKey.length) {
      var _arr = [];
      selectReducerKey.forEach(function (_k) {
        return _arr.push(function (state) {
          return state[name] && state[name][_k];
        });
      });
      if (_arr.length > 0) return _arr;
    }

    return [function (state) {
      return state[name];
    }];
  }, [selectReducerKey]);
  var executeSelector = React.useCallback(function () {
    for (var _len = arguments.length, rest = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      rest[_key2] = arguments[_key2];
    }

    if (selectReducerKey.length > 0 || typeOf(array) === 'object' && !array.key && array.requiredKey) {
      if (typeOf(array) === 'object' && !array.key && array.requiredKey) {
        if (Array.isArray(array.requiredKey) && array.requiredKey.length) return {
          data: array.requiredKey.reduce(function (acc, curr, i) {
            if (typeOf(curr) === 'object') return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr, rest[i] === undefined ? curr && curr.default : rest[i]));
            return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr, rest[i]));
          }, {})
        };
        return {
          data: {}
        };
      }

      var _stateObj = selectReducerKey.reduce(function (acc, curr, i) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr, rest[i]));
      }, {});

      return _execute(_stateObj, name, array, config, _key, callback);
    }

    return _execute(rest[0], name, array, config, _key, callback);
  }, [selectReducerKey, refreshKey]);
  var createdSelector = React.useMemo(function () {
    return reselect.createSelector(selectState, executeSelector);
  }, [executeSelector, selectState]);

  var _selectorData = reactRedux.useSelector(!name || !array ? function (state) {
    return _execute(state, name, array, config, _key, callback);
  } : createdSelector, !name || !array ? undefined : equalityCheckFunction);

  return _selectorData.data;
};
/* example
 * const actions = useActions('newActions', {
 *   new: () => {
 *       // redux-thunk
 *       return dispatch => {
 *         console.log(dispatch);
 *         return {
 *           type: 'fjjf',
 *         };
 *       };
 *     },
 * });
 * actions.new();
 * console.log(actions, 'actions');
 */

var useActionsHook = function useActionsHook() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var dispatch = reactRedux.useDispatch();

  var _useState3 = React.useState(!actions ? cacheActions[name] || {} : redux.bindActionCreators(actions, dispatch)),
      _useState4 = _slicedToArray(_useState3, 2),
      dispatchAction = _useState4[0],
      setDispatchAction = _useState4[1];

  React.useEffect(function () {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = redux.bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};
/* example
 * const mutateState = useMutation(reducerName);
 * mutateState({
 *   key: DEMP_API,
 *   value: {
 *     data: {}
 *   }
 *   filter: []
 * })
 */

var useMutation = function useMutation(reducerName) {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  var store = reactRedux.useStore();
  React.useEffect(function () {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', " reducerName '".concat(reducerName, "' not a valid reducer key."));
  }, []);
  var dispatch = reactRedux.useDispatch();

  var _callback = React.useCallback(function (_ref23) {
    var type = _ref23.key,
        value = _ref23.value,
        _ref23$filter = _ref23.filter,
        filter = _ref23$filter === void 0 ? [] : _ref23$filter;
    if (!type) checkKey(null, 'key', 'string', 'valid string');

    var _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) invariant(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    "'key' is invalid.".concat(type, " not found in ").concat(reducerName, " reducer"));
    checkKey(filter, 'filter', 'array');
    checkKey(type, 'key', 'string'); // const regex = `app\/containers\/${reducerName}\/+.*?_CALL`;

    var regex = REDUCER_BASE_PATH.concat(reducerName, '/+.*?_CALL');
    var isSearchMatched = (type || '').search(regex) > -1;

    if (type.includes('_CALL') && type.slice(-5) === '_CALL' && isSearchMatched && filter && Array.isArray(filter)) {
      // checkKey(value, 'value', 'object');
      console.log(store.getState()[reducerName][type]);
      dispatch({
        type: type.slice(0, -4).concat('CUSTOM_TASK'),
        response: {
          type: type,
          method: ON_SUCCESS,
          statusCode: 200,
          mutation: true,
          customTask: true,
          data: {
            data: typeof value === 'function' ? value(safe(store.getState()[reducerName][type], ".data".concat(filter.length ? '.' : '').concat(filter.join('.'))), type) : value
          },
          payload: {
            filter: filter
          }
        }
      });
    } else dispatch({
      type: "".concat(reducerName, "_MUTATE_STATE"),
      payload: _defineProperty({}, type, typeof value === 'function' ? value(store.getState()[reducerName][type]) : value)
    });
  }, []);

  return _callback;
};
/* example
 * async function() {
 *   const { data, status } = await toPromise(DEMP_API_CALL, { task: 'Data-Handler' });
 * }
 */

var toPromise = function toPromise(action) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isReject = arguments.length > 2 ? arguments[2] : undefined;
  var dispatch = arguments.length > 3 ? arguments[3] : undefined;
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', "toPromise() : Expected a config (second parameter) to be object");
  return new Promise(function (resolve, reject) {
    return typeof dispatch === 'function' ? dispatch(action(_objectSpread(_objectSpread({}, config), {}, {
      resolve: resolve,
      reject: reject,
      isReject: isReject
    }))) : action(_objectSpread(_objectSpread({}, config), {}, {
      resolve: resolve,
      reject: reject,
      isReject: isReject
    }));
  });
};
/* example
 * const asyncFunction = toPromiseFunction(DEMP_API_CALL);
 * async function() {
 *   const { data, status } = await asyncFunction({ task: 'Data-Handler' });
 * }
 */

var toPromiseFunction = function toPromiseFunction(action, dispatch) {
  return function (config, isReject) {
    if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', "toPromise() : Expected a config (first parameter) to be object");
    return new Promise(function (resolve, reject) {
      return typeof dispatch === 'function' ? dispatch(action(_objectSpread(_objectSpread({}, config), {}, {
        resolve: resolve,
        reject: reject,
        isReject: isReject
      }))) : action(_objectSpread(_objectSpread({}, config), {}, {
        resolve: resolve,
        reject: reject,
        isReject: isReject
      }));
    });
  };
};
/* example
 *  const execute = toPromiseAllFunction([DEMO_URL_CALL, DEMO_API_URL_CALL]);
 *  const asyncfunc = async () => {
 *      try {
 *        const data = await execute([],{ isReject: false });
 *        console.log(data, '=============');
 *      } catch (err) {
 *        console.log(err);
 *      }
 *    };
 *    asyncfunc();
 */

var toPromiseAllFunction = function toPromiseAllFunction() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dispatch = arguments.length > 1 ? arguments[1] : undefined;
  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var defaultConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (typeOf(config) !== 'null' && typeOf(config) !== 'undefined' && typeOf(config) !== 'array') checkKeyWithMessage(config, 'object', "toPromise() : Expected a (first parameter) to be an Array or Object");
    return Promise.all(actions.map(function (action, i) {
      return new Promise(function (resolve, reject) {
        var CONFIG = _objectSpread(_objectSpread({}, (typeOf(config) === 'object' ? config : config[i] && config[i].config) || defaultConfig.config || {}), {}, {
          resolve: resolve,
          reject: reject,
          isReject: !!(typeOf(config) === 'object' ? config.isReject || defaultConfig.isReject : config[i] && config[i].isReject || defaultConfig.isReject)
        });

        return typeof dispatch === 'function' ? dispatch(action(CONFIG)) : action(CONFIG);
      });
    }));
  };
};
var CACHE = {};

function stringify(val) {
  return _typeof(val) === 'object' ? JSON.stringify(val) : String(val);
}

function hashArgs() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return args.reduce(function (acc, arg) {
    return "".concat(stringify(arg), ":").concat(acc);
  }, '');
}
/* example => used for background refresh it won't trigger the loader everytime api starts
 * const pollingConfig = {
 *   request: {
 *     polling: true,
 *     delay: 8000,
 *   },
 * };
 * const CALL_ON_MOUNT = true
 * const [refresh, isUpdating] = useStaleRefresh(
 *   VENDORS_GET_DASBOARD_API_CALL,
 *   VENDORS_GET_DASBOARD_API,
 *   pollingConfig,
 *   CALL_ON_MOUNT // calls api once mounted
 * );
 * const [fetchOrders, isUpdating] = useStaleRefresh(
 *   VENDORS_GET_ORDERS_BY_DAY_API_CALL,
 *   VENDORS_GET_ORDERS_BY_DAY_API,
 *   pollingConfig,
 * );
 * useEffect(() => {
 *   function pollingStart() {
 *     /// fetchOrders({loader, clearData, config}); optional parameters
 *     fetchOrders();
 *   }
 *   function pollingEnd() {
 *     VENDORS_GET_DASBOARD_API_CANCEL();
 *     VENDORS_GET_ORDERS_BY_DAY_API_CANCEL();
 *   }
 *   pollingStart();
 *   window.addEventListener('online', pollingStart);
 *   window.addEventListener('offline', pollingEnd);
 *   return () => {
 *     window.removeEventListener('online', pollingStart);
 *     window.removeEventListener('offline', pollingEnd);
 *     VENDORS_GET_DASBOARD_API_CANCEL();
 *     VENDORS_GET_ORDERS_BY_DAY_API_CANCEL();
 *   };
 * }, []);
 */


function useStaleRefresh(fn, name) {
  var arg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var initial // initialLoadingstate = true,
  = arguments.length > 3 ? arguments[3] : undefined;
  var prevArgs = React.useRef(null);

  var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      isUpdating = _useState6[0],
      setIsUpdating = _useState6[1];

  var refresh = React.useCallback(function () {
    var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        loader = _ref24.loader,
        clearData = _ref24.clearData,
        config = _ref24.config;

    var args = config || arg;
    var cacheID = hashArgs(name, args); // look in cache and set response if present
    // fetch new data

    if (CACHE[cacheID]) setIsUpdating(true);
    toPromise(fn, Object.assign({}, args, CACHE[cacheID] && !loader ? {
      initialCallData: CACHE[cacheID]
    } : {}, clearData ? {
      task: args.task ? _objectSpread(_objectSpread({}, args.task), {}, {
        clearDataOnStart: true
      }) : {
        clearDataOnStart: true
      }
    } : {})).then(function (newData) {
      if (CACHE[cacheID]) setIsUpdating(false);

      if (newData && newData.status === 'SUCCESS') {
        CACHE[cacheID] = newData.data; // setData(newData);
      } // setLoading(false);

    });
  }, [arg, initial]);
  React.useEffect(function () {
    // args is an object so deep compare to rule out false changes
    if (isEqual(arg, prevArgs.current)) {
      return;
    }

    if (initial) refresh(); // cacheID is how a cache is identified against a unique request
  }, [arg, fn, name, initial]);
  React.useEffect(function () {
    prevArgs.current = arg;
  });
  return [refresh, isUpdating];
}
/* example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */

var useMutateReducer = function useMutateReducer(reducerName) {
  var store = reactRedux.useStore();
  var dispatch = reactRedux.useDispatch();

  var _callback = React.useCallback(function (callback) {
    var state = reducerName ? store.getState()[reducerName] : store.getState();
    var newState = callback(state);
    if (newState) dispatch({
      type: reducerName ? "".concat(reducerName, "_MUTATE_STATE") : 'MUTATE_STATE',
      payload: newState || {}
    });
  }, []);

  return _callback;
};
/* example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */

var useCancelAllRunningApiCalls = function useCancelAllRunningApiCalls(reducerName) {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useCancelAllRunningApiCalls(`reducerkey`) : Expected a valid reducer key');
  var store = reactRedux.useStore();
  var dispatch = reactRedux.useDispatch();

  var _callback = React.useCallback(function () {
    var dontCancelKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var state = store.getState()[reducerName];
    var actions = Object.entries(state).reduce(function (acc, _ref25) {
      var _ref26 = _slicedToArray(_ref25, 2),
          key = _ref26[0],
          value = _ref26[1];

      var regex = REDUCER_BASE_PATH.concat(reducerName, '/+.*?_CALL');
      var isSearchMatched = (key || '').search(regex) > -1;

      var _dontCancelKeys = Array.isArray(dontCancelKeys) ? dontCancelKeys : [];

      if (key && key.includes('_CALL') && key.slice(-5) === '_CALL' && isSearchMatched && safe(value, '.loading.status', false) && !_dontCancelKeys.includes(key)) return acc.concat([{
        type: key.replace('_CALL', '_CANCEL')
      }]);
      return acc;
    }, []);

    if (actions && actions.length > 0) {
      reactRedux.batch(function () {
        for (var i = 0; i < actions.length; i++) {
          dispatch(actions[i]);
        }
      });
    }
  }, []);

  return _callback;
};
/* example
 * const resetState = useResetState(reducerName);
 * const dontResetKeys = ['isLoggedIn'];
 * resetState(dontResetKeys); it will reset state to initial state except some dontResetKeys
 */

var useResetState = function useResetState(reducerName) {
  var dispatch = reactRedux.useDispatch();

  var _callback = React.useCallback(function () {
    var dontResetKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    dispatch({
      type: reducerName ? "".concat(reducerName, "_RESET_STATE") : 'RESET_STATE',
      payload: dontResetKeys
    });
  }, []);

  return _callback;
};
/* example
 * const resetState = useResetOnlyApiEndPointsState(reducerName);
 * const dontResetKeys = ['isLoggedIn'];
 * resetState(dontResetKeys); it will reset only endpoints to initial state except some dontResetKeys
 */

var useResetOnlyApiEndPointsState = function useResetOnlyApiEndPointsState(reducerName) {
  var dispatch = reactRedux.useDispatch();

  var _callback = React.useCallback(function () {
    var dontResetKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    dispatch({
      type: reducerName ? "".concat(reducerName, "_RESET_API") : 'RESET_API',
      payload: dontResetKeys
    });
  }, []);

  return _callback;
};
/* example
 * const { reducerConstants: { DEMO_API } } = useDemoApi;
 * const refetchApi = useRefetchCachedApi(DEMO_API);
 * refetchApi();
 */

var useRefetchCachedApi = function useRefetchCachedApi(reducerkey) {
  if (!reducerkey) checkKeyWithMessage(reducerkey, 'string', 'useRefetchApi(`reducerkey`) : Expected a valid reducer key');
  var dispatch = reactRedux.useDispatch();

  var _callback = React.useCallback(function (key) {
    var regex = REDUCER_BASE_PATH.concat('+.*?_CALL');
    var isSearchMatched = reducerkey.search(regex) > -1;
    if (isSearchMatched) dispatch({
      type: reducerkey,
      payload: {
        actionCallType: REFETCH_API_QUERY,
        request: {
          key: key
        }
      }
    });
  }, []);

  return _callback;
};
/* example
 * const IS_QUERY_DATA = true;
 * const IS_MUTATION = true;
 * const { reducerConstants: { DEMO_API } } = useDemoApi;
 * const {action: {call,cancel},mutate,data } = useApiQuery(DEMO_API,IS_QUERY_DATA,IS_MUTATION);
 * call();
 * mutate({value: data => data, filter: ['list']})
 */

var useApiQuery = function useApiQuery(reducerkey, isQueryData, isMutation) {
  if (!reducerkey) checkKeyWithMessage(reducerkey, 'string', 'useRefetchApi(`reducerkey`) : Expected a valid reducer key');
  var data;
  var mutation;
  var reducerName = reducerkey.split('/')[2];
  var ref = React.useRef({
    isQueryData: isQueryData,
    isMutation: isMutation
  });
  var dispatch = reactRedux.useDispatch();

  if (ref.current.isMutation) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    mutation = useMutation(reducerName);
  }

  if (ref.current.isQueryData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    data = useQuery(reducerName, {
      key: reducerkey,
      default: {}
    });
  }

  var _action = React.useMemo(function () {
    var regex = REDUCER_BASE_PATH.concat('+.*?_CALL');
    var isSearchMatched = reducerkey.search(regex) > -1;
    if (isSearchMatched) return {
      action: {
        call: function call() {
          return dispatch(actionsHandler.call(reducerkey).apply(void 0, arguments));
        },
        cancel: function cancel() {
          return dispatch(actionsHandler.cancel(reducerkey).apply(void 0, arguments));
        },
        custom: function custom() {
          return dispatch(actionsHandler.custom(reducerkey).apply(void 0, arguments));
        }
      },
      mutate: mutation ? function (_ref27) {
        var _value = _ref27.value,
            _filter = _ref27.filter;
        mutation({
          key: reducerkey,
          value: _value,
          filter: _filter
        });
      } : undefined
    };
    checkKeyWithMessage(null, 'string', "useApiQuery(".concat(reducerkey, ") : Expected a valid reducer key"));
    return {};
  }, []);

  return _objectSpread(_objectSpread({}, _action), {}, {
    data: data,
    type: reducerkey
  });
};

var EventEmitter = require('events');

var valueSymbol = Symbol('valueSymbol');
var previousValueSymbol = Symbol('previousValueSymbol');
var globalKeySymbol = Symbol('globalKeySymbol');
var GLOBAL_KEY = '@@GLOBAL_LISTENER@@';
var GLOBAL_RESET = '@@GLOBAL_RESET@@';

var Global = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Global, _EventEmitter);

  var _super = _createSuper(Global);

  function Global() {
    var _this;

    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Global);

    _this = _super.call(this);
    _this[globalKeySymbol] = GLOBAL_KEY;
    _this[valueSymbol] = value;
    _this[previousValueSymbol] = value;
    return _this;
  }

  _createClass(Global, [{
    key: "emitGlobal",
    value: function emitGlobal(_key, _val) {
      this.emit(this[globalKeySymbol], this[valueSymbol], {
        key: _key,
        value: _val
      });
    }
  }, {
    key: "emitIndividual",
    value: function emitIndividual(_key, _val) {
      this.emit(_key, this[valueSymbol], {
        key: _key,
        value: _val
      });
    }
  }, {
    key: "resetValue",
    value: function resetValue(_val) {
      this[previousValueSymbol] = this[valueSymbol];
      this[valueSymbol] = _val;
      this.emitGlobal(GLOBAL_RESET, this[valueSymbol]);
    }
  }, {
    key: "clearValue",
    value: function clearValue() {
      this[valueSymbol] = {};
      this.emitGlobal(GLOBAL_RESET, this[valueSymbol]);
    }
  }, {
    key: "getValue",
    value: function getValue(_key) {
      return _key ? this[valueSymbol][_key] : this[valueSymbol];
    }
  }, {
    key: "setValue",
    value: function setValue(_key, _val) {
      this[previousValueSymbol] = this[valueSymbol];

      var _value = _objectSpread({}, this[valueSymbol]);

      _value[_key] = _val;
      this[valueSymbol] = _value;
      this.emitGlobal(_key, _val);
    }
  }, {
    key: "value",
    get: function get() {
      return this[valueSymbol];
    }
  }, {
    key: "GLOBAL_KEY",
    get: function get() {
      return this[globalKeySymbol];
    }
  }, {
    key: "dispatch",
    value: function dispatch(_key, _val) {
      this[previousValueSymbol] = this[valueSymbol];

      var _value = _objectSpread({}, this[valueSymbol]);

      _value[_key] = _val;
      this[valueSymbol] = _value;
      this.emitIndividual(_key, _val);
      this.emitGlobal(_key, _val);
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      var _this2 = this;

      this.on(this[globalKeySymbol], function (value, obj) {
        if (!isEqual(_this2[previousValueSymbol], _this2[valueSymbol])) callback(value, obj);
      });
    }
  }]);

  return Global;
}(EventEmitter);

var globals = new Global({});

/** example
 * const {
 *  value,
 *  dispatch,
 *  clearValue,
 *  resetValue,
 *  getValue,
 *  setValue,
 * } = useGlobalValueHook(key<optional>,initialState<optional>);
 * console.log(value);
 * dispatch(key,value);
 * clearValue();
 * resetValue(val<optional>);
 * getValue(key<optional>);
 * setValue(key,value)
 */

function useGlobalValueHook(key, initialValue) {
  var valueRef = React.useRef({
    initial: true
  });

  if (initialValue && _typeof(initialValue) === 'object' && valueRef.current.initial) {
    globals.resetValue(initialValue);
  }

  valueRef.current.initial = false;
  valueRef.current.key = key;

  var _useState = React.useState(initialValue || globals.value),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  valueRef.current.value = values;
  React.useEffect(function () {
    if (valueRef.current.key !== null) globals.subscribe(function (_value) {
      if (key ? _value[key] !== valueRef.current.value[key] : _value !== valueRef.current.value) {
        setValues(_value);
      }
    });
  }, []);
  return {
    value: key ? values[key] : values,
    dispatch: globals.dispatch.bind(globals),
    resetValue: globals.resetValue.bind(globals),
    clearValue: globals.clearValue.bind(globals),
    getValue: globals.getValue.bind(globals),
    setValue: globals.setValue.bind(globals),
    subscribe: globals.subscribe.bind(globals),
    GlobalEmitter: globals
  };
}

var TYPE_OBJECT$1 = commonConstants.TYPE_OBJECT;

var ON_CHANGE = 'onChange';
var ON_BLUR = 'onBlur';
var VALUE = 'value';
var ERROR$1 = 'error';

var emailRegex = /^([\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-z0-9]{2,4})$/;
function validateEmail(email) {
  return emailRegex.test(String(email).toLowerCase());
}

function validate(value, fieldName) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      isOptional = _ref.optional,
      minLength = _ref.minLength,
      isRequired = _ref.isRequired,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? {} : _ref$message,
      length = _ref.length,
      regex = _ref.regex,
      key = _ref.key;

  if ((isOptional || !isRequired) && !value) return '';
  var IS_NO_VALUE = typeof value === 'number' || typeof value === 'boolean' ? false : !value;
  if (value && minLength && value.length < minLength) return message && typeof message.minLength !== 'undefined' ? message.minLength : "Minimum ".concat(minLength, " characters is required");
  if (value && length && value.length !== length) return message && message && typeof message.length !== 'undefined' ? message.length : "Number should be ".concat(length, " digits long");

  switch (fieldName) {
    case 'password':
      {
        if (IS_NO_VALUE) {
          return message && typeof message.required !== 'undefined' ? message.required : 'This field is required';
        }

        return '';
      }

    case 'email':
      {
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'Please enter your email';
        if (value && !validateEmail(value)) return message && typeof message.invalid !== 'undefined' ? message.invalid : 'Invalid email address';
        return '';
      }

    case 'name':
      {
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'Please enter your name'; // if (value && !validateEmail(value)) return 'Invalid email address';

        return '';
      }

    case 'mobileNumber':
      {
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'Please enter 10 digit mobile number';
        return '';
      }

    case 'about':
      {
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'This field is required'; // if (value && !validateEmail(value)) return 'Invalid email address';

        return '';
      }

    default:
      if (IS_NO_VALUE) {
        return message && typeof message.required !== 'undefined' ? message.required : 'This field is required';
      }

      if (regex) {
        if (Object.prototype.toString.call(regex) === '[object RegExp]') {
          if (regex.test(value)) return '';
          return message && typeof message.regex !== 'undefined' ? message.regex : "".concat(key, " is invalid ");
        }

        console.error("".concat(key, " is invalid "));
      }

      return '';
  }
}

var _excluded = ["index", "config", "propKeyMap"];

var getPlatformBasedFieldValue = function getPlatformBasedFieldValue(e) {
  return e && _typeof(e) === 'object' && e.target && typeof e.preventDefault === 'function' ? e.target.value : e;
};

var getPlatformBasedFieldName = function getPlatformBasedFieldName(e) {
  return e && _typeof(e) === 'object' && e.target && typeof e.preventDefault === 'function' ? e.target.name : '';
};

var _setInitialValues = function _setInitialValues(_ref) {
  var formConfig = _ref.formConfig,
      initialValues = _ref.initialValues;
  return Object.entries(formConfig || {}).reduce(function (acc, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        _ref3$ = _ref3[1],
        val = _ref3$ === void 0 ? {} : _ref3$;

    return newObject(acc, _defineProperty({}, key, typeof initialValues[key] !== 'undefined' ? typeof initialValues[key] === 'function' ? initialValues[key]() : initialValues[key] : typeof val.default !== 'undefined' ? val.default : ''));
  }, {});
};

var checkType = function checkType(val, oldVal) {
  return newObject(typeof val === 'function' ? val(oldVal) : val);
};

var useFormValidationHandlerHook = function useFormValidationHandlerHook() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ON_CHANGE_KEY = _ref4.ON_CHANGE_KEY,
      _ON_BLUR_KEY = _ref4.ON_BLUR_KEY,
      _VALUE_KEY = _ref4.VALUE_KEY,
      _ERROR_KEY = _ref4.ERROR_KEY,
      _VALIDATOR = _ref4.VALIDATOR;

  return function () {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$VALIDATOR = _ref5.VALIDATOR,
        Validate = _ref5$VALIDATOR === void 0 ? _VALIDATOR || validate : _ref5$VALIDATOR,
        _ref5$initialValues = _ref5.initialValues,
        initialValues = _ref5$initialValues === void 0 ? {} : _ref5$initialValues,
        _ref5$FORM_CONFIG = _ref5.FORM_CONFIG,
        FORM_CONFIG = _ref5$FORM_CONFIG === void 0 ? {} : _ref5$FORM_CONFIG,
        _ref5$ON_CHANGE_KEY = _ref5.ON_CHANGE_KEY,
        ON_CHANGE_KEY = _ref5$ON_CHANGE_KEY === void 0 ? _ON_CHANGE_KEY || ON_CHANGE : _ref5$ON_CHANGE_KEY,
        _ref5$ON_BLUR_KEY = _ref5.ON_BLUR_KEY,
        ON_BLUR_KEY = _ref5$ON_BLUR_KEY === void 0 ? _ON_BLUR_KEY || ON_BLUR : _ref5$ON_BLUR_KEY,
        _ref5$VALUE_KEY = _ref5.VALUE_KEY,
        VALUE_KEY = _ref5$VALUE_KEY === void 0 ? _VALUE_KEY || VALUE : _ref5$VALUE_KEY,
        _ref5$ERROR_KEY = _ref5.ERROR_KEY,
        ERROR_KEY = _ref5$ERROR_KEY === void 0 ? _ERROR_KEY || ERROR$1 : _ref5$ERROR_KEY;

    var formRef = React.useRef({
      is_validate_form: false
    });

    var _useState = React.useState(FORM_CONFIG),
        _useState2 = _slicedToArray(_useState, 2),
        formConfig = _useState2[0],
        _setFormConfig = _useState2[1];

    var _useState3 = React.useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        errors = _useState4[0],
        _setErrors = _useState4[1];

    var _useState5 = React.useState(function () {
      return _setInitialValues({
        formConfig: formConfig,
        initialValues: initialValues
      });
    }),
        _useState6 = _slicedToArray(_useState5, 2),
        values = _useState6[0],
        _setValues = _useState6[1];

    var setFormConfig = React.useCallback(function (_formConfig) {
      formRef.current.formConfig = checkType(_formConfig, formRef.current.formConfig);

      _setFormConfig(formRef.current.formConfig);
    }, []);
    var setValues = React.useCallback(function (_values) {
      formRef.current.values = checkType(_values, formRef.current.values);

      _setValues(formRef.current.values);
    }, []);
    var setErrors = React.useCallback(function (_errors) {
      formRef.current.errors = checkType(_errors, formRef.current.errors);

      _setErrors(formRef.current.errors);
    }, []);
    formRef.current.values = values;
    formRef.current.errors = errors;
    formRef.current.formConfig = formConfig;
    formRef.current.setFormConfig = setFormConfig;
    var validateValue = React.useCallback(function (__value, key, isSetValue, isSetError, _config) {
      var isTrim = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      formRef.current.lastUpdated = generateTimeStamp();
      var config = _config || formRef.current.formConfig[key] || {}; // eslint-disable-next-line prefer-const

      var _ref6 = config && config.validator ? config.validator(__value, formRef.current, formRef.current.formConfig[key]._config, formRef.current.formConfig[key]._commonInputProps) : {
        value: __value
      },
          value = _ref6.value,
          validatorError = _ref6.error;

      var error = null;
      var maxError = null;

      if (!config._noValidate) {
        if (config.maxLength && (__value || '').length > config.maxLength) {
          maxError = typeof (config.message && config.message.maxLength) !== 'undefined' ? config.message.maxLength : "maximum ".concat(config.maxLength, " characters are allowed");
          value = value.slice(0, config.maxLength); // return;
        }

        if (typeof config.trim !== 'undefined' ? config.trim : config.trim || isTrim) value = trimStrings(value, config.isNumber);

        if (config) {
          error = validatorError || Validate(value, config.type, _objectSpread({
            key: key,
            optional: config.optional,
            minLength: config.minLength,
            message: config.message,
            maxLength: config.maxLength,
            length: config.length
          }, config)) || maxError;
          if (value && config.match && typeof config.match === 'string' && formRef.current.values[config.match]) error = formRef.current.values[config.match] !== value ? typeof (config.message && config.message.match) !== 'undefined' ? config.message.match : "".concat(key, " not matching with ").concat(config.match) : maxError;
        }

        if (key && isSetValue) if (value !== '' && !Number.isNaN(+value) && !(config.allowValidNumber ? !!+value : true)) error = typeof (config.message && config.message.allowValidNumber) !== 'undefined' ? config.message && config.message.allowValidNumber : 'Please enter valid number';else if (config.allowOnlyNumber) {
          if (!Number.isNaN(+value)) {
            setValues(_objectSpread(_objectSpread({}, formRef.current.values), {}, _defineProperty({}, key, value)));
          } else error = typeof (config.message && config.message.allowOnlyNumber) !== 'undefined' ? config.message && config.message.allowOnlyNumber : 'Only numbers are allowed';
        } else {
          setValues(_objectSpread(_objectSpread({}, formRef.current.values), {}, _defineProperty({}, key, value)));
        }
      }

      if (typeof config.callback === 'function') {
        var response = config.callback({
          error: error,
          value: value,
          key: key,
          formRef: formRef.current
        }, formRef.current.formConfig[key]._config, formRef.current.formConfig[key]._commonInputProps);

        if (typeOf(response) === TYPE_OBJECT$1) {
          setValues(_objectSpread(_objectSpread({}, formRef.current.values), {}, _defineProperty({}, key, response.value)));
          error = response.error;
        }
      }

      if (!isSetError) return {
        error: error,
        value: value,
        key: key
      };

      if (key) {
        setErrors(_objectSpread(_objectSpread({}, formRef.current.errors), {}, _defineProperty({}, key, error || null)));
      }

      return {
        error: error,
        value: value,
        key: key
      };
    }, []);
    var onChangeValues = React.useCallback(function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var key = arguments.length > 1 ? arguments[1] : undefined;

      var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _value = _ref7.value,
          isStopPropagation = _ref7.isStopPropagation,
          isValidateOnly = _ref7.isValidateOnly,
          config = _ref7.config,
          _ref7$isSetError = _ref7.isSetError,
          isSetError = _ref7$isSetError === void 0 ? true : _ref7$isSetError,
          trim = _ref7.trim,
          onChangeValidateFieldsCallback = _ref7.onChangeValidateFieldsCallback;

      // formRef.current.isFormChanged = true;
      // formRef.current.lastUpdated = generateTimeStamp();
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      if (e && isStopPropagation && typeof e.stopPropagation === 'function') e.stopPropagation();
      var value = typeof _value !== 'undefined' ? _value : getPlatformBasedFieldValue(e);

      var _key = getPlatformBasedFieldName(e);

      var KEY = key || _key;
      if (isValidateOnly || !KEY) return validateValue(value, KEY, null, null, config, trim);
      validateValue(value, KEY, true, isSetError === undefined ? true : isSetError, undefined, trim);
    }, []);
    var onValidateValues = React.useCallback(function (_ref8) {
      var value = _ref8.value,
          isValue = _ref8.isValue,
          key = _ref8.key,
          isValidateOnly = _ref8.isValidateOnly,
          config = _ref8.config,
          trim = _ref8.trim;
      return onChangeValues(value, key, {
        value: isValue ? value : undefined,
        isValidateOnly: isValidateOnly,
        config: config,
        trim: trim
      });
    }, []);
    var onBlurValues = React.useCallback(function (e, key) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _key = getPlatformBasedFieldName(e);

      var KEY = key || _key;
      var value = formRef.current.values[KEY];
      if (config.isValidateOnBlur === undefined ? true : config.isValidateOnBlur) validateValue(value, KEY, false, true);
    }, []);
    var validateForm = React.useCallback(function () {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          isSetError = _ref9.isSetError,
          _ref9$formConfig = _ref9.formConfig,
          __FORM_CONFIG = _ref9$formConfig === void 0 ? {} : _ref9$formConfig,
          _ref9$values = _ref9.values,
          __values = _ref9$values === void 0 ? {} : _ref9$values,
          _ref9$errors = _ref9.errors,
          __errors = _ref9$errors === void 0 ? {} : _ref9$errors,
          isNewFormConfig = _ref9.isNewFormConfig,
          isResetValue = _ref9.isResetValue,
          isResetError = _ref9.isResetError;

      formRef.current.is_validate_form = true;
      var IS_RESET_VALUE = isResetValue && {};
      var IS_RESET_ERROR = isResetError && {};

      var _FORM_CONFIG = isNewFormConfig ? __FORM_CONFIG : newObject(formRef.current.formConfig, __FORM_CONFIG);

      var _values = newObject(IS_RESET_VALUE || formRef.current.values, __values);

      var _errors = newObject(IS_RESET_ERROR || formRef.current.errors, __errors);

      var isError = [];

      for (var _i = 0, _Object$keys = Object.keys(_FORM_CONFIG); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        var _validateValue = validateValue(_values[key], key, false, false, _FORM_CONFIG[key], true),
            _error = _validateValue.error;

        _errors[key] = _error;
        if (_error) isError.push(null);
      }

      if (isSetError) {
        formRef.current.lastUpdated = generateTimeStamp();
        setErrors(_errors);
      }

      formRef.current.is_validate_form = false;
      return {
        values: _values,
        error: _errors,
        totalErrorCount: isError.length,
        errorCount: isError.length,
        isError: isError.length > 0,
        isValidatePassed: isError.length === 0
      };
    }, []);
    var validateCustomForm = React.useCallback(function (_ref10) {
      var isSetError = _ref10.isSetError,
          _ref10$formConfig = _ref10.formConfig,
          form_config = _ref10$formConfig === void 0 ? {} : _ref10$formConfig,
          _ref10$values = _ref10.values,
          __values = _ref10$values === void 0 ? {} : _ref10$values,
          _ref10$errors = _ref10.errors,
          __errors = _ref10$errors === void 0 ? {} : _ref10$errors;

      formRef.current.lastUpdated = generateTimeStamp();
      var _FORM_CONFIG = form_config;
      var _values = __values;
      var _errors = __errors;
      var isError = [];

      for (var _i2 = 0, _Object$keys2 = Object.keys(_FORM_CONFIG); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];

        var _validateValue2 = validateValue(_values[key], key, false, false, _FORM_CONFIG[key]),
            _error = _validateValue2.error;

        _errors[key] = _error;
        if (_error) isError.push(null);
      }

      if (isSetError) setErrors(_errors);
      return {
        values: _values,
        errors: _errors,
        totalErrorCount: isError.length,
        errorCount: isError.length,
        isError: isError.length > 0,
        isValidatePassed: isError.length === 0
      };
    }, []);
    var onValidateCustomObject = React.useCallback(function (value, config) {
      return validateForm({
        isSetError: false,
        values: value,
        formConfig: config,
        isNewFormConfig: true,
        isResetValue: true,
        isResetError: true
      });
    }, []);
    var onAddFormConfig = React.useCallback(function (config, isReset) {
      var _values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      formRef.current.lastUpdated = generateTimeStamp();
      setFormConfig(newObject(isReset ? {} : formRef.current.formConfig, config));
      var newVal = Object.entries(config || {}).reduce(function (acc, _ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            key = _ref12[0],
            _ref12$ = _ref12[1],
            _config = _ref12$ === void 0 ? {} : _ref12$;

        return newObject(acc, _defineProperty({}, key, _values[key] || typeof initialValues[key] !== 'undefined' && (typeof initialValues[key] === 'function' ? initialValues[key]() : initialValues[key]) || (!isReset ? formRef.current.values[key] || '' : typeof _config.default !== 'undefined' ? _config.default : '')));
      }, {});

      if (isReset) {
        setValues(newVal);
        setErrors({});
      } else {
        setValues(newObject(formRef.current.values, newVal));
      }
    }, []);
    var commonInputProps = React.useCallback(function (key) {
      var _commonInputProps2;

      var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          index = _ref13.index,
          config = _ref13.config,
          _ref13$propKeyMap = _ref13.propKeyMap;

      _ref13$propKeyMap = _ref13$propKeyMap === void 0 ? {} : _ref13$propKeyMap;

      var _ref13$propKeyMap$onC = _ref13$propKeyMap.onChange,
          onChange = _ref13$propKeyMap$onC === void 0 ? ON_CHANGE_KEY : _ref13$propKeyMap$onC,
          _ref13$propKeyMap$onB = _ref13$propKeyMap.onBlur,
          onBlur = _ref13$propKeyMap$onB === void 0 ? ON_BLUR_KEY : _ref13$propKeyMap$onB,
          _ref13$propKeyMap$val = _ref13$propKeyMap.value,
          value = _ref13$propKeyMap$val === void 0 ? VALUE_KEY : _ref13$propKeyMap$val,
          _ref13$propKeyMap$err = _ref13$propKeyMap.error,
          error = _ref13$propKeyMap$err === void 0 ? ERROR_KEY : _ref13$propKeyMap$err,
          rest = _objectWithoutProperties(_ref13, _excluded);

      var INITIAL_FORM_CONFIG = formRef.current.formConfig[key];
      if (INITIAL_FORM_CONFIG) INITIAL_FORM_CONFIG._config = _objectSpread({
        index: index,
        config: config,
        key: key
      }, rest);

      var _commonInputProps = (_commonInputProps2 = {}, _defineProperty(_commonInputProps2, onChange, function (e) {
        onChangeValues(e, key, config);

        var _validateFieldsOnChange = config && config.validateFieldsOnChange || INITIAL_FORM_CONFIG && INITIAL_FORM_CONFIG.validateFieldsOnChange;

        if (_validateFieldsOnChange && _validateFieldsOnChange.length > 0) {
          _validateFieldsOnChange.forEach(function (_key) {
            if (formRef.current.values[_key]) {
              onChangeValues(formRef.current.values[_key], _key, INITIAL_FORM_CONFIG._config);
            }
          });
        }
      }), _defineProperty(_commonInputProps2, onBlur, function (e) {
        return onBlurValues(e, key, INITIAL_FORM_CONFIG._config);
      }), _defineProperty(_commonInputProps2, value, formRef.current.values[key]), _defineProperty(_commonInputProps2, error, formRef.current.errors[key]), _defineProperty(_commonInputProps2, "keyName", key), _commonInputProps2);

      _commonInputProps = _objectSpread(_objectSpread({}, _commonInputProps), INITIAL_FORM_CONFIG && (typeof INITIAL_FORM_CONFIG.inputProps === 'function' ? INITIAL_FORM_CONFIG.inputProps(formRef.current, INITIAL_FORM_CONFIG._config, _objectSpread({}, _commonInputProps)) : INITIAL_FORM_CONFIG.inputProps) || {});

      if (INITIAL_FORM_CONFIG) {
        INITIAL_FORM_CONFIG._commonInputProps = _objectSpread({}, _commonInputProps);
      }

      return _commonInputProps;
    }, []);
    var setInitialFormData = React.useCallback(function (data) {
      formRef.current.lastUpdated = generateTimeStamp();

      var _values = Object.keys(formRef.current.formConfig).reduce(function (acc, key) {
        return newObject(acc, _defineProperty({}, key, typeof data[key] !== 'undefined' ? data[key] || '' : formRef.current.values[key]));
      }, {});

      setValues(_values);
    }, []);
    var resetForm = React.useCallback(function () {
      var _values = Object.entries(formConfig || {}).reduce(function (acc, _ref14) {
        var _ref15 = _slicedToArray(_ref14, 2),
            key = _ref15[0],
            _ref15$ = _ref15[1],
            val = _ref15$ === void 0 ? {} : _ref15$;

        return newObject(acc, _defineProperty({}, key, typeof initialValues[key] !== 'undefined' && (typeof initialValues[key] === 'function' ? initialValues[key]() : initialValues[key]) || (typeof val.default !== 'undefined' ? val.default : '')));
      }, {});

      setValues(_values);
      setErrors({});
    }, []);
    var getPayloadValues = React.useCallback(function () {
      return Object.entries(formRef.current.formConfig).reduce(function (acc, _ref16) {
        var _ref17 = _slicedToArray(_ref16, 2),
            _key = _ref17[0],
            _ref17$ = _ref17[1],
            _config = _ref17$ === void 0 ? {} : _ref17$;

        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, _config.key || _key, formRef.current.values[_key]));
      }, {});
    }, []);
    var setResponseErrors = React.useCallback(function (_errors) {
      var _keyErrors = Object.entries(formRef.current.formConfig).reduce(function (acc, _ref18) {
        var _ref19 = _slicedToArray(_ref18, 2),
            _key = _ref19[0],
            _ref19$ = _ref19[1],
            _config = _ref19$ === void 0 ? {} : _ref19$;

        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, _key, _config.key ? _errors[_config.key] : _errors[_key]));
      }, {});

      setErrors(_keyErrors);
    }, []);
    var setResponseValues = React.useCallback(function (_values) {
      var _keyErrors = Object.entries(formRef.current.formConfig).reduce(function (acc, _ref20) {
        var _ref21 = _slicedToArray(_ref20, 2),
            _key = _ref21[0],
            _ref21$ = _ref21[1],
            _config = _ref21$ === void 0 ? {} : _ref21$;

        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, _key, _config.key ? _values[_config.key] : _values[_key]));
      }, {});

      setErrors(_keyErrors);
    }, []);
    var getInputProps = React.useCallback(function () {
      var extraProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.keys(formRef.current.formConfig).reduce(function (prev, key) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, commonInputProps(key, extraProps)));
      }, {});
    }, []);
    var setValidate = React.useCallback(function () {
      var _config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var __config = _objectSpread({}, formRef.current.formConfig);

      var __errors = _objectSpread({}, formRef.current.errors);

      Object.entries(_config).forEach(function (_ref22) {
        var _ref23 = _slicedToArray(_ref22, 2),
            _key = _ref23[0],
            _value = _ref23[1];

        __config[_key]._noValidate = !_value;
        if (!_value) __errors[_key] = '';
      });
      setFormConfig(__config);
      setErrors(__errors);
    }, []); // const isFormChanged = useCallback(
    //   () => !isEqual(formRef.current.initialLoadValues, formRef.current.values),
    //   [],
    // );

    formRef.current.commonInputProps = commonInputProps;
    formRef.current.setInitialFormData = setInitialFormData; // formRef.current.validateForm = validateForm;

    formRef.current.onBlurValues = onBlurValues;
    formRef.current.onChangeValues = onChangeValues;
    formRef.current.onValidateValues = onValidateValues;
    formRef.current.validateForm = validateForm;
    formRef.current.validateObject = onValidateCustomObject;
    formRef.current.addFormConfig = onAddFormConfig;
    formRef.current.modifyFormConfig = onAddFormConfig;
    formRef.current.validateCustomForm = validateCustomForm;
    formRef.current.getKeyValues = getPayloadValues;
    formRef.current.setKeyErrors = setResponseErrors;
    formRef.current.setKeyValues = setResponseValues;
    formRef.current.getInputProps = getInputProps; // formRef.current.lastUpdated = generateTimeStamp();

    formRef.current.setValidate = setValidate;
    formRef.current.setErrors = setErrors;
    formRef.current.resetForm = resetForm;
    formRef.current.setValues = setValues; // formRef.current.isFormChanged = isFormChanged;

    return _objectSpread(_objectSpread({}, formRef.current), {}, {
      validateCustomObject: onValidateCustomObject,
      getPlatformBasedFieldValue: getPlatformBasedFieldValue,
      formRef: formRef.current,
      setInitialFormData: setInitialFormData,
      commonInputProps: commonInputProps,
      onValidateValues: onValidateValues,
      onChangeValues: onChangeValues,
      onAddFormConfig: onAddFormConfig,
      setFormConfig: setFormConfig,
      validateValue: validateValue,
      onBlurValues: onBlurValues,
      validateForm: validateForm,
      resetForm: resetForm,
      setValues: setValues,
      setErrors: setErrors,
      errors: errors,
      values: values
    });
  };
};
/* example
  FORM_CONFIG = {
    name: {
      type: 'string',
      optional: true,
      minLength: 4,
      maxLength: 1,
      extraConfig: {
        isNumber: true
      }
    },
  };
*/

/**
 * @Available props <useFormValidationHandlerHook>
 * setInitialFormData
 * commonInputProps
 * onChangeValues
 * onBlurValues
 * validateForm
 * setValues
 * setErrors
 * formRef
 * errors
 * values
 */

/**
  const { formRef } = useFormValidationHandlerHook({
    VALIDATOR: validator // custom validator <optional>
    FORM_CONFIG: FORM_DATA_CONFIG.cab_once,
    initialValues: {
      entry_date: () => new Date(),
      entry_time: () => new Date(),
    },
  });

  formRef.values.<key>
  formRef.errors.<key>
  <input {...commonInputProps(<key>)} />
  const onChange = () => {
    formRef.onChangeValues(<value>, <key>);
  }
  const onBlur = () => {
    formRef.onBlurValues(<value>, <key>);
  }
  onClick={() => {
    formRef.modifyFormConfig(
      FORM_DATA_CONFIG.cab_once,
      true, // Reset and set value
      {
        entry_time: new Date(),
        entry_date: new Date(),
        repeat_days: '',
      }, // INITIAL_VALUE
    );
  }}
  const { values: _values, isError } = formRef.validateForm({
      isSetError: true,
      formConfig: __FORM_CONFIG = {}, // optional
      values: __values = {}, // optional
      errors: __errors = {}, // optional
      isNewFormConfig, // optional <Boolean>
  });
*/

var checkType$1 = function checkType(val, oldVal) {
  return newObject(typeof val === 'function' ? val(oldVal) : val);
};

var useMultipleOptionsHook = function useMultipleOptionsHook() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useState = React.useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      _setOptions = _useState2[1];

  var ref = React.useRef({});
  ref.current.options = options;
  var setOptions = React.useCallback(function (_values) {
    ref.current.options = checkType$1(_values, ref.current.options);

    _setOptions(ref.current.options);
  }, []);
  var onChangeOptions = React.useCallback(function (key, index, value, error) {
    if (typeOf(key) === 'object') {
      var _key = key.key,
          _index = key.index,
          _value = key.value,
          _error = key.error;
      setOptions(function (_val) {
        var ___val = _objectSpread({}, _val);

        var __val = ___val[_key].slice();

        __val[_index].value = _value;
        __val[_index].error = _error;
        ___val[_key] = __val;
        return ___val;
      });
    } else setOptions(function (_val) {
      var ___val = _objectSpread({}, _val);

      var __val = ___val[key].slice();

      __val[index].value = value;
      __val[index].error = error;
      ___val[key] = __val;
      return ___val;
    });
  }, []);
  var onDeleteOptions = React.useCallback(function (key, i) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    setOptions(function (_val) {
      var ___val = _objectSpread({}, _val);

      var __val = ___val[key].slice();

      if (__val.length > 1) __val.splice(i, count);
      ___val[key] = __val;
      return ___val;
    });
  }, []);
  var onDeleteMultipleOptions = React.useCallback(function (key) {
    var indexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    setOptions(function (_val) {
      var ___val = _objectSpread({}, _val);

      var __val = ___val[key].slice();

      __val[key] = __val.filter(function (_, i) {
        return !indexes.includes(i);
      });
      ___val[key] = __val;
      return __val;
    });
  }, []);
  var onGetValues = React.useCallback(function (key) {
    return ref.current.options[key].map(function (e) {
      return e.value;
    });
  }, []);
  var findRecursiveError = React.useCallback(function (obj) {
    return Object.values(obj).some(function (e) {
      return typeOf(e) === 'object' ? findRecursiveError(e) : e;
    });
  }, []);
  var onValidateValues = React.useCallback(function (key, callback, isSetError) {
    if (Array.isArray(key)) {
      var _val2 = cloneDeep(ref.current.options);

      var isError = false;
      var returnObj = key.map(function (_key, index) {
        if (Array.isArray(_val2[_key])) {
          var _validatedValue = _val2[_key].map(function (e, i) {
            return callback(e.value, i, _key);
          });

          var _error2 = _validatedValue.map(function (e) {
            return e.error;
          });

          var _value2 = _validatedValue.map(function (e) {
            return e.value;
          });

          _val2[_key] = _validatedValue;

          if (isSetError && index === key.length - 1) {
            setOptions(_val2);
          }

          var _errorLength = _error2.filter(function (e) {
            return typeOf(e) === 'object' ? findRecursiveError(e) : e;
          }).length;

          if (_errorLength > 0) isError = true;
          return {
            key: _key,
            error: _error2,
            value: _value2,
            isError: isError
          };
        }

        return {
          key: key
        };
      });
      return {
        isError: isError,
        formArray: returnObj,
        formObj: returnObj.reduce(function (acc, curr) {
          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr.key, curr));
        }, {})
      };
    }

    var ___val = _objectSpread({}, ref.current.options);

    var validatedValue = ___val[key].map(function (e, i) {
      return callback(e.value, i);
    });

    var error = validatedValue.map(function (e) {
      return e.error;
    });
    var value = validatedValue.map(function (e) {
      return e.value;
    });

    if (isSetError) {
      ___val[key] = validatedValue;
      setOptions(___val);
    }

    var errorLength = error.filter(function (e) {
      return typeOf(e) === 'object' ? findRecursiveError(e) : e;
    }).length;
    return {
      error: error,
      value: value,
      isError: errorLength > 0,
      errorCount: errorLength
    };
  }, []);
  var onAddOptions = React.useCallback(function (key, value, index) {
    var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    setOptions(function (_val) {
      var ___val = _objectSpread({}, _val);

      var __val = ___val[key].slice();

      if (typeof index === 'number') {
        var _val3;

        (_val3 = __val).splice.apply(_val3, [index, 0].concat(_toConsumableArray(Array(count).fill(null).map(function () {
          return value || {};
        }))));
      } else if (count > 1) __val = __val.concat(Array(count).fill(null).map(function () {
        return value || {};
      }));else __val.push(value || {});

      ___val[key] = __val;
      return ___val;
    });
  }, []);
  var onChangeOrderForm = React.useCallback(function (key, currentIndex, index) {
    setOptions(function (_val) {
      var ___val = _objectSpread({}, _val);

      var __val = ___val[key].slice();

      var __value = __val[currentIndex];

      if (typeof index === 'number' && typeof currentIndex === 'number') {
        __val.splice(currentIndex, 1);

        __val.splice(index, 0, __value);

        ___val[key] = __val;
      }

      return ___val;
    });
  }, []);
  var onResetForm = React.useCallback(function (resetValue) {
    if (resetValue) setOptions(function () {
      return newObject({}, resetValue);
    });
  }, []);
  var onResetValue = React.useCallback(function (resetValue) {
    if (resetValue) setOptions(function (_options) {
      return newObject(_options, resetValue);
    });else setOptions(initialValue);
  }, []);
  var onAddForm = React.useCallback(function (value) {
    if (value) setOptions(function (_options) {
      return newObject(_options, value);
    });
  }, []);
  var onDeleteMultipleForm = React.useCallback(function () {
    var deleteKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (deleteKey.length > 0) setOptions(function (_options) {
      var __options = _objectSpread({}, _options);

      deleteKey.forEach(function (key) {
        delete __options[key];
      });
      return __options;
    });
  }, []);
  var onDeleteForm = React.useCallback(function () {
    var deleteKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    setOptions(function (_options) {
      var __options = _objectSpread({}, _options);

      delete __options[deleteKey];
      return __options;
    });
  }, []);
  ref.current.changeValue = onChangeOptions;
  ref.current.delete = onDeleteOptions;
  ref.current.getValues = onGetValues;
  ref.current.add = onAddOptions;
  ref.current.value = options;
  ref.current.formValue = options;
  ref.current.validate = onValidateValues;
  ref.current.setValue = setOptions;
  ref.current.deleteMultiple = onDeleteMultipleOptions;
  ref.current.deleteMultipleForm = onDeleteMultipleForm;
  ref.current.resetValue = onResetValue;
  ref.current.resetForm = onResetForm;
  ref.current.addForm = onAddForm;
  ref.current.deleteForm = onDeleteForm;
  ref.current.changeOrder = onChangeOrderForm;
  return {
    deleteMultipleForm: onDeleteMultipleForm,
    deleteMultiple: onDeleteMultipleOptions,
    delete: onDeleteOptions,
    changeValue: onChangeOptions,
    add: onAddOptions,
    value: options,
    formValue: options,
    setValue: setOptions,
    getValues: onGetValues,
    validate: onValidateValues,
    resetForm: onResetForm,
    formRef: ref.current,
    resetValue: onResetValue,
    addForm: onAddForm,
    deleteForm: onDeleteForm,
    changeOrder: onChangeOrderForm
  };
};

var FormContext = /*#__PURE__*/React.createContext(null);

var form = (function (_ref) {
  var children = _ref.children,
      inputProps = _ref.inputProps,
      idKey = _ref.idKey,
      onSubmit = _ref.onSubmit;
  return /*#__PURE__*/React__default.createElement(FormContext.Provider, {
    value: {
      inputProps: inputProps,
      idKey: idKey,
      onSubmit: onSubmit
    }
  }, children);
});

var ID_KEY = 'id';
var hook = (function () {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = React.useContext(FormContext) || {},
      _ref$inputProps = _ref.inputProps,
      inputProps = _ref$inputProps === void 0 ? {} : _ref$inputProps,
      idKey = _ref.idKey,
      onSubmit = _ref.onSubmit;

  return _objectSpread(_objectSpread(_objectSpread({}, onSubmit ? {
    onSubmit: onSubmit
  } : {}), inputProps[props[idKey || ID_KEY]] || {}), props);
});

// import isFunction from 'lodash/isFunction';
/**
 * Validate the shape of redux store
 */
// export default function checkStore(store) {
//   const shape = {
//     dispatch: isFunction,
//     subscribe: isFunction,
//     getState: isFunction,
//     replaceReducer: isFunction,
//     runSaga: isFunction,
//     injectedReducers: isObject,
//     injectedSagas: isObject,
// //   };
//   invariant(
//     conformsTo(store, shape),
//     '(app/utils...) injectors: Expected a valid redux store',
//   );
// }

function checkStore(store) {
  invariant(typeOf(store) === 'object' && typeOf(store.dispatch) === 'function' && typeOf(store.subscribe) === 'function' && typeOf(store.getState) === 'function' && typeOf(store.replaceReducer) === 'function' && typeOf(store.runSaga) === 'function' && typeOf(store.injectedReducers) === 'object' && typeOf(store.injectedSagas) === 'object', '(app/utils...) injectors: Expected a valid redux store');
}

/* eslint-disable no-underscore-dangle */
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

function createReducer() {
  var injectedReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reducer = Object.keys(injectedReducers).length > 0 ? injectedReducers : {
    global: function global() {
      return {};
    }
  };
  var rootReducer = redux.combineReducers(reducer);
  return rootReducer;
}

function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer, customCreateReducer) {
    if (!isValid) checkStore(store);
    invariant(typeOf(key) === 'string' && key && typeOf(reducer) === 'function', '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'); // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    store.replaceReducer((customCreateReducer || createReducer)(store.injectedReducers));
  };
}
function getInjectors(store) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true)
  };
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

var injectReducer = (function (_ref, createReducer) {
  var key = _ref.key,
      reducer = _ref.reducer;
  return function (WrappedComponent) {
    var ReducerInjector = /*#__PURE__*/function (_React$Component) {
      _inherits(ReducerInjector, _React$Component);

      var _super = _createSuper(ReducerInjector);

      function ReducerInjector(props, context) {
        var _this;

        _classCallCheck(this, ReducerInjector);

        _this = _super.call(this, props, context);
        getInjectors(context.store).injectReducer(key, reducer, createReducer);
        return _this;
      }

      _createClass(ReducerInjector, [{
        key: "render",
        value: function render() {
          return /*#__PURE__*/React__default.createElement(WrappedComponent, this.props);
        }
      }]);

      return ReducerInjector;
    }(React__default.Component);

    _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);

    _defineProperty(ReducerInjector, "contextType", reactRedux.ReactReduxContext);

    _defineProperty(ReducerInjector, "displayName", "withReducer(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
});

var useInjectReducer = function useInjectReducer(_ref2, createReducer) {
  var key = _ref2.key,
      reducer = _ref2.reducer;
  var inject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var context = React__default.useContext(reactRedux.ReactReduxContext);
  React__default.useEffect(function () {
    if (inject) getInjectors(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

var RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
var DAEMON = '@@saga-injector/daemon';
var ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

var allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

var checkKey$1 = function checkKey(key) {
  return invariant(key && typeOf(key) === 'string', '(app/utils...) injectSaga: Expected `key` to be a non empty string');
};

var checkDescriptor = function checkDescriptor(descriptor) {
  // const shape = {
  //   saga: isFunction,
  //   mode: mode => isString(mode) && allowedModes.includes(mode),
  // };
  invariant(typeOf(descriptor) === 'object' && typeof descriptor.saga === 'function' && allowedModes.includes(descriptor.mode), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

function injectSagaFactory(store, isValid) {
  return function injectSaga(key) {
    var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var args = arguments.length > 2 ? arguments[2] : undefined;
    if (!isValid) checkStore(store);

    var newDescriptor = _objectSpread(_objectSpread({}, descriptor), {}, {
      mode: descriptor.mode || DAEMON
    });

    var saga = newDescriptor.saga,
        mode = newDescriptor.mode;
    checkKey$1(key);
    checkDescriptor(newDescriptor);
    var hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      var oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = _objectSpread(_objectSpread({}, newDescriptor), {}, {
        task: store.runSaga(saga, args)
      });
      /* eslint-enable no-param-reassign */
    }
  };
}
function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);
    checkKey$1(key);

    if (Reflect.has(store.injectedSagas, key)) {
      var descriptor = store.injectedSagas[key];

      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel(); // Clean up in production; in development we need `descriptor.saga` for hot reloading

        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}
function getInjectors$1(store) {
  checkStore(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */

var injectSaga = (function (_ref) {
  var key = _ref.key,
      saga = _ref.saga,
      mode = _ref.mode;
  return function (WrappedComponent) {
    var InjectSaga = /*#__PURE__*/function (_React$Component) {
      _inherits(InjectSaga, _React$Component);

      var _super = _createSuper(InjectSaga);

      function InjectSaga(props, context) {
        var _this;

        _classCallCheck(this, InjectSaga);

        _this = _super.call(this, props, context);
        _this.injectors = getInjectors$1(context.store);

        _this.injectors.injectSaga(key, {
          saga: saga,
          mode: mode
        }, _this.props);

        return _this;
      }

      _createClass(InjectSaga, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.injectors.ejectSaga(key);
        }
      }, {
        key: "render",
        value: function render() {
          return /*#__PURE__*/React__default.createElement(WrappedComponent, this.props);
        }
      }]);

      return InjectSaga;
    }(React__default.Component);

    _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);

    _defineProperty(InjectSaga, "contextType", reactRedux.ReactReduxContext);

    _defineProperty(InjectSaga, "displayName", "withSaga(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
});

var useInjectSaga = function useInjectSaga(_ref2) {
  var key = _ref2.key,
      saga = _ref2.saga,
      mode = _ref2.mode;
  var inject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var eject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var context = React__default.useContext(reactRedux.ReactReduxContext);
  React__default.useEffect(function () {
    var injectors = getInjectors$1(context.store);

    if (inject) {
      injectors.injectSaga(key, {
        saga: saga,
        mode: mode
      });
      if (typeof callback === 'function') callback();
    }

    return function () {
      if (eject) injectors.ejectSaga(key);
    };
  }, []);
};

exports.CustomError = CustomError;
exports.Form = form;
exports.FormContext = FormContext;
exports.FormValidator = validateForm;
exports.GlobalEventEmitter = Global;
exports.Safe = nullcheck;
exports.cloneObject = cloneObject;
exports.commonConstants = commonConstants;
exports.deleteIn = deleteIn;
exports.generateTimeStamp = generateTimeStamp;
exports.getData = getData;
exports.getIn = getIn;
exports.globalState = globals;
exports.injectReducer = injectReducer;
exports.injectSaga = injectSaga;
exports.newObject = newObject;
exports.objectEquals = objectEquals;
exports.setIn = setIn;
exports.toCapitalize = toCapitalize;
exports.toPromise = toPromise;
exports.toPromiseAllFunction = toPromiseAllFunction;
exports.toPromiseFunction = toPromiseFunction;
exports.typeOf = typeOf;
exports.updateIn = updateIn;
exports.useActions = useActionsHook;
exports.useApiQuery = useApiQuery;
exports.useCancelAllRunningApiCalls = useCancelAllRunningApiCalls;
exports.useFormValidationHandlerHook = useFormValidationHandlerHook;
exports.useGlobalStateHook = useGlobalValueHook;
exports.useInjectReducer = useInjectReducer;
exports.useInjectSaga = useInjectSaga;
exports.useMultipleOptionsHook = useMultipleOptionsHook;
exports.useMutateReducer = useMutateReducer;
exports.useMutation = useMutation;
exports.useProps = hook;
exports.useQuery = useQuery;
exports.useRefetchCachedApi = useRefetchCachedApi;
exports.useResetOnlyApiEndPointsState = useResetOnlyApiEndPointsState;
exports.useResetState = useResetState;
exports.useStaleRefresh = useStaleRefresh;
