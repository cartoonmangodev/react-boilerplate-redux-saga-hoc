/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
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
  fork,
  delay as sagaDelayFn,
} from 'redux-saga/effects';
// import isFunction from 'lodash/isFunction';
// import isObject from 'lodash/isObject';
import invariant from 'invariant';
import AxiosDefault from 'axios';
import * as constants from './commonConstants';
import { responseErrorParser } from '../index';
import Axios from '../../config/axios';
import { typeOf } from '../helpers';
import * as commonActions from './commonActions';
import {
  DEBOUNCE_API_CALL_DELAY_IN_MS,
  IS_DEBOUNCE_API_CALL,
  REFETCH_API_QUERY,
} from './commonConstants';
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

const debounce = (ms, pattern, task, isEvery, ...args) =>
  fork(function*() {
    let taskID;
    while (true) {
      let action = yield take(pattern);

      while (true) {
        const { debounced, latestAction } = yield race({
          debounced: sagaDelayFn(ms),
          latestAction: take(pattern),
        });

        if (debounced) {
          if (
            taskID &&
            typeof taskID.cancel === 'function' &&
            !taskID.isCancelled() &&
            !isEvery
          )
            taskID.cancel();
          taskID = yield fork(task, ...args, action);
          break;
        }
        action = latestAction;
      }
    }
  });

