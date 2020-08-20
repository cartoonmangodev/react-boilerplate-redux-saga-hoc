"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiLoadingStatus = apiLoadingStatus;
exports.actionsHandler = void 0;

var constants = _interopRequireWildcard(require("./commonConstants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// <============================ common actions ==============================>
var successAction = function successAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
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
  return function (type, method, payload, statusCode, message) {
    var error = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
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
  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
  return function (type, method, payload) {
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var statusCode = arguments.length > 4 ? arguments[4] : undefined;
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

var actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};
exports.actionsHandler = actionsHandler;

function apiLoadingStatus(_ref) {
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