"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontUpdateDataHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable */
var dontUpdateDataHandler = (_ref) => {
  var {
    successDataStatusCode
  } = _ref;
  return function () {
    var {
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.dontUpdateDataHandler = dontUpdateDataHandler;