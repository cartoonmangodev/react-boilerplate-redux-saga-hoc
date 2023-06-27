'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread2'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var invariant = _interopDefault(require('invariant'));
var reselect = require('reselect');
var redux = require('redux');
var AxiosDefault = _interopDefault(require('axios'));
var effects = require('redux-saga/effects');
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _createSuper = _interopDefault(require('@babel/runtime/helpers/createSuper'));
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
require('fast-deep-equal');
var Qs = _interopDefault(require('query-string'));
var createSagaMiddleware = require('redux-saga');
var createSagaMiddleware__default = _interopDefault(createSagaMiddleware);

/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
var request = AxiosDefault;

var _HOC_MAIN_CLIENT_SIDE, _HOC_MAIN_SERVER_SIDE;

/* eslint-disable no-underscore-dangle */
var _FOR_INTERNAL_USE_ONLY_ = "@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@";
var _USE_TYPE_ = "@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@";
var GET_INITIAL_PROPS_DEFAULT = 'getInitialProps';
var API_LOADING_STATUS = 'app/API_LOADING_STATUS';
var TAKE_EVERY = 'every';
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
var CUSTOM_HANDLER = 'Custom-Handler';
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
var CREATE_REDUCER = 'createReducer';
var USE_HOOK = 'useHook';
var USE_HOC_HOOK = 'useHocHook';
var HOOK_WITH_HOC = 'hookWithHoc';
var ALLOW_MAP_STATE_TO_PROPS = 'mapStateToProps';
var GET_INITIAL_PROPS_KEY = 'getInitialPropsKey';
var IS_DEVELOPMENT = 'isDevelopment';
var HOC_MAIN_CONFIG_KEY = {
  HANDLERS: HANDLERS,
  NEXT_JS: NEXT_JS,
  CREATE_REDUCER: CREATE_REDUCER,
  USE_HOOK: USE_HOOK,
  USE_HOC_HOOK: USE_HOC_HOOK,
  HOOK_WITH_HOC: HOOK_WITH_HOC,
  ALLOW_MAP_STATE_TO_PROPS: ALLOW_MAP_STATE_TO_PROPS,
  GET_INITIAL_PROPS_KEY: GET_INITIAL_PROPS_KEY,
  IS_DEVELOPMENT: IS_DEVELOPMENT,
  USE_TYPE: USE_TYPE
};
var HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT = (_HOC_MAIN_CLIENT_SIDE = {}, _defineProperty(_HOC_MAIN_CLIENT_SIDE, HANDLERS, []), _defineProperty(_HOC_MAIN_CLIENT_SIDE, NEXT_JS, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_HOOK, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_HOC_HOOK, true), _defineProperty(_HOC_MAIN_CLIENT_SIDE, HOOK_WITH_HOC, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, ALLOW_MAP_STATE_TO_PROPS, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, GET_INITIAL_PROPS_KEY, null), _defineProperty(_HOC_MAIN_CLIENT_SIDE, IS_DEVELOPMENT, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_TYPE, FOR_INTERNAL_USE_ONLY), _defineProperty(_HOC_MAIN_CLIENT_SIDE, GET_DEFAULT_CONFIG, false), _HOC_MAIN_CLIENT_SIDE);
var HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT = (_HOC_MAIN_SERVER_SIDE = {}, _defineProperty(_HOC_MAIN_SERVER_SIDE, HANDLERS, []), _defineProperty(_HOC_MAIN_SERVER_SIDE, NEXT_JS, true), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_HOOK, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_HOC_HOOK, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, HOOK_WITH_HOC, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, ALLOW_MAP_STATE_TO_PROPS, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, GET_INITIAL_PROPS_KEY, GET_INITIAL_PROPS_DEFAULT), _defineProperty(_HOC_MAIN_SERVER_SIDE, IS_DEVELOPMENT, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_TYPE, FOR_INTERNAL_USE_ONLY), _defineProperty(_HOC_MAIN_SERVER_SIDE, GET_DEFAULT_CONFIG, false), _HOC_MAIN_SERVER_SIDE);
var API_END_POINTS = 'apiEndPoints';
var INITIAL_STATE = 'initialState';
var GET_DEFAULT_CONFIG = 'getDefaultConfig';
var DONT_RESET_REDUCER_KEYS = 'dontReset';
var IS_MOBILE = 'isMobile';
var SAGA = 'saga';
var SAGA_CONSTANT = 'constantSaga';
var REDUCER_CONSTANT = 'constantReducer';
var REDUCER = 'reducer';
var AXIOS_INTERCEPTORS = 'axiosInterceptors';
var REDUCER_NAME = 'name';
var HOC_INITIAL_CONFIG_KEY = {
  API_END_POINTS: API_END_POINTS,
  INITIAL_STATE: INITIAL_STATE,
  GET_DEFAULT_CONFIG: GET_DEFAULT_CONFIG,
  DONT_RESET_REDUCER_KEYS: DONT_RESET_REDUCER_KEYS,
  IS_MOBILE: IS_MOBILE,
  SAGA: SAGA,
  SAGA_CONSTANT: SAGA_CONSTANT,
  REDUCER_CONSTANT: REDUCER_CONSTANT,
  REDUCER: REDUCER,
  AXIOS_INTERCEPTORS: AXIOS_INTERCEPTORS,
  USE_HOOK: USE_HOOK,
  REDUCER_NAME: REDUCER_NAME
};
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
  TAKE_EVERY: TAKE_EVERY,
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
function apiLoadingStatus(_ref) {
  var type = _ref.type,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? true : _ref$status,
      loader = _ref.loader,
      payload = _ref.payload;
  return {
    type: API_LOADING_STATUS,
    response: {
      type: type,
      status: status,
      data: data,
      loader: loader,
      payload: payload,
      method: ON_LOADING
    }
  };
}

var convertData = function convertData(apiEndPoints) {
  return Object.keys(apiEndPoints).reduce(function (prev, curr) {
    var constants = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key;

      return newObject(acc, _defineProperty({}, key, (_key = {}, _defineProperty(_key, CALL, "".concat(REDUCER_BASE_PATH).concat(curr, "/").concat(key, "_").concat(CALL)), _defineProperty(_key, SUCCESS, "".concat(REDUCER_BASE_PATH).concat(curr, "/").concat(key, "_").concat(SUCCESS)), _defineProperty(_key, CUSTOM, "".concat(REDUCER_BASE_PATH).concat(curr, "/").concat(key, "_").concat(CUSTOM)), _defineProperty(_key, ERROR, "".concat(REDUCER_BASE_PATH).concat(curr, "/").concat(key, "_").concat(ERROR)), _defineProperty(_key, CANCEL, "".concat(REDUCER_BASE_PATH).concat(curr, "/").concat(key, "_").concat(CANCEL)), _key)));
    }, {});
    var actions = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key2;

      return newObject(acc, _defineProperty({}, key, (_key2 = {}, _defineProperty(_key2, CALL, actionsHandler.call(constants[key][CALL])), _defineProperty(_key2, SUCCESS, actionsHandler.success(constants[key][SUCCESS])), _defineProperty(_key2, CUSTOM, actionsHandler.custom(constants[key][CUSTOM])), _defineProperty(_key2, ERROR, actionsHandler.error(constants[key][ERROR])), _defineProperty(_key2, CANCEL, actionsHandler.cancel(constants[key][CANCEL])), _key2)));
    }, {});
    var sagaConfig = Object.entries(apiEndPoints[curr]).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return newObject(acc, _defineProperty({}, constants[key][CALL], {
        api: value,
        cancel: constants[key][CANCEL],
        actions: actions[key],
        effect: value.effect === TAKE_EVERY && effects.takeEvery
      }));
    }, {});
    return newObject(prev, _defineProperty({}, curr, {
      actions: actions,
      constants: constants,
      sagaConfig: sagaConfig
    }));
  }, {});
};

var generateConstants = (function (_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      generatorKey = _ref.generatorKey,
      dontResetOnLogout = _ref.dontResetOnLogout;

  var _dontResetOnLogout = Array.isArray(dontResetOnLogout) ? dontResetOnLogout.reduce(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, key));
  }, {}) : dontResetOnLogout;

  var ConvertData = convertData(apiEndPoints);

  var _Object$keys$reduce = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return {
      initialState: newObject({}, acc.initialState, _defineProperty({}, ConvertData[generatorKey].constants[key][CALL], _objectSpread({
        loading: {},
        toast: {},
        initialState: true
      }, apiEndPoints[generatorKey][key].initialData ? {
        data: apiEndPoints[generatorKey][key].initialData
      } : {}))),
      resetState: typeof _dontResetOnLogout[key] === 'undefined' && newObject({}, acc.resetState, _defineProperty({}, ConvertData[generatorKey].constants[key][CALL], _objectSpread({
        loading: {},
        toast: {},
        initialState: true
      }, apiEndPoints[generatorKey][key].initialData ? {
        data: apiEndPoints[generatorKey][key].initialData
      } : {}))) || acc.resetState
    };
  }, {
    initialState: {},
    resetState: {}
  }),
      initialState = _Object$keys$reduce.initialState,
      resetState = _Object$keys$reduce.resetState;

  var _ConvertData$generato = ConvertData[generatorKey],
      constants = _ConvertData$generato.constants,
      actions = _ConvertData$generato.actions,
      sagaConfig = _ConvertData$generato.sagaConfig;
  return {
    constants: constants,
    initialState: initialState,
    generatorKey: generatorKey,
    actions: actions,
    sagaConfig: sagaConfig,
    resetState: resetState
  };
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

var RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
var DAEMON = '@@saga-injector/daemon';
var ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

var allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

var checkKey = function checkKey(key) {
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
    checkKey(key);
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
    checkKey(key);

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
function getInjectors(store) {
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
        _this.injectors = getInjectors(context.store);

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
    var injectors = getInjectors(context.store);

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
function getInjectors$1(store) {
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
        getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
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
    if (inject) getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

var selectAuthenticationDomain = function selectAuthenticationDomain(initialState, generatorKey) {
  return function (state) {
    return state[generatorKey] || initialState;
  };
};

var makeSelectAuthenticationState = function makeSelectAuthenticationState(_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      initialState = _ref.initialState,
      InitialState = _ref.InitialState,
      generatorKey = _ref.generatorKey,
      constants = _ref.constants;
  return function () {
    return reselect.createSelector(selectAuthenticationDomain(initialState, generatorKey), function (substate) {
      return newObject(Object.keys(InitialState).reduce(function (acc, key) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, substate[key]));
      }, {}), Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, substate[constants[key][CALL]]));
      }, {}));
    });
  };
};

var ignore = {
  component: [SUCCESS, ERROR],
  saga: [CALL, CANCEL, CUSTOM],
  cancel: [SUCCESS, ERROR, CALL, CUSTOM]
};
var bindKey = [CANCEL, CUSTOM];

var actionConverter = function actionConverter(action, actionName, ignoreStatus, type) {
  return Object.entries(action).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return ignoreStatus && ignore[type].includes(key) && acc || cloneObject(acc, _defineProperty({}, "".concat(actionName, "_").concat(key), bindKey.includes(key) && value.bind({}, action[CALL]().type) || value));
  }, {});
};

var actionConverter$1 = (function (action) {
  return Object.entries(action).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return {
      actions: cloneObject(acc.actions, actionConverter(value, key)),
      sagaActions: cloneObject(acc.sagaActions, actionConverter(value, key, true, 'saga')),
      componentActions: cloneObject(acc.componentActions, actionConverter(value, key, true, 'component')),
      cancelActions: cloneObject(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
    };
  }, {});
});

var generateAction = (function (Actions) {
  var _actionConverter = actionConverter$1(Actions),
      componentActions = _actionConverter.componentActions,
      actions = _actionConverter.actions,
      sagaActions = _actionConverter.sagaActions,
      cancelActions = _actionConverter.cancelActions;

  return {
    componentActions: componentActions,
    actions: actions,
    sagaActions: sagaActions,
    cancelActions: cancelActions
  };
});

var executeTask = function executeTask(_ref, data) {
  var id = _ref.id,
      key = _ref.key;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc : acc.concat([curr]);
  }, []) : data.filter(function (_ref2) {
    var objId = _ref2[key];
    return objId !== id;
  });
};

var deleteHandler = function deleteHandler(_ref3) {
  var _ref3$task = _ref3.task;
  _ref3$task = _ref3$task === void 0 ? {} : _ref3$task;
  var key = _ref3$task.key,
      id = _ref3$task.id,
      _ref3$task$subKey = _ref3$task.subKey,
      subKey = _ref3$task$subKey === void 0 ? [] : _ref3$task$subKey,
      _ref3$successData = _ref3.successData,
      successData = _ref3$successData === void 0 ? {} : _ref3$successData,
      successDataStatusCode = _ref3.successDataStatusCode;
  return function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$data = _ref4.data,
        data = _ref4$data === void 0 ? [] : _ref4$data,
        statusCode = _ref4.statusCode;

    var commonData = {
      key: key,
      id: id
    };

    var _successData = typeOf(successData) === 'object' ? successData : {};

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread(_objectSpread(_objectSpread({}, data), _successData), {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_data) {
        return executeTask(commonData, _data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      reset: false,
      initialState: false
    };
  };
};

//   data: Data = {},
// }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       error: errorData || null,
//       isError: true,
//       lastUpdated: generateTimeStamp(),
//       isInfinite: undefined,
//       infiniteEnd: undefined,
//     }),
//   ),
// });

var errorHandler = function errorHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref.errorData,
      _ref$clearDataOnError = _ref.clearDataOnError,
      clearDataOnError = _ref$clearDataOnError === void 0 ? false : _ref$clearDataOnError,
      statusCode = _ref.statusCode;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return _objectSpread(_objectSpread({}, clearDataOnError ? {
      data: Array.isArray(Data) ? [] : {}
    } : {}), {}, {
      error: errorData || null,
      isError: true,
      statusCode: statusCode,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null,
      initialState: false
    });
  };
};

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayErrorHandler = function filterArrayErrorHandler() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref3.errorData,
      filter = _ref3.filter,
      clearDataOnError = _ref3.clearDataOnError,
      statusCode = _ref3.statusCode;

  return function (_ref4) {
    var _ref4$data = _ref4.data,
        Data = _ref4$data === void 0 ? {} : _ref4$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? newObject(data, function (_ref5) {
                var oldData = _ref5.data;
                return _objectSpread(_objectSpread({}, clearDataOnError ? {
                  data: Array.isArray(oldData) ? [] : {}
                } : {}), {}, {
                  error: errorData || null,
                  isError: true,
                  statusCode: statusCode,
                  lastUpdated: generateTimeStamp(),
                  isInfinite: null,
                  infiniteEnd: null
                });
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref6) {
            var oldData = _ref6.data;
            return _objectSpread(_objectSpread({}, clearDataOnError ? {
              data: Array.isArray(oldData) ? [] : {}
            } : {}), {}, {
              error: errorData || null,
              isError: true,
              statusCode: statusCode,
              lastUpdated: generateTimeStamp(),
              isInfinite: null,
              infiniteEnd: null,
              initialState: false
            });
          });
        });
      }()
    };
  };
};

var _excluded = ["filter", "successDataStatusCode"];

var _CheckFilter$1 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var commonFilterHandler = function commonFilterHandler(customHandler) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? [] : _ref$filter,
        successDataStatusCode = _ref.successDataStatusCode,
        rest = _objectWithoutProperties(_ref, _excluded);

    return function (_ref2) {
      var _ref2$data = _ref2.data,
          Data = _ref2$data === void 0 ? {} : _ref2$data,
          statusCode = _ref2.statusCode;
      return {
        lastUpdated: generateTimeStamp(),
        data: function () {
          var paramKey = _objectSpread({
            filter: filter
          }, rest);

          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter$1(filterArray), function (data) {
                return _CheckFilter$1(filterArray).length > 0 ? newObject(data, customHandler(paramKey)) : data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (data) {
            return newObject(_objectSpread(_objectSpread({}, data), {}, {
              statusCode: successDataStatusCode || statusCode,
              lastUpdated: generateTimeStamp(),
              error: false,
              isError: false,
              initialState: false
            }), customHandler(paramKey));
          });
        }()
      };
    };
  };
};
/** for Future reference */
// export const filterArrayCustomHandler = ({
//   isInfinite,
//   successData,
//   clearData,
//   query,
//   filter,
//   customHandler,
//   ...rest
// } = {}) => ({ data: Data = {} }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(
//       oldData,
//       customHandler({ isInfinite, successData, query, clearData, ...rest }),
//     ),
//   ),
// });

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

