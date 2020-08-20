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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */

/* eslint-disable no-console */

/* eslint-disable func-names */
// import isFunction from 'lodash/isFunction';
// import isObject from 'lodash/isObject';
// import { headers } from '../../../utils/constants';
const headers = '';

function* loaderGenerator({
  type,
  commonData
}) {
  yield (0, _effects.put)(commonActions.apiLoadingStatus({
    type,
    payload: commonData,
    status: false
  }));
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkKey = (key, name, dataType) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`);
};

function _default({
  actionType = {},
  requestResponseHandler,
  axiosInterceptors
}) {
  function* commonGenerator({
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
        pollingCount = 'unlimited',
        ...rest
      } = {},
      callback: {
        successCallback,
        errorCallback,
        logoutCallback,
        finalCallback,
        pollingCallback,
        ...restCallback
      } = {},
      ...restPayload
    } = {},
    type
  }) {
    let loop = true;
    let count = 1;
    let pollingRequestConfig = {};

    do {
      const axios = axiosInterceptors || _axios.default;
      const {
        CancelToken
      } = axios;
      const source = yield CancelToken.source();
      let action = yield actionType[type];
      yield action = { ...action,
        error: action.error || action.actions[constants.ERROR],
        success: action.success || action.actions[constants.SUCCESS],
        customTask: action.custom || action.actions[constants.CUSTOM]
      };
      let url = '';

      if (typeof action.api === 'string') {
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

      if (typeof action.error === 'function') yield action.error = yield actionBind(action.error, constants.ON_ERROR);
      if (typeof action.success === 'function') yield action.success = yield actionBind(action.success, constants.ON_SUCCESS);
      let request = yield { ...(action.api || {}),
        cancelToken: source.token,
        url: action.api.url || url,
        method: action.api.method || 'GET',
        data: payload,
        headers
      };
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
      const requestData = yield (0, _effects.call)(requestResponseHandler, {
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
        const {
          posts: postData,
          cancel: cancelTask
        } = yield (0, _effects.race)({
          posts: typeof asyncFunction === 'function' ? (0, _effects.call)(asyncFunction, ...(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : [])) : (0, _effects.call)(axios, { ...request,
            ...(pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)
          }),
          cancel: (0, _effects.take)(action.cancel)
        });
        let data = postData ? { ...postData
        } : postData;

        if (postData && postData.data) {
          const statusKey = action.api.responseStatusCodeKey || '';
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
          const {
            data: {
              status: successStatus = postData.status,
              message: successMessage = ''
            } = {}
          } = data || {};
          yield action.success = action.success.bind({}, successStatus, successMessage);
          let successCallbackResponse = null;
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
          const loader = yield (0, _effects.call)(requestResponseHandler, {
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
          const {
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
          const {
            data: {
              status: successStatus = postData.status,
              message: successMessage = ''
            } = {}
          } = data || {};
          const pollingRes = yield (0, _effects.call)(pollingCallback, {
            response: data,
            data: data.data,
            message: successMessage,
            status: successStatus,
            count
          });
          if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;
        }

        if (!polling && retry) loop = false;
      } catch (error) {
        if (error && typeof error === 'object' && !error.isAxiosError) throw new Error(error);else if (!polling && retry && retry - 1 >= count) {// console.log(count);
        } else {
          if (process.env.NODE_ENV === 'test') console.log(error);
          const {
            response: {
              data: {
                [action.api.errorDataKey || 'error']: errorData = error && error.response && error.response.data || error && error.response || '',
                status: errorStatus = error.response && error.response.data && (error.response.data[action.api.errorStatusKey] || error.response.status),
                message: errorMessage = error.response && error.response.data && error.response.data[action.api.errorMessageKey] || error.response && error.response.statusText || ''
              } = {}
            } = {}
          } = error || {};
          if (typeof errorCallback === 'function') yield errorCallback({
            error,
            errorData: isResponseErrorParser ? errorData && typeof (0, _index.responseErrorParser)(errorData) === 'object' && Object.keys((0, _index.responseErrorParser)(errorData) || {}).length > 0 ? (0, _index.responseErrorParser)(errorData) : errorData : errorData,
            ...(typeof errorParser === 'function' ? {
              errorParser: errorParser({
                error,
                errorData,
                status: errorStatus,
                response: error && error.response,
                message: errorMessage
              })
            } : {}),
            message: errorMessage,
            status: errorStatus,
            response: error && error.response,
            errors: errorData
          });
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
            const loader = yield (0, _effects.call)(requestResponseHandler, {
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
            if (loader) yield (0, _effects.call)(loaderGenerator, {
              type,
              commonData
            });
          }
        }
      } finally {
        const Cancelled = yield (0, _effects.cancelled)();
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
          const {
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
    } while (loop);
  }

  const generatorPattern = Object.keys(actionType).map(pattern => (actionType[pattern].effect || _effects.takeLatest)(pattern, commonGenerator));
  return [generatorPattern, commonGenerator];
}