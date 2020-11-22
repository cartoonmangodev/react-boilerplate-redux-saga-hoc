// <============================ common actions ==============================>
import * as constants from './commonConstants';

const successAction = actionType => (
  type,
  method,
  payload,
  statusCode,
  message,
  data = {},
) => ({
  type: actionType,
  response: {
    type,
    data,
    payload,
    statusCode,
    message,
    method,
  },
});
const errorAction = actionType => (
  type,
  method,
  payload,
  statusCode,
  message,
  error = {},
) => ({
  type: actionType,
  response: {
    type,
    error,
    payload,
    statusCode,
    message,
    method,
  },
});
const callAction = actionType => (payload = {}) => ({
  type: actionType,
  payload,
});
const cancelAction = actionType => (type, method, filter, cancelFilter) => ({
  type:
    cancelFilter && Array.isArray(cancelFilter) && cancelFilter.length
      ? `${actionType}_${cancelFilter.join('_')}`
      : actionType,
  response: {
    type,
    method,
    payload: { filter },
  },
});
const customAction = actionType => (
  type,
  method,
  payload,
  data = {},
  statusCode,
) => ({
  type: actionType,
  response: {
    type,
    method,
    data,
    statusCode: statusCode || method === constants.ON_SUCCESS ? 200 : null,
    customTask: true,
    payload,
  },
});

export const actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction,
};

export function apiLoadingStatus({
  type,
  data = {},
  status = true,
  loader,
  payload,
}) {
  return {
    type: constants.API_LOADING_STATUS,
    response: {
      type,
      status,
      data,
      loader,
      payload,
      method: constants.ON_LOADING,
    },
  };
}