var infiniteHandler = function infiniteHandler(_ref) {
  var _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var __updateCallback = _ref$callback.updateCallback,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      limit = _ref$task.limit,
      _ref$task$isAppendTop = _ref$task.isAppendTop,
      isAppendTop = _ref$task$isAppendTop === void 0 ? false : _ref$task$isAppendTop,
      setInfiniteEnd = _ref$task.setInfiniteEnd,
      _ref$task$updateCallb = _ref$task.updateCallback,
      updateCallback = _ref$task$updateCallb === void 0 ? __updateCallback : _ref$task$updateCallb,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode,
      type = _ref.type,
      state = _ref.state;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _oldCopyData = _objectSpread(_objectSpread(_objectSpread({}, oldData), typeOf(successData) === 'object' ? successData : {}), {}, _defineProperty({}, subKey[0], oldData[subKey[0]])); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback({
              oldData: _oldData,
              successData: nullcheck(successData, ".".concat(subKey.join('.')), []),
              type: type,
              state: state
            }) : isAppendTop ? nullcheck(successData, ".".concat(subKey.join('.')), []).concat(_oldData) : _oldData.concat(nullcheck(successData, ".".concat(subKey.join('.')), []));
          });
        }

        var getData = Array.isArray(successData) ? successData : [];
        var appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
        var newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
        return updateCallback ? updateCallback({
          oldData: oldData,
          successData: successData,
          type: type,
          state: state
        }) : newData;
      }(),
      error: false,
      lastUpdated: generateTimeStamp(),
      statusCode: successDataStatusCode || statusCode,
      isInfinite: typeof limit === 'number',
      isError: false,
      initialState: false,
      infiniteEnd: setInfiniteEnd !== undefined && typeof setInfiniteEnd === 'function' ? setInfiniteEnd(successData) : limit !== undefined && typeof limit === 'number' ? (subKey.length > 0 ? nullcheck(successData, ".".concat(subKey.join('.')), []) : successData).length < limit : null
    };
  };
};

//   data: Data = {},
// } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       loading: {
//         status: loader,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

var _CheckFilter$2 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var returnData = function returnData(_ref) {
  var data = _ref.data,
      initialData = _ref.initialData,
      clearData = _ref.clearData,
      loader = _ref.loader,
      request = _ref.request;
  return newObject(data, function (_ref2) {
    var _data = _ref2.data;
    return _objectSpread(_objectSpread({
      loading: {
        status: loader,
        lastUpdated: generateTimeStamp()
      },
      lastUpdated: generateTimeStamp(),
      initialState: false
    }, request ? {
      request: request
    } : {}), clearData || initialData ? {
      data: Array.isArray(_data) ? initialData || [] : initialData || {}
    } : {});
  });
};

var filterArrayloadingHandler = function filterArrayloadingHandler() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      loader = _ref3.loader,
      filter = _ref3.filter,
      clearData = _ref3.clearData,
      initialData = _ref3.initialData,
      request = _ref3.request;

  return function (_ref4) {
    var _ref4$data = _ref4.data,
        Data = _ref4$data === void 0 ? {} : _ref4$data;
    return {
      lastUpdated: generateTimeStamp(),
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$2(filterArray), function (data) {
              return _CheckFilter$2(filterArray).length > 0 ? returnData({
                data: data,
                initialData: initialData,
                clearData: clearData,
                loader: loader,
                request: request
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return returnData({
            data: data,
            initialData: initialData,
            clearData: clearData,
            loader: loader,
            request: request
          });
        });
      }()
    };
  };
};

var _CheckFilter$3 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayToastEmptyHandler = function filterArrayToastEmptyHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      filter = _ref.filter,
      isInfinite = _ref.isInfinite;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return {
      lastUpdated: generateTimeStamp(),
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$3(filterArray), function (data) {
              return _CheckFilter$3(filterArray).length > 0 ? newObject(data, function (_ref3) {
                var _ref3$toast = _ref3.toast,
                    toast = _ref3$toast === void 0 ? {} : _ref3$toast;
                return {
                  isInfinite: isInfinite,
                  toast: newObject(toast, {
                    message: '',
                    status: '',
                    isError: null,
                    key: ''
                  })
                };
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref4) {
            var _ref4$toast = _ref4.toast,
                toast = _ref4$toast === void 0 ? {} : _ref4$toast;
            return {
              isInfinite: isInfinite,
              toast: newObject(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          });
        });
      }()
    };
  };
}; // export const filterArrayToastEmptyHandler = ({ filter, isInfinite }) => ({
//   statusCode,
//   filter,
//   message,
//   isError,
//   type,
// } = {}) => ({ data: Data = {} } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       toast: {
//         isError:
//           typeof isError === 'boolean'
//             ? isError
//             : ![200, 201].includes(statusCode),
//         status: statusCode,
//         message,
//         key: type,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

var filterArrayToastHandler = function filterArrayToastHandler() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      statusCode = _ref10.statusCode,
      filter = _ref10.filter,
      message = _ref10.message,
      isError = _ref10.isError,
      type = _ref10.type;

  return function (_ref11) {
    var _ref11$data = _ref11.data,
        Data = _ref11$data === void 0 ? {} : _ref11$data;
    return {
      lastUpdated: generateTimeStamp(),
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$3(filterArray), function (data) {
              return _CheckFilter$3(filterArray).length > 0 ? newObject(data, {
                toast: {
                  isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
                  status: statusCode,
                  message: message,
                  key: type,
                  lastUpdated: generateTimeStamp()
                }
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, {
            lastUpdated: generateTimeStamp(),
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message: message,
              key: type,
              lastUpdated: generateTimeStamp()
            }
          });
        });
      }()
    };
  };
};

var updateData = function updateData(data, successData, updateCallback, type, state) {
  var config = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  if (updateCallback) return updateCallback({
    oldData: data,
    successData: successData,
    type: type,
    state: state,
    config: config
  }) || data;
  if (_typeof(successData) === 'object' && !Array.isArray(successData) && _typeof(data) === 'object' && !Array.isArray(data)) return newObject(data, successData);
  return successData;
};

var updateHandler = function updateHandler(_ref) {
  var _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var __updateCallback = _ref$callback.updateCallback,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$task$dontUpdateR = _ref$task.dontUpdateResponseData,
      dontUpdateResponseData = _ref$task$dontUpdateR === void 0 ? false : _ref$task$dontUpdateR,
      dontUpdateSuccessData = _ref$task.dontUpdateSuccessData,
      _ref$task$updateCallb = _ref$task.updateCallback,
      updateCallback = _ref$task$updateCallb === void 0 ? __updateCallback : _ref$task$updateCallb,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode,
      type = _ref.type,
      state = _ref.state;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread(_objectSpread(_objectSpread({}, data), typeOf(successData) === 'object' && !(dontUpdateResponseData || dontUpdateSuccessData) ? successData : {}), {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData(_Data, nullcheck(successData, ".".concat(subKey.join('.'))) || successData, updateCallback, type, state);
          if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData(curr, values[_values ? index : curr[key]] || successData || curr, updateCallback, type, state, {
                index: index,
                id: _values ? index : curr[key]
              })]);
            }() : acc.concat([curr]);
          }, []);
          if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData(_data, values[_values ? index : _data[key]] || successData || _data, updateCallback, type, state, {
                index: index,
                id: _values ? index : _data[key]
              });
            }() : _data;
          });
          return updateData(_Data, nullcheck(successData, ".".concat(subKey.join('.'))) || successData, updateCallback, type, state);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData(data, successData, updateCallback, type, state);
        if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || successData || curr, updateCallback, type, state, {
              index: index,
              id: _values ? index : curr[key]
            })]);
          }() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index += 1;
            return updateData(_data, values[_values ? index : _data[key]] || successData || _data, updateCallback, type, state, {
              index: index,
              id: _values ? index : _data[key]
            });
          }() : _data;
        });
        return updateData(data, successData, updateCallback, type, state);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

var deletedData = function deletedData() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keyArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line no-underscore-dangle
  var _obj = obj;
  _obj = typeOf(obj) === 'object' ? _objectSpread({}, _obj) : _obj;

  if (typeOf(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(function (_key) {
      _obj = Array.isArray(_key) ? deleteIn(_obj, _key) : deleteIn(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

var executeTask$1 = function executeTask(_ref, data) {
  var updateCallback = _ref.updateCallback,
      successData = _ref.successData,
      deleteKey = _ref.deleteKey,
      id = _ref.id,
      key = _ref.key,
      type = _ref.type,
      state = _ref.state;
  return updateCallback ? updateCallback({
    oldData: data,
    successData: successData,
    type: type,
    state: state
  }) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]);
  }, []) : data.map(function (_data) {
    return _data[key] === id ? deletedData(_data, deleteKey) : _data;
  });
};

var deleteKeyHandler = function deleteKeyHandler(_ref2) {
  var _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var __updateCallback = _ref2$callback.updateCallback,
      _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$deleteKey = _ref2$task.deleteKey,
      deleteKey = _ref2$task$deleteKey === void 0 ? [] : _ref2$task$deleteKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$task$updateCall = _ref2$task.updateCallback,
      updateCallback = _ref2$task$updateCall === void 0 ? __updateCallback : _ref2$task$updateCall,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode,
      type = _ref2.type,
      state = _ref2.state;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      updateCallback: updateCallback,
      successData: successData,
      deleteKey: deleteKey,
      id: id,
      key: key,
      type: type,
      state: state
    };
    return {
      data: subKey.length > 0 ? updateIn(_objectSpread(_objectSpread(_objectSpread({}, data), successData), {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask$1(commonData, _Data);
      }) : executeTask$1(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

var resetHandler = function resetHandler(state, newState, _ref) {
  var type = _ref.response.type;
  var customType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return newObject(state, function (_ref2) {
    var Data = _ref2[customType || type];
    return _defineProperty({}, customType || type, newObject(Data, function (_ref3) {
      var data = _ref3.data,
          toast = _ref3.toast,
          infiniteEnd = _ref3.infiniteEnd;
      return {
        data: Array.isArray(data) && [] || {},
        toast: newObject(toast, {
          message: '',
          status: ''
        }),
        loading: {},
        isError: false,
        statusCode: 200,
        infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
        lastUpdated: generateTimeStamp(),
        initialState: true,
        request: undefined
      };
    }));
  });
};

var _CheckFilter$4 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayResetHandler = function filterArrayResetHandler(state, newState, action, filter) {
  var customType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var type = action.response.type;
  return newObject(state, function (_ref5) {
    var oldData = _ref5[customType || type];
    return _defineProperty({}, type, newObject(oldData, function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$data = _ref6.data,
          Data = _ref6$data === void 0 ? {} : _ref6$data;

      return {
        lastUpdated: generateTimeStamp(),
        data: function () {
          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter$4(filterArray), function (_data) {
                return _CheckFilter$4(filterArray).length > 0 ? newObject(_data, function (_ref7) {
                  var data = _ref7.data,
                      toast = _ref7.toast,
                      infiniteEnd = _ref7.infiniteEnd;
                  return {
                    data: Array.isArray(data) && [] || {},
                    toast: newObject(toast, {
                      message: '',
                      status: ''
                    }),
                    isError: false,
                    infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                    lastUpdated: generateTimeStamp(),
                    initialState: true,
                    request: undefined
                  };
                }) : _data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (updateData) {
            return newObject(updateData, function (_ref8) {
              var data = _ref8.data,
                  toast = _ref8.toast,
                  infiniteEnd = _ref8.infiniteEnd;
              return {
                data: Array.isArray(data) && [] || {},
                toast: newObject(toast, {
                  message: '',
                  status: ''
                }),
                isError: false,
                infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                lastUpdated: generateTimeStamp(),
                initialState: true,
                request: undefined
              };
            });
          });
        }()
      };
    }));
  });
};

var updateData$1 = function updateData(data, successData, updateCallback, updateKey, type, state) {
  var config = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  if (updateCallback) return updateCallback({
    oldData: data,
    successData: successData,
    type: type,
    state: state,
    config: config
  }) || data;

  if (_typeof(successData) === 'object' && !Array.isArray(successData) && _typeof(data) === 'object' && !Array.isArray(data)) {
    return !updateKey ? data : updateKey.reduce(function (acc, key) {
      if (Array.isArray(key) && key.length > 0) {
        return updateIn(acc, key, function (_data) {
          return nullcheck(successData, ".".concat(key.join('.')));
        });
      }

      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, successData[key]));
    }, data);
  }

  return successData;
};

var updateKeyHandler = function updateKeyHandler(_ref) {
  var _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var __updateCallback = _ref$callback.updateCallback,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$task$updateKey = _ref$task.updateKey,
      updateKey = _ref$task$updateKey === void 0 ? [] : _ref$task$updateKey,
      _ref$task$updateCallb = _ref$task.updateCallback,
      updateCallback = _ref$task$updateCallb === void 0 ? __updateCallback : _ref$task$updateCallb,
      dontUpdateResponseData = _ref$task.dontUpdateResponseData,
      dontUpdateSuccessData = _ref$task.dontUpdateSuccessData,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode,
      type = _ref.type,
      state = _ref.state;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread(_objectSpread(_objectSpread({}, data), typeOf(successData) === 'object' && !(dontUpdateResponseData || dontUpdateSuccessData) ? successData : {}), {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData$1(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey, type, state);else if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey, type, state, {
                index: index,
                id: _values ? index : curr[key]
              })]);
            }() : acc.concat([curr]);
          }, []);else if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData$1(_data, values[_values ? index : _data[key]] || _data, updateCallback, updateKey, type, state, {
                index: index,
                id: _values ? index : _data[key]
              });
            }() : _data;
          });
          return updateData$1(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey, type, state);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData$1(data, successData, updateCallback, updateKey, type, state);else if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index = index + 1;
            return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey, type, state, {
              index: index,
              id: _values ? index : curr[key]
            })]);
          }() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index = index + 1;
            return updateData$1(_data, values[_values ? index : _data[key]], updateCallback, updateKey, type, state, {
              index: index,
              id: _values ? index : _data[key]
            });
          }() : _data;
        });
        return updateData$1(data, successData, updateCallback, updateKey, type, state);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

var toggleData = function toggleData(obj, keyArray) {
  return Object.keys(obj).reduce(function (acc, curr) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr, keyArray.includes(curr) ? !obj[curr] : obj[curr]));
  }, {});
};

var executeTask$2 = function executeTask(_ref, _Data) {
  var successData = _ref.successData,
      toggleKey = _ref.toggleKey,
      id = _ref.id,
      key = _ref.key,
      updateCallback = _ref.updateCallback,
      type = _ref.type,
      state = _ref.state;

  var _updatedData = !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
  }, []) : _Data.map(function (_data) {
    return _data[key] === id ? toggleData(_data, toggleKey) : _data;
  });

  return updateCallback ? updateCallback({
    updatedData: _updatedData,
    successData: successData,
    type: type,
    state: state
  }) || _Data : _updatedData;
};

