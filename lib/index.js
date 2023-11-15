import _extends from '@babel/runtime/helpers/extends';
import React, { useRef, useState, Component } from 'react';
import { ReactReduxContext, useDispatch, connect } from 'react-redux';
import invariant from 'invariant';
import { createSelector, createStructuredSelector } from 'reselect';
import { combineReducers, bindActionCreators, compose, applyMiddleware, createStore } from 'redux';
import AxiosDefault from 'axios';
import { takeEvery, fork, take, race, delay as delay$1, takeLatest, call, put, cancelled, all } from 'redux-saga/effects';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import hoistNonReactStatics from 'hoist-non-react-statics';
import 'fast-deep-equal';
import Qs from 'query-string';
import createSagaMiddleware, { END } from 'redux-saga';

/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
const request = AxiosDefault;

/* eslint-disable no-underscore-dangle */
const _FOR_INTERNAL_USE_ONLY_ = `@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@`;
const _USE_TYPE_ = `@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@`;
const GET_INITIAL_PROPS_DEFAULT = 'getInitialProps';
const API_LOADING_STATUS = 'app/API_LOADING_STATUS';
const TAKE_EVERY = 'every';
const REFETCH_API_QUERY = 'REFETCH_API_QUERY';
const REDUCER_BASE_PATH = 'app/containers/';
const IS_DEBOUNCE_API_CALL = 'is_debounce_api_call';
const DEBOUNCE_API_CALL_DELAY_IN_MS = 'debounce_api_call_delay';
const ON_CANCEL_ERROR = 'API_CANCEL_ERROR';
const ON_ERROR = 'ERROR';
const ON_SUCCESS = 'SUCCESS';
const ON_FINALLY = 'FINALLY';
const ON_CANCEL = 'CANCEL';
const ON_REQUEST = 'REQUEST';
const ON_LOADING = 'LOADING';
const ON_UNMOUNT = 'UNMOUNT';
const ON_TOAST = 'TOAST';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const CALL = 'CALL';
const CANCEL = 'CANCEL';
const CUSTOM = 'CUSTOM_TASK';
const INFINITE_DATA_HANDLER = 'Infinite-Handler';
const DATA_HANDLER = 'Data-Handler';
const DELETE_DATA_HANDLER = 'Delete-Handler';
const UPDATE_DATA_HANDLER = 'Update-Handler';
const UPDATE_DATA_KEY_HANDLER = 'Update-Key-Handler';
const DELETE_DATA_KEY_HANDLER = 'Delete-Key-Handler';
const TOGGLE_DATA_KEY_HANDLER = 'Toggle-Key-Handler';
const SPLICE_DATA_HANDLER = 'Splice-Data-Handler';
const CALLBACK_HANDLER = 'Callback-Handler';
const RESET_HANDLER = 'Reset-Handler';
const TOAST_HANDLER = 'Toast-Handler';
const ERROR_HANDLER = 'Error-Handler';
const LOADER_HANDLER = 'Loading-Handler';
const DONT_UPDATE_DATA_HANDLER = "Don't-Update-Data-Handler";
const CUSTOM_HANDLER = 'Custom-Handler';
const TYPE_NULL = 'null';
const TYPE_UNDEFINED = 'undefined';
const TYPE_STRING = 'string';
const TYPE_ARRAY = 'array';
const TYPE_BOOLEAN = 'boolean';
const TYPE_OBJECT = 'object';
const TYPE_FUNCTION = 'function';
const TYPE_ERROR = 'error';
const TYPE_SYMBOL = 'symbol';
const TYPE_GENERATOR_FUNCTION = 'generatorFunction';
const FOR_INTERNAL_USE_ONLY = _FOR_INTERNAL_USE_ONLY_;
const USE_TYPE = _USE_TYPE_;
const HANDLERS = 'handlers';
const NEXT_JS = 'nextJS';
const CREATE_REDUCER = 'createReducer';
const USE_HOOK = 'useHook';
const USE_HOC_HOOK = 'useHocHook';
const HOOK_WITH_HOC = 'hookWithHoc';
const ALLOW_MAP_STATE_TO_PROPS = 'mapStateToProps';
const GET_INITIAL_PROPS_KEY = 'getInitialPropsKey';
const IS_DEVELOPMENT = 'isDevelopment';
const HOC_MAIN_CONFIG_KEY = {
  HANDLERS,
  NEXT_JS,
  CREATE_REDUCER,
  USE_HOOK,
  USE_HOC_HOOK,
  HOOK_WITH_HOC,
  ALLOW_MAP_STATE_TO_PROPS,
  GET_INITIAL_PROPS_KEY,
  IS_DEVELOPMENT,
  USE_TYPE
};
const API_END_POINTS = 'apiEndPoints';
const INITIAL_STATE = 'initialState';
const GET_DEFAULT_CONFIG = 'getDefaultConfig';
const DONT_RESET_REDUCER_KEYS = 'dontReset';
const IS_MOBILE = 'isMobile';
const SAGA = 'saga';
const SAGA_CONSTANT = 'constantSaga';
const REDUCER_CONSTANT = 'constantReducer';
const REDUCER = 'reducer';
const AXIOS_INTERCEPTORS = 'axiosInterceptors';
const REDUCER_NAME = 'name';
const HOC_INITIAL_CONFIG_KEY = {
  API_END_POINTS,
  INITIAL_STATE,
  GET_DEFAULT_CONFIG,
  DONT_RESET_REDUCER_KEYS,
  IS_MOBILE,
  SAGA,
  SAGA_CONSTANT,
  REDUCER_CONSTANT,
  REDUCER,
  AXIOS_INTERCEPTORS,
  USE_HOOK,
  REDUCER_NAME
};
const COMMON_TASKS = {
  TASK_NAME: 'name',
  SUB_KEYS_ARRAY: 'subKey',
  IS_CLEAR_PREVIOUS_DATA_ON_SUCCESS: 'clearData',
  IS_CLEAR_PREVIOUS_DATA_ON_API_START: 'clearDataOnStart'
};
const DONT_UPDATE_RESPONSE_DATA = 'dontUpdateResponseData';
const DONT_UPDATE_SUCCESS_DATA = 'dontUpdateSuccessData';
const UPDATE_CALLBACK = 'updateCallback';
const ID_REFERENCE_KEY = 'key';
const IDS = 'id';
const API_TASK_CONFIG_KEYS = {
  TASKS: 'tasks',
  TASK: {
    KEY: 'task',
    COMMON_TASK_KEYS: COMMON_TASKS,
    INFINITE_DATA_HANDLER: {
      ...COMMON_TASKS,
      LIMIT: 'limit',
      IS_APPEND_DATA_ON_TOP: 'isAppendTop',
      SET_INFINITE_END_KEY_TRUE_OR_FALSE: 'setInfiniteEnd',
      UPDATE_CALLBACK
    },
    DATA_HANDLER: {
      ...COMMON_TASKS,
      UPDATE_CALLBACK
    },
    DELETE_DATA_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS
    },
    UPDATE_DATA_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA,
      DONT_UPDATE_SUCCESS_DATA
    },
    UPDATE_DATA_KEY_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA,
      DONT_UPDATE_SUCCESS_DATA
    },
    DELETE_DATA_KEY_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      DELETE_KEYS_ARRAY: 'deleteKey'
    },
    TOGGLE_DATA_KEY_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      TOGGLE_KEYS_ARRAY: 'toggleKey'
    },
    SPLICE_DATA_HANDLER: {
      ...COMMON_TASKS,
      UPDATE_CALLBACK,
      SPLICE_VALUE_ARRAY: 'spliceKey'
    },
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
    DONT_UPDATE_DATA_HANDLER: {
      ...COMMON_TASKS
    }
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
    UPDATE_CALLBACK
  }
};
const USE_QUERY_REDUCER_CONFIG_KEYS = {
  PARENT_KEY: 'key',
  REDUCER_KEY: 'key',
  REQUIRED_DATA_KEY: 'requiredKey',
  FILTER_ARRAY: 'filter',
  QUERY_DATA_STRING_OR_ARRAY: 'initialLoaderqueryState',
  INITIAL_LOADER_STATE: 'initialLoaderState',
  GET_DEFAULT_DATA_FORMAT: 'defaultDataFormat',
  DEFAULT_DATA_OR_FORMAT: 'default'
};
const USE_QUERY_CONFIG_KEYS = {
  REDUCER_NAME: 'reducerName',
  REDUCER_KEYS_ARRAY_OR_OBJECT_OR_STRING: USE_QUERY_REDUCER_CONFIG_KEYS,
  REDUCER_KEYS_CONFIG: 'config',
  CALLBACK_FUNCTION_RETURN_DATA: 'callback',
  TRIGGER_AFTER_CALLBACK_NO_DATA_RETURN: 'callbackSuccess',
  REFRESH_KEY: 'refreshKey'
};
const API_END_POINTS_CONFIG_KEYS = {
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
  DEBOUNCE_API_CALL_DELAY_IN_MS,
  IS_DEBOUNCE_API_CALL,
  SAGA_EFFECT: 'effect'
};
const API_END_POINTS_CONFIG_DEFAULT_VALUE = {
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
const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};
const commonConstants = {
  TAKE_EVERY,
  API_END_POINTS_CONFIG_DEFAULT_VALUE,
  API_END_POINTS_CONFIG_KEYS,
  USE_QUERY_CONFIG_KEYS,
  API_TASK_CONFIG_KEYS,
  ENVIRONMENT_TYPE: ENV,
  /* Don't Change any key */
  INFINITE_DATA_HANDLER,
  DATA_HANDLER,
  DELETE_DATA_HANDLER,
  UPDATE_DATA_HANDLER,
  UPDATE_DATA_KEY_HANDLER,
  DELETE_DATA_KEY_HANDLER,
  TOGGLE_DATA_KEY_HANDLER,
  SPLICE_DATA_HANDLER,
  RESET_HANDLER,
  CALLBACK_HANDLER,
  TOAST_HANDLER,
  ERROR_HANDLER,
  LOADER_HANDLER,
  DONT_UPDATE_DATA_HANDLER,
  /* Don't Change any key */
  ON_CANCEL_ERROR,
  ON_ERROR,
  ON_SUCCESS,
  ON_FINALLY,
  ON_CANCEL,
  ON_REQUEST,
  ON_LOADING,
  ON_UNMOUNT,
  ON_TOAST,
  ERROR,
  SUCCESS,
  CALL,
  CANCEL,
  CUSTOM,
  TYPE_NULL,
  TYPE_UNDEFINED,
  TYPE_STRING,
  TYPE_ARRAY,
  TYPE_BOOLEAN,
  TYPE_OBJECT,
  TYPE_FUNCTION,
  TYPE_ERROR,
  TYPE_SYMBOL,
  TYPE_GENERATOR_FUNCTION
};

const cloneObject = function (oldState) {
  let newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({}, oldState, newState);
};
const newObject = function () {
  let oldState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }
  return rest.reduce((acc, curr) => cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr), cloneObject(oldState));
};

/* eslint-disable indent */
function deleteIn(obj, arr) {
  let i = 0;
  let o = obj;
  function update() {
    if (Array.isArray(o)) {
      return (() => {
        const a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map((data, ind) => {
          if (+arr[i] === ind) {
            if (arr.length - 1 === i) {
              if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
              return Array.isArray(o) ? null : o;
            }
            return (() => {
              o = data;
              i += 1;
              return update();
            })();
          }
          return data;
        }).filter(e => e) : (() => {
          if (arr.length - 1 === i) {
            if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
            return o;
          }
          return o;
        })();
        return a;
      })();
    }
    return (() => {
      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }
      return cloneObject(o, {
        [arr[i]]: (() => {
          o = o[arr[i]];
          i += 1;
          return update();
        })()
      });
    })();
  }
  return update();
}

/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
function getIn(obj, arr) {
  let i = 0;
  let o = obj;
  function get() {
    return arr.length > 0 && arr.length - 1 === i ? typeof o === 'undefined' || o === null ? o : o[arr[i]] : (() => {
      if (typeof o === 'undefined' || o === null) return o;
      o = o[arr[i]];
      i += 1;
      return get();
    })();
  }
  return arr.length > 0 ? get() : obj;
}

/* eslint-disable indent */
function updateIn(obj) {
  let arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let callback = arguments.length > 2 ? arguments[2] : undefined;
  let i = 0;
  let o = obj;
  function update() {
    if (Array.isArray(o)) {
      return o.slice().map((data, ind) => {
        if (+arr[i] === ind) {
          return arr.length - 1 === i ? callback(data) : (() => {
            o = data;
            i += 1;
            return update();
          })();
        }
        return data;
      });
    }
    return cloneObject(o, {
      [arr && arr[i]]: arr.length - 1 === i ? callback(o[arr[i]]) : (() => {
        o = o[arr[i]] || {};
        i += 1;
        return update();
      })()
    });
  }
  return arr.length > 0 ? update() : obj;
}

