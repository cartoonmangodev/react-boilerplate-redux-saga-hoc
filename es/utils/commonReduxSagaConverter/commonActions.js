// <============================ common actions ==============================>
import * as constants from './commonConstants';

var successAction = function successAction(actionType) {
  return function (type, method, payload, statusCode, message, data) {
    if (data === void 0) {
      data = {};
    }

    return {
      type: actionType,
      response: {
        type: type,
        data: data,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var errorAction = function errorAction(actionType) {
  return function (type, method, payload, statusCode, message, error) {
    if (error === void 0) {
      error = {};
    }

    return {
      type: actionType,
      response: {
        type: type,
        error: error,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var callAction = function callAction(actionType) {
  return function (payload) {
    if (payload === void 0) {
      payload = {};
    }

    return {
      type: actionType,
      payload: payload
    };
  };
};

var cancelAction = function cancelAction(actionType) {
  return function (type, method, filter) {
    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        payload: {
          filter: filter
        }
      }
    };
  };
};

var customAction = function customAction(actionType) {
  return function (type, method, payload, data, statusCode) {
    if (data === void 0) {
      data = {};
    }

    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        data: data,
        statusCode: statusCode || method === constants.ON_SUCCESS ? 200 : null,
        customTask: true,
        payload: payload
      }
    };
  };
};

export var actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};
export function apiLoadingStatus(_ref) {
  var type = _ref.type,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? true : _ref$status,
      loader = _ref.loader,
      payload = _ref.payload;
  return {
    type: constants.API_LOADING_STATUS,
    response: {
      type: type,
      status: status,
      data: data,
      loader: loader,
      payload: payload,
      method: constants.ON_LOADING
    }
  };
}