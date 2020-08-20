function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */

/* eslint-disable no-console */

/* eslint-disable func-names */
import Qs from 'query-string';
import { call // apply,
, put, cancelled, race, take, takeLatest } from 'redux-saga/effects'; // import isFunction from 'lodash/isFunction';
// import isObject from 'lodash/isObject';

import invariant from 'invariant';
import * as constants from './commonConstants';
import { responseErrorParser } from '../index';
import Axios from '../../config/axios';
import { typeOf } from '../helpers'; // import { headers } from '../../../utils/constants';

import * as commonActions from './commonActions';
import CustomError from '../customError';
var headers = '';

function* loaderGenerator(_ref) {
  var type = _ref.type,
      commonData = _ref.commonData;
  yield put(commonActions.apiLoadingStatus({
    type: type,
    payload: commonData,
    status: false
  }));
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var checkKey = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `" + name + "` to be a " + dataType);
};

export default function (_ref2) {
  var _ref2$actionType = _ref2.actionType,
      actionType = _ref2$actionType === void 0 ? {} : _ref2$actionType,
      requestResponseHandler = _ref2.requestResponseHandler,
      axiosInterceptors = _ref2.axiosInterceptors;

  function* commonGenerator(_ref3) {
    var _ref3$payload = _ref3.payload;
    _ref3$payload = _ref3$payload === void 0 ? {} : _ref3$payload;
    var _ref3$payload$request = _ref3$payload.request;
    _ref3$payload$request = _ref3$payload$request === void 0 ? {} : _ref3$payload$request;

    var _ref3$payload$request2 = _ref3$payload$request.asyncFunction,
        asyncFunction = _ref3$payload$request2 === void 0 ? null : _ref3$payload$request2,
        _ref3$payload$request3 = _ref3$payload$request.asyncFunctionParams,
        asyncFunctionParams = _ref3$payload$request3 === void 0 ? null : _ref3$payload$request3,
        _ref3$payload$request4 = _ref3$payload$request.payload,
        payload = _ref3$payload$request4 === void 0 ? {} : _ref3$payload$request4,
        _ref3$payload$request5 = _ref3$payload$request.params,
        params = _ref3$payload$request5 === void 0 ? {} : _ref3$payload$request5,
        query = _ref3$payload$request.query,
        _ref3$payload$request6 = _ref3$payload$request.paramsSerializer,
        paramsSerializer = _ref3$payload$request6 === void 0 ? {
      arrayFormat: 'brackets'
    } : _ref3$payload$request6,
        _ref3$payload$request7 = _ref3$payload$request.axiosConfig,
        axiosConfig = _ref3$payload$request7 === void 0 ? {} : _ref3$payload$request7,
        _ref3$payload$request8 = _ref3$payload$request.errorDataHandling,
        errorDataHandling = _ref3$payload$request8 === void 0 ? true : _ref3$payload$request8,
        _ref3$payload$request9 = _ref3$payload$request.clearDataOnError,
        clearDataOnError = _ref3$payload$request9 === void 0 ? false : _ref3$payload$request9,
        _ref3$payload$request10 = _ref3$payload$request.polling,
        polling = _ref3$payload$request10 === void 0 ? false : _ref3$payload$request10,
        _ref3$payload$request11 = _ref3$payload$request.errorParser,
        errorParser = _ref3$payload$request11 === void 0 ? false : _ref3$payload$request11,
        _ref3$payload$request12 = _ref3$payload$request.defaultErrorParser,
        isResponseErrorParser = _ref3$payload$request12 === void 0 ? false : _ref3$payload$request12,
        _ref3$payload$request13 = _ref3$payload$request.delay,
        Delay = _ref3$payload$request13 === void 0 ? 8000 : _ref3$payload$request13,
        _ref3$payload$request14 = _ref3$payload$request.retry,
        retry = _ref3$payload$request14 === void 0 ? 0 : _ref3$payload$request14,
        _ref3$payload$request15 = _ref3$payload$request.pollingCount,
        pollingCount = _ref3$payload$request15 === void 0 ? 'unlimited' : _ref3$payload$request15,
        rest = _objectWithoutPropertiesLoose(_ref3$payload$request, ["asyncFunction", "asyncFunctionParams", "payload", "params", "query", "paramsSerializer", "axiosConfig", "errorDataHandling", "clearDataOnError", "polling", "errorParser", "defaultErrorParser", "delay", "retry", "pollingCount"]),
        _ref3$payload$callbac = _ref3$payload.callback;

    _ref3$payload$callbac = _ref3$payload$callbac === void 0 ? {} : _ref3$payload$callbac;

    var successCallback = _ref3$payload$callbac.successCallback,
        errorCallback = _ref3$payload$callbac.errorCallback,
        logoutCallback = _ref3$payload$callbac.logoutCallback,
        finalCallback = _ref3$payload$callbac.finalCallback,
        pollingCallback = _ref3$payload$callbac.pollingCallback,
        restCallback = _objectWithoutPropertiesLoose(_ref3$payload$callbac, ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback"]),
        restPayload = _objectWithoutPropertiesLoose(_ref3$payload, ["request", "callback"]),
        type = _ref3.type;

    var loop = true;
    var count = 1;
    var pollingRequestConfig = {};

    var _loop = function* _loop() {
      var axios = axiosInterceptors || Axios;
      var CancelToken = axios.CancelToken;
      var source = yield CancelToken.source();
      var action = yield actionType[type];
      yield action = _extends({}, action, {
        error: action.error || action.actions[constants.ERROR],
        success: action.success || action.actions[constants.SUCCESS],
        customTask: action.custom || action.actions[constants.CUSTOM]
      });
      var url = '';

      if (typeof action.api === 'string') {
        url = action.api;
        action.api = {};
      }

      var commonData = _extends({
        payload: payload,
        params: params,
        query: query
      }, rest, {}, pollingRequestConfig, {
        request: _extends({
          payload: payload,
          params: params,
          query: query,
          errorDataHandling: errorDataHandling,
          clearDataOnError: clearDataOnError
        }, rest, {}, pollingRequestConfig),
        callback: restCallback
      }, restPayload);

      var actionBind = function actionBind(_action, _method) {
        return _action.bind({}, type, _method, commonData);
      };

      if (typeof action.error === 'function') yield action.error = yield actionBind(action.error, constants.ON_ERROR);
      if (typeof action.success === 'function') yield action.success = yield actionBind(action.success, constants.ON_SUCCESS);
      var request = yield _extends({}, action.api || {}, {
        cancelToken: source.token,
        url: action.api.url || url,
        method: action.api.method || 'GET',
        data: payload,
        headers: headers
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
          return Qs.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
        };
      }

      if (process.env.NODE_ENV !== 'test' || !action.test) yield delete request.headers;
      var requestData = yield call(requestResponseHandler, {
        type: type,
        action: action,
        request: request,
        payload: commonData,
        actionData: rest,
        method: constants.ON_REQUEST
      });
      yield request = requestData || request;
      if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method)) yield delete request.data;
      if (request.effect) delete request.effect;

      try {
        var _yield$race = yield race({
          posts: typeof asyncFunction === 'function' ? call.apply(void 0, [asyncFunction].concat(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : [])) : call(axios, _extends({}, request, {}, pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)),
          cancel: take(action.cancel)
        }),
            postData = _yield$race.posts,
            cancelTask = _yield$race.cancel;

        var data = postData ? _extends({}, postData) : postData;

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
            throw new CustomError({
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
          var _ref4 = data || {},
              _ref4$data = _ref4.data;

          _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
          var _ref4$data$status = _ref4$data.status,
              successStatus = _ref4$data$status === void 0 ? postData.status : _ref4$data$status,
              _ref4$data$message = _ref4$data.message,
              successMessage = _ref4$data$message === void 0 ? '' : _ref4$data$message;
          yield action.success = action.success.bind({}, successStatus, successMessage);
          var successCallbackResponse = null;
          if (typeof successCallback === 'function') successCallbackResponse = yield successCallback({
            response: postData,
            posts: data,
            data: data.data,
            message: successMessage,
            status: successStatus
          });
          if (successCallbackResponse) if (typeOf(successCallbackResponse) === 'object') {
            if (typeOf(successCallbackResponse.task) === 'object') commonData.task = successCallbackResponse.task;
            if (successCallbackResponse.filter) commonData.filter = successCallbackResponse.filter;
            if (successCallbackResponse.tasks) commonData.tasks = successCallbackResponse.tasks;
          } else if (typeOf(successCallbackResponse) === 'array') commonData.tasks = successCallbackResponse;
          var loader = yield call(requestResponseHandler, {
            data: data,
            type: type,
            action: action,
            payload: commonData,
            actionData: rest,
            method: constants.ON_SUCCESS
          });
          if (loader) yield call(loaderGenerator, {
            type: type,
            commonData: commonData
          });
          if (typeof logoutCallback === 'function') setTimeout(function () {
            return logoutCallback(data);
          }, 500);
        } else if (cancelTask && typeof source.cancel === 'function') {
          yield source.cancel();

          var _ref5 = cancelTask || {},
              customMethod = _ref5.response.method;

          if (!customMethod) yield call(requestResponseHandler, {
            type: type,
            action: action,
            payload: commonData,
            actionData: rest,
            method: constants.ON_CANCEL,
            axiosCancel: cancelTask
          });
          yield call(loaderGenerator, {
            type: type,
            commonData: commonData
          });
        } else if (process.env.NODE_ENV === 'test' && action.success) yield put(action.success({
          data: data
        }));else yield call(loaderGenerator, {
          type: type,
          commonData: commonData
        });

        if (polling && typeof window !== 'undefined' && typeof pollingCallback === 'function') {
          var _ref6 = data || {},
              _ref6$data = _ref6.data;

          _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;

          var _ref6$data$status = _ref6$data.status,
              _successStatus = _ref6$data$status === void 0 ? postData.status : _ref6$data$status,
              _ref6$data$message = _ref6$data.message,
              _successMessage = _ref6$data$message === void 0 ? '' : _ref6$data$message;

          var pollingRes = yield call(pollingCallback, {
            response: data,
            data: data.data,
            message: _successMessage,
            status: _successStatus,
            count: count
          });
          if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;
        }

        if (!polling && retry) loop = false;
      } catch (error) {
        if (error && typeof error === 'object' && !error.isAxiosError) throw new Error(error);else if (!polling && retry && retry - 1 >= count) {// console.log(count);
        } else {
          if (process.env.NODE_ENV === 'test') console.log(error);

          var _ref7 = error || {},
              _ref7$response = _ref7.response;

          _ref7$response = _ref7$response === void 0 ? {} : _ref7$response;
          var _ref7$response$data = _ref7$response.data;
          _ref7$response$data = _ref7$response$data === void 0 ? {} : _ref7$response$data;
          var _ref7$response$data2 = _ref7$response$data[action.api.errorDataKey || 'error'],
              errorData = _ref7$response$data2 === void 0 ? error && error.response && error.response.data || error && error.response || '' : _ref7$response$data2,
              _ref7$response$data$s = _ref7$response$data.status,
              errorStatus = _ref7$response$data$s === void 0 ? error.response && error.response.data && (error.response.data[action.api.errorStatusKey] || error.response.status) : _ref7$response$data$s,
              _ref7$response$data$m = _ref7$response$data.message,
              errorMessage = _ref7$response$data$m === void 0 ? error.response && error.response.data && error.response.data[action.api.errorMessageKey] || error.response && error.response.statusText || '' : _ref7$response$data$m;
          if (typeof errorCallback === 'function') yield errorCallback(_extends({
            error: error,
            errorData: isResponseErrorParser ? errorData && typeof responseErrorParser(errorData) === 'object' && Object.keys(responseErrorParser(errorData) || {}).length > 0 ? responseErrorParser(errorData) : errorData : errorData
          }, typeof errorParser === 'function' ? {
            errorParser: errorParser({
              error: error,
              errorData: errorData,
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
            yield call(loaderGenerator, {
              type: type,
              commonData: commonData
            });
            yield call(requestResponseHandler, {
              type: type,
              action: action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_CANCEL_ERROR
            });
          } else {
            var _loader = yield call(requestResponseHandler, {
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
              method: constants.ON_ERROR
            });

            if (_loader) yield call(loaderGenerator, {
              type: type,
              commonData: commonData
            });
          }
        }
      } finally {
        var Cancelled = yield cancelled();
        if (typeof finalCallback === 'function') yield finalCallback({
          type: type,
          action: action,
          payload: commonData,
          Cancelled: Cancelled
        });
        yield call(requestResponseHandler, {
          type: type,
          action: action,
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

          var _yield$race2 = yield race({
            posts: call(delay, Delay),
            cancel: take(action.cancel)
          }),
              CancelPolling = _yield$race2.cancel;

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

  var generatorPattern = Object.keys(actionType).map(function (pattern) {
    return (actionType[pattern].effect || takeLatest)(pattern, commonGenerator);
  });
  return [generatorPattern, commonGenerator];
}