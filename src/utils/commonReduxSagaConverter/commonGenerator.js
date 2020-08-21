/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable func-names */
import Qs from 'query-string';
import {
  call,
  // apply,
  put,
  cancelled,
  race,
  take,
  takeLatest,
} from 'redux-saga/effects';
// import isFunction from 'lodash/isFunction';
// import isObject from 'lodash/isObject';
import invariant from 'invariant';
import * as constants from './commonConstants';
import { responseErrorParser } from '../index';
import Axios from '../../config/axios';
import { typeOf } from '../helpers';
// import { headers } from '../../../utils/constants';
import * as commonActions from './commonActions';
import CustomError from '../customError';
const headers = '';
function* loaderGenerator({ type, commonData }) {
  yield put(
    commonActions.apiLoadingStatus({
      type,
      payload: commonData,
      status: false,
    }),
  );
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkKey = (key, name, dataType) => {
  invariant(
    typeOf(key) === dataType,
    `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`,
  );
};

export default function({
  actionType = {},
  requestResponseHandler,
  axiosInterceptors,
}) {
  function* commonGenerator({
    payload: {
      resolve,
      reject,
      request: {
        asyncFunction = null,
        asyncFunctionParams = null,
        payload = {},
        params = {},
        query,
        paramsSerializer = { arrayFormat: 'brackets' },
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
    type,
  }) {
    let loop = true;
    let count = 1;
    let pollingRequestConfig = {};
    do {
      const axios = axiosInterceptors || Axios;
      const { CancelToken } = axios;
      const source = yield CancelToken.source();
      let action = yield actionType[type];
      yield (action = {
        ...action,
        error: action.error || action.actions[constants.ERROR],
        success: action.success || action.actions[constants.SUCCESS],
        customTask: action.custom || action.actions[constants.CUSTOM],
      });
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
          ...pollingRequestConfig,
        },
        callback: restCallback,
        ...restPayload,
      };
      const actionBind = (_action, _method) =>
        _action.bind({}, type, _method, commonData);
      if (typeof action.error === 'function')
        yield (action.error = yield actionBind(
          action.error,
          constants.ON_ERROR,
        ));
      if (typeof action.success === 'function')
        yield (action.success = yield actionBind(
          action.success,
          constants.ON_SUCCESS,
        ));
      let request = yield {
        ...(action.api || {}),
        cancelToken: source.token,
        url: action.api.url || url,
        method: action.api.method || 'GET',
        data: payload,
        headers,
      };
      if (action.effect) yield delete action.effect;
      if (action.actions) yield delete action.actions;
      if (
        ((pollingRequestConfig && pollingRequestConfig.params) || params) &&
        typeof request.url === 'function'
      ) {
        checkKey(params, '{request: { params }}', 'object');
        // throw new Error(
        //   `key 'params' should be object not a ${typeOf(params)}`,
        // );
        request.url = yield request.url(
          (pollingRequestConfig && pollingRequestConfig.params) || params,
        );
      }
      if (query || (pollingRequestConfig && pollingRequestConfig.query)) {
        request.params =
          (pollingRequestConfig && pollingRequestConfig.query) || query;
        // eslint-disable-next-line no-loop-func
        request.paramsSerializer = function(param) {
          return Qs.stringify(
            param,
            (pollingRequestConfig && pollingRequestConfig.paramsSerializer) ||
              paramsSerializer,
          );
        };
      }
      if (process.env.NODE_ENV !== 'test' || !action.test)
        yield delete request.headers;
      const requestData = yield call(requestResponseHandler, {
        type,
        action,
        request,
        payload: commonData,
        actionData: rest,
        method: constants.ON_REQUEST,
      });
      yield (request = requestData || request);
      if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method))
        yield delete request.data;
      if (request.effect) delete request.effect;
      try {
        const { posts: postData, cancel: cancelTask } = yield race({
          posts:
            typeof asyncFunction === 'function'
              ? call(
                  asyncFunction,
                  ...(Array.isArray(
                    (pollingRequestConfig &&
                      pollingRequestConfig.asyncFunctionParams) ||
                      asyncFunctionParams,
                  )
                    ? (pollingRequestConfig &&
                        pollingRequestConfig.asyncFunctionParams) ||
                      asyncFunctionParams
                    : []),
                )
              : call(axios, {
                  ...request,
                  ...((pollingRequestConfig &&
                    pollingRequestConfig.axiosConfig) ||
                    axiosConfig),
                }),
          cancel: take(action.cancel),
        });
        let data = postData ? { ...postData } : postData;
        if (postData && postData.data) {
          const statusKey = action.api.responseStatusCodeKey || '';
          data = {
            data: {
              status:
                ((action.api.responseStatusCode || []).includes(
                  (postData.data || {})[statusKey],
                )
                  ? 200
                  : (postData.data || {})[statusKey]) || postData.status,
              statusCode: (postData.data || {})[statusKey] || postData.status,
              message: (postData.data || {})[
                action.api.responseMessageKey || 'message'
              ],
              data:
                (postData.data || {})[action.api.responseDataKey] ||
                postData.data ||
                postData,
            },
          };
          if (
            action.api.errorHandlerStatusCode &&
            (action.api.errorHandlerStatusCode || []).includes(data.data.status)
          ) {
            throw new CustomError({
              isAxiosError: true,
              response: {
                data: {
                  error:
                    (postData.data || {})[action.api.errorDataKey || 'error'] ||
                    postData.data ||
                    postData,
                  status: data.data.status,
                  statusCode: data.data.status,
                  message: data.data.message || 'Error',
                },
              },
            });
          }
        }

        if (data) {
          const {
            data: {
              status: successStatus = postData.status,
              message: successMessage = '',
            } = {},
          } = data || {};
          yield (action.success = action.success.bind(
            {},
            successStatus,
            successMessage,
          ));
          let successCallbackResponse = null;
          if (typeof successCallback === 'function')
            successCallbackResponse = yield call(successCallback, {
              response: postData,
              posts: data,
              data: data.data,
              message: successMessage,
              status: successStatus,
            });
          if (successCallbackResponse)
            if (typeOf(successCallbackResponse) === 'object') {
              if (typeOf(successCallbackResponse.task) === 'object')
                commonData.task = successCallbackResponse.task;
              if (successCallbackResponse.filter)
                commonData.filter = successCallbackResponse.filter;
              if (successCallbackResponse.tasks)
                commonData.tasks = successCallbackResponse.tasks;
            } else if (typeOf(successCallbackResponse) === 'array')
              commonData.tasks = successCallbackResponse;
          const loader = yield call(requestResponseHandler, {
            data,
            type,
            action,
            payload: commonData,
            actionData: rest,
            method: constants.ON_SUCCESS,
          });
          if (loader)
            yield call(loaderGenerator, {
              type,
              commonData,
            });

          if (typeof logoutCallback === 'function')
            setTimeout(() => logoutCallback(data), 500);
        } else if (cancelTask && typeof source.cancel === 'function') {
          yield source.cancel();
          const {
            response: { method: customMethod },
          } = cancelTask || {};
          if (!customMethod)
            yield call(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_CANCEL,
              axiosCancel: cancelTask,
            });
          yield call(loaderGenerator, {
            type,
            commonData,
          });
        } else if (process.env.NODE_ENV === 'test' && action.success)
          yield put(action.success({ data }));
        else
          yield call(loaderGenerator, {
            type,
            commonData,
          });
        if (
          polling &&
          typeof window !== 'undefined' &&
          typeof pollingCallback === 'function'
        ) {
          const {
            data: {
              status: successStatus = postData.status,
              message: successMessage = '',
            } = {},
          } = data || {};
          const pollingRes = yield call(pollingCallback, {
            response: data,
            data: data.data,
            message: successMessage,
            status: successStatus,
            count,
          });
          if (typeof pollingRes === 'boolean') loop = pollingRes;
          else if (
            Object.prototype.toString.call(pollingRes) === '[object Object]'
          )
            pollingRequestConfig = pollingRes;
        }
        if (!polling && retry) loop = false;
        if (resolve && typeOf(resolve) === 'function')
          resolve({
            status: 'SUCCESS',
            response: postData,
            data: data.data,
          });
      } catch (error) {
        if (resolve && typeOf(resolve) === 'function')
          resolve({ status: 'ERROR', error, respone: error && error.response });
        if (error && typeof error === 'object' && !error.isAxiosError)
          throw new Error(error);
        else if (!polling && retry && retry - 1 >= count) {
          // console.log(count);
        } else {
          if (process.env.NODE_ENV === 'test') console.log(error);
          const {
            response: {
              data: {
                [action.api.errorDataKey || 'error']: errorData = (error &&
                  error.response &&
                  error.response.data) ||
                  (error && error.response) ||
                  '',
                status: errorStatus = error.response &&
                  error.response.data &&
                  (error.response.data[action.api.errorStatusKey] ||
                    error.response.status),
                message: errorMessage = (error.response &&
                  error.response.data &&
                  error.response.data[action.api.errorMessageKey]) ||
                  (error.response && error.response.statusText) ||
                  '',
              } = {},
            } = {},
          } = error || {};
          if (typeof errorCallback === 'function')
            yield errorCallback({
              error,
              errorData: isResponseErrorParser
                ? errorData &&
                  typeof responseErrorParser(errorData) === 'object' &&
                  Object.keys(responseErrorParser(errorData) || {}).length > 0
                  ? responseErrorParser(errorData)
                  : errorData
                : errorData,
              ...(typeof errorParser === 'function'
                ? {
                    errorParser: errorParser({
                      error,
                      errorData,
                      status: errorStatus,
                      response: error && error.response,
                      message: errorMessage,
                    }),
                  }
                : {}),
              message: errorMessage,
              status: errorStatus,
              response: error && error.response,
              errors: errorData,
            });
          yield (action.error = action.error.bind(
            {},
            errorStatus,
            errorMessage,
          ));
          if (axios.isCancel(error) && action.cancel) {
            yield call(loaderGenerator, {
              type,
              commonData,
            });
            yield call(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_CANCEL_ERROR,
            });
          } else {
            const loader = yield call(requestResponseHandler, {
              error: {
                response: {
                  data: {
                    status: errorStatus,
                    data: errorDataHandling ? errorData : null,
                    message: errorMessage,
                  },
                },
              },
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_ERROR,
            });
            if (loader)
              yield call(loaderGenerator, {
                type,
                commonData,
              });
          }
        }
      } finally {
        const Cancelled = yield cancelled();
        if (typeof finalCallback === 'function')
          yield finalCallback({ type, action, payload: commonData, Cancelled });
        yield call(requestResponseHandler, {
          type,
          action,
          payload: commonData,
          actionData: rest,
          method: constants.ON_FINALLY,
          cancelled: Cancelled,
        });
        if (Cancelled) {
          if (typeof source.cancel === 'function') yield source.cancel();
          loop = false;
        }
      }
      if (polling && typeof window !== 'undefined' && loop) {
        if (pollingCount === 'unlimited' || pollingCount - 1 >= count) {
          count += 1;
          const { cancel: CancelPolling } = yield race({
            posts: call(delay, Delay),
            cancel: take(action.cancel),
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

  const generatorPattern = Object.keys(actionType).map(pattern =>
    (actionType[pattern].effect || takeLatest)(pattern, commonGenerator),
  );
  return [generatorPattern, commonGenerator];
}
