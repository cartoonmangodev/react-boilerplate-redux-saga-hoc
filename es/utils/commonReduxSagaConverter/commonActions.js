"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiLoadingStatus = apiLoadingStatus;
exports.actionsHandler = void 0;

var constants = _interopRequireWildcard(require("./commonConstants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// <============================ common actions ==============================>
var successAction = actionType => function (type, method, payload, statusCode, message) {
  var data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  return {
    type: actionType,
    response: {
      type,
      data,
      payload,
      statusCode,
      message,
      method
    }
  };
};

var errorAction = actionType => function (type, method, payload, statusCode, message) {
  var error = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  return {
    type: actionType,
    response: {
      type,
      error,
      payload,
      statusCode,
      message,
      method
    }
  };
};

var callAction = actionType => function () {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: actionType,
    payload
  };
};

var cancelAction = actionType => (type, method, filter) => ({
  type: actionType,
  response: {
    type,
    method,
    payload: {
      filter
    }
  }
});

var customAction = actionType => function (type, method, payload) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var statusCode = arguments.length > 4 ? arguments[4] : undefined;
  return {
    type: actionType,
    response: {
      type,
      method,
      data,
      statusCode: statusCode || method === constants.ON_SUCCESS ? 200 : null,
      customTask: true,
      payload
    }
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
  var {
    type,
    data = {},
    status = true,
    loader,
    payload
  } = _ref;
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