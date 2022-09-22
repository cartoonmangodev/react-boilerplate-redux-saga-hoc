/* eslint-disable no-underscore-dangle */
const _FOR_INTERNAL_USE_ONLY_ = `@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@`;
const _USE_TYPE_ = `@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@`;

export const GET_INITIAL_PROPS_DEFAULT = 'getInitialProps';

export const API_LOADING_STATUS = 'app/API_LOADING_STATUS';

export const TAKE_EVERY = 'every';

export const REDUCER_BASE_PATH = 'app/containers/';

export const IS_DEBOUNCE_API_CALL = 'is_debounce_api_call';
export const DEBOUNCE_API_CALL_DELAY_IN_MS = 'debounce_api_call_delay';

export const ON_CANCEL_ERROR = 'API_CANCEL_ERROR';
export const ON_ERROR = 'ERROR';
export const ON_SUCCESS = 'SUCCESS';
export const ON_FINALLY = 'FINALLY';
export const ON_CANCEL = 'CANCEL';
export const ON_REQUEST = 'REQUEST';
export const ON_LOADING = 'LOADING';
export const ON_UNMOUNT = 'UNMOUNT';
export const ON_TOAST = 'TOAST';

export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const CALL = 'CALL';
export const CANCEL = 'CANCEL';
export const CUSTOM = 'CUSTOM_TASK';

export const INFINITE_DATA_HANDLER = 'Infinite-Handler';
export const DATA_HANDLER = 'Data-Handler';
export const DELETE_DATA_HANDLER = 'Delete-Handler';
export const UPDATE_DATA_HANDLER = 'Update-Handler';
export const UPDATE_DATA_KEY_HANDLER = 'Update-Key-Handler';
export const DELETE_DATA_KEY_HANDLER = 'Delete-Key-Handler';
export const TOGGLE_DATA_KEY_HANDLER = 'Toggle-Key-Handler';
export const SPLICE_DATA_HANDLER = 'Splice-Data-Handler';
export const CALLBACK_HANDLER = 'Callback-Handler';
export const RESET_HANDLER = 'Reset-Handler';
export const TOAST_HANDLER = 'Toast-Handler';
export const ERROR_HANDLER = 'Error-Handler';
export const LOADER_HANDLER = 'Loading-Handler';
export const DONT_UPDATE_DATA_HANDLER = "Don't-Update-Data-Handler";
export const CUSTOM_HANDLER = 'Custom-Handler';

export const TYPE_NULL = 'null';
export const TYPE_UNDEFINED = 'undefined';
export const TYPE_STRING = 'string';
export const TYPE_ARRAY = 'array';
export const TYPE_BOOLEAN = 'boolean';
export const TYPE_OBJECT = 'object';
export const TYPE_FUNCTION = 'function';
export const TYPE_ERROR = 'error';
export const TYPE_SYMBOL = 'symbol';
export const TYPE_GENERATOR_FUNCTION = 'generatorFunction';

export const FOR_INTERNAL_USE_ONLY = _FOR_INTERNAL_USE_ONLY_;
export const USE_TYPE = _USE_TYPE_;

const HANDLERS = 'handlers';
const NEXT_JS = 'nextJS';
const CREATE_REDUCER = 'createReducer';
const USE_HOOK = 'useHook';
const USE_HOC_HOOK = 'useHocHook';
const HOOK_WITH_HOC = 'hookWithHoc';
const ALLOW_MAP_STATE_TO_PROPS = 'mapStateToProps';
const GET_INITIAL_PROPS_KEY = 'getInitialPropsKey';
const IS_DEVELOPMENT = 'isDevelopment';

export const HOC_MAIN_CONFIG_KEY = {
  HANDLERS,
  NEXT_JS,
  CREATE_REDUCER,
  USE_HOOK,
  USE_HOC_HOOK,
  HOOK_WITH_HOC,
  ALLOW_MAP_STATE_TO_PROPS,
  GET_INITIAL_PROPS_KEY,
  IS_DEVELOPMENT,
  USE_TYPE,
};

