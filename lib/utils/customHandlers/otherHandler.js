"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducerLogHandler = exports.previousDataHandler = void 0;

var previousDataHandler = function previousDataHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      data = _ref.data;

  return {
    previousData: data
  };
};

exports.previousDataHandler = previousDataHandler;

var reducerLogHandler = function reducerLogHandler(old, newData) {
  // eslint-disable-next-line no-console
  console.log('OLD STATE : ', old, '\n', 'NEW STATE : ', newData);
};

exports.reducerLogHandler = reducerLogHandler;