var toggleKeyHandler = function toggleKeyHandler(_ref2) {
  var _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var __updateCallback = _ref2$callback.updateCallback,
      _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$toggleKey = _ref2$task.toggleKey,
      toggleKey = _ref2$task$toggleKey === void 0 ? [] : _ref2$task$toggleKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$task$updateCall = _ref2$task.updateCallback,
      updateCallback = _ref2$task$updateCall === void 0 ? __updateCallback : _ref2$task$updateCall,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode,
      type = _ref2.type,
      state = _ref2.state;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      successData: successData,
      toggleKey: toggleKey,
      id: id,
      key: key,
      updateCallback: updateCallback,
      type: type,
      state: state
    };
    return {
      data: subKey.length > 0 ? updateIn(_objectSpread(_objectSpread(_objectSpread({}, data), typeOf(successData) === 'object' ? successData : {}), {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask$2(commonData, _Data);
      }) : executeTask$2(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

var _excluded$1 = ["data", "statusCode"];

var _checkIsNotObject = function _checkIsNotObject(data) {
  return Object.prototype.toString.call(data) !== '[object Object]';
};

var dataHandler = function dataHandler(_ref) {
  var isMutation = _ref.mutation,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var __updateCallback = _ref$callback.updateCallback,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$updateCallb = _ref$task.updateCallback,
      updateCallback = _ref$task$updateCallb === void 0 ? __updateCallback : _ref$task$updateCallb,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode,
      type = _ref.type,
      state = _ref.state;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties(_ref2, _excluded$1);

    return isMutation ? _objectSpread(_objectSpread({
      data: oldData,
      statusCode: statusCode
    }, rest), successData) : {
      data: function () {
        if (subKey.length > 0) {
          var _oldCopyData = _objectSpread(_objectSpread(_objectSpread({}, oldData), _checkIsNotObject(successData) ? {} : successData), {}, _defineProperty({}, subKey[0], oldData[subKey[0]]));

          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')));
            return updateCallback ? updateCallback({
              oldData: _oldData,
              successData: nullcheck(successData, ".".concat(subKey.join('.'))),
              type: type,
              state: state
            }) : _checkIsNotObject(nullcheck(successData, ".".concat(subKey.join('.')))) || _checkIsNotObject(nullcheck(_oldData, ".".concat(subKey.join('.')))) ? nullcheck(successData, ".".concat(subKey.join('.'))) : newObject(_oldData, nullcheck(successData, ".".concat(subKey.join('.'))));
          });
        }

        return updateCallback ? updateCallback({
          oldData: oldData,
          successData: successData,
          type: type,
          state: state
        }) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : newObject(oldData, successData);
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null,
      isError: false,
      initialState: false
    };
  };
};

/* eslint-disable */
var dontUpdateDataHandler = function dontUpdateDataHandler(_ref) {
  var successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        statusCode = _ref2.statusCode;

    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var spliceHandler = function spliceHandler(_ref) {
  var _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var __updateCallback = _ref$callback.updateCallback,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$spliceKey = _ref$task.spliceKey,
      spliceKey = _ref$task$spliceKey === void 0 ? [] : _ref$task$spliceKey,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$updateCallb = _ref$task.updateCallback,
      updateCallback = _ref$task$updateCallb === void 0 ? __updateCallback : _ref$task$updateCallb,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode,
      type = _ref.type,
      state = _ref.state;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _oldCopyData = _objectSpread(_objectSpread(_objectSpread({}, oldData), typeOf(successData) === 'object' ? successData : {}), {}, _defineProperty({}, subKey[0], oldData[subKey[0]])); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback({
              oldData: _oldData,
              successData: nullcheck(successData, ".".concat(subKey.join('.')), []),
              type: type,
              state: state
            }) : Array.isArray(_oldData) ? function () {
              var _newData = _oldData.slice();

              _newData.splice.apply(_newData, _toConsumableArray(spliceKey).concat(_toConsumableArray(nullcheck(successData, ".".concat(subKey.join('.')), []))));

              return _newData;
            }() : _oldData;
          });
        }

        var newData = Array.isArray(oldData) ? function () {
          var _newData = oldData.slice();

          return _newData.splice.apply(_newData, _toConsumableArray(spliceKey).concat(_toConsumableArray(nullcheck(successData, ".".concat(subKey.join('.')), []))));
        }() : oldData;
        return updateCallback ? updateCallback({
          oldData: oldData,
          successData: successData,
          type: type,
          state: state
        }) : newData;
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

var _excluded$2 = ["task", "successData", "successDataStatusCode", "state", "type"],
    _excluded2 = ["data", "statusCode"];

var checkKey$1 = function checkKey(callback) {
  invariant(typeOf(callback) === 'function', "(react-boilerplate-redux-saga-hoc) ".concat(typeof callback === 'undefined' ? 'Callback Handler required callback key' : 'callback is not a function'));
};

var callbackHandler = function callbackHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;

  var callback = _ref$task.callback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode,
      state = _ref.state,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, _excluded$2);

  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties(_ref2, _excluded2);

    checkKey$1(callback);
    return _objectSpread({
      lastUpdated: generateTimeStamp()
    }, callback({
      oldData: oldData,
      newData: successData,
      rest: _objectSpread(_objectSpread({}, rest), {}, {
        statusCode: statusCode
      }),
      status: statusCode || successDataStatusCode,
      successDataStatusCode: successDataStatusCode,
      state: state,
      type: type,
      extras: rest || {}
    }));
  };
};

var _excluded$3 = ["data", "statusCode"];
var resetReducerHandler = function resetReducerHandler() {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$data = _ref.data;

    _ref$data = _ref$data === void 0 ? {} : _ref$data;

    var data = _ref$data.data,
        toast = _ref$data.toast,
        infiniteEnd = _ref$data.infiniteEnd,
        statusCode = _ref.statusCode,
        rest = _objectWithoutProperties(_ref, _excluded$3);

    return {
      data: Array.isArray(data) ? [] : {},
      toast: {
        message: '',
        status: ''
      },
      isError: false,
      statusCode: null,
      infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
      lastUpdated: generateTimeStamp(),
      initialState: true
    };
  };
};

var _excluded$4 = ["data", "statusCode"];
var reducerErrorHandler = function reducerErrorHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var errorData = _ref$task.error,
      isError = _ref$task.isError,
      _ref$successData = _ref.successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data;

    _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;

    var data = _ref2$data.data,
        toast = _ref2$data.toast,
        infiniteEnd = _ref2$data.infiniteEnd,
        error = _ref2$data.error,
        isErrorOld = _ref2$data.isError,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties(_ref2, _excluded$4);

    return {
      error: errorData || error || {},
      isError: typeof isError === 'boolean' ? isError : isErrorOld,
      lastUpdated: generateTimeStamp() // initialState: false,

    };
  };
};

var _excluded$5 = ["data", "statusCode"];
var reducerLoadingHandler = function reducerLoadingHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var loader = _ref$task.loader,
      _ref$successData = _ref.successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data;

    _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
    var data = _ref2$data.data,
        toast = _ref2$data.toast,
        infiniteEnd = _ref2$data.infiniteEnd,
        error = _ref2$data.error,
        isErrorOld = _ref2$data.isError,
        _ref2$data$loading = _ref2$data.loading;
    _ref2$data$loading = _ref2$data$loading === void 0 ? {} : _ref2$data$loading;

    var status = _ref2$data$loading.status,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties(_ref2, _excluded$5);

    return {
      loading: {
        status: typeof loader === 'boolean' ? loader : status,
        lastUpdated: generateTimeStamp()
      },
      lastUpdated: generateTimeStamp()
    };
  };
};

var _excluded$6 = ["data", "statusCode"];
var reducerToastHandler = function reducerToastHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var toastData = _ref$task.toast,
      _ref$successData = _ref.successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data;

    _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;

    var data = _ref2$data.data,
        toast = _ref2$data.toast,
        infiniteEnd = _ref2$data.infiniteEnd,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties(_ref2, _excluded$6);

    return {
      toast: toastData || toast || {
        message: '',
        status: ''
      },
      isError: false,
      lastUpdated: generateTimeStamp()
    };
  };
};

var safe = nullcheck;
var responseErrorParser = function responseErrorParser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(data) && data.reduce(function (acc, curr) {
    var _Object$entries$ = _slicedToArray(Object.entries(curr)[0], 2),
        key = _Object$entries$[0],
        message = _Object$entries$[1];

    var payloadKey = key.split(',')[1];
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, payloadKey, message));
  }, {}) || {};
};
var commmonStateHandler = function commmonStateHandler(_ref) {
  var state = _ref.state,
      action = _ref.action,
      newState = _ref.newState,
      method = _ref.method,
      constants = _ref.constants,
      updateState = _ref.updateState;

  /** This action for initial call  */
  var _action$payload = action.payload;
  _action$payload = _action$payload === void 0 ? {} : _action$payload;
  var filter = _action$payload.filter,
      _action$payload$task = _action$payload.task,
      task = _action$payload$task === void 0 ? {} : _action$payload$task,
      dontUpdateReducer = _action$payload.dontUpdateReducer,
      dontUpdateReducerOnCall = _action$payload.dontUpdateReducerOnCall,
      _action$payload$reque = _action$payload.request,
      request = _action$payload$reque === void 0 ? {} : _action$payload$reque;
  if (request && request.payload) delete request.payload;
  if (dontUpdateReducer || dontUpdateReducerOnCall) return state;
  var _action$payload2 = action.payload;
  _action$payload2 = _action$payload2 === void 0 ? {} : _action$payload2;
  var _action$payload2$task = _action$payload2.task;
  _action$payload2$task = _action$payload2$task === void 0 ? {} : _action$payload2$task;
  var clearData = _action$payload2$task.clearDataOnStart,
      initialData = _action$payload2.initialCallData,
      _proxyFor = _action$payload2.proxyFor;
  /** This action for after api gets success or failure  */

  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var type = _action$response.type,
      statusCode = _action$response.statusCode,
      message = _action$response.message,
      status = _action$response.status,
      customTask = _action$response.customTask,
      _action$response$payl = _action$response.payload;
  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var __proxyFor = _action$response$payl.proxyFor,
      responseFilter = _action$response$payl.filter,
      customLoader = _action$response$payl.loader,
      customToast = _action$response$payl.toast;
  var ACTION_TYPE = _proxyFor || __proxyFor || type || action.type;
  var ACTION_PROXY_TYPE = _proxyFor || __proxyFor || type;
  var loader = Object.keys(constants).includes(action.type);
  var State = newObject(state);

  if ((method === ON_LOADING || loader || [ON_SUCCESS, ON_ERROR].includes(method)) && !customTask || customLoader !== undefined && customTask && (Array.isArray(method) ? method : [method]).includes(ON_LOADING)) {
    if ((status || loader) && filter && filter.length > 0) State = newState(function (_ref2) {
      var obj = _ref2[ACTION_TYPE];
      return _defineProperty({}, ACTION_TYPE, newObject(obj, filterArrayToastEmptyHandler({
        isInfinite: task.name === INFINITE_DATA_HANDLER,
        filter: Array.isArray(filter) && filter || [filter]
      })(obj)));
    });else if (status || loader) State = newState(function (_ref4) {
      var obj = _ref4[ACTION_TYPE];
      return _defineProperty({}, ACTION_TYPE, newObject(obj, function (_ref5) {
        var _ref5$toast = _ref5.toast,
            toast = _ref5$toast === void 0 ? {} : _ref5$toast;
        return {
          toast: newObject(toast, {
            message: '',
            status: '',
            isError: false,
            key: ''
          })
        };
      }));
    });
    if (((filter || responseFilter) && !customTask ? (filter || responseFilter).length > 0 : false) || customTask && customLoader !== undefined && (filter || responseFilter || []).length > 0) State = newObject(State, function (_ref7) {
      var obj = _ref7[ACTION_TYPE];
      return _defineProperty({}, ACTION_TYPE, newObject(obj, filterArrayloadingHandler(_objectSpread(_objectSpread({
        filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter]
      }, request ? {
        request: request
      } : {}), {}, {
        loader: customTask && customLoader !== undefined ? customLoader : initialData ? false : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
        clearData: clearData,
        initialData: initialData
      }))(obj)));
    });else State = newObject(State, function (_ref9) {
      var obj = _ref9[ACTION_TYPE];
      return _defineProperty({}, ACTION_TYPE, newObject(obj, function (_ref10) {
        var _data = _ref10.data;
        return _objectSpread(_objectSpread({
          loading: {
            status: customTask && customLoader !== undefined ? customLoader : initialData ? false : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
            lastUpdated: generateTimeStamp()
          }
        }, request ? {
          request: request
        } : {}), {}, {
          initialState: false
        }, (clearData || initialData) && ![ON_SUCCESS, ON_ERROR].includes(method) ? {
          data: initialData || (Array.isArray(_data) ? [] : {})
        } : {});
      }));
    });
    if (method === ON_LOADING || loader) return State;
  }

  if ([ON_SUCCESS, ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(ACTION_PROXY_TYPE) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST)) {
    if (responseFilter && responseFilter.length > 0) State = newObject(State, function (_ref12) {
      var obj = _ref12[ACTION_PROXY_TYPE];
      return _defineProperty({}, ACTION_PROXY_TYPE, newObject(obj, filterArrayToastHandler(_objectSpread({
        statusCode: statusCode,
        filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
        message: message,
        type: ACTION_PROXY_TYPE
      }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {}))(obj)));
    });else State = newObject(State, function (_ref14) {
      var obj = _ref14[ACTION_PROXY_TYPE];
      return _defineProperty({}, ACTION_PROXY_TYPE, newObject(obj, {
        toast: _objectSpread({
          isError: ![200, 201].includes(statusCode),
          status: statusCode,
          message: message,
          key: ACTION_PROXY_TYPE,
          lastUpdated: generateTimeStamp()
        }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {}),
        initialState: false
      }));
    });
  }

  var changeState = newObject.bind({}, State);
  var reset = responseFilter && responseFilter.length > 0 ? filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action: action,
    reset: reset
  });
};
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
var mapDispatchToProps = function mapDispatchToProps(actions, componentData, reducerName) {
  return function (dispatch) {
    return _objectSpread({
      dispatch: dispatch
    }, actions && Object.keys(actions).length ? newObject(componentData, function (_ref16) {
      var data = _ref16["".concat(reducerName, "_hoc")];

      return _defineProperty({}, "".concat(reducerName, "_hoc"), newObject(data, {
        actions: redux.bindActionCreators(actions, dispatch)
      }));
    }) : {});
  };
};

var _excluded$7 = ["data"],
    _excluded2$1 = ["data"];
var HANDLERS$1 = [{
  name: INFINITE_DATA_HANDLER,
  handler: infiniteHandler
}, {
  name: DATA_HANDLER,
  handler: dataHandler
}, {
  name: DELETE_DATA_HANDLER,
  handler: deleteHandler
}, {
  name: UPDATE_DATA_HANDLER,
  handler: updateHandler
}, {
  name: UPDATE_DATA_KEY_HANDLER,
  handler: updateKeyHandler
}, {
  name: DELETE_DATA_KEY_HANDLER,
  handler: deleteKeyHandler
}, {
  name: TOGGLE_DATA_KEY_HANDLER,
  handler: toggleKeyHandler
}, {
  name: SPLICE_DATA_HANDLER,
  handler: spliceHandler
}, {
  name: CALLBACK_HANDLER,
  handler: callbackHandler
}, {
  name: RESET_HANDLER,
  handler: resetReducerHandler
}, {
  name: TOAST_HANDLER,
  handler: reducerToastHandler
}, {
  name: ERROR_HANDLER,
  handler: reducerErrorHandler
}, {
  name: LOADER_HANDLER,
  handler: reducerLoadingHandler
}, {
  name: DONT_UPDATE_DATA_HANDLER,
  handler: dontUpdateDataHandler
}];

var checkKey$2 = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var CheckCustomHanderFormat = function CheckCustomHanderFormat(_handler) {
  return _handler ? typeof _handler === 'function' ? // ? typeof _handler() === 'function'
  // ? typeof _handler()() !== 'function'
  _handler : // : null
  null : // : null
  null;
};

var _CheckFilter$5 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' && Filter.length > 0 ? Filter.split('.') : null;
};