const generateTimeStamp = () => new Date().getTime();
const type = {
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
const typeOf = _obj => typeof _obj === 'undefined' ? typeof _obj : type[Object.prototype.toString.call(_obj)] || typeof _obj;

// <============================ common actions ==============================>
const successAction = actionType => function (type, method, payload, statusCode, message) {
  let data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  return {
    type: actionType,
    response: {
      type,
      data,
      payload,
      statusCode,
      message,
      method
    }
  };
};
const errorAction = actionType => function (type, method, payload, statusCode, message) {
  let error = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  return {
    type: actionType,
    response: {
      type,
      error,
      payload,
      statusCode,
      message,
      method
    }
  };
};
const callAction = actionType => function () {
  let payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: actionType,
    payload
  };
};
const cancelAction = actionType => (type, method, filter, cancelKey) => ({
  type: cancelKey && typeOf(cancelKey) === 'string' && cancelKey.length ? `${actionType}_[${cancelKey}]` : actionType,
  response: {
    type,
    method,
    payload: {
      filter
    }
  }
});
const customAction = actionType => function (type, method, payload) {
  let data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let statusCode = arguments.length > 4 ? arguments[4] : undefined;
  return {
    type: actionType,
    response: {
      type,
      method,
      data,
      statusCode: statusCode || method === ON_SUCCESS ? 200 : null,
      customTask: true,
      payload
    }
  };
};
const actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};
function apiLoadingStatus(_ref) {
  let {
    type,
    data = {},
    status = true,
    loader,
    payload
  } = _ref;
  return {
    type: API_LOADING_STATUS,
    response: {
      type,
      status,
      data,
      loader,
      payload,
      method: ON_LOADING
    }
  };
}

const convertData = apiEndPoints => Object.keys(apiEndPoints).reduce((prev, curr) => {
  const constants = Object.keys(apiEndPoints[curr]).reduce((acc, key) => newObject(acc, {
    [key]: {
      [CALL]: `${REDUCER_BASE_PATH}${curr}/${key}_${CALL}`,
      [SUCCESS]: `${REDUCER_BASE_PATH}${curr}/${key}_${SUCCESS}`,
      [CUSTOM]: `${REDUCER_BASE_PATH}${curr}/${key}_${CUSTOM}`,
      [ERROR]: `${REDUCER_BASE_PATH}${curr}/${key}_${ERROR}`,
      [CANCEL]: `${REDUCER_BASE_PATH}${curr}/${key}_${CANCEL}`
    }
  }), {});
  const actions = Object.keys(apiEndPoints[curr]).reduce((acc, key) => newObject(acc, {
    [key]: {
      [CALL]: actionsHandler.call(constants[key][CALL]),
      [SUCCESS]: actionsHandler.success(constants[key][SUCCESS]),
      [CUSTOM]: actionsHandler.custom(constants[key][CUSTOM]),
      [ERROR]: actionsHandler.error(constants[key][ERROR]),
      [CANCEL]: actionsHandler.cancel(constants[key][CANCEL])
    }
  }), {});
  const sagaConfig = Object.entries(apiEndPoints[curr]).reduce((acc, _ref) => {
    let [key, value] = _ref;
    return newObject(acc, {
      [constants[key][CALL]]: {
        api: value,
        cancel: constants[key][CANCEL],
        actions: actions[key],
        effect: value.effect === TAKE_EVERY && takeEvery
      }
    });
  }, {});
  return newObject(prev, {
    [curr]: {
      actions,
      constants,
      sagaConfig
    }
  });
}, {});

/* eslint-disable indent */
var generateConstants = (_ref => {
  let {
    apiEndPoints,
    generatorKey,
    dontResetOnLogout
  } = _ref;
  const _dontResetOnLogout = Array.isArray(dontResetOnLogout) ? dontResetOnLogout.reduce((acc, key) => Object.assign(acc, {
    [key]: key
  }), {}) : dontResetOnLogout;
  const ConvertData = convertData(apiEndPoints);
  const {
    initialState,
    resetState
  } = Object.keys(apiEndPoints[generatorKey]).reduce((acc, key) => ({
    initialState: newObject({}, acc.initialState, {
      [ConvertData[generatorKey].constants[key][CALL]]: {
        loading: {},
        toast: {},
        initialState: true,
        ...(apiEndPoints[generatorKey][key].initialData ? {
          data: apiEndPoints[generatorKey][key].initialData
        } : {})
      }
    }),
    resetState: typeof _dontResetOnLogout[key] === 'undefined' && newObject({}, acc.resetState, {
      [ConvertData[generatorKey].constants[key][CALL]]: {
        loading: {},
        toast: {},
        initialState: true,
        ...(apiEndPoints[generatorKey][key].initialData ? {
          data: apiEndPoints[generatorKey][key].initialData
        } : {})
      }
    }) || acc.resetState
  }), {
    initialState: {},
    resetState: {}
  });
  const {
    constants,
    actions,
    sagaConfig
  } = ConvertData[generatorKey];
  return {
    constants,
    initialState,
    generatorKey,
    actions,
    sagaConfig,
    resetState
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

const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
const DAEMON = '@@saga-injector/daemon';
const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];
const checkKey = key => invariant(key && typeOf(key) === 'string', '(app/utils...) injectSaga: Expected `key` to be a non empty string');
const checkDescriptor = descriptor => {
  // const shape = {
  //   saga: isFunction,
  //   mode: mode => isString(mode) && allowedModes.includes(mode),
  // };
  invariant(typeOf(descriptor) === 'object' && typeof descriptor.saga === 'function' && allowedModes.includes(descriptor.mode), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};
function injectSagaFactory(store, isValid) {
  return function injectSaga(key) {
    let descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let args = arguments.length > 2 ? arguments[2] : undefined;
    if (!isValid) checkStore(store);
    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON
    };
    const {
      saga,
      mode
    } = newDescriptor;
    checkKey(key);
    checkDescriptor(newDescriptor);
    let hasSaga = Reflect.has(store.injectedSagas, key);
    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }
    if (!hasSaga || hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args)
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);
    checkKey(key);
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
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
var injectSaga = (_ref => {
  let {
    key,
    saga,
    mode
  } = _ref;
  return WrappedComponent => {
    class InjectSaga extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.injectors = getInjectors(context.store);
        this.injectors.injectSaga(key, {
          saga,
          mode
        }, this.props);
      }
      componentWillUnmount() {
        this.injectors.ejectSaga(key);
      }
      render() {
        return /*#__PURE__*/React.createElement(WrappedComponent, this.props);
      }
    }
    _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);
    _defineProperty(InjectSaga, "contextType", ReactReduxContext);
    _defineProperty(InjectSaga, "displayName", `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`);
    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
});
const useInjectSaga = function (_ref2) {
  let {
    key,
    saga,
    mode
  } = _ref2;
  let inject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let eject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let callback = arguments.length > 3 ? arguments[3] : undefined;
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors = getInjectors(context.store);
    if (inject) {
      injectors.injectSaga(key, {
        saga,
        mode
      });
      if (typeof callback === 'function') callback();
    }
    return () => {
      if (eject) injectors.ejectSaga(key);
    };
  }, []);
};

/* eslint-disable no-underscore-dangle */

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
function createReducer() {
  let injectedReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const reducer = Object.keys(injectedReducers).length > 0 ? injectedReducers : {
    global: () => ({})
  };
  const rootReducer = combineReducers(reducer);
  return rootReducer;
}