export const HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT = {
  [HANDLERS]: [],
  [NEXT_JS]: false,
  [USE_HOOK]: false,
  [USE_HOC_HOOK]: true,
  [HOOK_WITH_HOC]: false,
  [ALLOW_MAP_STATE_TO_PROPS]: false,
  [GET_INITIAL_PROPS_KEY]: null,
  [IS_DEVELOPMENT]: false,
  [USE_TYPE]: FOR_INTERNAL_USE_ONLY,
};
export const HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT = {
  [HANDLERS]: [],
  [NEXT_JS]: true,
  [USE_HOOK]: false,
  [USE_HOC_HOOK]: false,
  [HOOK_WITH_HOC]: false,
  [ALLOW_MAP_STATE_TO_PROPS]: false,
  [GET_INITIAL_PROPS_KEY]: GET_INITIAL_PROPS_DEFAULT,
  [IS_DEVELOPMENT]: false,
  [USE_TYPE]: FOR_INTERNAL_USE_ONLY,
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

export const HOC_INITIAL_CONFIG_KEY = {
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
  REDUCER_NAME,
};
const COMMON_TASKS = {
  TASK_NAME: 'name',
  SUB_KEYS_ARRAY: 'subKey',
  IS_CLEAR_PREVIOUS_DATA_ON_SUCCESS: 'clearData',
  IS_CLEAR_PREVIOUS_DATA_ON_API_START: 'clearDataOnStart',
};
const DONT_UPDATE_RESPONSE_DATA = 'dontUpdateResponseData';
const UPDATE_CALLBACK = 'updateCallback';
const ID_REFERENCE_KEY = 'key';
const IDS = 'id';
const API_TASK_CONFIG_KEYS = {
  TASK: {
    KEY: 'task',
    INFINITE_DATA_HANDLER: {
      ...COMMON_TASKS,
      LIMIT: 'limit',
      IS_APPEND_DATA_ON_TOP: 'isAppendTop',
      SET_INFINITE_END_KEY_TRUE_OR_FALSE: 'setInfiniteEnd',
      UPDATE_CALLBACK,
    },
    DATA_HANDLER: { ...COMMON_TASKS, UPDATE_CALLBACK },
    DELETE_DATA_HANDLER: { ...COMMON_TASKS, ID_REFERENCE_KEY, IDS },
    UPDATE_DATA_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA,
    },
    UPDATE_DATA_KEY_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA,
    },
    DELETE_DATA_KEY_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      DELETE_KEYS_ARRAY: 'deleteKey',
    },
    TOGGLE_DATA_KEY_HANDLER: {
      ...COMMON_TASKS,
      ID_REFERENCE_KEY,
      IDS,
      UPDATE_CALLBACK,
      TOGGLE_KEYS_ARRAY: 'toggleKey',
    },
    SPLICE_DATA_HANDLER: {
      ...COMMON_TASKS,
      UPDATE_CALLBACK,
      SPLICE_VALUE_ARRAY: 'spliceKey',
    },
    RESET_HANDLER: { TASK_NAME: COMMON_TASKS.TASK_NAME },
    CALLBACK_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      CALLBACK_FUNCTION: 'callback',
    },
    TOAST_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      TOAST_OBJECT: 'toast',
    },
    ERROR_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      ERROR_OBJECT: 'error',
      IS_ERROR: 'isError',
    },
    LOADER_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      IS_LOADING: 'loader',
    },
    DONT_UPDATE_DATA_HANDLER: { ...COMMON_TASKS },
  },
  TASKS: 'tasks',
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
    AXIOS_CONFIG: 'axiosConfig',
    USE_CACHE: 'useCache',
    IS_ERROR_DATA_HANDLING: 'errorDataHandling',
    IS_CLEAR_DATA_ON_ERROR: 'clearDataOnError',
    IS_POLLING: 'polling',
    IS_ERROR_PARSER: 'errorParser',
    DEFAULT_ERROR_PARSER_FUNCTION: 'defaultErrorParser',
    POLLING_DELAY_COUNT_IN_MILLISECONDS: 'delay',
    MAX_RETRY_COUNT: 'retry',
    POLLING_MAX_COUNT: 'pollingCount',
    START_POLLING_AFTER_DELAY: 'callAfterDelay',
  },
  CALLBACK: {
    KEY: 'callback',
    UPDATE_STATE_CALLBACK: 'updateStateCallback',
    SUCCESS_CALLBACK: 'successCallback',
    ERROR_CALLBACK: 'errorCallback',
    CALLBACK_AFTER_500_MILLISECONDS: 'logoutCallback',
    FINAL_CALLBACK: 'finalCallback',
    POLLING_CALLBACK: 'pollingCallback',
    CANCEL_CALLBACK: 'cancelCallback',
    UPDATE_CALLBACK,
  },
};
const USE_QUERY_REDUCER_CONFIG_KEYS = {
  PARENT_KEY: 'key',
  REDUCER_KEY: 'key',
  REQUIRED_DATA_KEY: 'requiredKey',
  FILTER_ARRAY: 'filter',
  QUERY_DATA_STRING_OR_ARRAY: 'initialLoaderqueryState',
  INITIAL_LOADER_STATE: 'initialLoaderState',
  GET_DEFAULT_DATA_FORMAT: 'defaultDataFormat',
  DEFAULT_DATA_OR_FORMAT: 'default',
};
const USE_QUERY_CONFIG_KEYS = {
  REDUCER_NAME: 'reducerName',
  REDUCER_KEYS_ARRAY_OR_OBJECT_OR_STRING: USE_QUERY_REDUCER_CONFIG_KEYS,
  REDUCER_KEYS_CONFIG: 'config',
  CALLBACK_FUNCTION_RETURN_DATA: 'callback',
  TRIGGER_AFTER_CALLBACK_NO_DATA_RETURN: 'callbackSuccess',
  REFRESH_KEY: 'refreshKey',
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
  SAGA_EFFECT: 'effect',
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
  SAGA_EFFECT: 'latest',
};

export const commonConstants = {
  API_END_POINTS_CONFIG_DEFAULT_VALUE,
  API_END_POINTS_CONFIG_KEYS,
  USE_QUERY_CONFIG_KEYS,
  API_TASK_CONFIG_KEYS,
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
  TYPE_GENERATOR_FUNCTION,
};