var COMMON_HANDLER = function COMMON_HANDLER(payload, data, state, type) {
  var DATA = data; // const bindAction = Action => Action(payload);

  var _tasks = typeOf(payload.tasks) === 'array' ? payload.tasks.filter(function (e) {
    return e.task || e.filter;
  }) : [];

  (_tasks.length > 0 ? _tasks : Array(1).fill(payload)).forEach( // eslint-disable-next-line consistent-return
  function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$task = _ref.task,
        task = _ref$task === void 0 ? {} : _ref$task,
        filter = _ref.filter;

    var customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    if (task.response && !task.dontUpdateResponseData) checkKey$2(task.response, 'task { response  : { data }}', TYPE_OBJECT);

    customTaskBindAction = function customTaskBindAction(Action) {
      return Action(_objectSpread(_objectSpread({}, payload), {}, {
        type: type,
        state: state,
        filter: _CheckFilter$5(filter || payload.filter),
        successData: task.dontUpdateResponseData ? {} : (task.response || {}).data || payload.successData
      }));
    };

    var customHandler = CheckCustomHanderFormat(task.customHandler);

    var isFilter = _CheckFilter$5(filter);

    var BindHandler = function BindHandler(handler) {
      return newObject(DATA, customTaskBindAction(handler));
    };

    var _handler = HANDLERS$1.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(function (_ref2) {
      var name = _ref2.name;
      return name === task.name || name === task;
    });

    if (_handler) {
      checkKey$2(_handler.handler, "".concat(_handler.name, " handler with key name handler"), TYPE_FUNCTION);
      DATA = isFilter ? BindHandler(commonFilterHandler(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === CUSTOM_HANDLER) DATA = (isFilter ? BindHandler(commonFilterHandler(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === DONT_UPDATE_DATA_HANDLER || task === DONT_UPDATE_DATA_HANDLER) return DATA;else DATA = isFilter ? BindHandler(commonFilterHandler(dataHandler)) : BindHandler(dataHandler);
  });
  return DATA;
};

var COMMON_REDUCER_HANDLER = function COMMON_REDUCER_HANDLER(action, handlers) {
  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var customTask = _action$response.customTask,
      mutation = _action$response.mutation,
      _action$response$data = _action$response.data;
  _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

  var _action$response$data2 = _action$response$data.data,
      successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
      rest = _objectWithoutProperties(_action$response$data, _excluded$7),
      _action$response$payl = _action$response.payload;

  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var _action$response$payl2 = _action$response$payl.request;
  _action$response$payl2 = _action$response$payl2 === void 0 ? {} : _action$response$payl2;
  var _action$response$payl3 = _action$response$payl2.query,
      query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
      _action$response$payl4 = _action$response$payl2.clearDataOnError,
      clearDataOnError = _action$response$payl4 === void 0 ? false : _action$response$payl4,
      Filter = _action$response$payl.filter,
      error = _action$response$payl.error,
      _action$response$erro = _action$response.error;
  _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;
  var _action$response$erro2 = _action$response$erro.data,
      errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2;

  var filter = _CheckFilter$5(Filter);

  var commonHandler = COMMON_HANDLER.bind(null, _objectSpread({
    handlers: handlers,
    successData: successData,
    errorData: errorData,
    successDataStatusCode: rest.statusCode,
    customTask: customTask,
    mutation: mutation
  }, action.response.payload));
  var ErrorHandler = filter && filterArrayErrorHandler || errorHandler;
  var commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query: query,
    filter: filter,
    clearDataOnError: clearDataOnError,
    statusCode: rest.statusCode
  });
  return [commonHandler, commmonErrorHandler];
};
var DEFAULT_REDUCER_HANDLER = function DEFAULT_REDUCER_HANDLER(_ref3) {
  var method = _ref3.method,
      reset = _ref3.reset,
      state = _ref3.state,
      action = _ref3.action,
      handlers = _ref3.handlers,
      type = _ref3.type;

  var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
      _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
      commonHandler = _COMMON_REDUCER_HANDL2[0],
      commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

  var _action$response2 = action.response;
  _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
  var customTask = _action$response2.customTask,
      mutation = _action$response2.mutation,
      _action$response2$dat = _action$response2.data;
  _action$response2$dat = _action$response2$dat === void 0 ? {} : _action$response2$dat;

  var _action$response2$dat2 = _action$response2$dat.data,
      successData = _action$response2$dat2 === void 0 ? {} : _action$response2$dat2,
      rest = _objectWithoutProperties(_action$response2$dat, _excluded2$1),
      _action$response2$pay = _action$response2.payload;

  _action$response2$pay = _action$response2$pay === void 0 ? {} : _action$response2$pay;
  var _action$response2$pay2 = _action$response2$pay.callback;
  _action$response2$pay2 = _action$response2$pay2 === void 0 ? {} : _action$response2$pay2;
  var updateStateCallback = _action$response2$pay2.updateStateCallback,
      excuteUpdateStateCallbackOnError = _action$response2$pay.excuteUpdateStateCallbackOnError,
      updateStateCallbackOnError = _action$response2$pay.updateStateCallbackOnError,
      tasks = _action$response2$pay.tasks,
      updateDataReducerKey = _action$response2$pay.updateDataReducerKey,
      _proxyType = _action$response2$pay.proxyFor,
      _errortask = _action$response2$pay._errortask,
      _action$response2$err = _action$response2.error;
  _action$response2$err = _action$response2$err === void 0 ? {} : _action$response2$err;
  var _action$response2$err2 = _action$response2$err.data,
      errorData = _action$response2$err2 === void 0 ? {} : _action$response2$err2,
      status = _action$response2$err.status;
  var DATA = state;

  var _ACTION_TYPE = _proxyType || type;

  var _method = (Array.isArray(method) ? method : [method, _errortask ? ON_SUCCESS : null]).filter(function (e) {
    return [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e);
  });

  for (var i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS:
        {
          var updatedState = void 0;

          var _tasks = tasks ? Array.isArray(tasks) && tasks.filter(function (e) {
            return typeOf(e) === TYPE_OBJECT;
          }) : null;

          if (_tasks && Array.isArray(_tasks) && _tasks.length > 0) {
            var _loop = function _loop(k) {
              var _commonHandler = COMMON_HANDLER.bind(null, _objectSpread(_objectSpread(_objectSpread({
                handlers: handlers,
                successData: successData,
                errorData: errorData,
                successDataStatusCode: rest.statusCode,
                customTask: customTask,
                mutation: mutation
              }, action.response.payload), _tasks[k]), {}, {
                tasks: undefined
              }));

              var _updateDataReducerKey = _tasks[k] && _tasks[k].updateDataReducerKey || updateDataReducerKey;

              if (Array.isArray(_updateDataReducerKey) && _updateDataReducerKey.length > 0) {
                var _loop2 = function _loop2(l) {
                  var ACTION_TYPE = _updateDataReducerKey[l] || _proxyType || type;
                  DATA = newObject(DATA, function (_ref4) {
                    var Data = _ref4[ACTION_TYPE];
                    return _defineProperty({}, ACTION_TYPE, _commonHandler(Data, state, ACTION_TYPE));
                  });
                };

                for (var l = 0; l < _updateDataReducerKey.length; l += 1) {
                  _loop2(l);
                }
              } else {
                var ACTION_TYPE = _updateDataReducerKey || _proxyType || type;
                DATA = newObject(DATA, function (_ref6) {
                  var Data = _ref6[ACTION_TYPE];
                  return _defineProperty({}, ACTION_TYPE, _commonHandler(Data, state, ACTION_TYPE));
                });
              }
            };

            for (var k = 0; k < _tasks.length; k += 1) {
              _loop(k);
            }

            updatedState = DATA;
          } else if (Array.isArray(updateDataReducerKey) && updateDataReducerKey.length > 0) {
            var _loop3 = function _loop3(j) {
              var ACTION_TYPE = updateDataReducerKey[j] || _proxyType || type;
              DATA = newObject(DATA, function (_ref8) {
                var Data = _ref8[ACTION_TYPE];
                return _defineProperty({}, ACTION_TYPE, commonHandler(Data, state, ACTION_TYPE));
              });
            };

            for (var j = 0; j < updateDataReducerKey.length; j += 1) {
              _loop3(j);
            }

            updatedState = DATA;
          } else {
            (function () {
              var ACTION_TYPE = updateDataReducerKey || _proxyType || type;
              updatedState = newObject(DATA, function (_ref10) {
                var Data = _ref10[ACTION_TYPE];
                return _defineProperty({}, ACTION_TYPE, commonHandler(Data, state, ACTION_TYPE));
              });
            })();
          }

          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData,
            type: SUCCESS,
            reducerkey: _ACTION_TYPE,
            status: status || rest.statusCode,
            statusCode: rest.statusCode
          }) || updatedState : updatedState;
          break;
        }

      case ON_ERROR:
        {
          var _ret = function () {
            var ACTION_TYPE = _proxyType || type;
            var updatedState = newObject(DATA, function (_ref12) {
              var Data = _ref12[ACTION_TYPE];
              return _defineProperty({}, ACTION_TYPE, newObject(Data, commmonErrorHandler()));
            });
            DATA = updateStateCallback && (excuteUpdateStateCallbackOnError || updateStateCallbackOnError) && !_errortask ? updateStateCallback({
              state: updatedState,
              data: successData,
              type: ERROR,
              reducerkey: _ACTION_TYPE,
              error: errorData,
              status: status || rest.statusCode,
              statusCode: rest.statusCode
            }) || updatedState : updatedState;
            return "break";
          }();

          if (_ret === "break") break;
        }

      case ON_UNMOUNT:
        {
          DATA = reset();
          break;
        }
    }
  }

  return DATA;
};

var _excluded$8 = ["data"],
    _excluded2$2 = ["payload", "query", "params"],
    _excluded3 = ["data"];
var componentState = {};
var otherReducerConstants = [];

var updateState = function updateState(_ref) {
  var authenticationConstants = _ref.authenticationConstants,
      ResetState = _ref.ResetState,
      _ref$isMobileApp = _ref.isMobileApp,
      InitialState = _ref.initialState,
      reducerFunction = _ref.reducerFunction,
      _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  return function (_ref2) {
    var state = _ref2.state,
        newState = _ref2.newState,
        action = _ref2.action,
        reset = _ref2.reset;
    var _action$response = action.response;
    _action$response = _action$response === void 0 ? {} : _action$response;
    var _action$response$data = _action$response.data;
    _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

    var _action$response$data2 = _action$response$data.data,
        successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
        restSuccessData = _objectWithoutProperties(_action$response$data, _excluded$8),
        _action$response$payl = _action$response.payload;

    _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;

    var _action$response$payl2 = _action$response$payl.payload,
        payload = _action$response$payl2 === void 0 ? {} : _action$response$payl2,
        _action$response$payl3 = _action$response$payl.query,
        query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
        _action$response$payl4 = _action$response$payl.params,
        params = _action$response$payl4 === void 0 ? {} : _action$response$payl4,
        restPayload = _objectWithoutProperties(_action$response$payl, _excluded2$2),
        loadingStatus = _action$response.status,
        statusCode = _action$response.statusCode,
        type = _action$response.type,
        method = _action$response.method,
        statusMessage = _action$response.message,
        _action$response$erro = _action$response.error;

    _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;

    var _action$response$erro2 = _action$response$erro.data,
        errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2,
        restErrorData = _objectWithoutProperties(_action$response$erro, _excluded3);

    var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
        _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
        commonHandler = _COMMON_REDUCER_HANDL2[0],
        commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

    var defaultReducerHandler = function defaultReducerHandler() {
      return DEFAULT_REDUCER_HANDLER({
        method: method,
        reset: reset,
        state: state,
        action: action,
        handlers: handlers,
        type: type
      });
    };

    switch (type) {
      case 'RESET':
        switch (method) {
          case ON_SUCCESS:
            return newObject(state, ResetState);

          default:
            return state;
        }

      // case authenticationConstants.REGISTER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGIN_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.VERIFY_OTP_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         isLoggedIn: !!successData.data.mobile_number,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(state, {
      //         profile: {},
      //         isLoggedIn: false,
      //         authorization: false,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.EDIT_MOBILE_NUMBER_API[CALL]:
      //   return state;
      // case authenticationConstants.VERIFY_OTP_FOR_EDIT_MOBILE_NUMBER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_USER_DETAILS_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, payload, successData),
      //         isLoggedIn: true,
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(initialState, {
      //         authorization: true,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         authorization: true,
      //         isLoggedIn: !!successData.name,
      //         profile: newObject(profile, successData),
      //         [type]: newObject(Data, commonHandler()),
      //       }));
      //    case ON_ERROR: {
      //         return newObject(state, ({ [type]: Data }) => ({
      //           [type]: newObject(Data, commmonErrorHandler()),
      //        }));
      // }
      //     default:
      //       return state;
      //   }

      default:
        {
          if (reducerFunction) {
            var returnData = reducerFunction({
              constants: authenticationConstants,
              successData: successData,
              restSuccessData: restSuccessData,
              payload: payload,
              query: query,
              state: state,
              params: params,
              restPayload: restPayload,
              loadingStatus: loadingStatus,
              statusCode: statusCode,
              type: type,
              reset: reset,
              newState: newState,
              method: method,
              statusMessage: statusMessage,
              errorData: errorData,
              restErrorData: restErrorData,
              resetState: ResetState,
              initialState: InitialState,
              commonHandler: commonHandler,
              commmonErrorHandler: commmonErrorHandler,
              defaultReducerHandler: defaultReducerHandler
            });
            if (returnData) return returnData;
          }

          return defaultReducerHandler();
        }
    }
  };
};

var dontResetKeyCheck = function dontResetKeyCheck(ResetState, action) {
  return (action.payload.dontResetKeys || []).length > 0 ? Object.entries(ResetState).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    return (action.payload.dontResetKeys || []).includes(key) ? acc : _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, val));
  }, {}) : ResetState;
};

var Reducer = (function (_ref5) {
  var reducerFunction = _ref5.reducerFunction,
      authenticationConstants = _ref5.constants,
      InitialState = _ref5.InitialState,
      _ref5$handlers = _ref5.handlers,
      handlers = _ref5$handlers === void 0 ? [] : _ref5$handlers,
      _ref5$resetState = _ref5.resetState,
      ResetState = _ref5$resetState === void 0 ? {} : _ref5$resetState,
      _ref5$isMobile = _ref5.isMobile,
      isMobileApp = _ref5$isMobile === void 0 ? false : _ref5$isMobile,
      constantReducer = _ref5.constantReducer,
      reducerName = _ref5.reducerName;
  var initialState = newObject(InitialState, componentState);
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var _action$payload = action.payload;
    _action$payload = _action$payload === void 0 ? {} : _action$payload;
    var dontUpdateReducer = _action$payload.dontUpdateReducer,
        dontUpdateReducerOnCall = _action$payload.dontUpdateReducerOnCall,
        _proxyFor = _action$payload.proxyFor;
    if (dontUpdateReducer || dontUpdateReducerOnCall) return state;

    switch (action.type) {
      case 'RESET_API':
        return newObject(state, dontResetKeyCheck(ResetState, action));

      case 'MUTATE_STATE':
        return newObject(state, action.payload);

      case 'RESET_STATE':
        return newObject(state, dontResetKeyCheck(ResetState, action), dontResetKeyCheck(InitialState, action));

      case "".concat(reducerName, "_RESET_API"):
        return newObject(state, dontResetKeyCheck(ResetState, action));

      case "".concat(reducerName, "_MUTATE_STATE"):
        return newObject(state, action.payload);

      case "".concat(reducerName, "_RESET_STATE"):
        return newObject(state, dontResetKeyCheck(ResetState, action), dontResetKeyCheck(InitialState, action));

      default:
        {
          var reducerState = newObject(state);

          if (constantReducer) {
            var returnData = constantReducer({
              state: reducerState,
              type: type || action.type,
              proxyFor: _proxyFor,
              action: action,
              constants: authenticationConstants,
              isMobile: isMobileApp,
              initialState: InitialState,
              resetState: ResetState
            });
            if (typeof returnData !== 'undefined') reducerState = returnData;
          }

          var newState = newObject.bind({}, reducerState);
          var _action$response2 = action.response;
          _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
          var method = _action$response2.method,
              type = _action$response2.type;
          var execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          var constants = InitialState;
          if (execute) return commmonStateHandler({
            constants: constants,
            state: reducerState,
            action: action,
            method: method,
            newState: newState,
            updateState: updateState({
              authenticationConstants: authenticationConstants,
              ResetState: ResetState,
              isMobileApp: isMobileApp,
              handlers: handlers,
              initialState: initialState,
              reducerFunction: reducerFunction
            })
          });
          return reducerState;
        }
    }
  };
});

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

