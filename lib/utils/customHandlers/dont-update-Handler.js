"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontUpdateDataHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable */
const dontUpdateDataHandler = ({
  successDataStatusCode
}) => ({
  statusCode
} = {}) => ({
  statusCode: successDataStatusCode || statusCode,
  error: false,
  lastUpdated: (0, _helpers.generateTimeStamp)(),
  isError: false
});

exports.dontUpdateDataHandler = dontUpdateDataHandler;