"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteKeyHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */
// import _remove from 'lodash/remove';
const deletedData = (obj = {}, keyArray = []) => {
  // eslint-disable-next-line no-underscore-dangle
  let _obj = obj;
  _obj = (0, _helpers.typeOf)(obj) === 'object' ? { ..._obj
  } : _obj;

  if ((0, _helpers.typeOf)(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(_key => {
      _obj = Array.isArray(_key) ? (0, _helpers.deleteIn)(_obj, _key) : (0, _helpers.deleteIn)(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

const executeTask = ({
  updateCallback,
  successData,
  deleteKey,
  id,
  key
}, data) => updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce((acc, curr) => id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]), []) : data.map(_data => _data[key] === id ? deletedData(_data, deleteKey) : _data);

const deleteKeyHandler = ({
  task: {
    key,
    id,
    deleteKey = [],
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
    updateCallback,
    successData,
    deleteKey,
    id,
    key
  };
  return {
    data: subKey.length > 0 ? (0, _helpers.updateIn)({ ...data,
      ...successData,
      [subKey[0]]: data[subKey[0]]
    }, subKey, _Data => executeTask(commonData, _Data)) : executeTask(commonData, data),
    statusCode: successDataStatusCode || statusCode,
    lastUpdated: (0, _helpers.generateTimeStamp)(),
    isError: false
  };
};

exports.deleteKeyHandler = deleteKeyHandler;