function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer, customCreateReducer) {
    if (!isValid) checkStore(store);
    invariant(typeOf(key) === 'string' && key && typeOf(reducer) === 'function', '(app/utils...) injectReducer: Expected `reducer` to be a reducer function');

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
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
var injectReducer = ((_ref, createReducer) => {
  let {
    key,
    reducer
  } = _ref;
  return WrappedComponent => {
    class ReducerInjector extends React.Component {
      constructor(props, context) {
        super(props, context);
        getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
      }
      render() {
        return /*#__PURE__*/React.createElement(WrappedComponent, this.props);
      }
    }
    _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);
    _defineProperty(ReducerInjector, "contextType", ReactReduxContext);
    _defineProperty(ReducerInjector, "displayName", `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`);
    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
});
const useInjectReducer = function (_ref2, createReducer) {
  let {
    key,
    reducer
  } = _ref2;
  let inject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    if (inject) getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

const selectAuthenticationDomain = (initialState, generatorKey) => state => state[generatorKey] || initialState;
const makeSelectAuthenticationState = _ref => {
  let {
    apiEndPoints,
    initialState,
    InitialState,
    generatorKey,
    constants
  } = _ref;
  return () => createSelector(selectAuthenticationDomain(initialState, generatorKey), substate => newObject(Object.keys(InitialState).reduce((acc, key) => ({
    ...acc,
    [key]: substate[key]
  }), {}), Object.keys(apiEndPoints[generatorKey]).reduce((acc, key) => ({
    ...acc,
    [key]: substate[constants[key][CALL]]
  }), {})));
};

const ignore = {
  component: [SUCCESS, ERROR],
  saga: [CALL, CANCEL, CUSTOM],
  cancel: [SUCCESS, ERROR, CALL, CUSTOM]
};
const bindKey = [CANCEL, CUSTOM];
const actionConverter = (action, actionName, ignoreStatus, type) => Object.entries(action).reduce((acc, _ref) => {
  let [key, value] = _ref;
  return ignoreStatus && ignore[type].includes(key) && acc || cloneObject(acc, {
    [`${actionName}_${key}`]: bindKey.includes(key) && value.bind({}, action[CALL]().type) || value
  });
}, {});
var actionConverter$1 = (action => Object.entries(action).reduce((acc, _ref2) => {
  let [key, value] = _ref2;
  return {
    actions: cloneObject(acc.actions, actionConverter(value, key)),
    sagaActions: cloneObject(acc.sagaActions, actionConverter(value, key, true, 'saga')),
    componentActions: cloneObject(acc.componentActions, actionConverter(value, key, true, 'component')),
    cancelActions: cloneObject(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
  };
}, {}));

// import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';

var generateAction = (Actions => {
  const {
    componentActions,
    actions,
    sagaActions,
    cancelActions
  } = actionConverter$1(Actions);
  return {
    componentActions,
    actions,
    sagaActions,
    cancelActions
  };
});

/* eslint-disable no-underscore-dangle */
const executeTask = (_ref, data) => {
  let {
    id,
    key
  } = _ref;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce((acc, curr) => id.includes(curr[key]) ? acc : acc.concat([curr]), []) : data.filter(_ref2 => {
    let {
      [key]: objId
    } = _ref2;
    return objId !== id;
  });
};
const deleteHandler = _ref3 => {
  let {
    task: {
      key,
      id,
      subKey = []
    } = {},
    successData = {},
    successDataStatusCode
  } = _ref3;
  return function () {
    let {
      data = [],
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const commonData = {
      key,
      id
    };
    const _successData = typeOf(successData) === 'object' ? successData : {};
    return {
      data: subKey.length > 0 ? updateIn({
        ...data,
        ..._successData,
        [subKey[0]]: data[subKey[0]]
      }, subKey, _data => executeTask(commonData, _data)) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      reset: false,
      initialState: false
    };
  };
};

/* eslint-disable indent */

// export const filterArrayErrorHandler = ({ errorData, filter } = {}) => ({
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

const errorHandler = function () {
  let {
    errorData,
    clearDataOnError = false,
    statusCode
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ref => {
    let {
      data: Data = {}
    } = _ref;
    return {
      ...(clearDataOnError ? {
        data: Array.isArray(Data) ? [] : {}
      } : {}),
      error: errorData || null,
      isError: true,
      statusCode,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null,
      initialState: false
    };
  };
};
const _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
const filterArrayErrorHandler = function () {
  let {
    errorData,
    filter,
    clearDataOnError,
    statusCode
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ref2 => {
    let {
      data: Data = {}
    } = _ref2;
    return {
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => updateIn(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? newObject(data, _ref3 => {
            let {
              data: oldData
            } = _ref3;
            return {
              ...(clearDataOnError ? {
                data: Array.isArray(oldData) ? [] : {}
              } : {}),
              error: errorData || null,
              isError: true,
              statusCode,
              lastUpdated: generateTimeStamp(),
              isInfinite: null,
              infiniteEnd: null
            };
          }) : data), Data);
        }
        return updateIn(Data, filter, data => newObject(data, _ref4 => {
          let {
            data: oldData
          } = _ref4;
          return {
            ...(clearDataOnError ? {
              data: Array.isArray(oldData) ? [] : {}
            } : {}),
            error: errorData || null,
            isError: true,
            statusCode,
            lastUpdated: generateTimeStamp(),
            isInfinite: null,
            infiniteEnd: null,
            initialState: false
          };
        }));
      })()
    };
  };
};

/* eslint-disable indent */
const _CheckFilter$1 = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
const commonFilterHandler = customHandler => function () {
  let {
    filter = [],
    successDataStatusCode,
    ...rest
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ref => {
    let {
      data: Data = {},
      statusCode
    } = _ref;
    return {
      lastUpdated: generateTimeStamp(),
      data: (() => {
        const paramKey = {
          filter,
          ...rest
        };
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => updateIn(accumulator, _CheckFilter$1(filterArray), data => _CheckFilter$1(filterArray).length > 0 ? newObject(data, customHandler(paramKey)) : data), Data);
        }
        return updateIn(Data, filter, data => newObject({
          ...data,
          statusCode: successDataStatusCode || statusCode,
          lastUpdated: generateTimeStamp(),
          error: false,
          isError: false,
          initialState: false
        }, customHandler(paramKey)));
      })()
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
const CONSTRUCTOR_CHECK = {
  string: String,
  number: Number,
  boolean: Boolean
};
let errorConsole = function (parentObj, error, path) {
  let func = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  let notFound = arguments.length > 4 ? arguments[4] : undefined;
  if (!func) console.log(`%c${notFound ? '%c key' : `${parentObj} %c is undefined`}%c "${error}" %cnot found ${notFound ? `in %c"${parentObj}"%c object` : '%c%c'} %c ${path} %c is invalid`, 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: green; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');else console.log(`%c${parentObj} %c is found %c "${error}" %c not a function %c ${path} %c is invalid`, 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');
};
const errorLog = () => {
  let e = new Error();
  let stack = e.stack.toString().split(/\r\n|\n/);
  console.log('Error :');
  stack.splice(0, 1);
  stack.map((err, index) => console.log(`[${stack[stack.length - 1 - index]} ]`));
  // console.log(`[ Error ${stack[stack.length - 1]} ]`);
};

/**
 * Required parameter for nullcheck
 *  @param object parent object {},[] !9
 *  @param path  path to be execute eg: a.b.c.e()[0]().f !(Required)
 *  @param default  default value to be print if it is null or error (optional)
 *  @param func  function parameters [ [1],[2]] (optional)
 *  @param errorDisplay  whether to show error in console - default false (optional)
 */

const nullCheck = function (Error) {
  let obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let path = arguments.length > 2 ? arguments[2] : undefined;
  let def = arguments.length > 3 ? arguments[3] : undefined;
  let callBack = arguments.length > 4 ? arguments[4] : undefined;
  let func = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  let errorDisplay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  const returnDefaultData = def !== undefined ? def : undefined;
  if (typeof path !== 'string') {
    if (errorDisplay) {
      console.log(`%c[Object] path is invalid it should be string`, 'background: #000; color: orange; font-size: 12px');
      errorLog(new Error());
    }
    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }
  let propNames = path.split(/\.|\[|\(/);
  propNames = propNames.map(prop => prop.replace(/\]|\(/g, '').replace(/\)/, '()'));
  const parent = propNames.splice(0, 1);
  if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
    if (errorDisplay) errorLog(new Error());
    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }
  let data = obj;
  let error = parent;
  let index = 0;
  let parentObj = error;
  // eslint-disable-next-line no-undef-init
  let type = undefined;
  for (let key = 0; key < propNames.length; key++) {
    if (data[propNames[key]] || typeof data === 'boolean' || Object.prototype.hasOwnProperty.call(data, propNames[key])) {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = `${error}[${propNames[key]}]`;else error = `${error}.${propNames[key]}`;
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
        if (typeof data !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, false);
          }
          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }
    } else if (propNames[key] === '()') {
      error = `${error}${propNames[key]}`;
      if (typeof data === 'function') {
        if (CONSTRUCTOR_CHECK[typeof type]) {
          if (func && func[index]) data = CONSTRUCTOR_CHECK[typeof type].prototype[propNames[key - 1]].apply(type, func[index]);else data = CONSTRUCTOR_CHECK[typeof type].prototype[propNames[key - 1]].call(type);
        } else {
          if (func && func[index]) data = data.apply(null, [...func[index]]);else data = data();
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
        if (typeof data !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }
          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }
      index += 1;
    } else {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = `${error}[${propNames[key]}]`;else error = `${error}.${propNames[key]}`;
      if (errorDisplay) {
        errorLog(new Error());
        errorConsole(error, propNames[key], path, false, true);
      }
      return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
    }
    parentObj = error;
  }
  const verifyData = (data || typeof data === 'boolean') && Object.prototype.toString.call(def) !== '[object Null]' && typeof def !== 'undefined' && Object.prototype.toString.call(data) === Object.prototype.toString.call(def) ? data : typeof def !== 'undefined' && Object.prototype.toString.call(def) !== '[object Null]' ? def : data;
  return typeof callBack === 'function' ? callBack(verifyData) : verifyData;
};
var nullcheck = nullCheck.bind(null, Error);

/* eslint-disable */
const infiniteHandler = _ref => {
  let {
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      clearData,
      subKey = [],
      limit,
      isAppendTop = false,
      setInfiniteEnd,
      updateCallback = __updateCallback
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref;
  return function () {
    let {
      data: oldData = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: (() => {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          const _oldCopyData = {
            ...oldData,
            ...(typeOf(successData) === 'object' ? successData : {}),
            [subKey[0]]: oldData[subKey[0]]
          };
          // return _oldCopyData
          return updateIn(_oldCopyData, subKey, _oldData => {
            if (clearData) return nullcheck(successData, `.${subKey.join('.')}`, []);
            return updateCallback ? updateCallback({
              oldData: _oldData,
              successData: nullcheck(successData, `.${subKey.join('.')}`, []),
              type,
              state
            }) : isAppendTop ? nullcheck(successData, `.${subKey.join('.')}`, []).concat(_oldData) : _oldData.concat(nullcheck(successData, `.${subKey.join('.')}`, []));
          });
        }
        const getData = Array.isArray(successData) ? successData : [];
        const appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
        const newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
        return updateCallback ? updateCallback({
          oldData,
          successData,
          type,
          state
        }) : newData;
      })(),
      error: false,
      lastUpdated: generateTimeStamp(),
      statusCode: successDataStatusCode || statusCode,
      isInfinite: typeof limit === 'number',
      isError: false,
      initialState: false,
      infiniteEnd: setInfiniteEnd !== undefined && typeof setInfiniteEnd === 'function' ? setInfiniteEnd(successData) : limit !== undefined && typeof limit === 'number' ? (subKey.length > 0 ? nullcheck(successData, `.${subKey.join('.')}`, []) : successData).length < limit : null
    };
  };
};

/* eslint-disable indent */
// export const filterArrayloadingHandler = ({ filter, loader }) => ({
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

const _CheckFilter$2 = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
const returnData = _ref => {
  let {
    data,
    initialData,
    clearData,
    loader,
    request
  } = _ref;
  return newObject(data, _ref2 => {
    let {
      data: _data
    } = _ref2;
    return {
      loading: {
        status: loader,
        lastUpdated: generateTimeStamp()
      },
      lastUpdated: generateTimeStamp(),
      initialState: false,
      ...(request ? {
        request
      } : {}),
      ...(clearData || initialData ? {
        data: Array.isArray(_data) ? initialData || [] : initialData || {}
      } : {})
    };
  });
};
const filterArrayloadingHandler = function () {
  let {
    loader,
    filter,
    clearData,
    initialData,
    request
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ref3 => {
    let {
      data: Data = {}
    } = _ref3;
    return {
      lastUpdated: generateTimeStamp(),
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => updateIn(accumulator, _CheckFilter$2(filterArray), data => _CheckFilter$2(filterArray).length > 0 ? returnData({
            data,
            initialData,
            clearData,
            loader,
            request
          }) : data), Data);
        }
        return updateIn(Data, filter, data => returnData({
          data,
          initialData,
          clearData,
          loader,
          request
        }));
      })()
    };
  };
};

/* eslint-disable no-nested-ternary */
const _CheckFilter$3 = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
const filterArrayToastEmptyHandler = function () {
  let {
    filter,
    isInfinite
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ref => {
    let {
      data: Data = {}
    } = _ref;
    return {
      lastUpdated: generateTimeStamp(),
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => updateIn(accumulator, _CheckFilter$3(filterArray), data => _CheckFilter$3(filterArray).length > 0 ? newObject(data, _ref2 => {
            let {
              toast = {}
            } = _ref2;
            return {
              isInfinite,
              toast: newObject(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          }) : data), Data);
        }
        return updateIn(Data, filter, data => newObject(data, _ref3 => {
          let {
            toast = {}
          } = _ref3;
          return {
            isInfinite,
            toast: newObject(toast, {
              message: '',
              status: '',
              isError: null,
              key: ''
            })
          };
        }));
      })()
    };
  };
};

// export const filterArrayToastHandler = ({
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

const filterArrayToastHandler = function () {
  let {
    statusCode,
    filter,
    message,
    isError,
    type
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ref7 => {
    let {
      data: Data = {}
    } = _ref7;
    return {
      lastUpdated: generateTimeStamp(),
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => updateIn(accumulator, _CheckFilter$3(filterArray), data => _CheckFilter$3(filterArray).length > 0 ? newObject(data, {
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message,
              key: type,
              lastUpdated: generateTimeStamp()
            }
          }) : data), Data);
        }
        return updateIn(Data, filter, data => newObject(data, {
          lastUpdated: generateTimeStamp(),
          toast: {
            isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
            status: statusCode,
            message,
            key: type,
            lastUpdated: generateTimeStamp()
          }
        }));
      })()
    };
  };
};

