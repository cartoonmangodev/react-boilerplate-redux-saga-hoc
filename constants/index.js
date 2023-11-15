"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const _FOR_INTERNAL_USE_ONLY_="@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@",_USE_TYPE_="@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@",GET_INITIAL_PROPS_DEFAULT="getInitialProps",TAKE_EVERY="every",IS_DEBOUNCE_API_CALL="is_debounce_api_call",DEBOUNCE_API_CALL_DELAY_IN_MS="debounce_api_call_delay",ON_CANCEL_ERROR="API_CANCEL_ERROR",ON_ERROR="ERROR",ON_SUCCESS="SUCCESS",ON_FINALLY="FINALLY",ON_CANCEL="CANCEL",ON_REQUEST="REQUEST",ON_LOADING="LOADING",ON_UNMOUNT="UNMOUNT",ON_TOAST="TOAST",ERROR="ERROR",SUCCESS="SUCCESS",CALL="CALL",CANCEL="CANCEL",CUSTOM="CUSTOM_TASK",INFINITE_DATA_HANDLER="Infinite-Handler",DATA_HANDLER="Data-Handler",DELETE_DATA_HANDLER="Delete-Handler",UPDATE_DATA_HANDLER="Update-Handler",UPDATE_DATA_KEY_HANDLER="Update-Key-Handler",DELETE_DATA_KEY_HANDLER="Delete-Key-Handler",TOGGLE_DATA_KEY_HANDLER="Toggle-Key-Handler",SPLICE_DATA_HANDLER="Splice-Data-Handler",CALLBACK_HANDLER="Callback-Handler",RESET_HANDLER="Reset-Handler",TOAST_HANDLER="Toast-Handler",ERROR_HANDLER="Error-Handler",LOADER_HANDLER="Loading-Handler",DONT_UPDATE_DATA_HANDLER="Don't-Update-Data-Handler",TYPE_NULL="null",TYPE_UNDEFINED="undefined",TYPE_STRING="string",TYPE_ARRAY="array",TYPE_BOOLEAN="boolean",TYPE_OBJECT="object",TYPE_FUNCTION="function",TYPE_ERROR="error",TYPE_SYMBOL="symbol",TYPE_GENERATOR_FUNCTION="generatorFunction",FOR_INTERNAL_USE_ONLY=_FOR_INTERNAL_USE_ONLY_,USE_TYPE=_USE_TYPE_,HANDLERS="handlers",NEXT_JS="nextJS",CREATE_REDUCER="createReducer",USE_HOOK="useHook",USE_HOC_HOOK="useHocHook",HOOK_WITH_HOC="hookWithHoc",ALLOW_MAP_STATE_TO_PROPS="mapStateToProps",GET_INITIAL_PROPS_KEY="getInitialPropsKey",IS_DEVELOPMENT="isDevelopment",API_END_POINTS="apiEndPoints",INITIAL_STATE="initialState",GET_DEFAULT_CONFIG="getDefaultConfig",DONT_RESET_REDUCER_KEYS="dontReset",IS_MOBILE="isMobile",SAGA="saga",SAGA_CONSTANT="constantSaga",REDUCER_CONSTANT="constantReducer",REDUCER="reducer",AXIOS_INTERCEPTORS="axiosInterceptors",REDUCER_NAME="name",HOC_MAIN_CONFIG_KEY={HANDLERS:HANDLERS,NEXT_JS:NEXT_JS,CREATE_REDUCER:CREATE_REDUCER,USE_HOOK:USE_HOOK,USE_HOC_HOOK:"useHocHook",HOOK_WITH_HOC:"hookWithHoc",ALLOW_MAP_STATE_TO_PROPS:"mapStateToProps",GET_INITIAL_PROPS_KEY:"getInitialPropsKey",IS_DEVELOPMENT:IS_DEVELOPMENT,USE_TYPE:USE_TYPE},HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT={[HANDLERS]:[],[NEXT_JS]:!1,[USE_HOOK]:!1,useHocHook:!0,hookWithHoc:!1,mapStateToProps:!1,getInitialPropsKey:null,[IS_DEVELOPMENT]:!1,[USE_TYPE]:FOR_INTERNAL_USE_ONLY,getDefaultConfig:!1},HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT={[HANDLERS]:[],[NEXT_JS]:!0,[USE_HOOK]:!1,useHocHook:!1,hookWithHoc:!1,mapStateToProps:!1,getInitialPropsKey:"getInitialProps",[IS_DEVELOPMENT]:!1,[USE_TYPE]:FOR_INTERNAL_USE_ONLY,getDefaultConfig:!1},HOC_INITIAL_CONFIG_KEY={API_END_POINTS:"apiEndPoints",INITIAL_STATE:INITIAL_STATE,GET_DEFAULT_CONFIG:"getDefaultConfig",DONT_RESET_REDUCER_KEYS:"dontReset",IS_MOBILE:IS_MOBILE,SAGA:SAGA,SAGA_CONSTANT:SAGA_CONSTANT,REDUCER_CONSTANT:REDUCER_CONSTANT,REDUCER:REDUCER,AXIOS_INTERCEPTORS:AXIOS_INTERCEPTORS,USE_HOOK:USE_HOOK,REDUCER_NAME:"name"},COMMON_TASKS={TASK_NAME:"name",SUB_KEYS_ARRAY:"subKey",IS_CLEAR_PREVIOUS_DATA_ON_SUCCESS:"clearData",IS_CLEAR_PREVIOUS_DATA_ON_API_START:"clearDataOnStart"},DONT_UPDATE_RESPONSE_DATA="dontUpdateResponseData",DONT_UPDATE_SUCCESS_DATA="dontUpdateSuccessData",UPDATE_CALLBACK="updateCallback",ID_REFERENCE_KEY="key",IDS="id",API_TASK_CONFIG_KEYS={TASKS:"tasks",TASK:{KEY:"task",COMMON_TASK_KEYS:COMMON_TASKS,INFINITE_DATA_HANDLER:{...COMMON_TASKS,LIMIT:"limit",IS_APPEND_DATA_ON_TOP:"isAppendTop",SET_INFINITE_END_KEY_TRUE_OR_FALSE:"setInfiniteEnd",UPDATE_CALLBACK:UPDATE_CALLBACK},DATA_HANDLER:{...COMMON_TASKS,UPDATE_CALLBACK:UPDATE_CALLBACK},DELETE_DATA_HANDLER:{...COMMON_TASKS,ID_REFERENCE_KEY:"key",IDS:IDS},UPDATE_DATA_HANDLER:{...COMMON_TASKS,ID_REFERENCE_KEY:"key",IDS:IDS,UPDATE_CALLBACK:UPDATE_CALLBACK,DONT_UPDATE_RESPONSE_DATA:"dontUpdateResponseData",DONT_UPDATE_SUCCESS_DATA:"dontUpdateSuccessData"},UPDATE_DATA_KEY_HANDLER:{...COMMON_TASKS,ID_REFERENCE_KEY:"key",IDS:IDS,UPDATE_CALLBACK:UPDATE_CALLBACK,DONT_UPDATE_RESPONSE_DATA:"dontUpdateResponseData",DONT_UPDATE_SUCCESS_DATA:"dontUpdateSuccessData"},DELETE_DATA_KEY_HANDLER:{...COMMON_TASKS,ID_REFERENCE_KEY:"key",IDS:IDS,UPDATE_CALLBACK:UPDATE_CALLBACK,DELETE_KEYS_ARRAY:"deleteKey"},TOGGLE_DATA_KEY_HANDLER:{...COMMON_TASKS,ID_REFERENCE_KEY:"key",IDS:IDS,UPDATE_CALLBACK:UPDATE_CALLBACK,TOGGLE_KEYS_ARRAY:"toggleKey"},SPLICE_DATA_HANDLER:{...COMMON_TASKS,UPDATE_CALLBACK:UPDATE_CALLBACK,SPLICE_VALUE_ARRAY:"spliceKey"},RESET_HANDLER:{TASK_NAME:COMMON_TASKS.TASK_NAME},CALLBACK_HANDLER:{TASK_NAME:COMMON_TASKS.TASK_NAME,CALLBACK_FUNCTION:"callback"},TOAST_HANDLER:{TASK_NAME:COMMON_TASKS.TASK_NAME,TOAST_OBJECT:"toast"},ERROR_HANDLER:{TASK_NAME:COMMON_TASKS.TASK_NAME,ERROR_OBJECT:"error",IS_ERROR:"isError"},LOADER_HANDLER:{TASK_NAME:COMMON_TASKS.TASK_NAME,IS_LOADING:"loader"},DONT_UPDATE_DATA_HANDLER:{...COMMON_TASKS}},FILTER_ARRAY:"filter",DONT_UPDATE_REUCER:"dontUpdateReducer",EXECUTE_UPDATE_STATE_CALLBACK_ON_ERROR:"excuteUpdateStateCallbackOnError",UPDATE_STATE_DATA_REDUCER_KEYS:"updateDataReducerKey",SET_PROXY_FOR:"proxyFor",REQUEST:{KEY:"request",ASYNC_FUNCTION:"asyncFunction",ASYNC_FUNCTION_PARAMS_ARRAY:"asyncFunctionParams",PAYLOAD:"payload",PARAMS:"params",QUERY:"query",DELAY_FUNCTION:"delayFunction",DONT_UPDATE_REDUCER_ON_SUCCESS:"dontUpdateReducerOnSucess",DONT_UPDATE_REDUCER_ON_ERROR:"dontUpdateReducerOnError",AXIOS_INTERCEPTOR:"axios",PARAM_SERIALIZER:"paramsSerializer",API_CANCEL_KEY:"cancelKey",ON_CANCEL_TASK:"onCancelTask",AXIOS_CONFIG:"axiosConfig",API_QUERY_CACHE_KEY:"key",USE_CACHE_DATA:"useCache",IS_ERROR_DATA_HANDLING:"errorDataHandling",IS_CLEAR_DATA_ON_ERROR:"clearDataOnError",IS_POLLING:"polling",IS_ERROR_PARSER:"errorParser",DEFAULT_ERROR_PARSER_FUNCTION:"defaultErrorParser",POLLING_DELAY_COUNT_IN_MS:"delay",MAX_RETRY_COUNT:"retry",POLLING_MAX_COUNT:"pollingCount",START_POLLING_AFTER_DELAY:"callAfterDelay"},CALLBACK:{KEY:"callback",UPDATE_STATE_CALLBACK:"updateStateCallback",SUCCESS_CALLBACK:"successCallback",ERROR_CALLBACK:"errorCallback",SUCCESS_CALLBACK_EXECUTE_AFTER_100_MILLISECONDS:"logoutCallback",FINAL_CALLBACK:"finalCallback",POLLING_CALLBACK:"pollingCallback",CANCEL_CALLBACK:"cancelCallback",UPDATE_CALLBACK:UPDATE_CALLBACK}},USE_QUERY_REDUCER_CONFIG_KEYS={PARENT_KEY:"key",REDUCER_KEY:"key",REQUIRED_DATA_KEY:"requiredKey",FILTER_ARRAY:"filter",QUERY_DATA_STRING_OR_ARRAY:"initialLoaderqueryState",INITIAL_LOADER_STATE:"initialLoaderState",GET_DEFAULT_DATA_FORMAT:"defaultDataFormat",DEFAULT_DATA_OR_FORMAT:"default"},USE_QUERY_CONFIG_KEYS={REDUCER_NAME:"reducerName",REDUCER_KEYS_ARRAY_OR_OBJECT_OR_STRING:USE_QUERY_REDUCER_CONFIG_KEYS,REDUCER_KEYS_CONFIG:"config",CALLBACK_FUNCTION_RETURN_DATA:"callback",TRIGGER_AFTER_CALLBACK_NO_DATA_RETURN:"callbackSuccess",REFRESH_KEY:"refreshKey"},API_END_POINTS_CONFIG_KEYS={API_URL:"url",AXIOS_INTERCEPTORS:"axios",API_METHOD:"method",API_RESPONSE_SUCCESS_STATUS_CODE_KEY:"responseStatusCodeKey",API_RESPONSE_SUCCESS_STATUS_CODES:"responseStatusCode",API_RESPONSE_SUCCESS_MESSAGE_KEY:"responseMessageKey",API_RESPONSE_SUCCESS_DATA_KEY:"responseDataKey",API_RESPONSE_ERROR_DATA_KEY:"errorDataKey",API_RESPONSE_ERROR_STATUS_CODE_KEY:"errorStatusKey",API_RESPONSE_ERROR_MESSAGE_KEY:"errorMessageKey",API_ERROR_HANDLER_STATUS_CODES:"errorHandlerStatusCode",DEBOUNCE_API_CALL_DELAY_IN_MS:"debounce_api_call_delay",IS_DEBOUNCE_API_CALL:IS_DEBOUNCE_API_CALL,SAGA_EFFECT:"effect"},API_END_POINTS_CONFIG_DEFAULT_VALUE={API_URL:void 0,AXIOS_INTERCEPTORS:void 0,API_METHOD:"GET",API_RESPONSE_SUCCESS_STATUS_CODE_KEY:"",API_RESPONSE_SUCCESS_STATUS_CODES:[],API_RESPONSE_SUCCESS_MESSAGE_KEY:"",API_RESPONSE_SUCCESS_DATA_KEY:"",API_RESPONSE_ERROR_DATA_KEY:"error",API_RESPONSE_ERROR_STATUS_CODE_KEY:"",API_RESPONSE_ERROR_MESSAGE_KEY:"",API_ERROR_HANDLER_STATUS_CODES:[],SAGA_EFFECT:"latest"},API_METHODS={GET:"GET",REQUEST:"REQUEST",DELETE:"DELETE",HEAD:"HEAD",OPTIONS:"OPTIONS",POST:"POST",PUT:"PUT",PATCH:"PATCH"},ENV={DEVELOPMENT:"development",PRODUCTION:"production"},hocConstants={HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT:HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT,HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT:HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT,HOC_INITIAL_CONFIG_KEY:HOC_INITIAL_CONFIG_KEY,HOC_MAIN_CONFIG_KEY:HOC_MAIN_CONFIG_KEY,FOR_INTERNAL_USE_ONLY:FOR_INTERNAL_USE_ONLY,USE_TYPE:USE_TYPE,API_METHODS:API_METHODS,ENV:ENV},commonConstants={TAKE_EVERY:"every",API_END_POINTS_CONFIG_DEFAULT_VALUE:API_END_POINTS_CONFIG_DEFAULT_VALUE,API_END_POINTS_CONFIG_KEYS:API_END_POINTS_CONFIG_KEYS,USE_QUERY_CONFIG_KEYS:USE_QUERY_CONFIG_KEYS,API_TASK_CONFIG_KEYS:API_TASK_CONFIG_KEYS,ENVIRONMENT_TYPE:ENV,INFINITE_DATA_HANDLER:"Infinite-Handler",DATA_HANDLER:DATA_HANDLER,DELETE_DATA_HANDLER:"Delete-Handler",UPDATE_DATA_HANDLER:"Update-Handler",UPDATE_DATA_KEY_HANDLER:"Update-Key-Handler",DELETE_DATA_KEY_HANDLER:"Delete-Key-Handler",TOGGLE_DATA_KEY_HANDLER:"Toggle-Key-Handler",SPLICE_DATA_HANDLER:SPLICE_DATA_HANDLER,RESET_HANDLER:RESET_HANDLER,CALLBACK_HANDLER:CALLBACK_HANDLER,TOAST_HANDLER:TOAST_HANDLER,ERROR_HANDLER:ERROR_HANDLER,LOADER_HANDLER:LOADER_HANDLER,DONT_UPDATE_DATA_HANDLER:DONT_UPDATE_DATA_HANDLER,ON_CANCEL_ERROR:ON_CANCEL_ERROR,ON_ERROR:"ERROR",ON_SUCCESS:"SUCCESS",ON_FINALLY:"FINALLY",ON_CANCEL:"CANCEL",ON_REQUEST:"REQUEST",ON_LOADING:"LOADING",ON_UNMOUNT:"UNMOUNT",ON_TOAST:"TOAST",ERROR:ERROR,SUCCESS:SUCCESS,CALL:CALL,CANCEL:CANCEL,CUSTOM:CUSTOM,TYPE_NULL:"null",TYPE_UNDEFINED:"undefined",TYPE_STRING:"string",TYPE_ARRAY:"array",TYPE_BOOLEAN:"boolean",TYPE_OBJECT:"object",TYPE_FUNCTION:"function",TYPE_ERROR:"error",TYPE_SYMBOL:"symbol",TYPE_GENERATOR_FUNCTION:"generatorFunction"},{API_END_POINTS_CONFIG_DEFAULT_VALUE:API_END_POINTS_CONFIG_DEFAULT_VALUE$1,API_END_POINTS_CONFIG_KEYS:API_END_POINTS_CONFIG_KEYS$1,USE_QUERY_CONFIG_KEYS:USE_QUERY_CONFIG_KEYS$1,API_TASK_CONFIG_KEYS:API_TASK_CONFIG_KEYS$1,INFINITE_DATA_HANDLER:INFINITE_DATA_HANDLER$1,DATA_HANDLER:DATA_HANDLER$1,DELETE_DATA_HANDLER:DELETE_DATA_HANDLER$1,UPDATE_DATA_HANDLER:UPDATE_DATA_HANDLER$1,UPDATE_DATA_KEY_HANDLER:UPDATE_DATA_KEY_HANDLER$1,DELETE_DATA_KEY_HANDLER:DELETE_DATA_KEY_HANDLER$1,TOGGLE_DATA_KEY_HANDLER:TOGGLE_DATA_KEY_HANDLER$1,SPLICE_DATA_HANDLER:SPLICE_DATA_HANDLER$1,RESET_HANDLER:RESET_HANDLER$1,CALLBACK_HANDLER:CALLBACK_HANDLER$1,TOAST_HANDLER:TOAST_HANDLER$1,ERROR_HANDLER:ERROR_HANDLER$1,LOADER_HANDLER:LOADER_HANDLER$1,DONT_UPDATE_DATA_HANDLER:DONT_UPDATE_DATA_HANDLER$1,ON_CANCEL_ERROR:ON_CANCEL_ERROR$1,ON_ERROR:ON_ERROR$1,ON_SUCCESS:ON_SUCCESS$1,ON_FINALLY:ON_FINALLY$1,ON_CANCEL:ON_CANCEL$1,ON_REQUEST:ON_REQUEST$1,ON_LOADING:ON_LOADING$1,ON_UNMOUNT:ON_UNMOUNT$1,ON_TOAST:ON_TOAST$1,ERROR:ERROR$1,SUCCESS:SUCCESS$1,CALL:CALL$1,CANCEL:CANCEL$1,CUSTOM:CUSTOM$1,TYPE_NULL:TYPE_NULL$1,TYPE_UNDEFINED:TYPE_UNDEFINED$1,TYPE_STRING:TYPE_STRING$1,TYPE_ARRAY:TYPE_ARRAY$1,TYPE_BOOLEAN:TYPE_BOOLEAN$1,TYPE_OBJECT:TYPE_OBJECT$1,TYPE_FUNCTION:TYPE_FUNCTION$1,TYPE_ERROR:TYPE_ERROR$1,TYPE_SYMBOL:TYPE_SYMBOL$1,TYPE_GENERATOR_FUNCTION:TYPE_GENERATOR_FUNCTION$1,TAKE_EVERY:TAKE_EVERY$1}=commonConstants;exports.API_END_POINTS_CONFIG_DEFAULT_VALUE=API_END_POINTS_CONFIG_DEFAULT_VALUE$1,exports.API_END_POINTS_CONFIG_KEYS=API_END_POINTS_CONFIG_KEYS$1,exports.API_METHODS=API_METHODS,exports.API_TASK_CONFIG_KEYS=API_TASK_CONFIG_KEYS$1,exports.CALL=CALL$1,exports.CALLBACK_HANDLER=CALLBACK_HANDLER$1,exports.CANCEL=CANCEL$1,exports.CUSTOM=CUSTOM$1,exports.DATA_HANDLER=DATA_HANDLER$1,exports.DELETE_DATA_HANDLER=DELETE_DATA_HANDLER$1,exports.DELETE_DATA_KEY_HANDLER=DELETE_DATA_KEY_HANDLER$1,exports.DONT_UPDATE_DATA_HANDLER=DONT_UPDATE_DATA_HANDLER$1,exports.ENV=ENV,exports.ERROR=ERROR$1,exports.ERROR_HANDLER=ERROR_HANDLER$1,exports.FOR_INTERNAL_USE_ONLY=FOR_INTERNAL_USE_ONLY,exports.HOC_INITIAL_CONFIG_KEY=HOC_INITIAL_CONFIG_KEY,exports.HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT=HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT,exports.HOC_MAIN_CONFIG_KEY=HOC_MAIN_CONFIG_KEY,exports.HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT=HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT,exports.INFINITE_DATA_HANDLER=INFINITE_DATA_HANDLER$1,exports.LOADER_HANDLER=LOADER_HANDLER$1,exports.ON_CANCEL=ON_CANCEL$1,exports.ON_CANCEL_ERROR=ON_CANCEL_ERROR$1,exports.ON_ERROR=ON_ERROR$1,exports.ON_FINALLY=ON_FINALLY$1,exports.ON_LOADING=ON_LOADING$1,exports.ON_REQUEST=ON_REQUEST$1,exports.ON_SUCCESS=ON_SUCCESS$1,exports.ON_TOAST=ON_TOAST$1,exports.ON_UNMOUNT=ON_UNMOUNT$1,exports.RESET_HANDLER=RESET_HANDLER$1,exports.SPLICE_DATA_HANDLER=SPLICE_DATA_HANDLER$1,exports.SUCCESS=SUCCESS$1,exports.TAKE_EVERY=TAKE_EVERY$1,exports.TOAST_HANDLER=TOAST_HANDLER$1,exports.TOGGLE_DATA_KEY_HANDLER=TOGGLE_DATA_KEY_HANDLER$1,exports.TYPE_ARRAY=TYPE_ARRAY$1,exports.TYPE_BOOLEAN=TYPE_BOOLEAN$1,exports.TYPE_ERROR=TYPE_ERROR$1,exports.TYPE_FUNCTION=TYPE_FUNCTION$1,exports.TYPE_GENERATOR_FUNCTION=TYPE_GENERATOR_FUNCTION$1,exports.TYPE_NULL=TYPE_NULL$1,exports.TYPE_OBJECT=TYPE_OBJECT$1,exports.TYPE_STRING=TYPE_STRING$1,exports.TYPE_SYMBOL=TYPE_SYMBOL$1,exports.TYPE_UNDEFINED=TYPE_UNDEFINED$1,exports.UPDATE_DATA_HANDLER=UPDATE_DATA_HANDLER$1,exports.UPDATE_DATA_KEY_HANDLER=UPDATE_DATA_KEY_HANDLER$1,exports.USE_QUERY_CONFIG_KEYS=USE_QUERY_CONFIG_KEYS$1,exports.USE_TYPE=USE_TYPE,exports.commonConstants=commonConstants,exports.hocConstants=hocConstants;