var _excluded$9 = ["asyncFunction", "asyncFunctionParams", "payload", "params", "query", "delayFunction", "dontUpdateReducerOnSucess", "dontUpdateReducerOnError", "axios", "paramsSerializer", "cancelKey", "onCancelTask", "axiosConfig", "useCache", "errorDataHandling", "clearDataOnError", "polling", "errorParser", "defaultErrorParser", "delay", "retry", "pollingCount", "callAfterDelay"],
    _excluded2$3 = ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback", "cancelCallback"],
    _excluded3$1 = ["resolve", "reject", "isReject", "dontUpdateReducer", "request", "callback"];

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(loaderGenerator);
var headers = '';

function loaderGenerator(_ref) {
  var type, commonData;
  return _regeneratorRuntime.wrap(function loaderGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = _ref.type, commonData = _ref.commonData;
          _context.next = 3;
          return effects.put(apiLoadingStatus({
            type: type,
            payload: commonData,
            status: false
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var debounce = function debounce(ms, pattern, task, isEvery) {
  for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  return effects.fork( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var taskID, action, _yield$race, debounced, latestAction;

    return _regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            _context2.next = 3;
            return effects.take(pattern);

          case 3:
            action = _context2.sent;

          case 4:

            _context2.next = 7;
            return effects.race({
              debounced: effects.delay(ms),
              latestAction: effects.take(pattern)
            });

          case 7:
            _yield$race = _context2.sent;
            debounced = _yield$race.debounced;
            latestAction = _yield$race.latestAction;

            if (!debounced) {
              _context2.next = 16;
              break;
            }

            if (taskID && typeof taskID.cancel === 'function' && !taskID.isCancelled() && !isEvery) taskID.cancel();
            _context2.next = 14;
            return effects.fork.apply(void 0, [task].concat(args, [action]));

          case 14:
            taskID = _context2.sent;
            return _context2.abrupt("break", 19);

          case 16:
            action = latestAction;
            _context2.next = 4;
            break;

          case 19:
            _context2.next = 0;
            break;

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
};

var checkKey$3 = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var _cache = {};
var _cacheApiConfig = {};
function _sagaHandler (_ref2) {
  var _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(commonGenerator);

  var _ref2$actionType = _ref2.actionType,
      actionType = _ref2$actionType === void 0 ? {} : _ref2$actionType,
      requestResponseHandler = _ref2.requestResponseHandler,
      axiosInterceptors = _ref2.axiosInterceptors;

  function commonGenerator(_ref3) {
    var type, _payload, apiCacheFilter, __payload, _success, _error, resolve, reject, isReject, _payload$dontUpdateR, dontUpdateReducer, _payload$request, _payload$request$asyn, asyncFunction, _payload$request$asyn2, asyncFunctionParams, _payload$request$payl, payload, _payload$request$para, params, query, delayFunction, _payload$request$dont, dontUpdateReducerOnSucess, _payload$request$dont2, dontUpdateReducerOnError, requestAxios, _payload$request$para2, paramsSerializer, cancelKey, onCancelTask, _payload$request$axio, axiosConfig, _payload$request$useC, cacheControl, _payload$request$erro, errorDataHandling, _payload$request$clea, clearDataOnError, _payload$request$poll, polling, _payload$request$erro2, errorParser, _payload$request$defa, isResponseErrorParser, _payload$request$dela, Delay, _payload$request$retr, retry, _payload$request$poll2, pollingCount, _payload$request$call, callAfterDelay, rest, _payload$callback, successCallback, errorCallback, logoutCallback, finalCallback, pollingCallback, cancelCallback, restCallback, restPayload, isError, loop, count, pollingRequestConfig, POLLING_RESPONSE_DATA, _loop, _ret;

    return _regeneratorRuntime.wrap(function commonGenerator$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            type = _ref3.type, _payload = _ref3.payload;

            if (_payload && _payload.actionCallType !== REFETCH_API_QUERY) {
              _cacheApiConfig[type] = _cacheApiConfig[type] || {};

              if (_payload.request && _payload.request.key) {
                if (Array.isArray(_payload.request.key) && _payload.request.key.length > 0) apiCacheFilter = _payload.request.key.join('@_@-@_@');else apiCacheFilter = _payload.request.key;
                if (_payload.actionCallType !== REFETCH_API_QUERY) _cacheApiConfig[type][apiCacheFilter] = _payload;
              } else _cacheApiConfig[type] = _payload;
            }

            __payload = _payload.actionCallType === REFETCH_API_QUERY ? apiCacheFilter ? _cacheApiConfig[type][apiCacheFilter] : _cacheApiConfig[type] : _payload;

            if (__payload) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return effects.call(loaderGenerator, {
              type: type,
              commonData: {
                status: 'request query not found.Unable to fetch api.'
              }
            });

          case 6:
            return _context4.abrupt("return");

          case 7:
            _success = null;
            _error = null;
            /* above code is used for refetching cached api - end */

            resolve = __payload.resolve, reject = __payload.reject, isReject = __payload.isReject, _payload$dontUpdateR = __payload.dontUpdateReducer, dontUpdateReducer = _payload$dontUpdateR === void 0 ? false : _payload$dontUpdateR, _payload$request = __payload.request;
            _payload$request = _payload$request === void 0 ? {} : _payload$request;
            _payload$request$asyn = _payload$request.asyncFunction, asyncFunction = _payload$request$asyn === void 0 ? null : _payload$request$asyn, _payload$request$asyn2 = _payload$request.asyncFunctionParams, asyncFunctionParams = _payload$request$asyn2 === void 0 ? null : _payload$request$asyn2, _payload$request$payl = _payload$request.payload, payload = _payload$request$payl === void 0 ? {} : _payload$request$payl, _payload$request$para = _payload$request.params, params = _payload$request$para === void 0 ? {} : _payload$request$para, query = _payload$request.query, delayFunction = _payload$request.delayFunction, _payload$request$dont = _payload$request.dontUpdateReducerOnSucess, dontUpdateReducerOnSucess = _payload$request$dont === void 0 ? false : _payload$request$dont, _payload$request$dont2 = _payload$request.dontUpdateReducerOnError, dontUpdateReducerOnError = _payload$request$dont2 === void 0 ? false : _payload$request$dont2, requestAxios = _payload$request.axios, _payload$request$para2 = _payload$request.paramsSerializer, paramsSerializer = _payload$request$para2 === void 0 ? {
              arrayFormat: 'brackets'
            } : _payload$request$para2, cancelKey = _payload$request.cancelKey, onCancelTask = _payload$request.onCancelTask, _payload$request$axio = _payload$request.axiosConfig, axiosConfig = _payload$request$axio === void 0 ? {} : _payload$request$axio, _payload$request$useC = _payload$request.useCache, cacheControl = _payload$request$useC === void 0 ? false : _payload$request$useC, _payload$request$erro = _payload$request.errorDataHandling, errorDataHandling = _payload$request$erro === void 0 ? true : _payload$request$erro, _payload$request$clea = _payload$request.clearDataOnError, clearDataOnError = _payload$request$clea === void 0 ? false : _payload$request$clea, _payload$request$poll = _payload$request.polling, polling = _payload$request$poll === void 0 ? false : _payload$request$poll, _payload$request$erro2 = _payload$request.errorParser, errorParser = _payload$request$erro2 === void 0 ? false : _payload$request$erro2, _payload$request$defa = _payload$request.defaultErrorParser, isResponseErrorParser = _payload$request$defa === void 0 ? false : _payload$request$defa, _payload$request$dela = _payload$request.delay, Delay = _payload$request$dela === void 0 ? 8000 : _payload$request$dela, _payload$request$retr = _payload$request.retry, retry = _payload$request$retr === void 0 ? 0 : _payload$request$retr, _payload$request$poll2 = _payload$request.pollingCount, pollingCount = _payload$request$poll2 === void 0 ? 'unlimited' : _payload$request$poll2, _payload$request$call = _payload$request.callAfterDelay, callAfterDelay = _payload$request$call === void 0 ? false : _payload$request$call, rest = _objectWithoutProperties(_payload$request, _excluded$9), _payload$callback = __payload.callback;
            _payload$callback = _payload$callback === void 0 ? {} : _payload$callback;
            successCallback = _payload$callback.successCallback, errorCallback = _payload$callback.errorCallback, logoutCallback = _payload$callback.logoutCallback, finalCallback = _payload$callback.finalCallback, pollingCallback = _payload$callback.pollingCallback, cancelCallback = _payload$callback.cancelCallback, restCallback = _objectWithoutProperties(_payload$callback, _excluded2$3), restPayload = _objectWithoutProperties(__payload, _excluded3$1);
            isError = false;
            loop = true;
            count = 1;
            pollingRequestConfig = {};
            POLLING_RESPONSE_DATA = {};
            _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
              var action, axios, CancelToken, source, url, commonData, actionBind, request$1, _query, _url, requestData, postData, cancelTask, _yield$race2, _cancelTask, cacheId, _yield$race3, _postData, _cancelTask2, cancelFilterTask, data, statusKey, _ref4, _ref4$data, _ref4$data$status, successStatus, _ref4$data$message, successMessage, successCallbackResponse, _yield$race4, CancelPolling, _yield$race4$successC, _successCallbackResponse, loader, cancelResponse, _ref5, _ref5$response, customMethod, _ref6, _ref6$data, _ref6$data$status, _successStatus, _ref6$data$message, _successMessage, _ref7, _ref7$response, _ref7$response$data, _ref7$response$data2, errorData, _ref7$response$data$s, errorStatus, _ref7$response$data$m, errorMessage, errorCallbackResponse, _yield$race5, _CancelPolling2, _yield$race5$errorCal, _errorCallbackResponse, _loader, Cancelled, _yield$race6, _CancelPolling3, _yield$race7, _CancelPolling4, _yield$race8, _CancelPolling, pollingRes;

              return _regeneratorRuntime.wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return actionType[type];

                    case 2:
                      action = _context3.sent;
                      axios = requestAxios || action.api && action.api.axios || axiosInterceptors || request;
                      CancelToken = AxiosDefault.CancelToken;
                      _context3.next = 7;
                      return CancelToken.source();

                    case 7:
                      source = _context3.sent;
                      action = _objectSpread(_objectSpread({}, action), {}, {
                        error: action.error || action.actions[ERROR],
                        success: action.success || action.actions[SUCCESS],
                        customTask: action.custom || action.actions[CUSTOM]
                      });
                      url = '';

                      if (action.api && ['string', 'function'].includes(_typeof(action.api))) {
                        url = action.api;
                        action.api = {};
                      }

                      commonData = _objectSpread(_objectSpread(_objectSpread({
                        payload: payload,
                        params: params,
                        query: query
                      }, rest), pollingRequestConfig), {}, {
                        request: _objectSpread(_objectSpread({
                          payload: payload,
                          params: params,
                          query: query,
                          errorDataHandling: errorDataHandling,
                          clearDataOnError: clearDataOnError
                        }, rest), pollingRequestConfig),
                        callback: restCallback
                      }, restPayload);

                      actionBind = function actionBind(_action, _method) {
                        return _action.bind({}, type, _method, commonData);
                      };

                      if (typeof action.error === 'function') action.error = actionBind(action.error, ON_ERROR);
                      if (typeof action.success === 'function') action.success = actionBind(action.success, ON_SUCCESS);
                      request$1 = _objectSpread(_objectSpread({}, action.api || {}), {}, {
                        cancelToken: source.token,
                        url: action.api.url || url,
                        method: action.api.method || 'GET',
                        data: payload,
                        headers: headers
                      });
                      if (action.effect) delete action.effect;
                      if (action.actions) delete action.actions;

                      if (!((pollingRequestConfig && pollingRequestConfig.params || params) && typeof request$1.url === 'function')) {
                        _context3.next = 23;
                        break;
                      }

                      checkKey$3(params, '{request: { params }}', 'object');
                      _context3.next = 22;
                      return request$1.url(pollingRequestConfig && pollingRequestConfig.params || params);

                    case 22:
                      request$1.url = _context3.sent;

                    case 23:
                      if (query || pollingRequestConfig && pollingRequestConfig.query) {
                        request$1.params = pollingRequestConfig && pollingRequestConfig.query || query; // eslint-disable-next-line no-loop-func

                        request$1.paramsSerializer = function (param) {
                          return Qs.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
                        };
                      }

                      if (pollingRequestConfig && pollingRequestConfig.payload) {
                        request$1.data = pollingRequestConfig && pollingRequestConfig.payload || payload;
                      }

                      _query = pollingRequestConfig && pollingRequestConfig.query || query;
                      _url = void 0;
                      if (cacheControl) _url = "".concat(request$1.url).concat(Object.keys(_query || {}).length > 0 ? "?".concat(request$1.paramsSerializer(_query)) : '');

                      if (!(process.env.NODE_ENV !== 'test' || !action.test)) {
                        _context3.next = 31;
                        break;
                      }

                      _context3.next = 31;
                      return delete request$1.headers;

                    case 31:
                      requestData = null;

                      if (dontUpdateReducer) {
                        _context3.next = 36;
                        break;
                      }

                      _context3.next = 35;
                      return effects.call(requestResponseHandler, {
                        type: type,
                        action: action,
                        request: request$1,
                        payload: commonData,
                        actionData: rest,
                        method: ON_REQUEST
                      });

                    case 35:
                      requestData = _context3.sent;

                    case 36:
                      request$1 = requestData || request$1;
                      if (!['POST', 'PATCH', 'PUT', 'DELETE', 'post', 'patch', 'put', 'delete'].includes(request$1.method)) delete request$1.data;
                      if (request$1.effect) delete request$1.effect;
                      postData = '';
                      cancelTask = '';

                      if (!(polling && callAfterDelay && loop && count === 1 && action && action.cancel)) {
                        _context3.next = 53;
                        break;
                      }

                      _context3.next = 44;
                      return effects.race({
                        posts: effects.call(delayFunction || delay, Delay),
                        cancel: effects.take(action.cancel)
                      });

                    case 44:
                      _yield$race2 = _context3.sent;
                      _cancelTask = _yield$race2.cancel;
                      cancelTask = _cancelTask;

                      if (!cancelTask) {
                        _context3.next = 53;
                        break;
                      }

                      loop = false;

                      if (dontUpdateReducer) {
                        _context3.next = 52;
                        break;
                      }

                      _context3.next = 52;
                      return effects.call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL,
                        axiosCancel: cancelTask
                      });

                    case 52:
                      return _context3.abrupt("return", "break");

                    case 53:
                      _context3.prev = 53;
                      isError = false;
                      if (cacheControl) cacheId = "".concat(_url || '', "_").concat(JSON.stringify(request$1));

                      if (!(cacheControl && request$1.method === 'GET' && _cache[cacheId] && !polling)) {
                        _context3.next = 60;
                        break;
                      }

                      postData = _objectSpread({}, _cache[cacheId]);
                      _context3.next = 68;
                      break;

                    case 60:
                      _context3.next = 62;
                      return effects.race({
                        posts: typeof asyncFunction === 'function' ? effects.call.apply(void 0, [asyncFunction].concat(_toConsumableArray(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : []))) : effects.call(axios, _objectSpread(_objectSpread({}, request$1), pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)),
                        cancel: effects.take(action.cancel),
                        cancel_filter: effects.take(cancelKey && typeOf(cancelKey) === 'string' && cancelKey.length ? "".concat(action.cancel, "_[").concat(cancelKey, "]") : action.cancel)
                      });

                    case 62:
                      _yield$race3 = _context3.sent;
                      _postData = _yield$race3.posts;
                      _cancelTask2 = _yield$race3.cancel;
                      cancelFilterTask = _yield$race3.cancel_filter;
                      cancelTask = _cancelTask2 || cancelFilterTask;
                      postData = typeof _postData !== 'undefined' ? _objectSpread({}, _postData) : {};

                    case 68:
                      data = postData ? _objectSpread({}, postData) : postData;
                      postData = postData || {};

                      if (!(postData && postData.data)) {
                        _context3.next = 75;
                        break;
                      }

                      statusKey = action.api.responseStatusCodeKey || '';
                      data = {
                        data: {
                          status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? postData.status || 200 : (postData.data || {})[statusKey]) || postData && postData.status,
                          statusCode: (postData.data || {})[statusKey] || postData && postData.status,
                          message: (postData.data || {})[action.api.responseMessageKey || ''] || postData && postData.message,
                          data: (postData.data || {})[action.api.responseDataKey] || postData.data || postData
                        }
                      };

                      if (!(action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status))) {
                        _context3.next = 75;
                        break;
                      }

                      throw new CustomError({
                        isAxiosError: true,
                        response: {
                          data: {
                            error: (postData && postData.data || {})[action.api.errorDataKey || 'error'] || postData && postData.data || postData,
                            status: data.data.status,
                            statusCode: data.data.status,
                            message: data.data.message || 'Error'
                          }
                        }
                      });

                    case 75:
                      if (!(data && postData.data)) {
                        _context3.next = 103;
                        break;
                      }

                      _ref4 = data || {}, _ref4$data = _ref4.data;
                      _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
                      _ref4$data$status = _ref4$data.status, successStatus = _ref4$data$status === void 0 ? postData && postData.status : _ref4$data$status, _ref4$data$message = _ref4$data.message, successMessage = _ref4$data$message === void 0 ? '' : _ref4$data$message;
                      action.success = action.success.bind({}, successStatus, successMessage);
                      successCallbackResponse = null;
                      _success = {
                        response: postData,
                        posts: data,
                        data: data.data,
                        res: data && data.data && data.data.data,
                        message: successMessage,
                        status: successStatus
                      };

                      if (!(typeof successCallback === 'function')) {
                        _context3.next = 91;
                        break;
                      }

                      _context3.next = 85;
                      return effects.race({
                        successCallbackResponse: effects.call(successCallback, _success),
                        cancel: effects.take(action.cancel)
                      });

                    case 85:
                      _yield$race4 = _context3.sent;
                      CancelPolling = _yield$race4.cancel;
                      _yield$race4$successC = _yield$race4.successCallbackResponse;
                      _successCallbackResponse = _yield$race4$successC === void 0 ? null : _yield$race4$successC;
                      if (CancelPolling) loop = false;
                      successCallbackResponse = _successCallbackResponse;

                    case 91:
                      if (successCallbackResponse) if (typeOf(successCallbackResponse) === 'object') {
                        commonData._errortask = undefined;
                        if (typeOf(successCallbackResponse.task) === 'object') commonData.task = successCallbackResponse.task;
                        if (successCallbackResponse.filter) commonData.filter = successCallbackResponse.filter;
                        if (successCallbackResponse.updateDataReducerKey) commonData.updateDataReducerKey = successCallbackResponse.updateDataReducerKey;
                        if (typeOf(successCallbackResponse.tasks) === 'array' && successCallbackResponse.tasks.filter(function (e) {
                          return e.task || e.filter || e.updateDataReducerKey;
                        }).length > 0) commonData.tasks = successCallbackResponse.tasks;
                      } else if (typeOf(successCallbackResponse) === 'array' && successCallbackResponse.filter(function (e) {
                        return e.task || e.filter || e.updateDataReducerKey;
                      }).length > 0) commonData.tasks = successCallbackResponse;
                      loader = null;

                      if (!(!dontUpdateReducerOnSucess && !dontUpdateReducer)) {
                        _context3.next = 97;
                        break;
                      }

                      _context3.next = 96;
                      return effects.call(requestResponseHandler, {
                        data: data,
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_SUCCESS
                      });

                    case 96:
                      loader = _context3.sent;

                    case 97:
                      if (!loader) {
                        _context3.next = 100;
                        break;
                      }

                      _context3.next = 100;
                      return effects.call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 100:
                      if (typeof logoutCallback === 'function') setTimeout(function () {
                        return logoutCallback(data);
                      }, 100);
                      _context3.next = 130;
                      break;

                    case 103:
                      if (!(cancelTask && (typeof source.cancel === 'function' || onCancelTask))) {
                        _context3.next = 120;
                        break;
                      }

                      _context3.next = 106;
                      return (onCancelTask || source.cancel)();

                    case 106:
                      cancelResponse = _context3.sent;
                      if (typeof cancelCallback === 'function') cancelCallback(cancelResponse);
                      _ref5 = cancelTask || {}, _ref5$response = _ref5.response;
                      _ref5$response = _ref5$response === void 0 ? {} : _ref5$response;
                      customMethod = _ref5$response.method;

                      if (!(!customMethod && !dontUpdateReducer)) {
                        _context3.next = 114;
                        break;
                      }

                      _context3.next = 114;
                      return effects.call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL,
                        axiosCancel: cancelTask
                      });

                    case 114:
                      if (!(customMethod !== ON_UNMOUNT && !dontUpdateReducer)) {
                        _context3.next = 117;
                        break;
                      }

                      _context3.next = 117;
                      return effects.call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 117:
                      loop = false;
                      _context3.next = 130;
                      break;

                    case 120:
                      if (!(process.env.NODE_ENV === 'test' && action.success)) {
                        _context3.next = 125;
                        break;
                      }

                      _context3.next = 123;
                      return effects.put(action.success({
                        data: data
                      }));

                    case 123:
                      _context3.next = 130;
                      break;

                    case 125:
                      _success = {
                        response: postData,
                        status: postData && postData.status
                      };

                      if (typeof successCallback === 'function' && !cancelTask) {
                        successCallback(_success);
                      }

                      if (dontUpdateReducer) {
                        _context3.next = 130;
                        break;
                      }

                      _context3.next = 130;
                      return effects.call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 130:
                      if (polling && typeof window !== 'undefined' && typeof pollingCallback === 'function' && loop) {
                        _ref6 = data || {}, _ref6$data = _ref6.data;
                        _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;
                        _ref6$data$status = _ref6$data.status, _successStatus = _ref6$data$status === void 0 ? postData && postData.status : _ref6$data$status, _ref6$data$message = _ref6$data.message, _successMessage = _ref6$data$message === void 0 ? '' : _ref6$data$message;
                        POLLING_RESPONSE_DATA = {
                          response: data,
                          data: data && data.data,
                          message: _successMessage,
                          status: _successStatus,
                          count: count,
                          request: typeof asyncFunction === 'function' ? Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : [] : pollingRequestConfig || request$1
                        };
                      } // cancel looping on success if retry is true


                      if (!polling && retry) loop = false;

                      if (resolve && typeOf(resolve) === 'function') {
                        if (cancelTask && typeof source.cancel === 'function') {
                          resolve({
                            status: 'CANCELLED',
                            response: null,
                            data: null
                          });
                        } else {
                          resolve({
                            status: 'SUCCESS',
                            response: postData,
                            data: data && data.data && data.data.data
                          });
                          if (cacheControl) _cache[cacheId] = postData;
                        }
                      }

                      _context3.next = 184;
                      break;

                    case 135:
                      _context3.prev = 135;
                      _context3.t0 = _context3["catch"](53);
                      isError = true;
                      _context3.prev = 138;

                      if (!(_context3.t0 && _typeof(_context3.t0) === 'object' && !_context3.t0.isAxiosError)) {
                        _context3.next = 141;
                        break;
                      }

                      throw new Error(_context3.t0);

                    case 141:
                      if (!(!polling && retry && retry - 1 >= count)) {
                        _context3.next = 144;
                        break;
                      }

                      _context3.next = 179;
                      break;

                    case 144:
                      if (isReject && reject && typeOf(reject) === 'function') reject({
                        status: 'ERROR',
                        error: _context3.t0 || 'NETWORK ERROR',
                        respone: _context3.t0 && _context3.t0.response
                      });else if (resolve && typeOf(resolve) === 'function') resolve({
                        status: 'ERROR',
                        error: _context3.t0 || 'NETWORK ERROR',
                        respone: _context3.t0 && _context3.t0.response
                      }); // eslint-disable-next-line no-console

                      if (process.env.NODE_ENV === 'test') console.log(_context3.t0);
                      _ref7 = _context3.t0 || {}, _ref7$response = _ref7.response;
                      _ref7$response = _ref7$response === void 0 ? {} : _ref7$response;
                      _ref7$response$data = _ref7$response.data;
                      _ref7$response$data = _ref7$response$data === void 0 ? {} : _ref7$response$data;
                      _ref7$response$data2 = _ref7$response$data[action.api.errorDataKey || 'error'], errorData = _ref7$response$data2 === void 0 ? _context3.t0 && _context3.t0.response && _context3.t0.response.data || _context3.t0 && _context3.t0.response || '' : _ref7$response$data2, _ref7$response$data$s = _ref7$response$data.status, errorStatus = _ref7$response$data$s === void 0 ? _context3.t0 && _context3.t0.response && _context3.t0.response.data && (_context3.t0.response.data[action.api.errorStatusKey] || _context3.t0 && _context3.t0.response && _context3.t0.response.status) : _ref7$response$data$s, _ref7$response$data$m = _ref7$response$data.message, errorMessage = _ref7$response$data$m === void 0 ? _context3.t0 && _context3.t0.response && _context3.t0.response.data && _context3.t0.response.data[action.api.errorMessageKey] || _context3.t0 && _context3.t0.response && _context3.t0.response.statusText || _context3.t0 && _context3.t0.message || '' : _ref7$response$data$m;
                      _error = _objectSpread(_objectSpread({
                        error: _context3.t0,
                        errorData: isResponseErrorParser ? errorData && _typeof(responseErrorParser(errorData)) === 'object' && Object.keys(responseErrorParser(errorData) || {}).length > 0 ? responseErrorParser(errorData) : errorData : errorData
                      }, typeof errorParser === 'function' ? {
                        errorParser: errorParser({
                          error: _context3.t0,
                          errorData: errorData,
                          status: errorStatus,
                          response: _context3.t0 && _context3.t0.response,
                          message: errorMessage
                        })
                      } : {}), {}, {
                        isNetworkError: _context3.t0 && _context3.t0.request && _context3.t0.message === 'Network Error',
                        errorMessage: _context3.t0 && _context3.t0.message,
                        message: errorMessage,
                        status: errorStatus,
                        response: _context3.t0 && _context3.t0.response,
                        errors: errorData
                      });

                      if (!(typeof errorCallback === 'function')) {
                        _context3.next = 164;
                        break;
                      }

                      errorCallbackResponse = null;

                      if (!(typeof errorCallback === 'function')) {
                        _context3.next = 163;
                        break;
                      }

                      _context3.next = 157;
                      return effects.race({
                        errorCallbackResponse: effects.call(errorCallback, _error),
                        cancel: effects.take(action.cancel)
                      });

                    case 157:
                      _yield$race5 = _context3.sent;
                      _CancelPolling2 = _yield$race5.cancel;
                      _yield$race5$errorCal = _yield$race5.errorCallbackResponse;
                      _errorCallbackResponse = _yield$race5$errorCal === void 0 ? null : _yield$race5$errorCal;
                      if (_CancelPolling2) loop = false;
                      errorCallbackResponse = _errorCallbackResponse;

                    case 163:
                      if (errorCallbackResponse) {
                        if (typeOf(errorCallbackResponse) === 'boolean' && errorCallbackResponse) commonData._errortask = true;else if (typeOf(errorCallbackResponse) === 'object' && Object.keys(errorCallbackResponse).length > 0) {
                          commonData._errortask = true;
                          if (typeOf(errorCallbackResponse.task) === 'object') commonData.task = errorCallbackResponse.task;
                          if (errorCallbackResponse.filter) commonData.filter = errorCallbackResponse.filter;
                          if (errorCallbackResponse.updateDataReducerKey) commonData.updateDataReducerKey = errorCallbackResponse.updateDataReducerKey;
                          if (typeOf(errorCallbackResponse.tasks) !== 'undefined') commonData.tasks = errorCallbackResponse.tasks;
                          if (typeOf(errorCallbackResponse.tasks) === 'array' && errorCallbackResponse.tasks.filter(function (e) {
                            return e.task || e.filter;
                          }).length > 0) commonData.tasks = errorCallbackResponse.tasks;
                        } else if (typeOf(errorCallbackResponse) === 'array' && errorCallbackResponse.filter(function (e) {
                          return typeOf(e) === 'object';
                        }).length > 0) {
                          commonData._errortask = true;
                          commonData.tasks = errorCallbackResponse.filter(function (e) {
                            return typeOf(e) === 'object';
                          });
                        } else commonData._errortask = false;
                      }

                    case 164:
                      action.error = action.error.bind({}, errorStatus, errorMessage);

                      if (!(AxiosDefault.isCancel(_context3.t0) && action.cancel && !dontUpdateReducer && !dontUpdateReducerOnError)) {
                        _context3.next = 172;
                        break;
                      }

                      _context3.next = 168;
                      return effects.call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 168:
                      _context3.next = 170;
                      return effects.call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL_ERROR
                      });

                    case 170:
                      _context3.next = 179;
                      break;

                    case 172:
                      if (!(!dontUpdateReducer && !dontUpdateReducerOnError)) {
                        _context3.next = 179;
                        break;
                      }

                      _context3.next = 175;
                      return effects.call(requestResponseHandler, {
                        error: {
                          response: {
                            data: {
                              status: errorStatus,
                              data: errorDataHandling ? errorData : null,
                              message: errorMessage
                            }
                          }
                        },
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_ERROR
                      });

                    case 175:
                      _loader = _context3.sent;

                      if (!_loader) {
                        _context3.next = 179;
                        break;
                      }

                      _context3.next = 179;
                      return effects.call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 179:
                      _context3.next = 184;
                      break;

                    case 181:
                      _context3.prev = 181;
                      _context3.t1 = _context3["catch"](138);
                      throw new Error(_context3.t1);

                    case 184:
                      _context3.prev = 184;
                      _context3.next = 187;
                      return effects.cancelled();

                    case 187:
                      Cancelled = _context3.sent;

                      if (!(typeof finalCallback === 'function')) {
                        _context3.next = 194;
                        break;
                      }

                      _context3.next = 191;
                      return effects.race({
                        finalRes: effects.call(finalCallback, {
                          type: type,
                          action: action,
                          payload: commonData,
                          Cancelled: Cancelled,
                          isError: isError,
                          success: _success,
                          error: _error
                        }),
                        cancel: effects.take(action.cancel)
                      });

                    case 191:
                      _yield$race6 = _context3.sent;
                      _CancelPolling3 = _yield$race6.cancel;
                      if (_CancelPolling3) loop = false;

                    case 194:
                      if (dontUpdateReducer) {
                        _context3.next = 197;
                        break;
                      }

                      _context3.next = 197;
                      return effects.call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_FINALLY,
                        cancelled: Cancelled
                      });

                    case 197:
                      if (!Cancelled) {
                        _context3.next = 202;
                        break;
                      }

                      if (!(typeof source.cancel === 'function')) {
                        _context3.next = 201;
                        break;
                      }

                      _context3.next = 201;
                      return source.cancel();

                    case 201:
                      loop = false;

                    case 202:
                      return _context3.finish(184);

                    case 203:
                      if (!(polling && typeof window !== 'undefined' && loop)) {
                        _context3.next = 226;
                        break;
                      }

                      if (!(pollingCount === 'unlimited' || pollingCount - 1 >= count)) {
                        _context3.next = 223;
                        break;
                      }

                      count += 1;
                      _context3.next = 208;
                      return effects.race({
                        posts: effects.call(delayFunction || delay, Delay),
                        cancel: effects.take(action.cancel)
                      });

                    case 208:
                      _yield$race7 = _context3.sent;
                      _CancelPolling4 = _yield$race7.cancel;

                      if (!_CancelPolling4) {
                        _context3.next = 214;
                        break;
                      }

                      loop = false;
                      _context3.next = 221;
                      break;

                    case 214:
                      if (!(polling && typeof window !== 'undefined' && typeof pollingCallback === 'function' && loop)) {
                        _context3.next = 221;
                        break;
                      }

                      _context3.next = 217;
                      return effects.race({
                        pollingRes: effects.call(pollingCallback, POLLING_RESPONSE_DATA),
                        cancel: effects.take(action.cancel)
                      });

                    case 217:
                      _yield$race8 = _context3.sent;
                      _CancelPolling = _yield$race8.cancel;
                      pollingRes = _yield$race8.pollingRes;
                      if (_CancelPolling) loop = false;else if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;

                    case 221:
                      _context3.next = 224;
                      break;

                    case 223:
                      loop = false;

                    case 224:
                      _context3.next = 227;
                      break;

                    case 226:
                      if (!polling && retry && loop) {
                        if (retry - 1 >= count) {
                          loop = true;
                          count += 1;
                        } else loop = false;
                      } else loop = false;

                    case 227:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _loop, null, [[53, 135, 184, 203], [138, 181]]);
            });

          case 20:
            if (!loop) {
              _context4.next = 27;
              break;
            }

            return _context4.delegateYield(_loop(), "t0", 22);

          case 22:
            _ret = _context4.t0;

            if (!(_ret === "break")) {
              _context4.next = 25;
              break;
            }

            return _context4.abrupt("break", 27);

          case 25:
            _context4.next = 20;
            break;

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _marked2);
  }

  var generatorPattern = Object.keys(actionType).map(function (pattern) {
    return actionType[pattern].api && actionType[pattern].api[IS_DEBOUNCE_API_CALL] && actionType[pattern].api[DEBOUNCE_API_CALL_DELAY_IN_MS] > 0 && typeof debounce === 'function' ? debounce(actionType[pattern].api[DEBOUNCE_API_CALL_DELAY_IN_MS], pattern, commonGenerator, !!actionType[pattern].effect) : (actionType[pattern].effect || effects.takeLatest)(pattern, commonGenerator);
  });
  return [generatorPattern, commonGenerator];
}

