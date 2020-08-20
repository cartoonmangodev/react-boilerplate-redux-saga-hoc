"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleKeyHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */
const toggleData = (obj, keyArray) => Object.keys(obj).reduce((acc, curr) => ({ ...acc,
  [curr]: keyArray.includes(curr) ? !obj[curr] : obj[curr]
}), {});

const executeTask = ({
  successData,
  toggleKey,
  id,
  key,
  updateCallback
}, _Data) => updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce((acc, curr) => id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]), []) : _Data.map(_data => _data[key] === id ? toggleData(_data, toggleKey) : _data);

const toggleKeyHandler = ({
  task: {
    key,
    id,
    toggleKey = [],
    subKey = []
  } = {},
  callback: {
    updateCallback
  } = {},
  successData = {},
  successDataStatusCode
}) => ({
  data = {},
  statusCode
} = {}) => {
  const commonData = {
    successData,
    toggleKey,
    id,
    key,
    updateCallback
  };
  return {
    data: subKey.length > 0 ? (0, _helpers.updateIn)({ ...data,
      ...((0, _helpers.typeOf)(successData) === 'object' ? successData : {}),
      [subKey[0]]: data[subKey[0]]
    }, subKey, _Data => executeTask(commonData, _Data)) : executeTask(commonData, data),
    statusCode: successDataStatusCode || statusCode,
    lastUpdated: (0, _helpers.generateTimeStamp)(),
    isError: false
  };
};

exports.toggleKeyHandler = toggleKeyHandler;