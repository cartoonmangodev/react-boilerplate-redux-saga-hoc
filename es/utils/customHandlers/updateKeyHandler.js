"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateKeyHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const updateData = (data, successData, updateCallback, updateKey) => {
  if (updateCallback) return updateCallback(data, successData) || data;

  if (typeof successData === 'object' && !Array.isArray(successData) && typeof data === 'object' && !Array.isArray(data)) {
    return !updateKey ? data : updateKey.reduce((acc, key) => {
      if (Array.isArray(key) && key.length > 0) {
        return (0, _helpers.updateIn)(acc, key, _data => (0, _nullCheck.default)(successData, `.${key.join('.')}`));
      }

      return { ...acc,
        [key]: successData[key]
      };
    }, data);
  }

  return successData;
};

const updateKeyHandler = ({
  task: {
    key,
    id,
    subKey = [],
    values = {},
    updateKey = []
  } = {},
  callback: {
    updateCallback
  } = {},
  successData = {},
  successDataStatusCode
}) => ({
  data = [],
  statusCode
} = {}) => ({
  data: subKey.length > 0 ? (0, _helpers.updateIn)({ ...data,
    ...successData,
    [subKey[0]]: data[subKey[0]]
  }, subKey, _Data => (() => {
    let index = -1;

    const _values = Array.isArray(values);
    /**  update data if old data is object */


    if (!Array.isArray(_Data)) return updateData(_Data, (0, _nullCheck.default)(successData, `.${subKey.join('.')}`), updateCallback, updateKey);else if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce((acc, curr = {}) => id.includes(curr[key]) ? (() => {
      index = index + 1;
      return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
    })() : acc.concat([curr]), []);else if ((id === 0 || id) && key) return _Data.map(_data => _data[key] === id ? (() => {
      index = index + 1;
      return updateData(_data, values[_values ? index : curr[key]] || _data, updateCallback, updateKey);
    })() : _data);
    return updateData(_Data, (0, _nullCheck.default)(successData, `.${subKey.join('.')}`), updateCallback, updateKey);
  })()) : (() => {
    let index = -1;

    const _values = Array.isArray(values);

    if (!Array.isArray(data)) return updateData(data, successData, updateCallback, updateKey);else if (Array.isArray(id) && key) return data.reduce((acc, curr = {}) => id.includes(curr[key]) ? (() => {
      index = index + 1;
      return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
    })() : acc.concat([curr]), []);else if ((id === 0 || id) && key) return data.map(_data => _data[key] === id ? (() => {
      index = index + 1;
      return updateData(_data, values[_values ? index : curr[key]] || _data, updateCallback, updateKey);
    })() : _data);
    return updateData(data, successData, updateCallback, updateKey);
  })(),
  statusCode: successDataStatusCode || statusCode,
  lastUpdated: (0, _helpers.generateTimeStamp)(),
  isError: false
});

exports.updateKeyHandler = updateKeyHandler;