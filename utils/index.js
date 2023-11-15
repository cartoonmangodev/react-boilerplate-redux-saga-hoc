import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import { bindActionCreators, combineReducers } from 'redux';
import { useSelector, useDispatch, useStore, batch, ReactReduxContext } from 'react-redux';
import isEqual from 'fast-deep-equal';
import { createSelector } from 'reselect';
import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import hoistNonReactStatics from 'hoist-non-react-statics';

/* eslint-disable no-underscore-dangle */
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
var Safe = nullCheck.bind(null, Error);

const passwordReg = new RegExp(/^.{6,16}$/);
const emailReg = new RegExp('^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$');
const mobileReg = new RegExp(/^\d{10,10}$/);
const nameReg = new RegExp('^[a-zA-Z ]+$');
const stringReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
const numberReg = new RegExp('^[\\d]+$');
const decimalReg = new RegExp('^[+-]?([0-9]*[.])?[0-9]+');
const postiveIntegerReg = new RegExp('^([1-9][0-9]+|[0-9])$');

/* eslint-disable */

// Keep below functions pure, that is, output should be a predictable state (truthy or false). Invocations of the below functions should be in `ValidationHandler`
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

/**
 * this method handles form validations
 * @param <object> validationData - date to validate
 * you can validate required field or other types are:
 * type: {
 * * email - validates valid email address
 * * mobile - validates valid mobile no
 * * password - validates valid password from regex - u can change regex in ValidationRegex js
 * * confirm paasword - validates password is matching with confirmPassword or not
 * * string - validates valid string
 * * number - validates valid integer
 * * array - not an empty array
 * }
 * validationData : { <field_key>: { type: <from above types>, value: <value to validate> }}
 */
// import findKey from 'lodash/isEmpty';
/* eslint-disable no-underscore-dangle */

