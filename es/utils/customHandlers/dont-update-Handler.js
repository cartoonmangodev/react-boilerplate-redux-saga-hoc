"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontUpdateDataHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable */
var dontUpdateDataHandler = function dontUpdateDataHandler(_ref) {
  var successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        statusCode = _ref2.statusCode;

    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.dontUpdateDataHandler = dontUpdateDataHandler;