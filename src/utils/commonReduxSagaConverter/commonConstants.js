/* eslint-disable no-underscore-dangle */
const _FOR_INTERNAL_USE_ONLY_ = `@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@`;
const _USE_TYPE_ = `@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@`;

export const GET_INITIAL_PROPS_DEFAULT = 'getInitialProps';

export const API_LOADING_STATUS = 'app/API_LOADING_STATUS';

export const TAKE_EVERY = 'every';

export const REDUCER_BASE_PATH = 'app/containers/';

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

export const commonConstants = {
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
