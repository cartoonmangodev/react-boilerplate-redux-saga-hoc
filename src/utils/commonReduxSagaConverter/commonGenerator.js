/* eslint-disable no-console */
/* eslint-disable func-names */
import Qs from 'query-string';
import {
  call,
  put,
  cancelled,
  race,
  take,
  takeLatest,
} from 'redux-saga/effects';
import * as constants from './commonConstants';
import { responseErrorParser } from '../index';
import Axios from '../../config/axios';
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

export default function({
  actionType = {},
  requestResponseHandler,
  axiosInterceptors,
}) {
  function* commonGenerator({
    payload: {
      request: {
        payload = {},
        params,
        query,
        paramsSerializer = { arrayFormat: 'brackets' },
        axiosConfig = {},
        polling = false,
        delay: Delay = 8000,
        ...rest
      } = {},
      callback: {
        successCallback,
        errorCallback,
        logoutCallback,
        finalCallback,
        ...restCallback
      } = {},
      ...restPayload
    },
    type,
  }) {
    let loop = true;
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
      const commonData = {
        payload,
        params,
        query,
        ...rest,
        request: {
          payload,
          params,
          query,
          ...rest,
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
        url: action.api.url,
        method: action.api.method || 'GET',
        data: payload,
        headers,
      };
      if (action.effect) yield delete action.effect;
      if (action.actions) yield delete action.actions;
      if (params && typeof request.url === 'function')
        request.url = yield request.url(params);
      if (query) {
        request.params = query;
        request.paramsSerializer = function(param) {
          return Qs.stringify(param, paramsSerializer);
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
          posts: call(axios, { ...request, ...axiosConfig }),
          cancel: take(action.cancel),
        });
        let data = postData;
        if (postData && postData.data) {
          const statusKey = action.api.responseStatusCodeKey || 'status';
          data = {
            data: {
              status:
                ((action.api.responseStatusCode || []).includes(
                  (postData.data || {})[statusKey],
                )
                  ? 200
                  : (postData.data || {})[statusKey]) ||
                (postData.data || {}).status ||
                postData.status,
              message: (postData.data || {})[
                action.api.responseMessageKey || 'message'
              ],
              data:
                (postData.data || {})[action.api.responseDataKey] ||
                postData.data,
            },
          };
          if (
            action.api.errorHandlerStatusCode &&
            (action.api.errorHandlerStatusCode || []).includes(data.data.status)
          ) {
            throw new CustomError({
              response: {
                data: {
                  error:
                    (postData.data || {})[action.api.errorDataKey || 'error'] ||
                    postData.data,
                  status: data.data.status,
                  message: data.data.message,
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
          if (typeof successCallback === 'function')
            yield successCallback({
              res: data,
              data: data.data,
              message: successMessage,
              status: successStatus,
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
      } catch (error) {
        console.error(error);
        if (process.env.NODE_ENV === 'test') console.error(error);
        const {
          response: {
            data: {
              [action.api.errorDataKey || 'error']: errorData = (error &&
                error.response &&
                error.response.data) ||
                '',
              status: errorStatus,
              message: errorMessage = (error.response &&
                error.response &&
                error.response[action.api.errorMessageKey]) ||
                [],
            } = {},
          } = {},
        } = error || {};
        if (typeof errorCallback === 'function')
          yield errorCallback({
            error,
            errorData: responseErrorParser(errorData),
            message: errorMessage,
            status: errorStatus,
            errors: errorData,
          });
        yield (action.error = action.error.bind({}, errorStatus, errorMessage));
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
            error,
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
      if (polling) yield call(delay, Delay);
      else loop = false;
    } while (loop);
  }

  const generatorPattern = Object.keys(actionType).map(pattern =>
    (actionType[pattern].effect || takeLatest)(pattern, commonGenerator),
  );
  return [generatorPattern, commonGenerator];
}
