"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiLoadingStatus = apiLoadingStatus;
exports.actionsHandler = void 0;

var constants = _interopRequireWildcard(require("./commonConstants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// <============================ common actions ==============================>
const successAction = actionType => (type, method, payload, statusCode, message, data = {}) => ({
  type: actionType,
  response: {
    type,
    data,
    payload,
    statusCode,
    message,
    method
  }
});

const errorAction = actionType => (type, method, payload, statusCode, message, error = {}) => ({
  type: actionType,
  response: {
    type,
    error,
    payload,
    statusCode,
    message,
    method
  }
});

const callAction = actionType => (payload = {}) => ({
  type: actionType,
  payload
});

const cancelAction = actionType => (type, method, filter) => ({
  type: actionType,
  response: {
    type,
    method,
    payload: {
      filter
    }
  }
});

const customAction = actionType => (type, method, payload, data = {}, statusCode) => ({
  type: actionType,
  response: {
    type,
    method,
    data,
    statusCode: statusCode || method === constants.ON_SUCCESS ? 200 : null,
    customTask: true,
    payload
  }
});

const actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};
exports.actionsHandler = actionsHandler;

function apiLoadingStatus({
  type,
  data = {},
  status = true,
  loader,
  payload
}) {
  return {
    type: constants.API_LOADING_STATUS,
    response: {
      type,
      status,
      data,
      loader,
      payload,
      method: constants.ON_LOADING
    }
  };
}