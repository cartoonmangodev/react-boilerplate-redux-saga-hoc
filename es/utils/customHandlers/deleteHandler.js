"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */
const executeTask = ({
  id,
  key
}, data) => !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce((acc, curr) => id.includes(curr[key]) ? acc : acc.concat([curr]), []) : data.filter(({
  [key]: objId
}) => objId !== id);

const deleteHandler = ({
  task: {
    key,
    id,
    subKey = []
  } = {},
  successData = {},
  successDataStatusCode
}) => ({
  data = [],
  statusCode
} = {}) => {
  const commonData = {
    key,
    id
  };

  const _successData = (0, _helpers.typeOf)(successData) === 'object' ? successData : {};

  return {
    data: subKey.length > 0 ? (0, _helpers.updateIn)({ ...data,
      ..._successData,
      [subKey[0]]: data[subKey[0]]
    }, subKey, _data => executeTask(commonData, _data)) : executeTask(commonData, data),
    statusCode: successDataStatusCode || statusCode,
    lastUpdated: (0, _helpers.generateTimeStamp)(),
    isError: false
  };
};

exports.deleteHandler = deleteHandler;