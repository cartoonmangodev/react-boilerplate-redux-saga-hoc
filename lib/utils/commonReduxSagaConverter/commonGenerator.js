"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _queryString = _interopRequireDefault(require("query-string"));

var _effects = require("redux-saga/effects");

var _invariant = _interopRequireDefault(require("invariant"));

var constants = _interopRequireWildcard(require("./commonConstants"));

var _index = require("../index");

var _axios = _interopRequireDefault(require("../../config/axios"));

var _helpers = require("../helpers");

var commonActions = _interopRequireWildcard(require("./commonActions"));

var _customError = _interopRequireDefault(require("../customError"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var headers = '';

function* loaderGenerator(_ref) {
  var {
    type,
    commonData
  } = _ref;
  yield (0, _effects.put)(commonActions.apiLoadingStatus({
    type,
    payload: commonData,
    status: false
  }));
}

var delay = ms => new Promise(resolve => setTimeout(resolve, ms));

var checkKey = (key, name, dataType) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

function _default(_ref2) {
  var {
    actionType = {},
    requestResponseHandler,
    axiosInterceptors
  } = _ref2;

  function* commonGenerator(_ref3) {
    var {
      payload: {
        request: {
          asyncFunction = null,
          asyncFunctionParams = null,
          payload = {},
          params = {},
          query,
          paramsSerializer = {
            arrayFormat: 'brackets'
          },
          axiosConfig = {},
          errorDataHandling = true,
          clearDataOnError = false,
          polling = false,
          errorParser = false,
          defaultErrorParser: isResponseErrorParser = false,
          delay: Delay = 8000,
          retry = 0,
          pollingCount = 'unlimited'
        } = {},
        callback: {
          successCallback,
          errorCallback,
          logoutCallback,
          finalCallback,
          pollingCallback
        } = {}
      } = {},
      type
    } = _ref3,
        rest = _objectWithoutProperties(_ref3.payload.request, ["asyncFunction", "asyncFunctionParams", "payload", "params", "query", "paramsSerializer", "axiosConfig", "errorDataHandling", "clearDataOnError", "polling", "errorParser", "defaultErrorParser", "delay", "retry", "pollingCount"]),
        restCallback = _objectWithoutProperties(_ref3.payload.callback, ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback"]),
        restPayload = _objectWithoutProperties(_ref3.payload, ["request", "callback"]);

    var loop = true;
    var count = 1;
    var pollingRequestConfig = {};

    var _loop = function* _loop() {
      var axios = axiosInterceptors || _axios.default;
      var {
        CancelToken
      } = axios;
      var source = yield CancelToken.source();
      var action = yield actionType[type];
      yield action = _objectSpread({}, action, {
        error: action.error || action.actions[constants.ERROR],
        success: action.success || action.actions[constants.SUCCESS],
        customTask: action.custom || action.actions[constants.CUSTOM]
      });
      var url = '';

      if (typeof action.api === 'string') {
        url = action.api;
        action.api = {};
      }

      var commonData = _objectSpread({
        payload,
        params,
        query
      }, rest, {}, pollingRequestConfig, {
        request: _objectSpread({
          payload,
          params,
          query,
          errorDataHandling,
          clearDataOnError
        }, rest, {}, pollingRequestConfig),
        callback: restCallback
      }, restPayload);

      var actionBind = (_action, _method) => _action.bind({}, type, _method, commonData);

      if (typeof action.error === 'function') yield action.error = yield actionBind(action.error, constants.ON_ERROR);
      if (typeof action.success === 'function') yield action.success = yield actionBind(action.success, constants.ON_SUCCESS);
      var request = yield _objectSpread({}, action.api || {}, {
        cancelToken: source.token,
        url: action.api.url || url,
        method: action.api.method || 'GET',
        data: payload,
        headers
      });
      if (action.effect) yield delete action.effect;
      if (action.actions) yield delete action.actions;

      if ((pollingRequestConfig && pollingRequestConfig.params || params) && typeof request.url === 'function') {
        checkKey(params, '{request: { params }}', 'object'); // throw new Error(
        //   `key 'params' should be object not a ${typeOf(params)}`,
        // );

        request.url = yield request.url(pollingRequestConfig && pollingRequestConfig.params || params);
      }

      if (query || pollingRequestConfig && pollingRequestConfig.query) {
        request.params = pollingRequestConfig && pollingRequestConfig.query || query; // eslint-disable-next-line no-loop-func

        request.paramsSerializer = function (param) {
          return _queryString.default.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
        };
      }

      if (process.env.NODE_ENV !== 'test' || !action.test) yield delete request.headers;
      var requestData = yield (0, _effects.call)(requestResponseHandler, {
        type,
        action,
        request,
        payload: commonData,
        actionData: rest,
        method: constants.ON_REQUEST
      });
      yield request = requestData || request;
      if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method)) yield delete request.data;
      if (request.effect) delete request.effect;

      try {
        var {
          posts: postData,
          cancel: cancelTask
        } = yield (0, _effects.race)({
          posts: typeof asyncFunction === 'function' ? (0, _effects.call)(asyncFunction, ...(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : [])) : (0, _effects.call)(axios, _objectSpread({}, request, {}, pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)),
          cancel: (0, _effects.take)(action.cancel)
        });
        var data = postData ? _objectSpread({}, postData) : postData;

        if (postData && postData.data) {
          var statusKey = action.api.responseStatusCodeKey || '';
          data = {
            data: {
              status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? 200 : (postData.data || {})[statusKey]) || postData.status,
              statusCode: (postData.data || {})[statusKey] || postData.status,
              message: (postData.data || {})[action.api.responseMessageKey || 'message'],
              data: (postData.data || {})[action.api.responseDataKey] || postData.data || postData
            }
          };

          if (action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status)) {
            throw new _customError.default({
              isAxiosError: true,
              response: {
                data: {
                  error: (postData.data || {})[action.api.errorDataKey || 'error'] || postData.data || postData,
                  status: data.data.status,
                  statusCode: data.data.status,
                  message: data.data.message || 'Error'
                }
              }
            });
          }
        }

        if (data) {
          var {
            data: {
              status: successStatus = postData.status,
              message: successMessage = ''
            } = {}
          } = data || {};
          yield action.success = action.success.bind({}, successStatus, successMessage);
          var successCallbackResponse = null;
          if (typeof successCallback === 'function') successCallbackResponse = yield successCallback({
            response: postData,
            posts: data,
            data: data.data,
            message: successMessage,
            status: successStatus
          });
          if (successCallbackResponse) if ((0, _helpers.typeOf)(successCallbackResponse) === 'object') {
            if ((0, _helpers.typeOf)(successCallbackResponse.task) === 'object') commonData.task = successCallbackResponse.task;
            if (successCallbackResponse.filter) commonData.filter = successCallbackResponse.filter;
            if (successCallbackResponse.tasks) commonData.tasks = successCallbackResponse.tasks;
          } else if ((0, _helpers.typeOf)(successCallbackResponse) === 'array') commonData.tasks = successCallbackResponse;
          var loader = yield (0, _effects.call)(requestResponseHandler, {
            data,
            type,
            action,
            payload: commonData,
            actionData: rest,
            method: constants.ON_SUCCESS
          });
          if (loader) yield (0, _effects.call)(loaderGenerator, {
            type,
            commonData
          });
          if (typeof logoutCallback === 'function') setTimeout(() => logoutCallback(data), 500);
        } else if (cancelTask && typeof source.cancel === 'function') {
          yield source.cancel();
          var {
            response: {
              method: customMethod
            }
          } = cancelTask || {};
          if (!customMethod) yield (0, _effects.call)(requestResponseHandler, {
            type,
            action,
            payload: commonData,
            actionData: rest,
            method: constants.ON_CANCEL,
            axiosCancel: cancelTask
          });
          yield (0, _effects.call)(loaderGenerator, {
            type,
            commonData
          });
        } else if (process.env.NODE_ENV === 'test' && action.success) yield (0, _effects.put)(action.success({
          data
        }));else yield (0, _effects.call)(loaderGenerator, {
          type,
          commonData
        });

        if (polling && typeof window !== 'undefined' && typeof pollingCallback === 'function') {
          var {
            data: {
              status: _successStatus = postData.status,
              message: _successMessage = ''
            } = {}
          } = data || {};
          var pollingRes = yield (0, _effects.call)(pollingCallback, {
            response: data,
            data: data.data,
            message: _successMessage,
            status: _successStatus,
            count
          });
          if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;
        }

        if (!polling && retry) loop = false;
      } catch (error) {
        if (error && typeof error === 'object' && !error.isAxiosError) throw new Error(error);else if (!polling && retry && retry - 1 >= count) {// console.log(count);
        } else {
          if (process.env.NODE_ENV === 'test') console.log(error);
          var {
            response: {
              data: {
                [action.api.errorDataKey || 'error']: errorData = error && error.response && error.response.data || error && error.response || '',
                status: errorStatus = error.response && error.response.data && (error.response.data[action.api.errorStatusKey] || error.response.status),
                message: errorMessage = error.response && error.response.data && error.response.data[action.api.errorMessageKey] || error.response && error.response.statusText || ''
              } = {}
            } = {}
          } = error || {};
          if (typeof errorCallback === 'function') yield errorCallback(_objectSpread({
            error,
            errorData: isResponseErrorParser ? errorData && typeof (0, _index.responseErrorParser)(errorData) === 'object' && Object.keys((0, _index.responseErrorParser)(errorData) || {}).length > 0 ? (0, _index.responseErrorParser)(errorData) : errorData : errorData
          }, typeof errorParser === 'function' ? {
            errorParser: errorParser({
              error,
              errorData,
              status: errorStatus,
              response: error && error.response,
              message: errorMessage
            })
          } : {}, {
            message: errorMessage,
            status: errorStatus,
            response: error && error.response,
            errors: errorData
          }));
          yield action.error = action.error.bind({}, errorStatus, errorMessage);

          if (axios.isCancel(error) && action.cancel) {
            yield (0, _effects.call)(loaderGenerator, {
              type,
              commonData
            });
            yield (0, _effects.call)(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_CANCEL_ERROR
            });
          } else {
            var _loader = yield (0, _effects.call)(requestResponseHandler, {
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
              method: constants.ON_ERROR
            });

            if (_loader) yield (0, _effects.call)(loaderGenerator, {
              type,
              commonData
            });
          }
        }
      } finally {
        var Cancelled = yield (0, _effects.cancelled)();
        if (typeof finalCallback === 'function') yield finalCallback({
          type,
          action,
          payload: commonData,
          Cancelled
        });
        yield (0, _effects.call)(requestResponseHandler, {
          type,
          action,
          payload: commonData,
          actionData: rest,
          method: constants.ON_FINALLY,
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
          var {
            cancel: CancelPolling
          } = yield (0, _effects.race)({
            posts: (0, _effects.call)(delay, Delay),
            cancel: (0, _effects.take)(action.cancel)
          });
          if (CancelPolling) loop = false;
        } else loop = false;
      } else if (!polling && retry && loop) {
        if (retry - 1 >= count) {
          loop = true;
          count += 1;
        } else loop = false;
      } else loop = false;
    };

    do {
      yield* _loop();
    } while (loop);
  }

  var generatorPattern = Object.keys(actionType).map(pattern => (actionType[pattern].effect || _effects.takeLatest)(pattern, commonGenerator));
  return [generatorPattern, commonGenerator];
}