function validateForm(validationData) {
  // let value = this[`${type}Ref`].value(),
  const error = {
    isError: false
  };
  // eslint-disable-next-line
  Object.entries(validationData).map(_ref => {
    let [key, formObject] = _ref;
    const {
      type,
      value,
      message,
      optional = false,
      formatMessage,
      emptyMessage,
      length,
      regex = {},
      callback
    } = formObject;
    // const isEmpty = validate._isEmpty(validationData[value].value);
    let isEmpty;
    if (!optional || value) {
      if (Array.isArray(value)) {
        isEmpty = !value.length > 0;
      } else {
        isEmpty = _isEmpty(value);
      }
      const typeMatch = {};
      if (typeof callback === 'function' && !isEmpty) error[`${key}`] = callback({
        type,
        value,
        message,
        optional,
        formatMessage,
        emptyMessage,
        length,
        regex
      }) || null;else if (!isEmpty) {
        // Add more cases depending upon the types that need to be checked
        // eslint-disable-next-line default-case
        switch (type) {
          case 'email':
            typeMatch.hasPassed = (regex.test || _isValidEmail)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Please enter Valid Email eg. (abc@abc.com)';
            }
            break;
          case 'mobile':
            typeMatch.hasPassed = _isValidMobile(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Please enter Valid Mobile Number';
            }
            break;
          case 'password':
            typeMatch.hasPassed = (regex.test || _isValidPassword)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Passwords must contain at least 6 characters to 20 characters';
            }
            break;
          case 'confirmPassword':
            {
              // eslint-disable-line no-case-declarations
              // const password  = findKey(validationData, { type: 'password' });
              const password = validationData[key].compareValue;
              typeMatch.hasPassed = _isMatching(password, value);
              if (!typeMatch.hasPassed) {
                error[`${key}`] = message || 'Password & Confirm password do not match';
              }
              break;
            }
          case 'string':
            typeMatch.hasPassed = (regex.test || _isValidString)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Invalid format';
            }
            break;
          case 'name':
            typeMatch.hasPassed = (regex.test || _isValidName)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = formatMessage || 'Invalid format';
            }
            if (validationData[value] && value.length < (length === 0 ? length : 3)) {
              error[`${key}`] = message || 'Name Must Be Greater Than 2 Characters';
            }
            break;
          case 'number':
            typeMatch.hasPassed = (regex.test || _isValidNumber)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Invalid format';
            }
            break;
          case 'float':
            typeMatch.hasPassed = (regex.test || _isValidFloatNumber)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Invalid format';
            }
            break;
          case 'postiveIntegerReg':
            typeMatch.hasPassed = (regex.test || _isPostiveInteger)(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Enter a valid input';
            }
            break;
          case 'array':
            typeMatch.hasPassed = _isValidArray(value);
            if (typeMatch.hasPassed) {
              error[`${key}`] = message || 'Please upload Images';
            }
            break;
          case 'textarea':
            typeMatch.hasPassed = _isValidTextAreaInput(value);
            if (typeMatch.hasPassed) {
              error[`${key}`] = message || 'Description should be of mininum 5 characters';
            }
            break;
          case 'dateString':
            typeMatch.hasPassed = _isValidTextAreaInput(value);
            if (typeMatch.hasPassed) {
              error[`${key}`] = message || 'Description should be of mininum 5 characters';
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

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
function objectEquals(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (const [p] of Object.entries(x)) {
    if (!(p in x)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!(p in y)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== 'object') return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!Object.equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (const [p] of Object.entries(y)) {
    if (p in y && !(p in x)) return false;
    // allows x[ p ] to be set to undefined
  }

  return true;
}

/* eslint-disable indent */
function setIn(obj, arr, value) {
  let i = 0;
  let o = obj;
  function update() {
    if (Array.isArray(o)) {
      return (() => {
        const a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map((data, ind) => {
          if (+arr[i] === ind) {
            return arr.length - 1 === i ? value : (() => {
              o = data;
              i += 1;
              return update();
            })();
          }
          return data;
        }) : (() => {
          o[+arr[i]] = value;
          return o;
        })();
        return a;
      })();
    }
    return cloneObject(o, {
      [arr[i]]: arr.length - 1 === i ? value : (() => {
        o = o[arr[i]] || {};
        i += 1;
        return update();
      })()
    });
  }
  return update();
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
const toCapitalize = string => string && typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : null;
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
const trimStrings = function () {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let isNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (value && typeof value === 'string' && String(value)) {
    const trimedString = String(value).trim();
    return isNumber ? Number(trimedString) : trimedString;
  }
  return value;
};

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

/* eslint-disable no-plusplus */
const cache = {};
const cacheActions = {};
const safe = Safe;
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
const checkKey = (key, name, dataType, message) => {
  invariant(typeOf(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be  ${message || dataType}`);
};
const checkKeyWithMessage = (key, dataType, message) => {
  invariant(typeOf(key) === dataType, message);
};
const previousData = new Map();
const initialRender = new Map();
const previousCallbackData = new Map();
const previousDependencyArrayData = new Map();
const isPreviousDependencyArrayCheckPassed = new Map();
const exeuteRequiredData = function (_data) {
  let e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const initialData = (e.requiredKey || []).reduce((acc, _reqKey) => ({
    ...acc,
    ...(_reqKey && typeOf(_reqKey.key || _reqKey) === 'string' ? typeOf(_reqKey) === 'string' ? {
      [_reqKey]: undefined
    } : {
      [_reqKey.key]: _reqKey.default
    } : {})
  }), {});
  return e && e.requiredKey && Array.isArray(e.requiredKey) && e.requiredKey.length > 0 && typeOf(_data) === 'object' ? e.requiredKey.reduce((acc, _reqKey) => ({
    ...acc,
    ...(_reqKey && typeOf(_reqKey.key || _reqKey) === 'string' ? {
      [_reqKey.key || _reqKey]: typeOf(_data[_reqKey.key || _reqKey]) !== undefined ? _data[_reqKey.key || _reqKey] : _reqKey.default
    } : {})
  }), {
    ...initialData
  }) : e && e.requiredKey ? _data || {
    ...initialData
  } : _data;
};
const _checkFilter = e => e && e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
const _getData = function () {
  let ee = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let isString = arguments.length > 1 ? arguments[1] : undefined;
  let _state = arguments.length > 2 ? arguments[2] : undefined;
  let name = arguments.length > 3 ? arguments[3] : undefined;
  let array = arguments.length > 4 ? arguments[4] : undefined;
  const state = _state || {};
  const _getDataFunc = e => {
    // const regex = `app\/containers\/${name}\/+.*?_CALL`;
    const regex = REDUCER_BASE_PATH.concat(name, '/+.*?_CALL');
    const isSearchMatched = ((isString ? array : e.key) || '').search(regex) > -1;
    return (typeof e.defaultDataFormat === 'boolean' || !isSearchMatched || !(isString ? array : e.key) ? !e.defaultDataFormat || !isSearchMatched || !(isString ? array : e.key) : false) ? (isString ? array : e.key) ? safe(state, `[${isString ? array : e.key}]${e.query ? e.query : ''}`, e.default) :
    // : name
    // ? safe(state, `${e.query ? e.query : ''}`, e.default)
    safe(state, `${e.query ? e.query : ''}`, e.default) : safe(getData(safe(state, `[${isString ? array : e.key}]`), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e), e.dataQuery), `${e.query && typeOf(e.query) === 'string' ? e.query : ''}`, e.query ? e.default !== undefined ? e.default : undefined : undefined);
  };
  return Array.isArray(ee.query) ? ee.query.reduce((acc, _query) => acc.concat([_getDataFunc({
    ...ee,
    query: _query.key || _query,
    default: _query.default || undefined
  })]), []) : _getDataFunc(ee);
};
const _GetData = (_state, name, array, config) => {
  const state = _state || {};
  let _data = {};
  if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-underscore-dangle
    _data = (typeOf(array) === 'object' ? [array] : array).reduce((acc, e) => {
      if (typeOf(e) === 'object') {
        if (typeOf(array) === 'object') return exeuteRequiredData(_getData(e, undefined, state, name, array), e);
        const _arr = acc.slice();
        _arr.push(exeuteRequiredData(_getData(e, undefined, state, name, array), e));
        return _arr;
      }
      // Below condition ( one config for all the keys )
      if (typeOf(e) === 'string' && typeOf(config) === 'object') {
        const _config = {
          key: e,
          ...config
        };
        if (typeOf(array) === 'object') return exeuteRequiredData(_getData(_config, undefined, state, name, array), _config);
        const _arr = acc.slice();
        _arr.push(exeuteRequiredData(_getData(_config, undefined, state, name, array), _config));
        return _arr;
      }
      if (typeOf(array) === 'object') return safe(state, `[${e.key}]`);
      const _arr = acc.slice();
      _arr.push(safe(state, `[${e}]`));
      return _arr;
    }, typeOf(array) === 'object' ? {} : []);
    // if()
  } else if (typeof array === 'string' && config && typeOf(config) === 'array') _data = config.reduce((acc, _config) => [...acc, exeuteRequiredData(_getData(_config, true, state, name, array), _config)], []);else if (typeof array === 'string') _data = exeuteRequiredData(_getData(config, true, state, name, array), config);else if (name) _data = state;else _data = state || {};
  return _data;
};
const _execute = (state, name, array, config, _key, callback) => {
  let _queryData = previousData.get(_key);
  const isPassed = isPreviousDependencyArrayCheckPassed.get(_key);
  if ((config && config.dependencyArray && !Array.isArray(config.dependencyArray)) && !isPassed) {
    invariant(false, `dependencyArray expected an array but got ${typeOf(config.dependencyArray)}`);
  } else if (isPassed || config && config.dependencyArray && Array.isArray(config.dependencyArray)) {
    if (!isPassed && config.dependencyArray.filter(e => typeof e !== 'string')[0]) invariant(false, 'dependencyArray must be array of string');else {
      if (!isPassed) isPreviousDependencyArrayCheckPassed.set(_key, true);
      const _next = config.dependencyArray.map(_e => safe(state, _e));
      const _previous = previousDependencyArrayData.get(_key);
      previousDependencyArrayData.set(_key, _next);
      if (isEqual(_previous, _next)) {
        return {
          isEqualCheck: true,
          data: previousCallbackData.get(_key) || _queryData
        };
      }
    }
  }
  const _data = _GetData(state, name, array, config);
  const _isEqual = isEqual(_data, _queryData);
  if (!_isEqual) {
    let callbackData;
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
const useQuery = function () {
  let _name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let _array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let __config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let _callback = arguments.length > 3 ? arguments[3] : undefined;
  let _callbackSuccess = arguments.length > 4 ? arguments[4] : undefined;
  let {
    refreshKey: _refreshKey = undefined
  } = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  const {
    reducerName: name,
    key: array,
    config,
    callback,
    callbackSuccess,
    refreshKey
  } = typeOf(_name) === 'object' ? _name : {
    reducerName: _name,
    key: _array,
    config: __config,
    callback: _callback,
    callbackSuccess: _callbackSuccess,
    refreshKey: _refreshKey
  };
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');
  // const store = useStore();
  const [_key] = useState({});
  useEffect(() => {
    previousData.set(_key, {});
    initialRender.set(_key, true);
    return () => {
      previousData.delete(_key);
      previousCallbackData.delete(_key);
      initialRender.delete(_key);
      previousDependencyArrayData.delete(_key);
    };
  }, []);
  const equalityCheckFunction = useCallback((e, f) => {
    const _isEqual = typeof e.isEqualCheck === 'undefined' ? isEqual(e.data, f.data) : e.isEqualCheck;
    if ((!_isEqual || initialRender.get(_key)) && typeof callbackSuccess === 'function') {
      initialRender.set(_key, false);
      callbackSuccess(e.data /* Updated Data */, f.data /* Previous Data */);
    }

    return _isEqual;
  }, []);
  const selectReducerKey = useMemo(() => {
    const _arr = [];
    const executeRequiredKey = _requiredKey => _requiredKey.forEach(e => {
      if (typeof e === 'string') _arr.push(e);else if (typeOf(e) === 'object' && e.key) _arr.push(e.key);
    });
    if (typeof array === 'string' && array) _arr.push(array);else if (Array.isArray(array) || typeOf(array) === 'object') (Array.isArray(array) ? array : [array]).forEach(arr => {
      if (typeof arr === 'string') _arr.push(arr);else if (typeOf(arr) === 'object') {
        if (arr.key) {
          _arr.push(arr.key);
        } else if (Array.isArray(arr.requiredKey) && arr.requiredKey.length > 0) {
          executeRequiredKey(arr.requiredKey);
        } else if (arr.query) {
          const getKey = _query => _query[0] === '.' ? _query.split('.')[1] : _query.split('.')[0];
          if (typeof arr === 'string') _arr.push(getKey(arr));else if (Array.isArray(arr.query) && arr.query.length > 0) arr.query.forEach(e => {
            if (typeof e === 'string') _arr.push(getKey(e));else if (typeOf(e) === 'object' && e.key) _arr.push(getKey(e.key));
          });
        }
      }
    });
    return _arr;
  }, [refreshKey]);
  const selectState = useMemo(() => {
    if (selectReducerKey && selectReducerKey.length) {
      const _arr = [];
      selectReducerKey.forEach(_k => _arr.push(state => state[name] && state[name][_k]));
      if (_arr.length > 0) return _arr;
    }
    return [state => state[name]];
  }, [selectReducerKey]);
  const executeSelector = useCallback(function () {
    for (var _len = arguments.length, rest = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      rest[_key2] = arguments[_key2];
    }
    if (selectReducerKey.length > 0 || typeOf(array) === 'object' && !array.key && array.requiredKey) {
      if (typeOf(array) === 'object' && !array.key && array.requiredKey) {
        if (Array.isArray(array.requiredKey) && array.requiredKey.length) return {
          data: array.requiredKey.reduce((acc, curr, i) => {
            if (typeOf(curr) === 'object') return {
              ...acc,
              [curr]: rest[i] === undefined ? curr && curr.default : rest[i]
            };
            return {
              ...acc,
              [curr]: rest[i]
            };
          }, {})
        };
        return {
          data: {}
        };
      }
      const _stateObj = selectReducerKey.reduce((acc, curr, i) => ({
        ...acc,
        [curr]: rest[i]
      }), {});
      return _execute(_stateObj, name, array, config, _key, callback);
    }
    return _execute(rest[0], name, array, config, _key, callback);
  }, [selectReducerKey, refreshKey]);
  const createdSelector = useMemo(() => createSelector(selectState, executeSelector), [executeSelector, selectState]);
  const _selectorData = useSelector(!name || !array ? state => _execute(state, name, array, config, _key, callback) : createdSelector, !name || !array ? undefined : equalityCheckFunction);
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

const useActionsHook = function () {
  let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const dispatch = useDispatch();
  const [dispatchAction, setDispatchAction] = useState(!actions ? cacheActions[name] || {} : bindActionCreators(actions, dispatch));
  useEffect(() => {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = bindActionCreators(actions, dispatch);
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
const useMutation = reducerName => {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  const store = useStore();
  useEffect(() => {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', ` reducerName '${reducerName}' not a valid reducer key.`);
  }, []);
  const dispatch = useDispatch();
  const _callback = useCallback(_ref11 => {
    let {
      key: type,
      value,
      filter = []
    } = _ref11;
    if (!type) checkKey(null, 'key', 'string', 'valid string');
    const _reducer_keys = Object.keys(store.getState()[reducerName]);
    if (type) invariant(_reducer_keys.includes(type),
    // type.includes('_CALL') && type.slice(-5) === '_CALL',
    `'key' is invalid.${type} not found in ${reducerName} reducer`);
    checkKey(filter, 'filter', 'array');
    checkKey(type, 'key', 'string');
    // const regex = `app\/containers\/${reducerName}\/+.*?_CALL`;
    const regex = REDUCER_BASE_PATH.concat(reducerName, '/+.*?_CALL');
    const isSearchMatched = (type || '').search(regex) > -1;
    if (type.includes('_CALL') && type.slice(-5) === '_CALL' && isSearchMatched && filter && Array.isArray(filter)) {
      // checkKey(value, 'value', 'object');
      console.log(store.getState()[reducerName][type]);
      dispatch({
        type: type.slice(0, -4).concat('CUSTOM_TASK'),
        response: {
          type,
          method: ON_SUCCESS,
          statusCode: 200,
          mutation: true,
          customTask: true,
          data: {
            data: typeof value === 'function' ? value(safe(store.getState()[reducerName][type], `.data${filter.length ? '.' : ''}${filter.join('.')}`), type) : value
          },
          payload: {
            filter
          }
        }
      });
    } else dispatch({
      type: `${reducerName}_MUTATE_STATE`,
      payload: {
        [type]: typeof value === 'function' ? value(store.getState()[reducerName][type]) : value
      }
    });
  }, []);
  return _callback;
};
/* example
 * async function() {
 *   const { data, status } = await toPromise(DEMP_API_CALL, { task: 'Data-Handler' });
 * }
 */
const toPromise = function (action) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let isReject = arguments.length > 2 ? arguments[2] : undefined;
  let dispatch = arguments.length > 3 ? arguments[3] : undefined;
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', `toPromise() : Expected a config (second parameter) to be object`);
  return new Promise((resolve, reject) => typeof dispatch === 'function' ? dispatch(action({
    ...config,
    resolve,
    reject,
    isReject
  })) : action({
    ...config,
    resolve,
    reject,
    isReject
  }));
};
/* example
 * const asyncFunction = toPromiseFunction(DEMP_API_CALL);
 * async function() {
 *   const { data, status } = await asyncFunction({ task: 'Data-Handler' });
 * }
 */
const toPromiseFunction = (action, dispatch) => (config, isReject) => {
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', `toPromise() : Expected a config (first parameter) to be object`);
  return new Promise((resolve, reject) => typeof dispatch === 'function' ? dispatch(action({
    ...config,
    resolve,
    reject,
    isReject
  })) : action({
    ...config,
    resolve,
    reject,
    isReject
  }));
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
const toPromiseAllFunction = function () {
  let actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let dispatch = arguments.length > 1 ? arguments[1] : undefined;
  return function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let defaultConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (typeOf(config) !== 'null' && typeOf(config) !== 'undefined' && typeOf(config) !== 'array') checkKeyWithMessage(config, 'object', `toPromise() : Expected a (first parameter) to be an Array or Object`);
    return Promise.all(actions.map((action, i) => new Promise((resolve, reject) => {
      const CONFIG = {
        ...((typeOf(config) === 'object' ? config : config[i] && config[i].config) || defaultConfig.config || {}),
        resolve,
        reject,
        isReject: !!(typeOf(config) === 'object' ? config.isReject || defaultConfig.isReject : config[i] && config[i].isReject || defaultConfig.isReject)
      };
      return typeof dispatch === 'function' ? dispatch(action(CONFIG)) : action(CONFIG);
    })));
  };
};
const CACHE = {};
function stringify(val) {
  return typeof val === 'object' ? JSON.stringify(val) : String(val);
}
function hashArgs() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
    args[_key3] = arguments[_key3];
  }
  return args.reduce((acc, arg) => `${stringify(arg)}:${acc}`, '');
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
  let arg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let initial
  // initialLoadingstate = true,
  = arguments.length > 3 ? arguments[3] : undefined;
  const prevArgs = useRef(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const refresh = useCallback(function () {
    let {
      loader,
      clearData,
      config
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const args = config || arg;
    const cacheID = hashArgs(name, args);
    // look in cache and set response if present
    // fetch new data
    if (CACHE[cacheID]) setIsUpdating(true);
    toPromise(fn, Object.assign({}, args, CACHE[cacheID] && !loader ? {
      initialCallData: CACHE[cacheID]
    } : {}, clearData ? {
      task: args.task ? {
        ...args.task,
        clearDataOnStart: true
      } : {
        clearDataOnStart: true
      }
    } : {})).then(newData => {
      if (CACHE[cacheID]) setIsUpdating(false);
      if (newData && newData.status === 'SUCCESS') {
        CACHE[cacheID] = newData.data;
        // setData(newData);
      }
      // setLoading(false);
    });
  }, [arg, initial]);
  useEffect(() => {
    // args is an object so deep compare to rule out false changes
    if (isEqual(arg, prevArgs.current)) {
      return;
    }
    if (initial) refresh();
    // cacheID is how a cache is identified against a unique request
  }, [arg, fn, name, initial]);
  useEffect(() => {
    prevArgs.current = arg;
  });
  return [refresh, isUpdating];
}
/* example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */
const useMutateReducer = reducerName => {
  const store = useStore();
  const dispatch = useDispatch();
  const _callback = useCallback(callback => {
    const state = reducerName ? store.getState()[reducerName] : store.getState();
    const newState = callback(state);
    if (newState) dispatch({
      type: reducerName ? `${reducerName}_MUTATE_STATE` : 'MUTATE_STATE',
      payload: newState || {}
    });
  }, []);
  return _callback;
};
/* example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */
const useCancelAllRunningApiCalls = reducerName => {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useCancelAllRunningApiCalls(`reducerkey`) : Expected a valid reducer key');
  const store = useStore();
  const dispatch = useDispatch();
  const _callback = useCallback(function () {
    let dontCancelKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const state = store.getState()[reducerName];
    const actions = Object.entries(state).reduce((acc, _ref12) => {
      let [key, value] = _ref12;
      const regex = REDUCER_BASE_PATH.concat(reducerName, '/+.*?_CALL');
      const isSearchMatched = (key || '').search(regex) > -1;
      const _dontCancelKeys = Array.isArray(dontCancelKeys) ? dontCancelKeys : [];
      if (key && key.includes('_CALL') && key.slice(-5) === '_CALL' && isSearchMatched && safe(value, '.loading.status', false) && !_dontCancelKeys.includes(key)) return acc.concat([{
        type: key.replace('_CALL', '_CANCEL')
      }]);
      return acc;
    }, []);
    if (actions && actions.length > 0) {
      batch(() => {
        for (let i = 0; i < actions.length; i++) {
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
const useResetState = reducerName => {
  const dispatch = useDispatch();
  const _callback = useCallback(function () {
    let dontResetKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    dispatch({
      type: reducerName ? `${reducerName}_RESET_STATE` : 'RESET_STATE',
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
const useResetOnlyApiEndPointsState = reducerName => {
  const dispatch = useDispatch();
  const _callback = useCallback(function () {
    let dontResetKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    dispatch({
      type: reducerName ? `${reducerName}_RESET_API` : 'RESET_API',
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
const useRefetchCachedApi = reducerkey => {
  if (!reducerkey) checkKeyWithMessage(reducerkey, 'string', 'useRefetchApi(`reducerkey`) : Expected a valid reducer key');
  const dispatch = useDispatch();
  const _callback = useCallback(key => {
    const regex = REDUCER_BASE_PATH.concat('+.*?_CALL');
    const isSearchMatched = reducerkey.search(regex) > -1;
    if (isSearchMatched) dispatch({
      type: reducerkey,
      payload: {
        actionCallType: REFETCH_API_QUERY,
        request: {
          key
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
const useApiQuery = (reducerkey, isQueryData, isMutation) => {
  if (!reducerkey) checkKeyWithMessage(reducerkey, 'string', 'useRefetchApi(`reducerkey`) : Expected a valid reducer key');
  let data;
  let mutation;
  const reducerName = reducerkey.split('/')[2];
  const ref = useRef({
    isQueryData,
    isMutation
  });
  const dispatch = useDispatch();
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
  const _action = useMemo(() => {
    const regex = REDUCER_BASE_PATH.concat('+.*?_CALL');
    const isSearchMatched = reducerkey.search(regex) > -1;
    if (isSearchMatched) return {
      action: {
        call: function () {
          return dispatch(actionsHandler.call(reducerkey)(...arguments));
        },
        cancel: function () {
          return dispatch(actionsHandler.cancel(reducerkey)(...arguments));
        },
        custom: function () {
          return dispatch(actionsHandler.custom(reducerkey)(...arguments));
        }
      },
      mutate: mutation ? _ref13 => {
        let {
          value: _value,
          filter: _filter
        } = _ref13;
        mutation({
          key: reducerkey,
          value: _value,
          filter: _filter
        });
      } : undefined
    };
    checkKeyWithMessage(null, 'string', `useApiQuery(${reducerkey}) : Expected a valid reducer key`);
    return {};
  }, []);
  return {
    ..._action,
    data,
    type: reducerkey
  };
};

/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');
const valueSymbol = Symbol('valueSymbol');
const previousValueSymbol = Symbol('previousValueSymbol');
const globalKeySymbol = Symbol('globalKeySymbol');
const GLOBAL_KEY = '@@GLOBAL_LISTENER@@';
const GLOBAL_RESET = '@@GLOBAL_RESET@@';
class Global extends EventEmitter {
  constructor() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    this[globalKeySymbol] = GLOBAL_KEY;
    this[valueSymbol] = value;
    this[previousValueSymbol] = value;
  }
  emitGlobal(_key, _val) {
    this.emit(this[globalKeySymbol], this[valueSymbol], {
      key: _key,
      value: _val
    });
  }
  emitIndividual(_key, _val) {
    this.emit(_key, this[valueSymbol], {
      key: _key,
      value: _val
    });
  }
  resetValue(_val) {
    this[previousValueSymbol] = this[valueSymbol];
    this[valueSymbol] = _val;
    this.emitGlobal(GLOBAL_RESET, this[valueSymbol]);
  }
  clearValue() {
    this[valueSymbol] = {};
    this.emitGlobal(GLOBAL_RESET, this[valueSymbol]);
  }
  getValue(_key) {
    return _key ? this[valueSymbol][_key] : this[valueSymbol];
  }
  setValue(_key, _val) {
    this[previousValueSymbol] = this[valueSymbol];
    const _value = {
      ...this[valueSymbol]
    };
    _value[_key] = _val;
    this[valueSymbol] = _value;
    this.emitGlobal(_key, _val);
  }
  get value() {
    return this[valueSymbol];
  }
  get GLOBAL_KEY() {
    return this[globalKeySymbol];
  }
  dispatch(_key, _val) {
    this[previousValueSymbol] = this[valueSymbol];
    const _value = {
      ...this[valueSymbol]
    };
    _value[_key] = _val;
    this[valueSymbol] = _value;
    this.emitIndividual(_key, _val);
    this.emitGlobal(_key, _val);
  }
  subscribe(callback) {
    this.on(this[globalKeySymbol], (value, obj) => {
      if (!isEqual(this[previousValueSymbol], this[valueSymbol])) callback(value, obj);
    });
  }
}

const globals = new Global({});

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
  const globalRef = useRef({});
  const valueRef = useRef({
    initial: true
  });
  if (initialValue && typeof initialValue === 'object' && valueRef.current.initial) {
    globals.resetValue(initialValue);
  }
  valueRef.current.initial = false;
  valueRef.current.key = key;
  const [values, setValues] = useState(initialValue || globals.value);
  valueRef.current.value = values;
  useEffect(() => {
    if (valueRef.current.key !== null) globals.subscribe(_value => {
      if (key ? _value[key] !== valueRef.current.value[key] : _value !== valueRef.current.value) {
        setValues(_value);
      }
    });
  }, []);
  globalRef.current.value = key ? values[key] : values;
  globalRef.current.dispatch = globals.dispatch.bind(globals);
  globalRef.current.resetValue = globals.resetValue.bind(globals);
  globalRef.current.clearValue = globals.clearValue.bind(globals);
  globalRef.current.getValue = globals.getValue.bind(globals);
  globalRef.current.setValue = globals.setValue.bind(globals);
  globalRef.current.subscribe = globals.subscribe.bind(globals);
  globalRef.current.GlobalEmitter = globals;
  return {
    ...globalRef.current,
    globalRef: globalRef.current
  };
}

const {
  API_END_POINTS_CONFIG_DEFAULT_VALUE: API_END_POINTS_CONFIG_DEFAULT_VALUE$1,
  API_END_POINTS_CONFIG_KEYS: API_END_POINTS_CONFIG_KEYS$1,
  USE_QUERY_CONFIG_KEYS: USE_QUERY_CONFIG_KEYS$1,
  API_TASK_CONFIG_KEYS: API_TASK_CONFIG_KEYS$1,
  INFINITE_DATA_HANDLER: INFINITE_DATA_HANDLER$1,
  DATA_HANDLER: DATA_HANDLER$1,
  DELETE_DATA_HANDLER: DELETE_DATA_HANDLER$1,
  UPDATE_DATA_HANDLER: UPDATE_DATA_HANDLER$1,
  UPDATE_DATA_KEY_HANDLER: UPDATE_DATA_KEY_HANDLER$1,
  DELETE_DATA_KEY_HANDLER: DELETE_DATA_KEY_HANDLER$1,
  TOGGLE_DATA_KEY_HANDLER: TOGGLE_DATA_KEY_HANDLER$1,
  SPLICE_DATA_HANDLER: SPLICE_DATA_HANDLER$1,
  RESET_HANDLER: RESET_HANDLER$1,
  CALLBACK_HANDLER: CALLBACK_HANDLER$1,
  TOAST_HANDLER: TOAST_HANDLER$1,
  ERROR_HANDLER: ERROR_HANDLER$1,
  LOADER_HANDLER: LOADER_HANDLER$1,
  DONT_UPDATE_DATA_HANDLER: DONT_UPDATE_DATA_HANDLER$1,
  ON_CANCEL_ERROR: ON_CANCEL_ERROR$1,
  ON_ERROR: ON_ERROR$1,
  ON_SUCCESS: ON_SUCCESS$1,
  ON_FINALLY: ON_FINALLY$1,
  ON_CANCEL: ON_CANCEL$1,
  ON_REQUEST: ON_REQUEST$1,
  ON_LOADING: ON_LOADING$1,
  ON_UNMOUNT: ON_UNMOUNT$1,
  ON_TOAST: ON_TOAST$1,
  ERROR: ERROR$1,
  SUCCESS: SUCCESS$1,
  CALL: CALL$1,
  CANCEL: CANCEL$1,
  CUSTOM: CUSTOM$1,
  TYPE_NULL: TYPE_NULL$1,
  TYPE_UNDEFINED: TYPE_UNDEFINED$1,
  TYPE_STRING: TYPE_STRING$1,
  TYPE_ARRAY: TYPE_ARRAY$1,
  TYPE_BOOLEAN: TYPE_BOOLEAN$1,
  TYPE_OBJECT: TYPE_OBJECT$1,
  TYPE_FUNCTION: TYPE_FUNCTION$1,
  TYPE_ERROR: TYPE_ERROR$1,
  TYPE_SYMBOL: TYPE_SYMBOL$1,
  TYPE_GENERATOR_FUNCTION: TYPE_GENERATOR_FUNCTION$1,
  TAKE_EVERY: TAKE_EVERY$1
} = commonConstants;

const ON_CHANGE = 'onChange';
const ON_BLUR = 'onBlur';
const VALUE = 'value';
const ERROR$2 = 'error';

const emailRegex = /^([\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-z0-9]{2,4})$/;
function validateEmail(email) {
  return emailRegex.test(String(email).toLowerCase());
}
function validate(value, fieldName) {
  let {
    optional: isOptional,
    minLength,
    isRequired,
    message = {},
    length,
    regex,
    key
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if ((isOptional || !isRequired) && !value) return '';
  const IS_NO_VALUE = typeof value === 'number' || typeof value === 'boolean' ? false : !value;
  if (value && minLength && value.length < minLength) return message && typeof message.minLength !== 'undefined' ? message.minLength : `Minimum ${minLength} characters is required`;
  if (value && length && value.length !== length) return message && message && typeof message.length !== 'undefined' ? message.length : `Number should be ${length} digits long`;
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
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'Please enter your name';
        // if (value && !validateEmail(value)) return 'Invalid email address';
        return '';
      }
    case 'mobileNumber':
      {
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'Please enter 10 digit mobile number';
        return '';
      }
    case 'about':
      {
        if (IS_NO_VALUE) return message && typeof message.required !== 'undefined' ? message.required : 'This field is required';
        // if (value && !validateEmail(value)) return 'Invalid email address';
        return '';
      }
    default:
      if (IS_NO_VALUE) {
        return message && typeof message.required !== 'undefined' ? message.required : 'This field is required';
      }
      if (regex) {
        if (Object.prototype.toString.call(regex) === '[object RegExp]') {
          if (regex.test(value)) return '';
          return message && typeof message.regex !== 'undefined' ? message.regex : `${key} is invalid `;
        }
        console.error(`${key} is invalid `);
      }
      return '';
  }
}

/* eslint-disable no-nested-ternary */
const getPlatformBasedFieldValue = e => e && typeof e === 'object' && e.target && typeof e.preventDefault === 'function' ? e.target.value : e;
const getPlatformBasedFieldName = e => e && typeof e === 'object' && e.target && typeof e.preventDefault === 'function' ? e.target.name : '';
const _setInitialValues = _ref => {
  let {
    formConfig,
    initialValues
  } = _ref;
  return Object.entries(formConfig || {}).reduce((acc, _ref2) => {
    let [key, val = {}] = _ref2;
    return newObject(acc, {
      [key]: typeof initialValues[key] !== 'undefined' ? typeof initialValues[key] === 'function' ? initialValues[key]() : initialValues[key] : typeof val.default !== 'undefined' ? val.default : ''
    });
  }, {});
};
const checkType = (val, oldVal) => newObject(typeof val === 'function' ? val(oldVal) : val);
const useFormValidationHandlerHook = function () {
  let {
    ON_CHANGE_KEY: _ON_CHANGE_KEY,
    ON_BLUR_KEY: _ON_BLUR_KEY,
    VALUE_KEY: _VALUE_KEY,
    ERROR_KEY: _ERROR_KEY,
    VALIDATOR: _VALIDATOR
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function () {
    let {
      VALIDATOR: Validate = _VALIDATOR || validate,
      initialValues = {},
      FORM_CONFIG = {},
      ON_CHANGE_KEY = _ON_CHANGE_KEY || ON_CHANGE,
      ON_BLUR_KEY = _ON_BLUR_KEY || ON_BLUR,
      VALUE_KEY = _VALUE_KEY || VALUE,
      ERROR_KEY = _ERROR_KEY || ERROR$2
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const formRef = useRef({
      is_validate_form_triggered: false
    });
    const [formConfig, _setFormConfig] = useState(FORM_CONFIG);
    const [errors, _setErrors] = useState({});
    const [values, _setValues] = useState(() => _setInitialValues({
      formConfig,
      initialValues
    }));
    const setFormConfig = useCallback(_formConfig => {
      formRef.current.formConfig = checkType(_formConfig, formRef.current.formConfig);
      _setFormConfig(formRef.current.formConfig);
    }, []);
    const setValues = useCallback(_values => {
      formRef.current.values = checkType(_values, formRef.current.values);
      _setValues(formRef.current.values);
    }, []);
    const setErrors = useCallback(_errors => {
      formRef.current.errors = checkType(_errors, formRef.current.errors);
      _setErrors(formRef.current.errors);
    }, []);
    formRef.current.values = values;
    formRef.current.errors = errors;
    formRef.current.formConfig = formConfig;
    formRef.current.setFormConfig = setFormConfig;
    const validateValue = useCallback(function (__value, key, isSetValue, isSetError, _config) {
      let isTrim = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      formRef.current.lastUpdated = generateTimeStamp();
      const config = _config || formRef.current.formConfig[key] || {};
      // eslint-disable-next-line prefer-const
      let {
        value,
        error: validatorError
      } = config && config.validator ? config.validator(__value, formRef.current, formRef.current.formConfig[key]._config, formRef.current.formConfig[key]._commonInputProps) : {
        value: __value
      };
      let error = null;
      let maxError = null;
      if (!config._noValidate) {
        if (config.maxLength && (__value || '').length > config.maxLength) {
          maxError = typeof (config.message && config.message.maxLength) !== 'undefined' ? config.message.maxLength : `maximum ${config.maxLength} characters are allowed`;
          value = value.slice(0, config.maxLength);
          // return;
        }

        if (typeof config.trim !== 'undefined' ? config.trim : config.trim || isTrim) value = trimStrings(value, config.isNumber);
        if (config) {
          error = validatorError || Validate(value, config.type, {
            key,
            optional: config.optional,
            minLength: config.minLength,
            message: config.message,
            maxLength: config.maxLength,
            length: config.length,
            ...config
          }) || maxError;
          if (value && config.match && typeof config.match === 'string' && formRef.current.values[config.match]) error = formRef.current.values[config.match] !== value ? typeof (config.message && config.message.match) !== 'undefined' ? config.message.match : `${key} not matching with ${config.match}` : maxError;
        }
        if (key && isSetValue) if (value !== '' && !Number.isNaN(+value) && !(config.allowValidNumber ? !!+value : true)) error = typeof (config.message && config.message.allowValidNumber) !== 'undefined' ? config.message && config.message.allowValidNumber : 'Please enter valid number';else if (config.allowOnlyNumber) {
          if (!Number.isNaN(+value)) {
            setValues({
              ...formRef.current.values,
              [key]: value
            });
          } else error = typeof (config.message && config.message.allowOnlyNumber) !== 'undefined' ? config.message && config.message.allowOnlyNumber : 'Only numbers are allowed';
        } else {
          setValues({
            ...formRef.current.values,
            [key]: value
          });
        }
      }
      if (typeof config.callback === 'function') {
        const response = config.callback({
          error,
          value,
          key,
          formRef: formRef.current,
          is_validation_allowed: !config._noValidate
        }, formRef.current.formConfig[key]._config, formRef.current.formConfig[key]._commonInputProps);
        if (typeOf(response) === TYPE_OBJECT$1) {
          setValues({
            ...formRef.current.values,
            [key]: response.value
          });
          error = response.error;
        }
      }
      if (!isSetError) return {
        error,
        value,
        key
      };
      if (key) {
        setErrors({
          ...formRef.current.errors,
          [key]: error || null
        });
      }
      return {
        error,
        value,
        key
      };
    }, []);
    const onChangeValues = useCallback(function () {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let key = arguments.length > 1 ? arguments[1] : undefined;
      let {
        value: _value,
        isStopPropagation,
        isValidateOnly,
        config,
        isSetError = true,
        trim
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // formRef.current.isFormChanged = true;
      // formRef.current.lastUpdated = generateTimeStamp();
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      if (e && isStopPropagation && typeof e.stopPropagation === 'function') e.stopPropagation();
      const value = typeof _value !== 'undefined' ? _value : getPlatformBasedFieldValue(e);
      const _key = getPlatformBasedFieldName(e);
      const KEY = key || _key;
      if (isValidateOnly || !KEY) return validateValue(value, KEY, null, null, config, trim);
      validateValue(value, KEY, true, isSetError === undefined ? true : isSetError, undefined, trim);
    }, []);
    const onValidateValues = useCallback(_ref3 => {
      let {
        value,
        isValue,
        key,
        isValidateOnly,
        config,
        trim
      } = _ref3;
      return onChangeValues(value, key, {
        value: isValue ? value : undefined,
        isValidateOnly,
        config,
        trim
      });
    }, []);
    const onBlurValues = useCallback(function (e, key) {
      let config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      const _key = getPlatformBasedFieldName(e);
      const KEY = key || _key;
      const value = formRef.current.values[KEY];
      if (config.isValidateOnBlur === undefined ? true : config.isValidateOnBlur) validateValue(value, KEY, false, true);
    }, []);
    const validateForm = useCallback(function () {
      let {
        isSetError,
        formConfig: __FORM_CONFIG = {},
        values: __values = {},
        errors: __errors = {},
        isNewFormConfig,
        isResetValue,
        isResetError
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      formRef.current.is_validate_form_triggered = true;
      const IS_RESET_VALUE = isResetValue && {};
      const IS_RESET_ERROR = isResetError && {};
      const _FORM_CONFIG = isNewFormConfig ? __FORM_CONFIG : newObject(formRef.current.formConfig, __FORM_CONFIG);
      const _values = newObject(IS_RESET_VALUE || formRef.current.values, __values);
      const _errors = newObject(IS_RESET_ERROR || formRef.current.errors, __errors);
      const isError = [];
      for (const key of Object.keys(_FORM_CONFIG)) {
        const {
          error: _error
        } = validateValue(_values[key], key, false, false, _FORM_CONFIG[key], true);
        _errors[key] = _error;
        if (_error) isError.push(null);
      }
      if (isSetError) {
        formRef.current.lastUpdated = generateTimeStamp();
        setErrors(_errors);
      }
      formRef.current.is_validate_form_triggered = false;
      return {
        values: _values,
        error: _errors,
        totalErrorCount: isError.length,
        errorCount: isError.length,
        isError: isError.length > 0,
        isValidatePassed: isError.length === 0
      };
    }, []);
    const validateCustomForm = useCallback(_ref4 => {
      let {
        isSetError,
        formConfig: form_config = {},
        values: __values = {},
        errors: __errors = {}
      } = _ref4;
      formRef.current.lastUpdated = generateTimeStamp();
      const _FORM_CONFIG = form_config;
      const _values = __values;
      const _errors = __errors;
      const isError = [];
      for (const key of Object.keys(_FORM_CONFIG)) {
        const {
          error: _error
        } = validateValue(_values[key], key, false, false, _FORM_CONFIG[key]);
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
    const onValidateCustomObject = useCallback((value, config) => validateForm({
      isSetError: false,
      values: value,
      formConfig: config,
      isNewFormConfig: true,
      isResetValue: true,
      isResetError: true
    }), []);
    const onAddFormConfig = useCallback(function (config, isReset) {
      let _values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      formRef.current.lastUpdated = generateTimeStamp();
      setFormConfig(newObject(isReset ? {} : formRef.current.formConfig, config));
      const newVal = Object.entries(config || {}).reduce((acc, _ref5) => {
        let [key, _config = {}] = _ref5;
        return newObject(acc, {
          [key]: _values[key] || typeof initialValues[key] !== 'undefined' && (typeof initialValues[key] === 'function' ? initialValues[key]() : initialValues[key]) || (!isReset ? formRef.current.values[key] || '' : typeof _config.default !== 'undefined' ? _config.default : '')
        });
      }, {});
      if (isReset) {
        setValues(newVal);
        setErrors({});
      } else {
        setValues(newObject(formRef.current.values, newVal));
      }
    }, []);
    const commonInputProps = useCallback(function (key) {
      let {
        index,
        config,
        propKeyMap: {
          onChange = ON_CHANGE_KEY,
          onBlur = ON_BLUR_KEY,
          value = VALUE_KEY,
          error = ERROR_KEY
        } = {},
        ...rest
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const INITIAL_FORM_CONFIG = formRef.current.formConfig[key];
      if (INITIAL_FORM_CONFIG) INITIAL_FORM_CONFIG._config = {
        index,
        config,
        key,
        ...rest
      };
      let _commonInputProps = {
        [onChange]: e => {
          onChangeValues(e, key, config);
          const _validateFieldsOnChange = config && config.validateFieldsOnChange || INITIAL_FORM_CONFIG && INITIAL_FORM_CONFIG.validateFieldsOnChange;
          if (_validateFieldsOnChange && _validateFieldsOnChange.length > 0) {
            _validateFieldsOnChange.forEach(_key => {
              if (formRef.current.values[_key]) {
                onChangeValues(formRef.current.values[_key], _key, INITIAL_FORM_CONFIG._config);
              }
            });
          }
        },
        [onBlur]: e => onBlurValues(e, key, INITIAL_FORM_CONFIG._config),
        [value]: formRef.current.values[key],
        [error]: formRef.current.errors[key],
        keyName: key
      };
      _commonInputProps = {
        ..._commonInputProps,
        ...(INITIAL_FORM_CONFIG && (typeof INITIAL_FORM_CONFIG.inputProps === 'function' ? INITIAL_FORM_CONFIG.inputProps(formRef.current, INITIAL_FORM_CONFIG._config, {
          onChange: _commonInputProps[onChange],
          onBlur: _commonInputProps[onBlur],
          value: _commonInputProps[value],
          error: _commonInputProps[error],
          key
        }) : INITIAL_FORM_CONFIG.inputProps) || {})
      };
      _commonInputProps._config = {
        ...formRef.current.formConfig[key],
        inputProps: undefined,
        _commonInputProps: undefined
      };
      if (INITIAL_FORM_CONFIG) {
        INITIAL_FORM_CONFIG._commonInputProps = {
          ..._commonInputProps
        };
      }
      return _commonInputProps;
    }, []);
    const setInitialFormData = useCallback(data => {
      formRef.current.lastUpdated = generateTimeStamp();
      const _values = Object.keys(formRef.current.formConfig).reduce((acc, key) => newObject(acc, {
        [key]: typeof data[key] !== 'undefined' ? data[key] || '' : formRef.current.values[key]
      }), {});
      setValues(_values);
    }, []);
    const resetForm = useCallback(() => {
      const _values = Object.entries(formConfig || {}).reduce((acc, _ref6) => {
        let [key, val = {}] = _ref6;
        return newObject(acc, {
          [key]: typeof initialValues[key] !== 'undefined' && (typeof initialValues[key] === 'function' ? initialValues[key]() : initialValues[key]) || (typeof val.default !== 'undefined' ? val.default : '')
        });
      }, {});
      setValues(_values);
      setErrors({});
    }, []);
    const getValues = useCallback(_response => {
      const _dontConvertKeysToObject = typeOf(_response) === TYPE_BOOLEAN$1 && !_response;
      if (typeOf(_response) === TYPE_OBJECT$1) {
        return Object.entries(formRef.current.formConfig).reduce((acc, _ref7) => {
          let [_key, _config = {}] = _ref7;
          return {
            ...acc,
            [_key]: Safe(_response, `.${_config.key || _key}`)
          };
        }, {});
      }
      let _value = formRef.current.values[_key];
      _value = typeof _config.payloadCallback === 'function' ? _config.payloadCallback(_value) : _config.isAllowEmpty ? _value : _value || undefined;
      if (_dontConvertKeysToObject) return Object.entries(formRef.current.formConfig).reduce((acc, _ref8) => {
        let [_key, _config = {}] = _ref8;
        return {
          ...acc,
          [_config.key || _key]: _value
        };
      }, {});
      return Object.entries(formRef.current.formConfig).reduce((acc, _ref9) => {
        let [_key, _config = {}] = _ref9;
        return updateIn(acc, (_config.key || _key).split('.'), () => _value);
      }, {});
    }, []);

    // const setResponseErrors = useCallback(_errors => {
    //   const _keyErrors = Object.entries(formRef.current.formConfig).reduce(
    //     (acc, [_key, _config = {}]) => ({
    //       ...acc,
    //       [_key]: _errors[_config.key || _key],
    //     }),
    //     {},
    //   );
    //   setValues(_keyErrors);
    // }, []);

    const setResponseErrors = useCallback(_errors => {
      const _keyErrors = Object.entries(formRef.current.formConfig).reduce((acc, _ref10) => {
        let [_key, _config = {}] = _ref10;
        return {
          ...acc,
          [_key]: Safe(_errors, `.${_config.key || _key}`)
        };
      }, {});
      setErrors(_keyErrors);
    }, []);
    const getInputProps = useCallback(function () {
      let extraProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.keys(formRef.current.formConfig).reduce((prev, key) => ({
        ...prev,
        [key]: commonInputProps(key, extraProps)
      }), {});
    }, []);
    const setValidate = useCallback(function () {
      let _config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let __config = {
        ...formRef.current.formConfig
      };
      let __errors = {
        ...formRef.current.errors
      };
      Object.entries(_config).forEach(_ref11 => {
        let [_key, _value] = _ref11;
        __config[_key]._noValidate = !_value;
        if (!_value) __errors[_key] = '';
      });
      setFormConfig(__config);
      setErrors(__errors);
    }, []);

    // const isFormChanged = useCallback(
    //   () => !isEqual(formRef.current.initialLoadValues, formRef.current.values),
    //   [],
    // );

    formRef.current.commonInputProps = commonInputProps;
    formRef.current.setInitialFormData = setInitialFormData;
    // formRef.current.validateForm = validateForm;
    formRef.current.onBlurValues = onBlurValues;
    formRef.current.onChangeValues = onChangeValues;
    formRef.current.onValidateValues = onValidateValues;
    formRef.current.validateForm = validateForm;
    formRef.current.validateObject = onValidateCustomObject;
    formRef.current.addFormConfig = onAddFormConfig;
    formRef.current.modifyFormConfig = onAddFormConfig;
    formRef.current.validateCustomForm = validateCustomForm;
    formRef.current.getValues = getValues;
    formRef.current.getInputProps = getInputProps;
    formRef.current.setResponseErrors = setResponseErrors;
    formRef.current.setKeyErrors = setResponseErrors;
    // formRef.current.lastUpdated = generateTimeStamp();
    formRef.current.setValidate = setValidate;
    formRef.current.setErrors = setErrors;
    formRef.current.resetForm = resetForm;
    formRef.current.setValues = setValues;
    // formRef.current.isFormChanged = isFormChanged;
    return {
      ...formRef.current,
      validateCustomObject: onValidateCustomObject,
      getPlatformBasedFieldValue,
      formRef: formRef.current,
      setInitialFormData,
      commonInputProps,
      onValidateValues,
      onChangeValues,
      onAddFormConfig,
      setFormConfig,
      validateValue,
      onBlurValues,
      validateForm,
      resetForm,
      setValues,
      setErrors,
      errors,
      values
    };
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

/* eslint-disable no-underscore-dangle */
const checkType$1 = (val, oldVal) => newObject(typeof val === 'function' ? val(oldVal) : val);
const useMultipleOptionsHook = function () {
  let initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const [options, _setOptions] = useState(initialValue);
  const ref = useRef({});
  ref.current.options = options;
  const setOptions = useCallback(_values => {
    ref.current.options = checkType$1(_values, ref.current.options);
    _setOptions(ref.current.options);
  }, []);
  const onChangeOptions = useCallback((key, index, value, error) => {
    if (typeOf(key) === 'object') {
      const {
        key: _key,
        index: _index,
        value: _value,
        error: _error
      } = key;
      setOptions(_val => {
        const ___val = {
          ..._val
        };
        const __val = ___val[_key].slice();
        __val[_index].value = _value;
        __val[_index].error = _error;
        ___val[_key] = __val;
        return ___val;
      });
    } else setOptions(_val => {
      const ___val = {
        ..._val
      };
      const __val = ___val[key].slice();
      __val[index].value = value;
      __val[index].error = error;
      ___val[key] = __val;
      return ___val;
    });
  }, []);
  const onDeleteOptions = useCallback(function (key, i) {
    let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    setOptions(_val => {
      const ___val = {
        ..._val
      };
      const __val = ___val[key].slice();
      if (__val.length > 1) __val.splice(i, count);
      ___val[key] = __val;
      return ___val;
    });
  }, []);
  const onDeleteMultipleOptions = useCallback(function (key) {
    let indexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    setOptions(_val => {
      const ___val = {
        ..._val
      };
      const __val = ___val[key].slice();
      __val[key] = __val.filter((_, i) => !indexes.includes(i));
      ___val[key] = __val;
      return __val;
    });
  }, []);
  const onGetValues = useCallback(key => ref.current.options[key].map(e => e.value), []);
  const findRecursiveError = useCallback(obj => Object.values(obj).some(e => typeOf(e) === 'object' ? findRecursiveError(e) : e), []);
  const onValidateValues = useCallback((key, callback, isSetError) => {
    if (Array.isArray(key)) {
      const ___val = cloneDeep(ref.current.options);
      let isError = false;
      const returnObj = key.map((_key, index) => {
        if (Array.isArray(___val[_key])) {
          const validatedValue = ___val[_key].map((e, i) => callback(e.value, i, _key));
          const error = validatedValue.map(e => e.error);
          const value = validatedValue.map(e => e.value);
          ___val[_key] = validatedValue;
          if (isSetError && index === key.length - 1) {
            setOptions(___val);
          }
          const errorLength = error.filter(e => typeOf(e) === 'object' ? findRecursiveError(e) : e).length;
          if (errorLength > 0) isError = true;
          return {
            key: _key,
            error,
            value,
            isError
          };
        }
        return {
          key
        };
      });
      return {
        isError,
        formArray: returnObj,
        formObj: returnObj.reduce((acc, curr) => ({
          ...acc,
          [curr.key]: curr
        }), {})
      };
    }
    const ___val = {
      ...ref.current.options
    };
    const validatedValue = ___val[key].map((e, i) => callback(e.value, i));
    const error = validatedValue.map(e => e.error);
    const value = validatedValue.map(e => e.value);
    if (isSetError) {
      ___val[key] = validatedValue;
      setOptions(___val);
    }
    const errorLength = error.filter(e => typeOf(e) === 'object' ? findRecursiveError(e) : e).length;
    return {
      error,
      value,
      isError: errorLength > 0,
      errorCount: errorLength
    };
  }, []);
  const onAddOptions = useCallback(function (key, value, index) {
    let count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    setOptions(_val => {
      const ___val = {
        ..._val
      };
      let __val = ___val[key].slice();
      if (typeof index === 'number') {
        __val.splice(index, 0, ...Array(count).fill(null).map(() => value || {}));
      } else if (count > 1) __val = __val.concat(Array(count).fill(null).map(() => value || {}));else __val.push(value || {});
      ___val[key] = __val;
      return ___val;
    });
  }, []);
  const onChangeOrderForm = useCallback((key, currentIndex, index) => {
    setOptions(_val => {
      const ___val = {
        ..._val
      };
      const __val = ___val[key].slice();
      const __value = __val[currentIndex];
      if (typeof index === 'number' && typeof currentIndex === 'number') {
        __val.splice(currentIndex, 1);
        __val.splice(index, 0, __value);
        ___val[key] = __val;
      }
      return ___val;
    });
  }, []);
  const onResetForm = useCallback(resetValue => {
    if (resetValue) setOptions(() => newObject({}, resetValue));
  }, []);
  const onResetValue = useCallback(resetValue => {
    if (resetValue) setOptions(_options => newObject(_options, resetValue));else setOptions(initialValue);
  }, []);
  const onAddForm = useCallback(value => {
    if (value) setOptions(_options => newObject(_options, value));
  }, []);
  const onDeleteMultipleForm = useCallback(function () {
    let deleteKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (deleteKey.length > 0) setOptions(_options => {
      const __options = {
        ..._options
      };
      deleteKey.forEach(key => {
        delete __options[key];
      });
      return __options;
    });
  }, []);
  const onDeleteForm = useCallback(function () {
    let deleteKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    setOptions(_options => {
      const __options = {
        ..._options
      };
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

var FormContext = /*#__PURE__*/createContext(null);

var form = (_ref => {
  let {
    children,
    inputProps,
    idKey,
    onSubmit
  } = _ref;
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: {
      inputProps,
      idKey,
      onSubmit
    }
  }, children);
});

const ID_KEY = 'id';
var hook = (function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    inputProps = {},
    idKey,
    onSubmit
  } = useContext(FormContext) || {};
  return {
    ...(onSubmit ? {
      onSubmit
    } : {}),
    ...(inputProps[props[idKey || ID_KEY]] || {}),
    ...props
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
var injectReducer = ((_ref, createReducer) => {
  let {
    key,
    reducer
  } = _ref;
  return WrappedComponent => {
    class ReducerInjector extends React.Component {
      constructor(props, context) {
        super(props, context);
        getInjectors(context.store).injectReducer(key, reducer, createReducer);
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
    if (inject) getInjectors(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
const DAEMON = '@@saga-injector/daemon';
const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];
const checkKey$1 = key => invariant(key && typeOf(key) === 'string', '(app/utils...) injectSaga: Expected `key` to be a non empty string');
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
    checkKey$1(key);
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
    checkKey$1(key);
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
        this.injectors = getInjectors$1(context.store);
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
    const injectors = getInjectors$1(context.store);
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

export { CustomError, form as Form, FormContext, validateForm as FormValidator, Global as GlobalEventEmitter, Safe, cloneObject, commonConstants, deleteIn, generateTimeStamp, getData, getIn, globals as globalState, injectReducer, injectSaga, newObject, objectEquals, setIn, toCapitalize, toPromise, toPromiseAllFunction, toPromiseFunction, typeOf, updateIn, useActionsHook as useActions, useApiQuery, useCancelAllRunningApiCalls, useFormValidationHandlerHook, useGlobalValueHook as useGlobalStateHook, useInjectReducer, useInjectSaga, useMultipleOptionsHook, useMutateReducer, useMutation, hook as useProps, useQuery, useRefetchCachedApi, useResetOnlyApiEndPointsState, useResetState, useStaleRefresh };