var _marked$1 = /*#__PURE__*/_regeneratorRuntime.mark(DEFAULT_SAGA_HANDLER);
function DEFAULT_SAGA_HANDLER(_ref) {
  var method, action, successData, requestData, successStatus, restSuccessData, errorStatus, errorData;
  return _regeneratorRuntime.wrap(function DEFAULT_SAGA_HANDLER$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _ref.method, action = _ref.action, successData = _ref.successData, requestData = _ref.requestData, successStatus = _ref.successStatus, restSuccessData = _ref.restSuccessData, errorStatus = _ref.errorStatus, errorData = _ref.errorData;
          _context.t0 = method;
          _context.next = _context.t0 === ON_REQUEST ? 4 : _context.t0 === ON_CANCEL ? 5 : _context.t0 === ON_SUCCESS ? 6 : _context.t0 === ON_ERROR ? 13 : 21;
          break;

        case 4:
          return _context.abrupt("return", requestData);

        case 5:
          return _context.abrupt("return", true);

        case 6:
          if (![200, 201].includes(successStatus)) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return effects.put(action.success(_objectSpread({
            data: successData
          }, restSuccessData)));

        case 9:
          _context.next = 12;
          break;

        case 11:
          return _context.abrupt("return", true);

        case 12:
          return _context.abrupt("break", 21);

        case 13:
          if (!errorStatus) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return effects.put(action.error({
            data: errorData
          }));

        case 16:
          _context.next = 20;
          break;

        case 18:
          _context.next = 20;
          return effects.put(action.error({
            data: {}
          }));

        case 20:
          return _context.abrupt("break", 21);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var _excluded$a = ["status", "data", "message"],
    _excluded2$4 = ["payload", "query", "params"],
    _excluded3$2 = ["status", "data", "message"];
var requestResponseHandler = function requestResponseHandler(_ref) {
  var constants = _ref.constants,
      sagaFunction = _ref.sagaFunction;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line func-names
    _regeneratorRuntime.mark(function _callee(_ref2) {
      var _ref2$data, _ref2$data$data, successStatus, _ref2$data$data$data, successData, successMessage, restSuccessData, request, action, type, _ref2$payload, _ref2$payload$payload, _ref2$payload$query, _ref2$payload$params, restPayload, method, actionData, axiosCancel, _ref2$error, _ref2$error$response, _ref2$error$response$, errorStatus, _ref2$error$response$2, errorData, errorMessage, restErrorData, cancelled, requestData, requestParams, DEFAULT_SAGA_HANDLER$1;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$data = _ref2.data;
              _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
              _ref2$data$data = _ref2$data.data;
              _ref2$data$data = _ref2$data$data === void 0 ? {} : _ref2$data$data;
              successStatus = _ref2$data$data.status, _ref2$data$data$data = _ref2$data$data.data, successData = _ref2$data$data$data === void 0 ? {} : _ref2$data$data$data, successMessage = _ref2$data$data.message, restSuccessData = _objectWithoutProperties(_ref2$data$data, _excluded$a), request = _ref2.request, action = _ref2.action, type = _ref2.type, _ref2$payload = _ref2.payload;
              _ref2$payload = _ref2$payload === void 0 ? {} : _ref2$payload;
              _ref2$payload$payload = _ref2$payload.payload, _ref2$payload$query = _ref2$payload.query, _ref2$payload$params = _ref2$payload.params, restPayload = _objectWithoutProperties(_ref2$payload, _excluded2$4), method = _ref2.method, actionData = _ref2.actionData, axiosCancel = _ref2.axiosCancel, _ref2$error = _ref2.error;
              _ref2$error = _ref2$error === void 0 ? {} : _ref2$error;
              _ref2$error$response = _ref2$error.response;
              _ref2$error$response = _ref2$error$response === void 0 ? {} : _ref2$error$response;
              _ref2$error$response$ = _ref2$error$response.data;
              _ref2$error$response$ = _ref2$error$response$ === void 0 ? {} : _ref2$error$response$;
              errorStatus = _ref2$error$response$.status, _ref2$error$response$2 = _ref2$error$response$.data, errorData = _ref2$error$response$2 === void 0 ? [] : _ref2$error$response$2, errorMessage = _ref2$error$response$.message, restErrorData = _objectWithoutProperties(_ref2$error$response$, _excluded3$2), cancelled = _ref2.cancelled;
              requestData = {};
              if (method === ON_REQUEST) requestData = newObject(request);
              requestParams = {
                method: method,
                action: action,
                successData: successData,
                requestData: requestData,
                successStatus: successStatus,
                restSuccessData: restSuccessData,
                errorStatus: errorStatus,
                errorData: errorData,
                restPayload: restPayload,
                restErrorData: restErrorData
              };
              DEFAULT_SAGA_HANDLER$1 = DEFAULT_SAGA_HANDLER.bind(null, requestParams);

              if (!sagaFunction) {
                _context.next = 21;
                break;
              }

              _context.next = 20;
              return effects.call(sagaFunction, newObject({
                type: type,
                constants: constants,
                DEFAULT_SAGA_HANDLER: DEFAULT_SAGA_HANDLER$1
              }, requestParams));

            case 20:
              return _context.abrupt("return", _context.sent);

            case 21:
              _context.t0 = method;
              _context.next = _context.t0 === ON_REQUEST ? 24 : 25;
              break;

            case 24:
              return _context.abrupt("return", requestData);

            case 25:
              _context.next = 27;
              return effects.call(DEFAULT_SAGA_HANDLER$1);

            case 27:
              return _context.abrupt("return", _context.sent);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
};

var Saga = (function (_ref) {
  var sagaConfig = _ref.sagaConfig,
      constants = _ref.constants,
      sagaFunction = _ref.sagaFunction,
      axiosInterceptors = _ref.axiosInterceptors,
      _ref$constantSaga = _ref.constantSaga,
      OtherGenerator = _ref$constantSaga === void 0 ? [] : _ref$constantSaga;

  var _sagaHandler2 = _sagaHandler({
    requestResponseHandler: requestResponseHandler({
      constants: constants,
      sagaFunction: sagaFunction
    }),
    actionType: sagaConfig,
    axiosInterceptors: axiosInterceptors
  }),
      _sagaHandler3 = _slicedToArray(_sagaHandler2, 2),
      generatorPattern = _sagaHandler3[0],
      sagaGenerator = _sagaHandler3[1]; // For Test Purpose


  var Generator = sagaGenerator; // eslint-disable-next-line func-names

  var saga = /*#__PURE__*/_regeneratorRuntime.mark(function saga() {
    return _regeneratorRuntime.wrap(function saga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return effects.all(generatorPattern.concat(OtherGenerator || []));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, saga);
  });

  return {
    saga: saga,
    Generator: Generator
  };
});

var _excluded$b = ["res", "req", "store"];
var HANDLERS$2 = HOC_MAIN_CONFIG_KEY.HANDLERS,
    NEXT_JS$1 = HOC_MAIN_CONFIG_KEY.NEXT_JS,
    CREATE_REDUCER$1 = HOC_MAIN_CONFIG_KEY.CREATE_REDUCER,
    USE_HOC_HOOK$1 = HOC_MAIN_CONFIG_KEY.USE_HOC_HOOK,
    ALLOW_MAP_STATE_TO_PROPS$1 = HOC_MAIN_CONFIG_KEY.ALLOW_MAP_STATE_TO_PROPS,
    GET_INITIAL_PROPS_KEY$1 = HOC_MAIN_CONFIG_KEY.GET_INITIAL_PROPS_KEY,
    IS_DEVELOPMENT$1 = HOC_MAIN_CONFIG_KEY.IS_DEVELOPMENT,
    USE_TYPE$1 = HOC_MAIN_CONFIG_KEY.USE_TYPE,
    USE_HOOK$1 = HOC_MAIN_CONFIG_KEY.USE_HOOK,
    HOOK_WITH_HOC$1 = HOC_MAIN_CONFIG_KEY.HOOK_WITH_HOC;
var API_END_POINTS$1 = HOC_INITIAL_CONFIG_KEY.API_END_POINTS,
    INITIAL_STATE$1 = HOC_INITIAL_CONFIG_KEY.INITIAL_STATE,
    GET_DEFAULT_CONFIG$1 = HOC_INITIAL_CONFIG_KEY.GET_DEFAULT_CONFIG,
    DONT_RESET_REDUCER_KEYS$1 = HOC_INITIAL_CONFIG_KEY.DONT_RESET_REDUCER_KEYS,
    IS_MOBILE$1 = HOC_INITIAL_CONFIG_KEY.IS_MOBILE,
    SAGA$1 = HOC_INITIAL_CONFIG_KEY.SAGA,
    SAGA_CONSTANT$1 = HOC_INITIAL_CONFIG_KEY.SAGA_CONSTANT,
    REDUCER_CONSTANT$1 = HOC_INITIAL_CONFIG_KEY.REDUCER_CONSTANT,
    REDUCER$1 = HOC_INITIAL_CONFIG_KEY.REDUCER,
    AXIOS_INTERCEPTORS$1 = HOC_INITIAL_CONFIG_KEY.AXIOS_INTERCEPTORS,
    REDUCER_NAME$1 = HOC_INITIAL_CONFIG_KEY.REDUCER_NAME;
var safe$1 = nullcheck;

var checkKey$4 = function checkKey(key, name, dataType) {
  var convertArray = Array.isArray(dataType) ? dataType : [dataType];
  invariant(convertArray.includes(typeOf(key)), "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a (").concat(convertArray.join(' | '), ")"));
};

var showInjectedMessage = function showInjectedMessage(reducerName) {
  console.log("===== Successfully Injected Reducer - ".concat(reducerName, " ====="));
};

var reducerNameErrorMessage = '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string';

var showDepricatedMessage = function showDepricatedMessage(reducerName) {
  var DEPRICATED_MESSAGE = "<======= \"".concat(reducerName, " Reducer\" (react-boilerplate-redux-saga-hoc) Sorry! This package is depricated.This version is no longer supported, and will not receive security updates.====>");
  if (console.warn) console.warn(DEPRICATED_MESSAGE);
  if (console.error) console.error(DEPRICATED_MESSAGE);
  if (console.info) console.info(DEPRICATED_MESSAGE);
};

var isMounted = {};
var index = (function (_ref) {
  var _ref$HANDLERS = _ref[HANDLERS$2],
      handlers = _ref$HANDLERS === void 0 ? [] : _ref$HANDLERS,
      _ref$NEXT_JS = _ref[NEXT_JS$1],
      nextJS = _ref$NEXT_JS === void 0 ? false : _ref$NEXT_JS,
      _ref$CREATE_REDUCER = _ref[CREATE_REDUCER$1],
      createReducer = _ref$CREATE_REDUCER === void 0 ? null : _ref$CREATE_REDUCER,
      _ref$USE_HOOK = _ref[USE_HOOK$1],
      useHook = _ref$USE_HOOK === void 0 ? false : _ref$USE_HOOK,
      _ref$USE_HOC_HOOK = _ref[USE_HOC_HOOK$1],
      useHocHook = _ref$USE_HOC_HOOK === void 0 ? false : _ref$USE_HOC_HOOK,
      _ref$HOOK_WITH_HOC = _ref[HOOK_WITH_HOC$1],
      hookWithHoc = _ref$HOOK_WITH_HOC === void 0 ? false : _ref$HOOK_WITH_HOC,
      _ref$ALLOW_MAP_STATE_ = _ref[ALLOW_MAP_STATE_TO_PROPS$1],
      _mapStateToProps = _ref$ALLOW_MAP_STATE_ === void 0 ? true : _ref$ALLOW_MAP_STATE_,
      _ref$GET_INITIAL_PROP = _ref[GET_INITIAL_PROPS_KEY$1],
      getInitialPropsKey = _ref$GET_INITIAL_PROP === void 0 ? GET_INITIAL_PROPS_DEFAULT : _ref$GET_INITIAL_PROP,
      _ref$IS_DEVELOPMENT = _ref[IS_DEVELOPMENT$1],
      isDevelopment = _ref$IS_DEVELOPMENT === void 0 ? false : _ref$IS_DEVELOPMENT,
      useType = _ref[USE_TYPE$1];

  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$API_END_POINTS = _ref2[API_END_POINTS$1],
        apiEndPoints = _ref2$API_END_POINTS === void 0 ? {} : _ref2$API_END_POINTS,
        _ref2$INITIAL_STATE = _ref2[INITIAL_STATE$1],
        initialState = _ref2$INITIAL_STATE === void 0 ? {} : _ref2$INITIAL_STATE,
        _ref2$GET_DEFAULT_CON = _ref2[GET_DEFAULT_CONFIG$1],
        getDefaultConfig = _ref2$GET_DEFAULT_CON === void 0 ? false : _ref2$GET_DEFAULT_CON,
        _ref2$DONT_RESET_REDU = _ref2[DONT_RESET_REDUCER_KEYS$1],
        dontResetOnLogout = _ref2$DONT_RESET_REDU === void 0 ? {} : _ref2$DONT_RESET_REDU,
        _ref2$IS_MOBILE = _ref2[IS_MOBILE$1],
        isMobile = _ref2$IS_MOBILE === void 0 ? false : _ref2$IS_MOBILE,
        sagaFunction = _ref2[SAGA$1],
        _ref2$SAGA_CONSTANT = _ref2[SAGA_CONSTANT$1],
        constantSaga = _ref2$SAGA_CONSTANT === void 0 ? [] : _ref2$SAGA_CONSTANT,
        constantReducer = _ref2[REDUCER_CONSTANT$1],
        reducerFunction = _ref2[REDUCER$1],
        reducerName = _ref2[REDUCER_NAME$1],
        axiosInterceptors = _ref2[AXIOS_INTERCEPTORS$1],
        _ref2$USE_HOOK = _ref2[USE_HOOK$1],
        _useHook = _ref2$USE_HOOK === void 0 ? false : _ref2$USE_HOOK;

    var reducer_name_hoc_key = "".concat(reducerName, "_hoc");
    var stateProps = null;
    invariant(!!reducerName && typeOf(reducerName) === 'string', reducerNameErrorMessage);
    checkKey$4(apiEndPoints, 'apiEndPoints', 'object');
    checkKey$4(initialState, 'initialState', 'object');
    checkKey$4(dontResetOnLogout, 'dontReset', ['object', 'array']);
    if (sagaFunction) checkKey$4(sagaFunction, 'saga', 'function');
    checkKey$4(constantSaga, 'constantSaga', 'array');
    checkKey$4(handlers, 'handlers', 'array');
    if (constantReducer) checkKey$4(constantReducer, 'constantReducer', 'function');
    if (reducerFunction) checkKey$4(reducerFunction, 'reducer', 'function');
    if (createReducer) checkKey$4(createReducer, 'createReducer', 'function');

    var ApiEndPoints = _defineProperty({}, reducerName, apiEndPoints);

    var _generateConstants = generateConstants({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout: dontResetOnLogout
    }),
        constants = _generateConstants.constants,
        InitialState = _generateConstants.initialState,
        resetState = _generateConstants.resetState,
        Action = _generateConstants.actions,
        sagaConfig = _generateConstants.sagaConfig;

    var _generateAction = generateAction(Action),
        componentActions = _generateAction.componentActions;

    var _Saga = Saga({
      sagaConfig: sagaConfig,
      constants: constants,
      sagaFunction: sagaFunction,
      axiosInterceptors: axiosInterceptors,
      constantSaga: constantSaga
    }),
        saga = _Saga.saga;

    var reducer = Reducer({
      constants: constants,
      InitialState: newObject(initialState, InitialState),
      reducerFunction: reducerFunction,
      resetState: resetState,
      constantReducer: constantReducer,
      isMobile: isMobile,
      handlers: handlers,
      reducerName: reducerName
    });

    var _constants = Object.entries(constants).reduce(function (acc, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, value[commonConstants.CALL]));
    }, {});

    var componentData = _defineProperty({}, reducer_name_hoc_key, {
      reducerConstants: _constants,
      constants: constants,
      initialState: initialState,
      constantActions: componentActions,
      axios: axiosInterceptors || request,
      resetState: resetState,
      reducerName: reducerName
    });

    var commonProps = useHook || _useHook || !_mapStateToProps ? {
      safe: safe$1
    } : {
      safe: safe$1,
      getData: getData
    };
    var injectSagaConfig = {
      key: reducerName,
      saga: saga
    };
    var injectReducerConfig = {
      key: reducerName,
      reducer: reducer
    };

    var _useHocHook = function _useHocHook() {
      var isInjected = React.useRef(isMounted[reducerName]);

      if (useType !== FOR_INTERNAL_USE_ONLY) {
        showDepricatedMessage(reducerName);
      } else if (!isInjected.current && !nextJS) {
        useInjectSaga(injectSagaConfig, !isMounted[reducerName], false, function () {
          if (isDevelopment) showInjectedMessage(reducerName);
        });
        useInjectReducer(injectReducerConfig, createReducer, !isMounted[reducerName]);
        if (!isMounted[reducerName]) isMounted[reducerName] = true;
      }

      var dispatch = reactRedux.useDispatch();

      if ((!stateProps || isDevelopment) && dispatch) {
        stateProps = _objectSpread(_objectSpread({}, componentData[reducer_name_hoc_key]), {}, {
          actions: redux.bindActionCreators(componentActions, dispatch),
          dispatch: dispatch
        });
      }

      return React.useState(stateProps)[0];
    };

    if (useHocHook && !nextJS && !hookWithHoc) return _useHocHook;

    var hoc = function hoc(WrapperComponent) {
      function WithHoc(props) {
        return /*#__PURE__*/React__default.createElement(WrapperComponent, _extends({}, commonProps, props));
      }

      WithHoc.propTypes = {};
      WithHoc.displayName = "withReactBoilerplateReduxSagaHoc(".concat(WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent', ")");
      var MakeSelectAuthenticationState = useHook || !_mapStateToProps ? null : makeSelectAuthenticationState({
        apiEndPoints: ApiEndPoints,
        initialState: newObject(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants: constants
      });
      var mapStateToProps = useHook || !_mapStateToProps ? null : reselect.createStructuredSelector(_defineProperty({}, "".concat(reducerName, "_data"), MakeSelectAuthenticationState()));
      var authenticationReducer = !isMounted[reducerName] ? injectReducer({
        key: reducerName,
        reducer: reducer
      }, createReducer) : undefined;
      var authenticationSaga = !isMounted[reducerName] ? injectSaga({
        key: reducerName,
        saga: saga
      }) : undefined;
      var withConnect = reactRedux.connect(useHook || !_mapStateToProps ? null : mapStateToProps, mapDispatchToProps(componentActions, componentData, reducerName));

      if (nextJS) {
        if (useType !== FOR_INTERNAL_USE_ONLY) {
          showDepricatedMessage(reducerName);
          return WithHoc;
        }

        WithHoc[getInitialPropsKey] = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
            var _ref6, res, req, store, rest, data;

            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref6 = props.ctx || props, res = _ref6.res, req = _ref6.req, store = _ref6.store, rest = _objectWithoutProperties(_ref6, _excluded$b);
                    data = _objectSpread({
                      res: res,
                      req: req,
                      store: store
                    }, rest);

                    if (!WrapperComponent[getInitialPropsKey]) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return WrapperComponent[getInitialPropsKey](_objectSpread(_objectSpread({}, props), mapDispatchToProps(componentActions, componentData, reducerName // eslint-disable-next-line prettier/prettier
                    )(store.dispatch)));

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

      if (useType !== FOR_INTERNAL_USE_ONLY) {
        showDepricatedMessage(reducerName);
        return WithHoc;
      }

      if (!isMounted[reducerName]) {
        isMounted[reducerName] = true;
        if (isDevelopment) showInjectedMessage(reducerName);
        return redux.compose(withConnect, authenticationReducer, authenticationSaga)(WithHoc);
      }

      return withConnect(WithHoc);
    };

    if (!nextJS && hookWithHoc && getDefaultConfig) return _objectSpread({
      hook: _useHocHook,
      hoc: hoc,
      actions: _objectSpread({}, componentActions)
    }, componentData[reducer_name_hoc_key]);
    if (!nextJS && hookWithHoc) return {
      hook: _useHocHook,
      hoc: hoc
    };
    if (nextJS && getDefaultConfig) return _objectSpread({
      hoc: hoc,
      saga: saga,
      hook: _useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      },
      actions: _objectSpread({}, componentActions)
    }, componentData[reducer_name_hoc_key]);
    if (nextJS) return {
      hoc: hoc,
      saga: saga,
      hook: _useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      }
    };

    if (getDefaultConfig) {
      return _objectSpread({
        hoc: hoc,
        actions: _objectSpread({}, componentActions)
      }, componentData[reducer_name_hoc_key]);
    }

    return hoc;
  };
});

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middleWare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var enhancers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var composeEnhancers = redux.compose;
  var reduxSagaMonitorOptions = {}; // const routerMiddleware = isWeb
  //   ? require('connected-react-router').routerMiddleware
  //   : null;
  // const History = isWeb ? require('./utils/history').default : null;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

  /* istanbul ignore next */

  if (process.env.NODE_ENV !== 'production' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}); // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };

    /* eslint-enable */
  }

  var sagaMiddleware = createSagaMiddleware__default(reduxSagaMonitorOptions); // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state

  var middlewares = [sagaMiddleware].concat(middleWare // isWeb ? [routerMiddleware(History)] : [],
  ); // eslint-disable-next-line no-underscore-dangle

  var _enhancers = [redux.applyMiddleware.apply(void 0, _toConsumableArray(middlewares))].concat(_toConsumableArray(enhancers));

  var store = redux.createStore(createReducer({}), initialState, composeEnhancers.apply(void 0, _toConsumableArray(_enhancers))); // Extensions

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry

  store.injectedSagas = {}; // Saga registry
  // Make reducers hot reloadable, see http://mxs.is/googmo

  /* istanbul ignore next */
  // if (typeof module === 'object' && module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createReducer(store.injectedReducers));
  //   });
  // }
  // global._redux_store = store;

  return store;
}