const checkKey = (key, name, dataType) => {
  invariant(
    typeOf(key) === dataType,
    `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`,
  );
};
const _cache = {};
const _cacheApiConfig = {};
export default function({
  actionType = {},
  requestResponseHandler,
  axiosInterceptors,
}) {
  function* commonGenerator({ type, payload: _payload }) {
    /* below code is used for refetching cached api - start */
    let apiCacheFilter;
    if (_payload.request) {
      _cacheApiConfig[type] = _cacheApiConfig[type] || {};
      if (_payload.request.key) {
        if (
          Array.isArray(_payload.request.key) &&
          _payload.request.key.length > 0
        )
          apiCacheFilter = _payload.request.key.join('@_@-@_@');
        else apiCacheFilter = _payload.request.key;

        if (!(_payload.actionCallType === REFETCH_API_QUERY))
          _cacheApiConfig[type][apiCacheFilter] = _payload;
      } else _cacheApiConfig[type] = _payload;
    }
    const __payload =
      _payload.actionCallType === REFETCH_API_QUERY
        ? apiCacheFilter
          ? _cacheApiConfig[type][apiCacheFilter]
          : _cacheApiConfig[type]
        : _payload;
    if (!__payload) {
      yield call(loaderGenerator, {
        type,
        commonData: {
          status: 'request query not found.Unable to fetch api.',
        },
      });
      return;
    }
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
        paramsSerializer = { arrayFormat: 'brackets' },
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

    let loop = true;
    let count = 1;
    let pollingRequestConfig = {};
    let POLLING_RESPONSE_DATA = {};
    while (loop) {
      let action = yield actionType[type];
      const axios =
        requestAxios ||
        (action.api && action.api.axios) ||
        axiosInterceptors ||
        Axios;
      const { CancelToken } = AxiosDefault;
      const source = yield CancelToken.source();
      action = {
        ...action,
        error: action.error || action.actions[constants.ERROR],
        success: action.success || action.actions[constants.SUCCESS],
        customTask: action.custom || action.actions[constants.CUSTOM],
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
          ...pollingRequestConfig,
        },
        callback: restCallback,
        ...restPayload,
      };
      const actionBind = (_action, _method) =>
        _action.bind({}, type, _method, commonData);
      if (typeof action.error === 'function')
        action.error = actionBind(action.error, constants.ON_ERROR);
      if (typeof action.success === 'function')
        action.success = actionBind(action.success, constants.ON_SUCCESS);
      let request = {
        ...(action.api || {}),
        cancelToken: source.token,
        url: action.api.url || url,
        method: action.api.method || 'GET',
        data: payload,
        headers,
      };
      if (action.effect) delete action.effect;
      if (action.actions) delete action.actions;
      if (
        ((pollingRequestConfig && pollingRequestConfig.params) || params) &&
        typeof request.url === 'function'
      ) {
        checkKey(params, '{request: { params }}', 'object');
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
      if (pollingRequestConfig && pollingRequestConfig.payload) {
        request.data =
          (pollingRequestConfig && pollingRequestConfig.payload) || payload;
      }
      const _query =
        (pollingRequestConfig && pollingRequestConfig.query) || query;
      let _url;
      if (cacheControl)
        _url = `${request.url}${
          Object.keys(_query || {}).length > 0
            ? `?${request.paramsSerializer(_query)}`
            : ''
        }`;
      if (process.env.NODE_ENV !== 'test' || !action.test)
        yield delete request.headers;
      let requestData = null;
      if (!dontUpdateReducer)
        requestData = yield call(requestResponseHandler, {
          type,
          action,
          request,
          payload: commonData,
          actionData: rest,
          method: constants.ON_REQUEST,
        });
      request = requestData || request;
      if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method))
        delete request.data;
      if (request.effect) delete request.effect;
      let postData = '';
      let cancelTask = '';
      if (
        polling &&
        callAfterDelay &&
        loop &&
        count === 1 &&
        action &&
        action.cancel
      ) {
        const { cancel: _cancelTask } = yield race({
          posts: call(delayFunction || delay, Delay),
          cancel: take(action.cancel),
        });
        cancelTask = _cancelTask;
        if (cancelTask) {
          loop = false;
          if (!dontUpdateReducer)
            yield call(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_CANCEL,
              axiosCancel: cancelTask,
            });
          break;
        }
      }
      try {
        let cacheId;
        if (cacheControl) cacheId = `${_url || ''}_${JSON.stringify(request)}`;
        if (
          cacheControl &&
          request.method === 'GET' &&
          _cache[cacheId] &&
          !polling
        ) {
          postData = { ..._cache[cacheId] };
        } else {
          const {
            posts: _postData,
            cancel: _cancelTask,
            cancel_filter: cancelFilterTask,
          } = yield race({
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
            cancel_filter: take(
              cancelKey && typeOf(cancelKey) === 'string' && cancelKey.length
                ? `${action.cancel}_[${cancelKey}]`
                : action.cancel,
            ),
          });
          cancelTask = _cancelTask || cancelFilterTask;
          postData = typeof _postData !== 'undefined' ? { ..._postData } : {};
        }
        let data = postData ? { ...postData } : postData;
        postData = postData || {};
        if (postData && postData.data) {
          const statusKey = action.api.responseStatusCodeKey || '';
          data = {
            data: {
              status:
                ((action.api.responseStatusCode || []).includes(
                  (postData.data || {})[statusKey],
                )
                  ? postData.status || 200
                  : (postData.data || {})[statusKey]) ||
                (postData && postData.status),
              statusCode:
                (postData.data || {})[statusKey] ||
                (postData && postData.status),
              message:
                (postData.data || {})[action.api.responseMessageKey || ''] ||
                (postData && postData.message),
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
                    ((postData && postData.data) || {})[
                      action.api.errorDataKey || 'error'
                    ] ||
                    (postData && postData.data) ||
                    postData,
                  status: data.data.status,
                  statusCode: data.data.status,
                  message: data.data.message || 'Error',
                },
              },
            });
          }
        }

        if (data && postData.data) {
          const {
            data: {
              status: successStatus = postData && postData.status,
              message: successMessage = '',
            } = {},
          } = data || {};
          action.success = action.success.bind(
            {},
            successStatus,
            successMessage,
          );
          let successCallbackResponse = null;
          if (typeof successCallback === 'function') {
            const {
              cancel: CancelPolling,
              successCallbackResponse: _successCallbackResponse = null,
            } = yield race({
              successCallbackResponse: call(successCallback, {
                response: postData,
                posts: data,
                data: data.data,
                res: data && data.data && data.data.data,
                message: successMessage,
                status: successStatus,
              }),
              cancel: take(action.cancel),
            });
            if (CancelPolling) loop = false;
            successCallbackResponse = _successCallbackResponse;
          }
          if (successCallbackResponse)
            if (typeOf(successCallbackResponse) === 'object') {
              commonData._errortask = undefined;
              if (typeOf(successCallbackResponse.task) === 'object')
                commonData.task = successCallbackResponse.task;
              if (successCallbackResponse.filter)
                commonData.filter = successCallbackResponse.filter;
              if (successCallbackResponse.updateDataReducerKey)
                commonData.updateDataReducerKey =
                  successCallbackResponse.updateDataReducerKey;
              if (
                typeOf(successCallbackResponse.tasks) === 'array' &&
                successCallbackResponse.tasks.filter(
                  e => e.task || e.filter || e.updateDataReducerKey,
                ).length > 0
              )
                commonData.tasks = successCallbackResponse.tasks;
            } else if (
              typeOf(successCallbackResponse) === 'array' &&
              successCallbackResponse.filter(
                e => e.task || e.filter || e.updateDataReducerKey,
              ).length > 0
            )
              commonData.tasks = successCallbackResponse;
          let loader = null;
          if (!dontUpdateReducerOnSucess && !dontUpdateReducer)
            loader = yield call(requestResponseHandler, {
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
            setTimeout(() => logoutCallback(data), 100);
        } else if (
          cancelTask &&
          (typeof source.cancel === 'function' || onCancelTask)
        ) {
          const cancelResponse = yield (onCancelTask || source.cancel)();
          if (typeof cancelCallback === 'function')
            cancelCallback(cancelResponse);
          const { response: { method: customMethod } = {} } = cancelTask || {};
          if (!customMethod && !dontUpdateReducer)
            yield call(requestResponseHandler, {
              type,
              action,
              payload: commonData,
              actionData: rest,
              method: constants.ON_CANCEL,
              axiosCancel: cancelTask,
            });
          if (customMethod !== constants.ON_UNMOUNT && !dontUpdateReducer)
            yield call(loaderGenerator, {
              type,
              commonData,
            });
          loop = false;
        } else if (process.env.NODE_ENV === 'test' && action.success)
          yield put(action.success({ data }));
        else {
          if (typeof successCallback === 'function' && !cancelTask) {
            successCallback({
              response: postData,
              status: postData && postData.status,
            });
          }
          if (!dontUpdateReducer)
            yield call(loaderGenerator, {
              type,
              commonData,
            });
        }
        if (
          polling &&
          typeof window !== 'undefined' &&
          typeof pollingCallback === 'function' &&
          loop
        ) {
          const {
            data: {
              status: successStatus = postData && postData.status,
              message: successMessage = '',
            } = {},
          } = data || {};
          POLLING_RESPONSE_DATA = {
            response: data,
            data: data && data.data,
            message: successMessage,
            status: successStatus,
            count,
            request:
              typeof asyncFunction === 'function'
                ? Array.isArray(
                    (pollingRequestConfig &&
                      pollingRequestConfig.asyncFunctionParams) ||
                      asyncFunctionParams,
                  )
                  ? (pollingRequestConfig &&
                      pollingRequestConfig.asyncFunctionParams) ||
                    asyncFunctionParams
                  : []
                : pollingRequestConfig || request,
          };
        }
        // cancel looping on success if retry is true
        if (!polling && retry) loop = false;

        if (resolve && typeOf(resolve) === 'function') {
          if (cancelTask && typeof source.cancel === 'function') {
            resolve({
              status: 'CANCELLED',
              response: null,
              data: null,
            });
          } else {
            resolve({
              status: 'SUCCESS',
              response: postData,
              data: data && data.data && data.data.data,
            });
            if (cacheControl) _cache[cacheId] = postData;
          }
        }
      } catch (error) {
        try {
          if (error && typeof error === 'object' && !error.isAxiosError)
            throw new Error(error);
          if (!polling && retry && retry - 1 >= count) {
            // console.log(count);
          } else {
            if (isReject && reject && typeOf(reject) === 'function')
              reject({
                status: 'ERROR',
                error: error || 'NETWORK ERROR',
                respone: error && error.response,
              });
            else if (resolve && typeOf(resolve) === 'function')
              resolve({
                status: 'ERROR',
                error: error || 'NETWORK ERROR',
                respone: error && error.response,
              });
            // eslint-disable-next-line no-console
            if (process.env.NODE_ENV === 'test') console.log(error);
            const {
              response: {
                data: {
                  [action.api.errorDataKey || 'error']: errorData = (error &&
                    error.response &&
                    error.response.data) ||
                    (error && error.response) ||
                    '',
                  status: errorStatus = error &&
                    error.response &&
                    error.response.data &&
                    (error.response.data[action.api.errorStatusKey] ||
                      (error && error.response && error.response.status)),
                  message: errorMessage = (error &&
                    error.response &&
                    error.response.data &&
                    error.response.data[action.api.errorMessageKey]) ||
                    (error && error.response && error.response.statusText) ||
                    (error && error.message) ||
                    '',
                } = {},
              } = {},
            } = error || {};
            if (typeof errorCallback === 'function') {
              let errorCallbackResponse = null;
              if (typeof errorCallback === 'function') {
                const {
                  cancel: CancelPolling,
                  errorCallbackResponse: _errorCallbackResponse = null,
                } = yield race({
                  errorCallbackResponse: call(errorCallback, {
                    error,
                    errorData: isResponseErrorParser
                      ? errorData &&
                        typeof responseErrorParser(errorData) === 'object' &&
                        Object.keys(responseErrorParser(errorData) || {})
                          .length > 0
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
                    isNetworkError:
                      error &&
                      error.request &&
                      error.message === 'Network Error',
                    errorMessage: error && error.message,
                    message: errorMessage,
                    status: errorStatus,
                    response: error && error.response,
                    errors: errorData,
                  }),
                  cancel: take(action.cancel),
                });
                if (CancelPolling) loop = false;
                errorCallbackResponse = _errorCallbackResponse;
              }
              if (errorCallbackResponse) {
                if (
                  typeOf(errorCallbackResponse) === 'boolean' &&
                  errorCallbackResponse
                )
                  commonData._errortask = true;
                else if (
                  typeOf(errorCallbackResponse) === 'object' &&
                  Object.keys(errorCallbackResponse).length > 0
                ) {
                  commonData._errortask = true;
                  if (typeOf(errorCallbackResponse.task) === 'object')
                    commonData.task = errorCallbackResponse.task;
                  if (errorCallbackResponse.filter)
                    commonData.filter = errorCallbackResponse.filter;
                  if (errorCallbackResponse.updateDataReducerKey)
                    commonData.updateDataReducerKey =
                      errorCallbackResponse.updateDataReducerKey;
                  if (typeOf(errorCallbackResponse.tasks) !== 'undefined')
                    commonData.tasks = errorCallbackResponse.tasks;
                  if (
                    typeOf(errorCallbackResponse.tasks) === 'array' &&
                    errorCallbackResponse.tasks.filter(e => e.task || e.filter)
                      .length > 0
                  )
                    commonData.tasks = errorCallbackResponse.tasks;
                } else if (
                  typeOf(errorCallbackResponse) === 'array' &&
                  errorCallbackResponse.filter(e => typeOf(e) === 'object')
                    .length > 0
                ) {
                  commonData._errortask = true;
                  commonData.tasks = errorCallbackResponse.filter(
                    e => typeOf(e) === 'object',
                  );
                } else commonData._errortask = false;
              }
            }
            action.error = action.error.bind({}, errorStatus, errorMessage);
            if (
              AxiosDefault.isCancel(error) &&
              action.cancel &&
              !dontUpdateReducer &&
              !dontUpdateReducerOnError
            ) {
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
            } else if (!dontUpdateReducer && !dontUpdateReducerOnError) {
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
        } catch (e) {
          throw new Error(e);
        }
      } finally {
        const Cancelled = yield cancelled();
        if (typeof finalCallback === 'function') {
          const { cancel: CancelPolling } = yield race({
            finalRes: call(finalCallback, {
              type,
              action,
              payload: commonData,
              Cancelled,
            }),
            cancel: take(action.cancel),
          });
          if (CancelPolling) loop = false;
        }
        if (!dontUpdateReducer)
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
            posts: call(delayFunction || delay, Delay),
            cancel: take(action.cancel),
          });
          if (CancelPolling) loop = false;
          else if (
            polling &&
            typeof window !== 'undefined' &&
            typeof pollingCallback === 'function' &&
            loop
          ) {
            const { cancel: _CancelPolling, pollingRes } = yield race({
              pollingRes: call(pollingCallback, POLLING_RESPONSE_DATA),
              cancel: take(action.cancel),
            });
            if (_CancelPolling) loop = false;
            else if (typeof pollingRes === 'boolean') loop = pollingRes;
            else if (
              Object.prototype.toString.call(pollingRes) === '[object Object]'
            )
              pollingRequestConfig = pollingRes;
          }
        } else loop = false;
      } else if (!polling && retry && loop) {
        if (retry - 1 >= count) {
          loop = true;
          count += 1;
        } else loop = false;
      } else loop = false;
    }
  }

  const generatorPattern = Object.keys(actionType).map(pattern =>
    actionType[pattern].api &&
    actionType[pattern].api[IS_DEBOUNCE_API_CALL] &&
    actionType[pattern].api[DEBOUNCE_API_CALL_DELAY_IN_MS] > 0 &&
    typeof debounce === 'function'
      ? debounce(
          actionType[pattern].api[DEBOUNCE_API_CALL_DELAY_IN_MS],
          pattern,
          commonGenerator,
          !!actionType[pattern].effect,
        )
      : (actionType[pattern].effect || takeLatest)(pattern, commonGenerator),
  );
  return [generatorPattern, commonGenerator];
}
