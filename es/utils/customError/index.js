"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function CustomError(err) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fileName = arguments.length > 2 ? arguments[2] : undefined;
  var lineNumber = arguments.length > 3 ? arguments[3] : undefined;
  var instance = new Error(message, fileName, lineNumber);
  instance = err;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError);
  }

  return instance;
}

CustomError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomError, Error);
}

var _default = CustomError;
exports.default = _default;