var nextStore = function nextStore(_ref) {
  var saga = _ref.saga,
      reducer = _ref.reducer,
      _ref$middlewares = _ref.middlewares,
      _middlewares = _ref$middlewares === void 0 ? [] : _ref$middlewares,
      _ref$enhancers = _ref.enhancers,
      _enhancers = _ref$enhancers === void 0 ? [] : _ref$enhancers;

  return function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        isServer = _ref2.isServer,
        _ref2$req = _ref2.req,
        req = _ref2$req === void 0 ? null : _ref2$req;

    var composeEnhancers = redux.compose;
    var monitor = null; // if (typeof window !== "undefined")
    //   monitor = window["__SAGA_MONITOR_EXTENSION__"];

    var reduxSagaMonitorOptions = {
      sagaMonitor: monitor
    }; // eslint-disable-next-line global-require
    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

    /* istanbul ignore next */

    if (process.env.NODE_ENV !== 'production' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      /* eslint-disable no-underscore-dangle */
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}); // NOTE: Uncomment the code below to restore support for Redux Saga
      // Dev Tools once it supports redux-saga version 1.x.x
      // if (window.__SAGA_MONITOR_EXTENSION__)
      //   reduxSagaMonitorOptions = {
      //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
      //   };

      /* eslint-enable */
    }

    var sagaMiddleware = createSagaMiddleware__default(reduxSagaMonitorOptions); // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state

    var middlewares = [sagaMiddleware].concat(_middlewares // isWeb ? [routerMiddleware(History)] : [],
    );
    var enhancers = [redux.applyMiddleware.apply(void 0, _toConsumableArray(middlewares))].concat(_toConsumableArray(_enhancers));
    var store = redux.createStore(redux.combineReducers(reducer.reduce(function (acc, e) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, e.name, e.reducer));
    }, {})), initialState, composeEnhancers.apply(void 0, _toConsumableArray(enhancers))); // Extensions

    store.runSaga = sagaMiddleware.run; // store.sagaTask = sagaMiddleware;

    store.injectedReducers = {}; // Reducer registry

    store.injectedSagas = {}; // Saga registry

    store.tasks = {};

    if (req || !isServer) {
      store.sagaTask = sagaMiddleware.run( /*#__PURE__*/_regeneratorRuntime.mark(function rootSaga() {
        return _regeneratorRuntime.wrap(function rootSaga$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return effects.all(saga.map(effects.fork));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, rootSaga);
      }));
    } // Make reducers hot reloadable, see http://mxs.is/googmo

    /* istanbul ignore next */
    // if (module && module.hot) {
    //   module.hot.accept("./reducers", () => {`
    //     store.replaceReducer(createReducer(store.injectedReducers));
    //   });
    // }


    return store;
  };
};