/* eslint-disable no-underscore-dangle */
const updateData = function (data, successData, updateCallback, type, state) {
  let config = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  if (updateCallback) return updateCallback({
    oldData: data,
    successData,
    type,
    state,
    config
  }) || data;
  if (typeof successData === 'object' && !Array.isArray(successData) && typeof data === 'object' && !Array.isArray(data)) return newObject(data, successData);
  return successData;
};
const updateHandler = _ref => {
  let {
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      key,
      id,
      subKey = [],
      values = {},
      dontUpdateResponseData = false,
      dontUpdateSuccessData,
      updateCallback = __updateCallback
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref;
  return function () {
    let {
      data = [],
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: subKey.length > 0 ? updateIn({
        ...data,
        ...(typeOf(successData) === 'object' && !(dontUpdateResponseData || dontUpdateSuccessData) ? successData : {}),
        [subKey[0]]: data[subKey[0]]
      }, subKey, _Data => (() => {
        let index = -1;
        const _values = Array.isArray(values);
        /**  update data if old data is object */
        if (!Array.isArray(_Data)) return updateData(_Data, nullcheck(successData, `.${subKey.join('.')}`) || successData, updateCallback, type, state);
        if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
          let curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? (() => {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || successData || curr, updateCallback, type, state, {
              index,
              id: _values ? index : curr[key]
            })]);
          })() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return _Data.map(_data => _data[key] === id ? (() => {
          index += 1;
          return updateData(_data, values[_values ? index : _data[key]] || successData || _data, updateCallback, type, state, {
            index,
            id: _values ? index : _data[key]
          });
        })() : _data);
        return updateData(_Data, nullcheck(successData, `.${subKey.join('.')}`) || successData, updateCallback, type, state);
      })()) : (() => {
        let index = -1;
        const _values = Array.isArray(values);
        if (!Array.isArray(data)) return updateData(data, successData, updateCallback, type, state);
        if (Array.isArray(id) && key) return data.reduce(function (acc) {
          let curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? (() => {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || successData || curr, updateCallback, type, state, {
              index,
              id: _values ? index : curr[key]
            })]);
          })() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return data.map(_data => _data[key] === id ? (() => {
          index += 1;
          return updateData(_data, values[_values ? index : _data[key]] || successData || _data, updateCallback, type, state, {
            index,
            id: _values ? index : _data[key]
          });
        })() : _data);
        return updateData(data, successData, updateCallback, type, state);
      })(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

/* eslint-disable indent */
// import _remove from 'lodash/remove';
const deletedData = function () {
  let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let keyArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line no-underscore-dangle
  let _obj = obj;
  _obj = typeOf(obj) === 'object' ? {
    ..._obj
  } : _obj;
  if (typeOf(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(_key => {
      _obj = Array.isArray(_key) ? deleteIn(_obj, _key) : deleteIn(_obj, [_key]);
    });
    return _obj;
  }
  return obj;
};
const executeTask$1 = (_ref, data) => {
  let {
    updateCallback,
    successData,
    deleteKey,
    id,
    key,
    type,
    state
  } = _ref;
  return updateCallback ? updateCallback({
    oldData: data,
    successData,
    type,
    state
  }) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce((acc, curr) => id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]), []) : data.map(_data => _data[key] === id ? deletedData(_data, deleteKey) : _data);
};
const deleteKeyHandler = _ref2 => {
  let {
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      key,
      id,
      deleteKey = [],
      subKey = [],
      updateCallback = __updateCallback
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref2;
  return function () {
    let {
      data = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const commonData = {
      updateCallback,
      successData,
      deleteKey,
      id,
      key,
      type,
      state
    };
    return {
      data: subKey.length > 0 ? updateIn({
        ...data,
        ...successData,
        [subKey[0]]: data[subKey[0]]
      }, subKey, _Data => executeTask$1(commonData, _Data)) : executeTask$1(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

/* eslint-disable no-nested-ternary */
const resetHandler = function (state, newState, _ref) {
  let {
    response: {
      type
    }
  } = _ref;
  let customType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return newObject(state, _ref2 => {
    let {
      [customType || type]: Data
    } = _ref2;
    return {
      [customType || type]: newObject(Data, _ref3 => {
        let {
          data,
          toast,
          infiniteEnd
        } = _ref3;
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
      })
    };
  });
};
const _CheckFilter$4 = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
const filterArrayResetHandler = function (state, newState, action, filter) {
  let customType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  const {
    response: {
      type
    }
  } = action;
  return newObject(state, _ref4 => {
    let {
      [customType || type]: oldData
    } = _ref4;
    return {
      [type]: newObject(oldData, function () {
        let {
          data: Data = {}
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return {
          lastUpdated: generateTimeStamp(),
          data: (() => {
            if (filter && filter.some(fil => Array.isArray(fil))) {
              return filter.reduce((accumulator, filterArray) => updateIn(accumulator, _CheckFilter$4(filterArray), _data => _CheckFilter$4(filterArray).length > 0 ? newObject(_data, _ref5 => {
                let {
                  data,
                  toast,
                  infiniteEnd
                } = _ref5;
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
              }) : _data), Data);
            }
            return updateIn(Data, filter, updateData => newObject(updateData, _ref6 => {
              let {
                data,
                toast,
                infiniteEnd
              } = _ref6;
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
            }));
          })()
        };
      })
    };
  });
};

/* eslint-disable operator-assignment */
const updateData$1 = function (data, successData, updateCallback, updateKey, type, state) {
  let config = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  if (updateCallback) return updateCallback({
    oldData: data,
    successData,
    type,
    state,
    config
  }) || data;
  if (typeof successData === 'object' && !Array.isArray(successData) && typeof data === 'object' && !Array.isArray(data)) {
    return !updateKey ? data : updateKey.reduce((acc, key) => {
      if (Array.isArray(key) && key.length > 0) {
        return updateIn(acc, key, _data => nullcheck(successData, `.${key.join('.')}`));
      }
      return {
        ...acc,
        [key]: successData[key]
      };
    }, data);
  }
  return successData;
};
const updateKeyHandler = _ref => {
  let {
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      key,
      id,
      subKey = [],
      values = {},
      updateKey = [],
      updateCallback = __updateCallback,
      dontUpdateResponseData,
      dontUpdateSuccessData
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref;
  return function () {
    let {
      data = [],
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: subKey.length > 0 ? updateIn({
        ...data,
        ...(typeOf(successData) === 'object' && !(dontUpdateResponseData || dontUpdateSuccessData) ? successData : {}),
        [subKey[0]]: data[subKey[0]]
      }, subKey, _Data => (() => {
        let index = -1;
        const _values = Array.isArray(values);
        /**  update data if old data is object */
        if (!Array.isArray(_Data)) return updateData$1(_Data, nullcheck(successData, `.${subKey.join('.')}`), updateCallback, updateKey, type, state);else if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
          let curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? (() => {
            index += 1;
            return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey, type, state, {
              index,
              id: _values ? index : curr[key]
            })]);
          })() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return _Data.map(_data => _data[key] === id ? (() => {
          index += 1;
          return updateData$1(_data, values[_values ? index : _data[key]] || _data, updateCallback, updateKey, type, state, {
            index,
            id: _values ? index : _data[key]
          });
        })() : _data);
        return updateData$1(_Data, nullcheck(successData, `.${subKey.join('.')}`), updateCallback, updateKey, type, state);
      })()) : (() => {
        let index = -1;
        const _values = Array.isArray(values);
        if (!Array.isArray(data)) return updateData$1(data, successData, updateCallback, updateKey, type, state);else if (Array.isArray(id) && key) return data.reduce(function (acc) {
          let curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? (() => {
            index = index + 1;
            return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey, type, state, {
              index,
              id: _values ? index : curr[key]
            })]);
          })() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return data.map(_data => _data[key] === id ? (() => {
          index = index + 1;
          return updateData$1(_data, values[_values ? index : _data[key]], updateCallback, updateKey, type, state, {
            index,
            id: _values ? index : _data[key]
          });
        })() : _data);
        return updateData$1(data, successData, updateCallback, updateKey, type, state);
      })(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

/* eslint-disable no-underscore-dangle */
const toggleData = (obj, keyArray) => Object.keys(obj).reduce((acc, curr) => ({
  ...acc,
  [curr]: keyArray.includes(curr) ? !obj[curr] : obj[curr]
}), {});
const executeTask$2 = (_ref, _Data) => {
  let {
    successData,
    toggleKey,
    id,
    key,
    updateCallback,
    type,
    state
  } = _ref;
  const _updatedData = !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce((acc, curr) => id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]), []) : _Data.map(_data => _data[key] === id ? toggleData(_data, toggleKey) : _data);
  return updateCallback ? updateCallback({
    updatedData: _updatedData,
    successData,
    type,
    state
  }) || _Data : _updatedData;
};
const toggleKeyHandler = _ref2 => {
  let {
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      key,
      id,
      toggleKey = [],
      subKey = [],
      updateCallback = __updateCallback
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref2;
  return function () {
    let {
      data = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const commonData = {
      successData,
      toggleKey,
      id,
      key,
      updateCallback,
      type,
      state
    };
    return {
      data: subKey.length > 0 ? updateIn({
        ...data,
        ...(typeOf(successData) === 'object' ? successData : {}),
        [subKey[0]]: data[subKey[0]]
      }, subKey, _Data => executeTask$2(commonData, _Data)) : executeTask$2(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

/* eslint-disable */
const _checkIsNotObject = data => Object.prototype.toString.call(data) !== '[object Object]';
const dataHandler = _ref => {
  let {
    mutation: isMutation,
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      clearData,
      subKey = [],
      updateCallback = __updateCallback
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref;
  return function () {
    let {
      data: oldData = {},
      statusCode,
      ...rest
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return isMutation ? {
      data: oldData,
      statusCode,
      ...rest,
      ...successData
    } : {
      data: (() => {
        if (subKey.length > 0) {
          const _oldCopyData = {
            ...oldData,
            ...(_checkIsNotObject(successData) ? {} : successData),
            [subKey[0]]: oldData[subKey[0]]
          };
          return updateIn(_oldCopyData, subKey, _oldData => {
            if (clearData) return nullcheck(successData, `.${subKey.join('.')}`);
            return updateCallback ? updateCallback({
              oldData: _oldData,
              successData: nullcheck(successData, `.${subKey.join('.')}`),
              type,
              state
            }) : _checkIsNotObject(nullcheck(successData, `.${subKey.join('.')}`)) || _checkIsNotObject(nullcheck(_oldData, `.${subKey.join('.')}`)) ? nullcheck(successData, `.${subKey.join('.')}`) : newObject(_oldData, nullcheck(successData, `.${subKey.join('.')}`));
          });
        }
        return updateCallback ? updateCallback({
          oldData,
          successData,
          type,
          state
        }) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : newObject(oldData, successData);
      })(),
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
const dontUpdateDataHandler = _ref => {
  let {
    successDataStatusCode
  } = _ref;
  return function () {
    let {
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

/* eslint-disable */
const spliceHandler = _ref => {
  let {
    callback: {
      updateCallback: __updateCallback
    } = {},
    task: {
      clearData,
      spliceKey = [],
      subKey = [],
      updateCallback = __updateCallback
    } = {},
    successData = {},
    successDataStatusCode,
    type,
    state
  } = _ref;
  return function () {
    let {
      data: oldData = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: (() => {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          const _oldCopyData = {
            ...oldData,
            ...(typeOf(successData) === 'object' ? successData : {}),
            [subKey[0]]: oldData[subKey[0]]
          };
          // return _oldCopyData
          return updateIn(_oldCopyData, subKey, _oldData => {
            if (clearData) return nullcheck(successData, `.${subKey.join('.')}`, []);
            return updateCallback ? updateCallback({
              oldData: _oldData,
              successData: nullcheck(successData, `.${subKey.join('.')}`, []),
              type,
              state
            }) : Array.isArray(_oldData) ? (() => {
              const _newData = _oldData.slice();
              _newData.splice(...spliceKey, ...nullcheck(successData, `.${subKey.join('.')}`, []));
              return _newData;
            })() : _oldData;
          });
        }
        const newData = Array.isArray(oldData) ? (() => {
          const _newData = oldData.slice();
          return _newData.splice(...spliceKey, ...nullcheck(successData, `.${subKey.join('.')}`, []));
        })() : oldData;
        return updateCallback ? updateCallback({
          oldData,
          successData,
          type,
          state
        }) : newData;
      })(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false,
      initialState: false
    };
  };
};

/* eslint-disable */
const checkKey$1 = callback => {
  invariant(typeOf(callback) === 'function', `(react-boilerplate-redux-saga-hoc) ${typeof callback === 'undefined' ? 'Callback Handler required callback key' : 'callback is not a function'}`);
};
const callbackHandler = _ref => {
  let {
    task: {
      callback
    } = {},
    successData = {},
    successDataStatusCode,
    state,
    type,
    ...rest
  } = _ref;
  return function () {
    let {
      data: oldData = {},
      statusCode,
      ...rest
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    checkKey$1(callback);
    return {
      lastUpdated: generateTimeStamp(),
      ...callback({
        oldData: oldData,
        newData: successData,
        rest: {
          ...rest,
          statusCode
        },
        status: statusCode || successDataStatusCode,
        successDataStatusCode,
        state,
        type,
        extras: rest || {}
      })
    };
  };
};

/* eslint-disable no-unused-vars */
const resetReducerHandler = () => function () {
  let {
    data: {
      data,
      toast,
      infiniteEnd
    } = {},
    statusCode,
    ...rest
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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

/* eslint-disable indent */
const reducerErrorHandler = _ref => {
  let {
    task: {
      error: errorData,
      isError
    } = {},
    successData = {},
    successDataStatusCode
  } = _ref;
  return function () {
    let {
      data: {
        data,
        toast,
        infiniteEnd,
        error,
        isError: isErrorOld
      } = {},
      statusCode,
      ...rest
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      error: errorData || error || {},
      isError: typeof isError === 'boolean' ? isError : isErrorOld,
      lastUpdated: generateTimeStamp()
      // initialState: false,
    };
  };
};

/* eslint-disable indent */
const reducerLoadingHandler = _ref => {
  let {
    task: {
      loader
    } = {},
    successData = {},
    successDataStatusCode
  } = _ref;
  return function () {
    let {
      data: {
        data,
        toast,
        infiniteEnd,
        error,
        isError: isErrorOld,
        loading: {
          status
        } = {}
      } = {},
      statusCode,
      ...rest
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      loading: {
        status: typeof loader === 'boolean' ? loader : status,
        lastUpdated: generateTimeStamp()
      },
      lastUpdated: generateTimeStamp()
    };
  };
};

/* eslint-disable indent */
const reducerToastHandler = _ref => {
  let {
    task: {
      toast: toastData
    } = {},
    successData = {},
    successDataStatusCode
  } = _ref;
  return function () {
    let {
      data: {
        data,
        toast,
        infiniteEnd
      } = {},
      statusCode,
      ...rest
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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

/* eslint-disable no-plusplus */
const safe = nullcheck;
const responseErrorParser = function () {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(data) && data.reduce((acc, curr) => {
    const [key, message] = Object.entries(curr)[0];
    const payloadKey = key.split(',')[1];
    return {
      ...acc,
      [payloadKey]: message
    };
  }, {}) || {};
};
const commmonStateHandler = _ref => {
  let {
    state,
    action,
    newState,
    method,
    constants,
    updateState
  } = _ref;
  /** This action for initial call  */
  const {
    payload: {
      filter,
      task = {},
      dontUpdateReducer,
      dontUpdateReducerOnCall,
      request: _request
    } = {}
  } = action;
  const request = _request ? {
    ..._request
  } : undefined;
  if (request && request.payload) delete request.payload;
  if (dontUpdateReducer || dontUpdateReducerOnCall) return state;
  const {
    payload: {
      task: {
        clearDataOnStart: clearData
      } = {},
      initialCallData: initialData,
      proxyFor: _proxyFor
    } = {}
  } = action;
  /** This action for after api gets success or failure  */
  const {
    response: {
      type,
      statusCode,
      message,
      status,
      customTask,
      payload: {
        proxyFor: __proxyFor,
        filter: responseFilter,
        loader: customLoader,
        toast: customToast
      } = {}
    } = {}
  } = action;
  const ACTION_TYPE = _proxyFor || __proxyFor || type || action.type;
  const ACTION_PROXY_TYPE = _proxyFor || __proxyFor || type;
  const loader = Object.keys(constants).includes(action.type);
  let State = newObject(state);
  if ((method === ON_LOADING || loader || [ON_SUCCESS, ON_ERROR].includes(method)) && !customTask || customLoader !== undefined && customTask && (Array.isArray(method) ? method : [method]).includes(ON_LOADING)) {
    if ((status || loader) && filter && filter.length > 0) State = newState(_ref2 => {
      let {
        [ACTION_TYPE]: obj
      } = _ref2;
      return {
        [ACTION_TYPE]: newObject(obj, filterArrayToastEmptyHandler({
          isInfinite: task.name === INFINITE_DATA_HANDLER,
          filter: Array.isArray(filter) && filter || [filter]
        })(obj))
      };
    });else if (status || loader) State = newState(_ref3 => {
      let {
        [ACTION_TYPE]: obj
      } = _ref3;
      return {
        [ACTION_TYPE]: newObject(obj, _ref4 => {
          let {
            toast = {}
          } = _ref4;
          return {
            toast: newObject(toast, {
              message: '',
              status: '',
              isError: false,
              key: ''
            })
          };
        })
      };
    });
    if (((filter || responseFilter) && !customTask ? (filter || responseFilter).length > 0 : false) || customTask && customLoader !== undefined && (filter || responseFilter || []).length > 0) State = newObject(State, _ref5 => {
      let {
        [ACTION_TYPE]: obj
      } = _ref5;
      return {
        [ACTION_TYPE]: newObject(obj, filterArrayloadingHandler({
          filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
          ...(request ? {
            request
          } : {}),
          loader: customTask && customLoader !== undefined ? customLoader : initialData ? false : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
          clearData,
          initialData
        })(obj))
      };
    });else State = newObject(State, _ref6 => {
      let {
        [ACTION_TYPE]: obj
      } = _ref6;
      return {
        [ACTION_TYPE]: newObject(obj, _ref7 => {
          let {
            data: _data
          } = _ref7;
          return {
            loading: {
              status: customTask && customLoader !== undefined ? customLoader : initialData ? false : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
              lastUpdated: generateTimeStamp()
            },
            ...(request ? {
              request
            } : {}),
            initialState: false,
            ...((clearData || initialData) && ![ON_SUCCESS, ON_ERROR].includes(method) ? {
              data: initialData || (Array.isArray(_data) ? [] : {})
            } : {})
          };
        })
      };
    });
    if (method === ON_LOADING || loader) return State;
  }
  if ([ON_SUCCESS, ON_ERROR].includes(method) &&
  // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(ACTION_PROXY_TYPE) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST)) {
    if (responseFilter && responseFilter.length > 0) State = newObject(State, _ref8 => {
      let {
        [ACTION_PROXY_TYPE]: obj
      } = _ref8;
      return {
        [ACTION_PROXY_TYPE]: newObject(obj, filterArrayToastHandler({
          statusCode,
          filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
          message,
          type: ACTION_PROXY_TYPE,
          ...(customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {})
        })(obj))
      };
    });else State = newObject(State, _ref9 => {
      let {
        [ACTION_PROXY_TYPE]: obj
      } = _ref9;
      return {
        [ACTION_PROXY_TYPE]: newObject(obj, {
          toast: {
            isError: ![200, 201].includes(statusCode),
            status: statusCode,
            message,
            key: ACTION_PROXY_TYPE,
            lastUpdated: generateTimeStamp(),
            ...(customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {})
          },
          initialState: false
        })
      };
    });
  }
  const changeState = newObject.bind({}, State);
  const reset = responseFilter && responseFilter.length > 0 ? filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action,
    reset
  });
};
const getData = function (data, def) {
  let loader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    ...safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}`, {}),
    data: safe(data, `.data${filter.length ? '.' : ''}${filter.join('.')}${filter.length ? '.data' : ''}`, def),
    loader: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.loading.status`, typeof loader !== 'boolean' ? false : loader),
    lastUpdated: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.lastUpdated`),
    isInfinite: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.isInfinite`, false),
    infiniteEnd: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.infiniteEnd`, false),
    isError: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.isError`, false),
    toast: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.toast`, {}),
    error: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.error`, {})
  };
};
const mapDispatchToProps = (actions, componentData, reducerName) => dispatch => ({
  dispatch,
  ...(actions && Object.keys(actions).length ? newObject(componentData, _ref10 => {
    let {
      [`${reducerName}_hoc`]: data
    } = _ref10;
    return {
      [`${reducerName}_hoc`]: newObject(data, {
        actions: bindActionCreators(actions, dispatch)
      })
    };
  }) : {})
});

/* eslint-disable no-loop-func */
const HANDLERS$1 = [{
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
const checkKey$2 = (key, name, dataType) => {
  invariant(typeOf(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`);
};
const CheckCustomHanderFormat = _handler => _handler ? typeof _handler === 'function' ?
// ? typeof _handler() === 'function'
// ? typeof _handler()() !== 'function'
_handler :
// : null
null :
// : null
null;
const _CheckFilter$5 = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' && Filter.length > 0 ? Filter.split('.') : null;
const COMMON_HANDLER = (payload, data, state, type) => {
  let DATA = data;
  // const bindAction = Action => Action(payload);
  const _tasks = typeOf(payload.tasks) === 'array' ? payload.tasks.filter(e => e.task || e.filter) : [];
  (_tasks.length > 0 ? _tasks : Array(1).fill(payload)).forEach(
  // eslint-disable-next-line consistent-return
  function () {
    let {
      task = {},
      filter
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let customTaskBindAction = null;
    // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)
    if (task.response && !task.dontUpdateResponseData) checkKey$2(task.response, 'task { response  : { data }}', TYPE_OBJECT);
    customTaskBindAction = Action => Action({
      ...payload,
      type,
      state,
      filter: _CheckFilter$5(filter || payload.filter),
      successData: task.dontUpdateResponseData ? {} : (task.response || {}).data || payload.successData
    });
    const customHandler = CheckCustomHanderFormat(task.customHandler);
    const isFilter = _CheckFilter$5(filter);
    const BindHandler = handler => newObject(DATA, customTaskBindAction(handler));
    const _handler = HANDLERS$1.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(_ref => {
      let {
        name
      } = _ref;
      return name === task.name || name === task;
    });
    if (_handler) {
      checkKey$2(_handler.handler, `${_handler.name} handler with key name handler`, TYPE_FUNCTION);
      DATA = isFilter ? BindHandler(commonFilterHandler(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === CUSTOM_HANDLER) DATA = (isFilter ? BindHandler(commonFilterHandler(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === DONT_UPDATE_DATA_HANDLER || task === DONT_UPDATE_DATA_HANDLER) return DATA;else DATA = isFilter ? BindHandler(commonFilterHandler(dataHandler)) : BindHandler(dataHandler);
  });
  return DATA;
};
const COMMON_REDUCER_HANDLER = (action, handlers) => {
  const {
    response: {
      customTask,
      mutation,
      data: {
        data: successData = {},
        ...rest
      } = {},
      payload: {
        request: {
          query = {},
          clearDataOnError = false
        } = {},
        filter: Filter,
        error
      } = {},
      error: {
        data: errorData = {}
      } = {}
    } = {}
  } = action;
  const filter = _CheckFilter$5(Filter);
  const commonHandler = COMMON_HANDLER.bind(null, {
    handlers,
    successData,
    errorData,
    successDataStatusCode: rest.statusCode,
    customTask,
    mutation,
    ...action.response.payload
  });
  const ErrorHandler = filter && filterArrayErrorHandler || errorHandler;
  const commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query,
    filter,
    clearDataOnError,
    statusCode: rest.statusCode
  });
  return [commonHandler, commmonErrorHandler];
};
const DEFAULT_REDUCER_HANDLER = _ref2 => {
  let {
    method,
    reset,
    state,
    action,
    handlers,
    type
  } = _ref2;
  const [commonHandler, commmonErrorHandler] = COMMON_REDUCER_HANDLER(action, handlers);
  const {
    response: {
      customTask,
      mutation,
      data: {
        data: successData = {},
        ...rest
      } = {},
      payload: {
        callback: {
          updateStateCallback
        } = {},
        excuteUpdateStateCallbackOnError,
        updateStateCallbackOnError,
        tasks,
        updateDataReducerKey,
        proxyFor: _proxyType,
        _errortask
      } = {},
      error: {
        data: errorData = {},
        status
      } = {}
    } = {}
  } = action;
  let DATA = state;
  const _ACTION_TYPE = _proxyType || type;
  const _method = (Array.isArray(method) ? method : [method, _errortask ? ON_SUCCESS : null]).filter(e => [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e));
  for (let i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS:
        {
          let updatedState;
          const _tasks = tasks ? Array.isArray(tasks) && tasks.filter(e => typeOf(e) === TYPE_OBJECT) : null;
          if (_tasks && Array.isArray(_tasks) && _tasks.length > 0) {
            for (let k = 0; k < _tasks.length; k += 1) {
              const _commonHandler = COMMON_HANDLER.bind(null, {
                handlers,
                successData,
                errorData,
                successDataStatusCode: rest.statusCode,
                customTask,
                mutation,
                ...action.response.payload,
                ..._tasks[k],
                tasks: undefined
              });
              const _updateDataReducerKey = _tasks[k] && _tasks[k].updateDataReducerKey || updateDataReducerKey;
              if (Array.isArray(_updateDataReducerKey) && _updateDataReducerKey.length > 0) {
                for (let l = 0; l < _updateDataReducerKey.length; l += 1) {
                  const ACTION_TYPE = _updateDataReducerKey[l] || _proxyType || type;
                  DATA = newObject(DATA, _ref3 => {
                    let {
                      [ACTION_TYPE]: Data
                    } = _ref3;
                    return {
                      [ACTION_TYPE]: _commonHandler(Data, state, ACTION_TYPE)
                    };
                  });
                }
              } else {
                const ACTION_TYPE = _updateDataReducerKey || _proxyType || type;
                DATA = newObject(DATA, _ref4 => {
                  let {
                    [ACTION_TYPE]: Data
                  } = _ref4;
                  return {
                    [ACTION_TYPE]: _commonHandler(Data, state, ACTION_TYPE)
                  };
                });
              }
            }
            updatedState = DATA;
          } else if (Array.isArray(updateDataReducerKey) && updateDataReducerKey.length > 0) {
            for (let j = 0; j < updateDataReducerKey.length; j += 1) {
              const ACTION_TYPE = updateDataReducerKey[j] || _proxyType || type;
              DATA = newObject(DATA, _ref5 => {
                let {
                  [ACTION_TYPE]: Data
                } = _ref5;
                return {
                  [ACTION_TYPE]: commonHandler(Data, state, ACTION_TYPE)
                };
              });
            }
            updatedState = DATA;
          } else {
            const ACTION_TYPE = updateDataReducerKey || _proxyType || type;
            updatedState = newObject(DATA, _ref6 => {
              let {
                [ACTION_TYPE]: Data
              } = _ref6;
              return {
                [ACTION_TYPE]: commonHandler(Data, state, ACTION_TYPE)
              };
            });
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
          const ACTION_TYPE = _proxyType || type;
          const updatedState = newObject(DATA, _ref7 => {
            let {
              [ACTION_TYPE]: Data
            } = _ref7;
            return {
              [ACTION_TYPE]: newObject(Data, commmonErrorHandler())
            };
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
          break;
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

/* eslint-disable indent */
const componentState = {};
const otherReducerConstants = [];
const updateState = _ref => {
  let {
    authenticationConstants,
    ResetState,
    isMobileApp = false,
    initialState: InitialState,
    reducerFunction,
    handlers = []
  } = _ref;
  return _ref2 => {
    let {
      state,
      newState,
      action,
      reset
    } = _ref2;
    const {
      response: {
        data: {
          data: successData = {},
          ...restSuccessData
        } = {},
        payload: {
          payload = {},
          query = {},
          params = {},
          ...restPayload
        } = {},
        status: loadingStatus,
        statusCode,
        type,
        method,
        message: statusMessage,
        error: {
          data: errorData = {},
          ...restErrorData
        } = {}
      } = {}
    } = action;
    const [commonHandler, commmonErrorHandler] = COMMON_REDUCER_HANDLER(action, handlers);
    const defaultReducerHandler = () => DEFAULT_REDUCER_HANDLER({
      method,
      reset,
      state,
      action,
      handlers,
      type
    });
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
            const returnData = reducerFunction({
              constants: authenticationConstants,
              successData,
              restSuccessData,
              payload,
              query,
              state,
              params,
              restPayload,
              loadingStatus,
              statusCode,
              type,
              reset,
              newState,
              method,
              statusMessage,
              errorData,
              restErrorData,
              resetState: ResetState,
              initialState: InitialState,
              commonHandler,
              commmonErrorHandler,
              defaultReducerHandler
            });
            if (returnData) return returnData;
          }
          return defaultReducerHandler();
        }
    }
  };
};
const dontResetKeyCheck = (ResetState, action) => (action.payload.dontResetKeys || []).length > 0 ? Object.entries(ResetState).reduce((acc, _ref3) => {
  let [key, val] = _ref3;
  return (action.payload.dontResetKeys || []).includes(key) ? acc : {
    ...acc,
    [key]: val
  };
}, {}) : ResetState;
var Reducer = (_ref4 => {
  let {
    reducerFunction,
    constants: authenticationConstants,
    InitialState,
    handlers = [],
    resetState: ResetState = {},
    isMobile: isMobileApp = false,
    constantReducer,
    reducerName
  } = _ref4;
  const initialState = newObject(InitialState, componentState);
  return function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    let action = arguments.length > 1 ? arguments[1] : undefined;
    const {
      payload: {
        dontUpdateReducer,
        dontUpdateReducerOnCall,
        proxyFor: _proxyFor
      } = {}
    } = action;
    if (dontUpdateReducer || dontUpdateReducerOnCall) return state;
    switch (action.type) {
      case 'RESET_API':
        return newObject(state, dontResetKeyCheck(ResetState, action));
      case 'MUTATE_STATE':
        return newObject(state, action.payload);
      case 'RESET_STATE':
        return newObject(state, dontResetKeyCheck(ResetState, action), dontResetKeyCheck(InitialState, action));
      case `${reducerName}_RESET_API`:
        return newObject(state, dontResetKeyCheck(ResetState, action));
      case `${reducerName}_MUTATE_STATE`:
        return newObject(state, action.payload);
      case `${reducerName}_RESET_STATE`:
        return newObject(state, dontResetKeyCheck(ResetState, action), dontResetKeyCheck(InitialState, action));
      default:
        {
          let reducerState = newObject(state);
          if (constantReducer) {
            const returnData = constantReducer({
              state: reducerState,
              type: type || action.type,
              proxyFor: _proxyFor,
              action,
              constants: authenticationConstants,
              isMobile: isMobileApp,
              initialState: InitialState,
              resetState: ResetState
            });
            if (typeof returnData !== 'undefined') reducerState = returnData;
          }
          const newState = newObject.bind({}, reducerState);
          const {
            response: {
              method,
              type
            } = {}
          } = action;
          const execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          const constants = InitialState;
          if (execute) return commmonStateHandler({
            constants,
            state: reducerState,
            action,
            method,
            newState,
            updateState: updateState({
              authenticationConstants,
              ResetState,
              isMobileApp,
              handlers,
              initialState,
              reducerFunction
            })
          });
          return reducerState;
        }
    }
  };
});

function CustomError(err) {
  let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let fileName = arguments.length > 2 ? arguments[2] : undefined;
  let lineNumber = arguments.length > 3 ? arguments[3] : undefined;
  let instance = new Error(message, fileName, lineNumber);
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

/* eslint-disable no-underscore-dangle */
const headers = '';
function loaderGenerator(_ref) {
  let {
    type,
    commonData
  } = _ref;
  return function* () {
    yield put(apiLoadingStatus({
      type,
      payload: commonData,
      status: false
    }));
  }();
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const debounce = function (ms, pattern, task, isEvery) {
  for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }
  return fork(function* () {
    let taskID;
    while (true) {
      let action = yield take(pattern);
      while (true) {
        const {
          debounced,
          latestAction
        } = yield race({
          debounced: delay$1(ms),
          latestAction: take(pattern)
        });
        if (debounced) {
          if (taskID && typeof taskID.cancel === 'function' && !taskID.isCancelled() && !isEvery) taskID.cancel();
          taskID = yield fork(task, ...args, action);
          break;
        }
        action = latestAction;
      }
    }
  });
};
const checkKey$3 = (key, name, dataType) => {
  invariant(typeOf(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`);
};
const _cache = {};
const _cacheApiConfig = {};
function _sagaHandler (_ref2) {
  let {
    actionType = {},
    requestResponseHandler,
    axiosInterceptors
  } = _ref2;
  function commonGenerator(_ref3) {
    let {
      type,
      payload: _payload
    } = _ref3;
    return function* () {
      /* below code is used for refetching cached api - start */
      let apiCacheFilter;
      if (_payload && _payload.actionCallType !== REFETCH_API_QUERY) {
        _cacheApiConfig[type] = _cacheApiConfig[type] || {};
        if (_payload.request && _payload.request.key) {
          if (Array.isArray(_payload.request.key) && _payload.request.key.length > 0) apiCacheFilter = _payload.request.key.join('@_@-@_@');else apiCacheFilter = _payload.request.key;
          if (_payload.actionCallType !== REFETCH_API_QUERY) _cacheApiConfig[type][apiCacheFilter] = _payload;
        } else _cacheApiConfig[type] = _payload;
      }
      const __payload = _payload.actionCallType === REFETCH_API_QUERY ? apiCacheFilter ? _cacheApiConfig[type][apiCacheFilter] : _cacheApiConfig[type] : _payload;
      if (!__payload) {
        yield call(loaderGenerator, {
          type,
          commonData: {
            status: 'request query not found.Unable to fetch api.'
          }
        });
        return;
      }
      let _success = null;
      let _error = null;
      /* above code is used for refetching cached api - end */
      const {
        resolve,
        reject,
        isReject,
        dontUpdateReducer = false,
        request: {
          asyncFunction = null,
          asyncFunctionParams = null,
          payload = {},
          params = {},
          query,
          delayFunction,
          dontUpdateReducerOnSucess = false,
          dontUpdateReducerOnError = false,
          axios: requestAxios,
          paramsSerializer = {
            arrayFormat: 'brackets'
          },
          cancelKey,
          onCancelTask,
          axiosConfig = {},
          useCache: cacheControl = false,
          errorDataHandling = true,
          clearDataOnError = false,
          polling = false,
          errorParser = false,
          defaultErrorParser: isResponseErrorParser = false,
          delay: Delay = 8000,
          retry = 0,
          pollingCount = 'unlimited',
          callAfterDelay = false,
          ...rest
        } = {},
        callback: {
          successCallback,
          errorCallback,
          logoutCallback,
          finalCallback,
          pollingCallback,
          cancelCallback,
          ...restCallback
        } = {},
        ...restPayload
      } = __payload;
      let isError = false;
      let loop = true;
      let count = 1;
      let pollingRequestConfig = {};
      let POLLING_RESPONSE_DATA = {};
      while (loop) {
        let action = yield actionType[type];
        const axios = requestAxios || action.api && action.api.axios || axiosInterceptors || request;
        const {
          CancelToken
        } = AxiosDefault;
        const source = yield CancelToken.source();
        action = {
          ...action,
          error: action.error || action.actions[ERROR],
          success: action.success || action.actions[SUCCESS],
          customTask: action.custom || action.actions[CUSTOM]
        };
        let url = '';
        if (action.api && ['string', 'function'].includes(typeof action.api)) {
          url = action.api;
          action.api = {};
        }
        const commonData = {
          payload,
          params,
          query,
          ...rest,
          ...pollingRequestConfig,
          request: {
            payload,
            params,
            query,
            errorDataHandling,
            clearDataOnError,
            ...rest,
            ...pollingRequestConfig
          },
          callback: restCallback,
          ...restPayload
        };
        const actionBind = (_action, _method) => _action.bind({}, type, _method, commonData);
        if (typeof action.error === 'function') action.error = actionBind(action.error, ON_ERROR);
        if (typeof action.success === 'function') action.success = actionBind(action.success, ON_SUCCESS);
        let request$1 = {
          ...(action.api || {}),
          cancelToken: source.token,
          url: action.api.url || url,
          method: action.api.method || 'GET',
          data: payload,
          headers
        };
        if (action.effect) delete action.effect;
        if (action.actions) delete action.actions;
        if ((pollingRequestConfig && pollingRequestConfig.params || params) && typeof request$1.url === 'function') {
          checkKey$3(params, '{request: { params }}', 'object');
          request$1.url = yield request$1.url(pollingRequestConfig && pollingRequestConfig.params || params);
        }
        if (query || pollingRequestConfig && pollingRequestConfig.query) {
          request$1.params = pollingRequestConfig && pollingRequestConfig.query || query;
          // eslint-disable-next-line no-loop-func
          request$1.paramsSerializer = function (param) {
            return Qs.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
          };
        }
        if (pollingRequestConfig && pollingRequestConfig.payload) {
          request$1.data = pollingRequestConfig && pollingRequestConfig.payload || payload;
        }
        const _query = pollingRequestConfig && pollingRequestConfig.query || query;
        let _url;
        if (cacheControl) _url = `${request$1.url}${Object.keys(_query || {}).length > 0 ? `?${request$1.paramsSerializer(_query)}` : ''}`;
        if (process.env.NODE_ENV !== 'test' || !action.test) yield delete request$1.headers;
        let requestData = null;
        if (!dontUpdateReducer) requestData = yield call(requestResponseHandler, {
          type,
          action,
          request: request$1,
          payload: commonData,
          actionData: rest,
          method: ON_REQUEST
        });
        request$1 = requestData || request$1;
        if (!['POST', 'PATCH', 'PUT', 'DELETE', 'post', 'patch', 'put', 'delete'].includes(request$1.method)) delete request$1.data;
        if (request$1.effect) delete request$1.effect;
        let postData = '';
        let cancelTask = '';
        if (polling && callAfterDelay && loop && count === 1 && action && action.cancel) {
          const {
            cancel: _cancelTask
          } = yield race({
            posts: call(delayFunction || delay, Delay),
            cancel: take(action.cancel)
          });
          cancelTask = _cancelTask;
          if (cancelTask) {
            loop = false;
            if (!dontUpdateReducer) yield call(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: ON_CANCEL,
              axiosCancel: cancelTask
            });
            break;
          }
        }
        try {
          isError = false;
          let cacheId;
          if (cacheControl) cacheId = `${_url || ''}_${JSON.stringify(request$1)}`;
          if (cacheControl && request$1.method === 'GET' && _cache[cacheId] && !polling) {
            postData = {
              ..._cache[cacheId]
            };
          } else {
            const {
              posts: _postData,
              cancel: _cancelTask,
              cancel_filter: cancelFilterTask
            } = yield race({
              posts: typeof asyncFunction === 'function' ? call(asyncFunction, ...(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : [])) : call(axios, {
                ...request$1,
                ...(pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)
              }),
              cancel: take(action.cancel),
              cancel_filter: take(cancelKey && typeOf(cancelKey) === 'string' && cancelKey.length ? `${action.cancel}_[${cancelKey}]` : action.cancel)
            });
            cancelTask = _cancelTask || cancelFilterTask;
            postData = typeof _postData !== 'undefined' ? {
              ..._postData
            } : {};
          }
          let data = postData ? {
            ...postData
          } : postData;
          postData = postData || {};
          if (postData && postData.data) {
            const statusKey = action.api.responseStatusCodeKey || '';
            data = {
              data: {
                status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? postData.status || 200 : (postData.data || {})[statusKey]) || postData && postData.status,
                statusCode: (postData.data || {})[statusKey] || postData && postData.status,
                message: (postData.data || {})[action.api.responseMessageKey || ''] || postData && postData.message,
                data: (postData.data || {})[action.api.responseDataKey] || postData.data || postData
              }
            };
            if (action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status)) {
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
            }
          }
          if (data && postData.data) {
            const {
              data: {
                status: successStatus = postData && postData.status,
                message: successMessage = ''
              } = {}
            } = data || {};
            action.success = action.success.bind({}, successStatus, successMessage);
            let successCallbackResponse = null;
            _success = {
              response: postData,
              posts: data,
              data: data.data,
              res: data && data.data && data.data.data,
              message: successMessage,
              status: successStatus
            };
            if (typeof successCallback === 'function') {
              const {
                cancel: CancelPolling,
                successCallbackResponse: _successCallbackResponse = null
              } = yield race({
                successCallbackResponse: call(successCallback, _success),
                cancel: take(action.cancel)
              });
              if (CancelPolling) loop = false;
              successCallbackResponse = _successCallbackResponse;
            }
            if (successCallbackResponse) if (typeOf(successCallbackResponse) === 'object') {
              commonData._errortask = undefined;
              if (typeOf(successCallbackResponse.task) === 'object') commonData.task = successCallbackResponse.task;
              if (successCallbackResponse.filter) commonData.filter = successCallbackResponse.filter;
              if (successCallbackResponse.updateDataReducerKey) commonData.updateDataReducerKey = successCallbackResponse.updateDataReducerKey;
              if (typeOf(successCallbackResponse.tasks) === 'array' && successCallbackResponse.tasks.filter(e => e.task || e.filter || e.updateDataReducerKey).length > 0) commonData.tasks = successCallbackResponse.tasks;
            } else if (typeOf(successCallbackResponse) === 'array' && successCallbackResponse.filter(e => e.task || e.filter || e.updateDataReducerKey).length > 0) commonData.tasks = successCallbackResponse;
            let loader = null;
            if (!dontUpdateReducerOnSucess && !dontUpdateReducer) loader = yield call(requestResponseHandler, {
              data,
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: ON_SUCCESS
            });
            if (loader) yield call(loaderGenerator, {
              type,
              commonData
            });
            if (typeof logoutCallback === 'function') setTimeout(() => logoutCallback(data), 100);
          } else if (cancelTask && (typeof source.cancel === 'function' || onCancelTask)) {
            const cancelResponse = yield (onCancelTask || source.cancel)();
            if (typeof cancelCallback === 'function') cancelCallback(cancelResponse);
            const {
              response: {
                method: customMethod
              } = {}
            } = cancelTask || {};
            if (!customMethod && !dontUpdateReducer) yield call(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: ON_CANCEL,
              axiosCancel: cancelTask
            });
            if (customMethod !== ON_UNMOUNT && !dontUpdateReducer) yield call(loaderGenerator, {
              type,
              commonData
            });
            loop = false;
          } else if (process.env.NODE_ENV === 'test' && action.success) yield put(action.success({
            data
          }));else {
            _success = {
              response: postData,
              status: postData && postData.status
            };
            if (typeof successCallback === 'function' && !cancelTask) {
              successCallback(_success);
            }
            if (!dontUpdateReducer) yield call(loaderGenerator, {
              type,
              commonData
            });
          }
          if (polling && typeof window !== 'undefined' && typeof pollingCallback === 'function' && loop) {
            const {
              data: {
                status: successStatus = postData && postData.status,
                message: successMessage = ''
              } = {}
            } = data || {};
            POLLING_RESPONSE_DATA = {
              response: data,
              data: data && data.data,
              message: successMessage,
              status: successStatus,
              count,
              request: typeof asyncFunction === 'function' ? Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : [] : pollingRequestConfig || request$1
            };
          }
          // cancel looping on success if retry is true
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
        } catch (error) {
          isError = true;
          try {
            if (error && typeof error === 'object' && !error.isAxiosError) throw new Error(error);
            if (!polling && retry && retry - 1 >= count) {
              // console.log(count);
            } else {
              if (isReject && reject && typeOf(reject) === 'function') reject({
                status: 'ERROR',
                error: error || 'NETWORK ERROR',
                respone: error && error.response
              });else if (resolve && typeOf(resolve) === 'function') resolve({
                status: 'ERROR',
                error: error || 'NETWORK ERROR',
                respone: error && error.response
              });
              // eslint-disable-next-line no-console
              if (process.env.NODE_ENV === 'test') console.log(error);
              const {
                response: {
                  data: {
                    [action.api.errorDataKey || 'error']: errorData = error && error.response && error.response.data || error && error.response || '',
                    status: errorStatus = error && error.response && error.response.data && (error.response.data[action.api.errorStatusKey] || error && error.response && error.response.status),
                    message: errorMessage = error && error.response && error.response.data && error.response.data[action.api.errorMessageKey] || error && error.response && error.response.statusText || error && error.message || ''
                  } = {}
                } = {}
              } = error || {};
              _error = {
                error,
                errorData: isResponseErrorParser ? errorData && typeof responseErrorParser(errorData) === 'object' && Object.keys(responseErrorParser(errorData) || {}).length > 0 ? responseErrorParser(errorData) : errorData : errorData,
                ...(typeof errorParser === 'function' ? {
                  errorParser: errorParser({
                    error,
                    errorData,
                    status: errorStatus,
                    response: error && error.response,
                    message: errorMessage
                  })
                } : {}),
                isNetworkError: error && error.request && error.message === 'Network Error',
                errorMessage: error && error.message,
                message: errorMessage,
                status: errorStatus,
                response: error && error.response,
                errors: errorData
              };
              if (typeof errorCallback === 'function') {
                let errorCallbackResponse = null;
                if (typeof errorCallback === 'function') {
                  const {
                    cancel: CancelPolling,
                    errorCallbackResponse: _errorCallbackResponse = null
                  } = yield race({
                    errorCallbackResponse: call(errorCallback, _error),
                    cancel: take(action.cancel)
                  });
                  if (CancelPolling) loop = false;
                  errorCallbackResponse = _errorCallbackResponse;
                }
                if (errorCallbackResponse) {
                  if (typeOf(errorCallbackResponse) === 'boolean' && errorCallbackResponse) commonData._errortask = true;else if (typeOf(errorCallbackResponse) === 'object' && Object.keys(errorCallbackResponse).length > 0) {
                    commonData._errortask = true;
                    if (typeOf(errorCallbackResponse.task) === 'object') commonData.task = errorCallbackResponse.task;
                    if (errorCallbackResponse.filter) commonData.filter = errorCallbackResponse.filter;
                    if (errorCallbackResponse.updateDataReducerKey) commonData.updateDataReducerKey = errorCallbackResponse.updateDataReducerKey;
                    if (typeOf(errorCallbackResponse.tasks) !== 'undefined') commonData.tasks = errorCallbackResponse.tasks;
                    if (typeOf(errorCallbackResponse.tasks) === 'array' && errorCallbackResponse.tasks.filter(e => e.task || e.filter).length > 0) commonData.tasks = errorCallbackResponse.tasks;
                  } else if (typeOf(errorCallbackResponse) === 'array' && errorCallbackResponse.filter(e => typeOf(e) === 'object').length > 0) {
                    commonData._errortask = true;
                    commonData.tasks = errorCallbackResponse.filter(e => typeOf(e) === 'object');
                  } else commonData._errortask = false;
                }
              }
              action.error = action.error.bind({}, errorStatus, errorMessage);
              if (AxiosDefault.isCancel(error) && action.cancel && !dontUpdateReducer && !dontUpdateReducerOnError) {
                yield call(loaderGenerator, {
                  type,
                  commonData
                });
                yield call(requestResponseHandler, {
                  type,
                  action,
                  payload: commonData,
                  actionData: rest,
                  method: ON_CANCEL_ERROR
                });
              } else if (!dontUpdateReducer && !dontUpdateReducerOnError) {
                const loader = yield call(requestResponseHandler, {
                  error: {
                    response: {
                      data: {
                        status: errorStatus,
                        data: errorDataHandling ? errorData : null,
                        message: errorMessage
                      }
                    }
                  },
                  type,
                  action,
                  payload: commonData,
                  actionData: rest,
                  method: ON_ERROR
                });
                if (loader) yield call(loaderGenerator, {
                  type,
                  commonData
                });
              }
            }
          } catch (e) {
            throw new Error(e);
          }
        } finally {
          const Cancelled = yield cancelled();
          if (typeof finalCallback === 'function') {
            const {
              cancel: CancelPolling
            } = yield race({
              finalRes: call(finalCallback, {
                type,
                action,
                payload: commonData,
                Cancelled,
                isError,
                success: _success,
                error: _error
              }),
              cancel: take(action.cancel)
            });
            if (CancelPolling) loop = false;
          }
          if (!dontUpdateReducer) yield call(requestResponseHandler, {
            type,
            action,
            payload: commonData,
            actionData: rest,
            method: ON_FINALLY,
            cancelled: Cancelled
          });
          if (Cancelled) {
            if (typeof source.cancel === 'function') yield source.cancel();
            loop = false;
          }
        }
        if (polling && typeof window !== 'undefined' && loop) {
          if (pollingCount === 'unlimited' || pollingCount - 1 >= count) {
            count += 1;
            const {
              cancel: CancelPolling
            } = yield race({
              posts: call(delayFunction || delay, Delay),
              cancel: take(action.cancel)
            });
            if (CancelPolling) loop = false;else if (polling && typeof window !== 'undefined' && typeof pollingCallback === 'function' && loop) {
              const {
                cancel: _CancelPolling,
                pollingRes
              } = yield race({
                pollingRes: call(pollingCallback, POLLING_RESPONSE_DATA),
                cancel: take(action.cancel)
              });
              if (_CancelPolling) loop = false;else if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;
            }
          } else loop = false;
        } else if (!polling && retry && loop) {
          if (retry - 1 >= count) {
            loop = true;
            count += 1;
          } else loop = false;
        } else loop = false;
      }
    }();
  }
  const generatorPattern = Object.keys(actionType).map(pattern => actionType[pattern].api && actionType[pattern].api[IS_DEBOUNCE_API_CALL] && actionType[pattern].api[DEBOUNCE_API_CALL_DELAY_IN_MS] > 0 && typeof debounce === 'function' ? debounce(actionType[pattern].api[DEBOUNCE_API_CALL_DELAY_IN_MS], pattern, commonGenerator, !!actionType[pattern].effect) : (actionType[pattern].effect || takeLatest)(pattern, commonGenerator));
  return [generatorPattern, commonGenerator];
}

function DEFAULT_SAGA_HANDLER(_ref) {
  let {
    method,
    action,
    successData,
    requestData,
    successStatus,
    restSuccessData,
    errorStatus,
    errorData
  } = _ref;
  return function* () {
    switch (method) {
      case ON_REQUEST:
        return requestData;
      case ON_CANCEL:
        return true;
      case ON_SUCCESS:
        if ([200, 201].includes(successStatus)) {
          yield put(action.success({
            data: successData,
            ...restSuccessData
          }));
        } else return true;
        break;
      case ON_ERROR:
        {
          if (errorStatus) yield put(action.error({
            data: errorData
          }));else yield put(action.error({
            data: {}
          }));
          break;
        }
    }
  }();
}

/* eslint-disable no-unused-vars */
const requestResponseHandler = _ref => {
  let {
    constants,
    sagaFunction
  } = _ref;
  return (
    // eslint-disable-next-line func-names
    function (_ref2) {
      let {
        data: {
          data: {
            status: successStatus,
            data: successData = {},
            message: successMessage,
            ...restSuccessData
          } = {}
        } = {},
        request,
        action,
        type,
        payload: {
          payload = {},
          query = {},
          params = {},
          ...restPayload
        } = {},
        method,
        actionData,
        axiosCancel,
        error: {
          response: {
            data: {
              status: errorStatus,
              data: errorData = [],
              message: errorMessage,
              ...restErrorData
            } = {}
          } = {}
        } = {},
        cancelled
      } = _ref2;
      return function* () {
        let requestData = {};
        if (method === ON_REQUEST) requestData = newObject(request);
        const requestParams = {
          method,
          action,
          successData,
          requestData,
          successStatus,
          restSuccessData,
          errorStatus,
          errorData,
          restPayload,
          restErrorData
        };
        const DEFAULT_SAGA_HANDLER$1 = DEFAULT_SAGA_HANDLER.bind(null, requestParams);
        if (sagaFunction) {
          return yield call(sagaFunction, newObject({
            type,
            constants,
            DEFAULT_SAGA_HANDLER: DEFAULT_SAGA_HANDLER$1
          }, requestParams));
        }
        switch (method) {
          case ON_REQUEST:
            return requestData;
          default:
            return yield call(DEFAULT_SAGA_HANDLER$1);
        }
        // switch (type) {
        //   case authenticationConstants.REGISTER_API[CALL]:
        //     switch (method) {
        //       case ON_SUCCESS: {
        //         if ([200].includes(successStatus))
        //           yield put(action.success({ data: payload }));
        //         else return true; /* @param return true for stopping loader */
        //         break;
        //       }
        //       case ON_ERROR: {
        //         return true; /* @param return true for stopping loader */
        //       }
        //       case ON_FINALLY:
        //         break;
        //       default:
        //         yield call(DEFAULT_SAGA_HANDLER);
        //     }
        //     break;
        //   case authenticationConstants.LOGIN_API[CALL]:
        //     switch (method) {
        //       case ON_SUCCESS: {
        //         if ([200].includes(successStatus))
        //           yield put(action.success({ data: payload }));
        //         else return true; /* @param return true for stopping loader */
        //         break;
        //       }
        //       case ON_ERROR: {
        //         return true; /* @param return true for stopping loader */
        //       }
        //       case ON_FINALLY:
        //         break;
        //       default:
        //         yield call(DEFAULT_SAGA_HANDLER);
        //     }
        //     break;
        //   case authenticationConstants.VERIFY_OTP_API[CALL]:
        //     switch (method) {
        //       case ON_SUCCESS:
        //         if ([200].includes(successStatus))
        //           yield put(action.success({ data: successData }));
        //         else return true; /* @param return true for stopping loader */
        //         break;
        //       default:
        //         return yield call(DEFAULT_SAGA_HANDLER);
        //     }
        //     break;
        // case authenticationConstants.ONBOARDING_API[CALL]:
        //   switch (method) {
        //     case ON_SUCCESS:
        //       if ([200].includes(successStatus))
        //         yield put(action.success({ data: { is_onboarded: true } }));
        //       else return true;  /* @param return true for stopping loader */
        //       break;
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        //   break;
        // case authenticationConstants.EDIT_MOBILE_NUMBER_API[CALL]:
        //   switch (method) {
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        // case authenticationConstants.VERIFY_OTP_FOR_EDIT_MOBILE_NUMBER_API[CALL]:
        //   switch (method) {
        //     case ON_SUCCESS:
        //       yield put(action.success({ data: successData }));
        //       break;
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        //   break;
        // case authenticationConstants.UPDATE_PROFILE_API[CALL]:
        //   switch (method) {
        //     case ON_SUCCESS:
        //       yield put(action.success({ data: successData }));
        //       break;
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        //   break;
        // case authenticationConstants.UPDATE_USER_DETAILS_API[CALL]:
        //   switch (method) {
        //     case ON_SUCCESS:
        //       yield put(action.success({ data: successData }));
        //       break;
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        //   break;
        // case authenticationConstants.USER_LOGOUT_API[CALL]:
        //   switch (method) {
        //     case ON_SUCCESS:
        //       if ([200].includes(successStatus)) yield put(action.success());
        //       else return true; /* @param return true for stopping loader */
        //       break;
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        //   break;
        // case authenticationConstants.USER_PROFILE_API[CALL]:
        //   switch (method) {
        //     case ON_SUCCESS:
        //       if ([200].includes(successStatus))
        //         yield put(action.success({ data: successData }));
        //       else return true; /* @param return true for stopping loader */
        //       break;
        //     default:
        //       return yield call(DEFAULT_SAGA_HANDLER);
        //   }
        //   break;
        //   default:
        //     switch (method) {
        //       case ON_REQUEST:
        //         return requestData;
        //       default:
        //         return yield call(DEFAULT_SAGA_HANDLER);
        //     }
        // }
        // return null;
      }();
    }
  );
};

// import queryString from 'query-string';
var Saga = (_ref => {
  let {
    sagaConfig,
    constants,
    sagaFunction,
    axiosInterceptors,
    constantSaga: OtherGenerator = []
  } = _ref;
  const [generatorPattern, sagaGenerator] = _sagaHandler({
    requestResponseHandler: requestResponseHandler({
      constants,
      sagaFunction
    }),
    actionType: sagaConfig,
    axiosInterceptors
  });

  // For Test Purpose
  const Generator = sagaGenerator;
  // eslint-disable-next-line func-names
  const saga = function* () {
    yield all(generatorPattern.concat(OtherGenerator || []));
  };
  return {
    saga,
    Generator
  };
});

const {
  HANDLERS: HANDLERS$2,
  NEXT_JS: NEXT_JS$1,
  CREATE_REDUCER: CREATE_REDUCER$1,
  USE_HOC_HOOK: USE_HOC_HOOK$1,
  ALLOW_MAP_STATE_TO_PROPS: ALLOW_MAP_STATE_TO_PROPS$1,
  GET_INITIAL_PROPS_KEY: GET_INITIAL_PROPS_KEY$1,
  IS_DEVELOPMENT: IS_DEVELOPMENT$1,
  USE_TYPE: USE_TYPE$1,
  USE_HOOK: USE_HOOK$1,
  HOOK_WITH_HOC: HOOK_WITH_HOC$1
} = HOC_MAIN_CONFIG_KEY;
const {
  API_END_POINTS: API_END_POINTS$1,
  INITIAL_STATE: INITIAL_STATE$1,
  GET_DEFAULT_CONFIG: GET_DEFAULT_CONFIG$1,
  DONT_RESET_REDUCER_KEYS: DONT_RESET_REDUCER_KEYS$1,
  IS_MOBILE: IS_MOBILE$1,
  SAGA: SAGA$1,
  SAGA_CONSTANT: SAGA_CONSTANT$1,
  REDUCER_CONSTANT: REDUCER_CONSTANT$1,
  REDUCER: REDUCER$1,
  AXIOS_INTERCEPTORS: AXIOS_INTERCEPTORS$1,
  REDUCER_NAME: REDUCER_NAME$1
} = HOC_INITIAL_CONFIG_KEY;
const safe$1 = nullcheck;
const checkKey$4 = (key, name, dataType) => {
  const convertArray = Array.isArray(dataType) ? dataType : [dataType];
  invariant(convertArray.includes(typeOf(key)), `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a (${convertArray.join(' | ')})`);
};
const showInjectedMessage = reducerName => {
  console.log(`===== Successfully Injected Reducer - ${reducerName} =====`);
};
const reducerNameErrorMessage = '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string';
const showDepricatedMessage = reducerName => {
  const DEPRICATED_MESSAGE = `<======= "${reducerName} Reducer" (react-boilerplate-redux-saga-hoc) Sorry! This package is depricated.This version is no longer supported, and will not receive security updates.====>`;
  if (console.warn) console.warn(DEPRICATED_MESSAGE);
  if (console.error) console.error(DEPRICATED_MESSAGE);
  if (console.info) console.info(DEPRICATED_MESSAGE);
};
const isMounted = {};
var index = (_ref => {
  let {
    [HANDLERS$2]: handlers = [],
    [NEXT_JS$1]: nextJS = false,
    [CREATE_REDUCER$1]: createReducer = null,
    [USE_HOOK$1]: useHook = false,
    [USE_HOC_HOOK$1]: useHocHook = false,
    [HOOK_WITH_HOC$1]: hookWithHoc = false,
    [ALLOW_MAP_STATE_TO_PROPS$1]: _mapStateToProps = true,
    [GET_INITIAL_PROPS_KEY$1]: getInitialPropsKey = GET_INITIAL_PROPS_DEFAULT,
    [IS_DEVELOPMENT$1]: isDevelopment = false,
    [USE_TYPE$1]: useType
  } = _ref;
  return function () {
    let {
      [API_END_POINTS$1]: apiEndPoints = {},
      [INITIAL_STATE$1]: initialState = {},
      [GET_DEFAULT_CONFIG$1]: getDefaultConfig = false,
      [DONT_RESET_REDUCER_KEYS$1]: dontResetOnLogout = {},
      [IS_MOBILE$1]: isMobile = false,
      [SAGA$1]: sagaFunction,
      [SAGA_CONSTANT$1]: constantSaga = [],
      [REDUCER_CONSTANT$1]: constantReducer,
      [REDUCER$1]: reducerFunction,
      [REDUCER_NAME$1]: reducerName,
      [AXIOS_INTERCEPTORS$1]: axiosInterceptors,
      [USE_HOOK$1]: _useHook = false
      // store: _store,
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const reducer_name_hoc_key = `${reducerName}_hoc`;
    let stateProps = null;
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
    const ApiEndPoints = {
      [reducerName]: apiEndPoints
    };
    const {
      constants,
      initialState: InitialState,
      resetState,
      actions: Action,
      sagaConfig
    } = generateConstants({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout
    });
    const {
      componentActions
      // actions,
      // sagaActions,
      // cancelActions,
    } = generateAction(Action);
    const {
      saga
    } = Saga({
      sagaConfig,
      constants,
      sagaFunction,
      axiosInterceptors,
      constantSaga
    });
    const reducer = Reducer({
      constants,
      InitialState: newObject(initialState, InitialState),
      reducerFunction,
      resetState,
      constantReducer,
      isMobile,
      handlers,
      reducerName
    });
    const _constants = Object.entries(constants).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return {
        ...acc,
        [key]: value[commonConstants.CALL]
      };
    }, {});
    const componentData = {
      [reducer_name_hoc_key]: {
        reducerConstants: _constants,
        constants,
        initialState,
        constantActions: componentActions,
        axios: axiosInterceptors || request,
        resetState,
        reducerName
      }
    };
    const commonProps = useHook || _useHook || !_mapStateToProps ? {
      safe: safe$1
    } : {
      safe: safe$1,
      getData
    };
    const injectSagaConfig = {
      key: reducerName,
      saga
    };
    const injectReducerConfig = {
      key: reducerName,
      reducer
    };
    const _useHocHook = () => {
      const isInjected = useRef(isMounted[reducerName]);
      if (useType !== FOR_INTERNAL_USE_ONLY) {
        showDepricatedMessage(reducerName);
      } else if (!isInjected.current && !nextJS) {
        useInjectSaga(injectSagaConfig, !isMounted[reducerName], false, () => {
          if (isDevelopment) showInjectedMessage(reducerName);
        });
        useInjectReducer(injectReducerConfig, createReducer, !isMounted[reducerName]);
        if (!isMounted[reducerName]) isMounted[reducerName] = true;
      }
      const dispatch = useDispatch();
      if ((!stateProps || isDevelopment) && dispatch) {
        stateProps = {
          ...componentData[reducer_name_hoc_key],
          actions: bindActionCreators(componentActions, dispatch),
          dispatch
        };
      }
      return useState(stateProps)[0];
    };
    if (useHocHook && !nextJS && !hookWithHoc) return _useHocHook;
    const hoc = WrapperComponent => {
      function WithHoc(props) {
        return /*#__PURE__*/React.createElement(WrapperComponent, _extends({}, commonProps, props));
      }
      WithHoc.propTypes = {};
      WithHoc.displayName = `withReactBoilerplateReduxSagaHoc(${WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent'})`;
      const MakeSelectAuthenticationState = useHook || !_mapStateToProps ? null : makeSelectAuthenticationState({
        apiEndPoints: ApiEndPoints,
        initialState: newObject(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants
      });
      const mapStateToProps = useHook || !_mapStateToProps ? null : createStructuredSelector({
        [`${reducerName}_data`]: MakeSelectAuthenticationState()
      });
      const authenticationReducer = !isMounted[reducerName] ? injectReducer({
        key: reducerName,
        reducer
      }, createReducer) : undefined;
      const authenticationSaga = !isMounted[reducerName] ? injectSaga({
        key: reducerName,
        saga
      }) : undefined;
      const withConnect = connect(useHook || !_mapStateToProps ? null : mapStateToProps, mapDispatchToProps(componentActions, componentData, reducerName));
      if (nextJS) {
        if (useType !== FOR_INTERNAL_USE_ONLY) {
          showDepricatedMessage(reducerName);
          return WithHoc;
        }
        WithHoc[getInitialPropsKey] = async props => {
          const {
            res,
            req,
            store,
            ...rest
          } = props.ctx || props;
          let data = {
            res,
            req,
            store,
            ...rest
          };
          if (WrapperComponent[getInitialPropsKey]) data = await WrapperComponent[getInitialPropsKey]({
            ...props,
            // eslint-disable-next-line prettier/prettier
            ...mapDispatchToProps(componentActions, componentData, reducerName
            // eslint-disable-next-line prettier/prettier
            )(store.dispatch)
          });
          return data || {};
        };
        return withConnect(WithHoc);
      }
      if (useType !== FOR_INTERNAL_USE_ONLY) {
        showDepricatedMessage(reducerName);
        return WithHoc;
      }
      if (!isMounted[reducerName]) {
        isMounted[reducerName] = true;
        if (isDevelopment) showInjectedMessage(reducerName);
        return compose(withConnect, authenticationReducer, authenticationSaga)(WithHoc);
      }
      return withConnect(WithHoc);
    };
    if (!nextJS && hookWithHoc && getDefaultConfig) return {
      hook: _useHocHook,
      hoc,
      actions: {
        ...componentActions
      },
      ...componentData[reducer_name_hoc_key]
    };
    if (!nextJS && hookWithHoc) return {
      hook: _useHocHook,
      hoc
    };
    if (nextJS && getDefaultConfig) return {
      hoc,
      saga,
      hook: _useHocHook,
      reducer: {
        name: reducerName,
        reducer
      },
      actions: {
        ...componentActions
      },
      ...componentData[reducer_name_hoc_key]
    };
    if (nextJS) return {
      hoc,
      saga,
      hook: _useHocHook,
      reducer: {
        name: reducerName,
        reducer
      }
    };
    if (getDefaultConfig) {
      return {
        hoc,
        actions: {
          ...componentActions
        },
        ...componentData[reducer_name_hoc_key]
      };
    }
    return hoc;
  };
});

/* eslint-disable no-underscore-dangle */
function configureStore() {
  let initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let middleWare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let enhancers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};
  // const routerMiddleware = isWeb
  //   ? require('connected-react-router').routerMiddleware
  //   : null;
  // const History = isWeb ? require('./utils/history').default : null;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware].concat(middleWare
  // isWeb ? [routerMiddleware(History)] : [],
  );

  // eslint-disable-next-line no-underscore-dangle
  const _enhancers = [applyMiddleware(...middlewares), ...enhancers];
  const store = createStore(createReducer({}), initialState, composeEnhancers(..._enhancers));

  // Extensions
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
const nextStore = _ref => {
  let {
    saga,
    reducer,
    middlewares: _middlewares = [],
    enhancers: _enhancers = []
  } = _ref;
  return function () {
    let initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let {
      isServer,
      req = null
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let composeEnhancers = compose;
    const monitor = null;
    // if (typeof window !== "undefined")
    //   monitor = window["__SAGA_MONITOR_EXTENSION__"];

    const reduxSagaMonitorOptions = {
      sagaMonitor: monitor
    };
    // eslint-disable-next-line global-require
    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
      /* eslint-disable no-underscore-dangle */

      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

      // NOTE: Uncomment the code below to restore support for Redux Saga
      // Dev Tools once it supports redux-saga version 1.x.x
      // if (window.__SAGA_MONITOR_EXTENSION__)
      //   reduxSagaMonitorOptions = {
      //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
      //   };
      /* eslint-enable */
    }

    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware].concat(_middlewares
    // isWeb ? [routerMiddleware(History)] : [],
    );

    const enhancers = [applyMiddleware(...middlewares), ..._enhancers];
    const store = createStore(combineReducers(reducer.reduce((acc, e) => ({
      ...acc,
      [e.name]: e.reducer
    }), {})), initialState, composeEnhancers(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    // store.sagaTask = sagaMiddleware;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry
    store.tasks = {};
    if (req || !isServer) {
      store.sagaTask = sagaMiddleware.run(function* rootSaga() {
        yield all(saga.map(fork));
      });
    }
    // Make reducers hot reloadable, see http://mxs.is/googmo
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
  let BaseComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  class WrappedComponent extends Component {
    static async getInitialProps() {
      let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const isServer = props.ctx ? props.ctx.isServer : props.isServer;
      const store = props.ctx ? props.ctx.store : props.store;
      let pageProps = {};
      if (BaseComponent.getInitialProps) {
        pageProps = await BaseComponent.getInitialProps(props);
      }

      // Stop saga on the server
      if (isServer) {
        if (typeof store.sagaTask.toPromise === 'function') {
          await store.sagaTask.toPromise();
        } else await store.sagaTask.done;
        store.dispatch(END);
      }
      return pageProps;
    }
    render() {
      return /*#__PURE__*/React.createElement(BaseComponent, this.props);
    }
  }
  _defineProperty(WrappedComponent, "displayName", `withReduxSaga(${BaseComponent.displayName || BaseComponent.name || 'BaseComponent'})`);
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
    return _a = /** @class */
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
    }(react_1.Component), /* istanbul ignore next */
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
              if (!('getInitialProps' in App)) return [3, /*break*/
              2];
              return [4, /*yield*/
              App.getInitialProps.call(App, appCtx)];
            case 1:
              initialProps = _a.sent();
              _a.label = 2;
            case 2:
              if (config.debug) console.log('3. WrappedApp.getInitialProps has store state', store.getState());
              return [2, /*return*/
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

export { index as HOC, nullcheck as Safe, request as axios, commonConstants, nextStore, configureStore as store, withRedux, withReduxSaga };
