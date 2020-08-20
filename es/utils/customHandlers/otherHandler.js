"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducerLogHandler = exports.previousDataHandler = void 0;

const previousDataHandler = ({
  data
} = {}) => ({
  previousData: data
});

exports.previousDataHandler = previousDataHandler;

const reducerLogHandler = (old, newData) => {
  // eslint-disable-next-line no-console
  console.log('OLD STATE : ', old, '\n', 'NEW STATE : ', newData);
};

exports.reducerLogHandler = reducerLogHandler;