function withReduxSaga() {
  var BaseComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var WrappedComponent = /*#__PURE__*/function (_Component) {
    _inherits(WrappedComponent, _Component);

    var _super = _createSuper(WrappedComponent);

    function WrappedComponent() {
      _classCallCheck(this, WrappedComponent);

      return _super.apply(this, arguments);
    }

    _createClass(WrappedComponent, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React__default.createElement(BaseComponent, this.props);
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var props,
              isServer,
              store,
              pageProps,
              _args = arguments;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  props = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  isServer = props.ctx ? props.ctx.isServer : props.isServer;
                  store = props.ctx ? props.ctx.store : props.store;
                  pageProps = {};

                  if (!BaseComponent.getInitialProps) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 7;
                  return BaseComponent.getInitialProps(props);

                case 7:
                  pageProps = _context.sent;

                case 8:
                  if (!isServer) {
                    _context.next = 17;
                    break;
                  }

                  if (!(typeof store.sagaTask.toPromise === 'function')) {
                    _context.next = 14;
                    break;
                  }

                  _context.next = 12;
                  return store.sagaTask.toPromise();

                case 12:
                  _context.next = 16;
                  break;

                case 14:
                  _context.next = 16;
                  return store.sagaTask.done;

                case 16:
                  store.dispatch(createSagaMiddleware.END);

                case 17:
                  return _context.abrupt("return", pageProps);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function getInitialProps() {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WrappedComponent;
  }(React.Component);

  _defineProperty(WrappedComponent, "displayName", "withReduxSaga(".concat(BaseComponent.displayName || BaseComponent.name || 'BaseComponent', ")"));

  return WrappedComponent;
}

/* eslint-disable */

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

var __extends =  function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || _instanceof({
      __proto__: []
    }, Array) && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign =  function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter =  function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return _instanceof(value, P) ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator =  function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    throw: verb(1),
    return: verb(2)
  }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __rest =  function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === 'function') for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importStar =  function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result['default'] = mod;
  return result;
};

Object.defineProperty(typeof exports !== 'undefined' ? exports : {}, '__esModule', {
  value: true
});

var react_1 = __importStar(require('react'));

var defaultConfig = {
  storeKey: '__NEXT_REDUX_STORE__',
  debug: false,
  serializeState: function serializeState(state) {
    return state;
  },
  deserializeState: function deserializeState(state) {
    return state;
  }
};
function withRedux (makeStore, config) {
  config = __assign(__assign({}, defaultConfig), config);
  var isServer = typeof window === 'undefined';

  var initStore = function initStore(_a) {
    var initialState = _a.initialState,
        ctx = _a.ctx;
    var storeKey = config.storeKey;

    var createStore = function createStore() {
      return makeStore(config.deserializeState(initialState), __assign(__assign(__assign({}, ctx), config), {
        isServer: isServer
      }));
    };

    if (isServer) return createStore(); // Memoize store if client

    if (!(storeKey in window)) {
      window[storeKey] = createStore();
    }

    return window[storeKey];
  };

  return function (App) {
    var _a;

    return _a =
    /** @class */
    function (_super) {
      __extends(WrappedApp, _super);

      function WrappedApp(props, context) {
        var _this = _super.call(this, props, context) || this;

        var initialState = props.initialState;
        if (config.debug) console.log('4. WrappedApp.render created new store with initialState', initialState);
        _this.store = initStore({
          initialState: initialState
        });
        return _this;
      }

      WrappedApp.prototype.render = function () {
        var _a = this.props,
            initialProps = _a.initialProps,
            initialState = _a.initialState,
            props = __rest(_a, ['initialProps', 'initialState']); // Cmp render must return something like <Provider><Component/></Provider>


        return react_1.default.createElement(App, __assign({}, props, initialProps, {
          store: this.store
        }));
      };

      return WrappedApp;
    }(react_1.Component),
    /* istanbul ignore next */
    _a.displayName = 'withRedux(' + (App.displayName || App.name || 'App') + ')', _a.getInitialProps = function (appCtx) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, initialProps;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              /* istanbul ignore next */
              if (!appCtx) throw new Error('No app context');
              /* istanbul ignore next */

              if (!appCtx.ctx) throw new Error('No page context');
              store = initStore({
                ctx: appCtx.ctx
              });
              if (config.debug) console.log('1. WrappedApp.getInitialProps wrapper got the store with state', store.getState());
              appCtx.ctx.store = store;
              appCtx.ctx.isServer = isServer;
              initialProps = {};
              if (!('getInitialProps' in App)) return [3,
              /*break*/
              2];
              return [4,
              /*yield*/
              App.getInitialProps.call(App, appCtx)];

            case 1:
              initialProps = _a.sent();
              _a.label = 2;

            case 2:
              if (config.debug) console.log('3. WrappedApp.getInitialProps has store state', store.getState());
              return [2,
              /*return*/
              {
                isServer: isServer,
                initialState: isServer ? config.serializeState(store.getState()) : store.getState(),
                initialProps: initialProps
              }];
          }
        });
      });
    }, _a;
  };
}

exports.HOC = index;
exports.Safe = nullcheck;
exports.axios = request;
exports.commonConstants = commonConstants;
exports.nextStore = nextStore;
exports.store = configureStore;
exports.withRedux = withRedux;
exports.withReduxSaga = withReduxSaga;
