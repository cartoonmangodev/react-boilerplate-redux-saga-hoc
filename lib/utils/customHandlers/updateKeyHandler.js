"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateKeyHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateData = (data, successData, updateCallback, updateKey) => {
  if (updateCallback) return updateCallback(data, successData) || data;

  if (typeof successData === 'object' && !Array.isArray(successData) && typeof data === 'object' && !Array.isArray(data)) {
    return !updateKey ? data : updateKey.reduce((acc, key) => {
      if (Array.isArray(key) && key.length > 0) {
        return (0, _helpers.updateIn)(acc, key, _data => (0, _nullCheck.default)(successData, ".".concat(key.join('.'))));
      }

      return _objectSpread({}, acc, {
        [key]: successData[key]
      });
    }, data);
  }

  return successData;
};

var updateKeyHandler = (_ref) => {
  var {
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
  } = _ref;
  return function () {
    var {
      data = [],
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, successData, {
        [subKey[0]]: data[subKey[0]]
      }), subKey, _Data => (() => {
        var index = -1;

        var _values = Array.isArray(values);
        /**  update data if old data is object */


        if (!Array.isArray(_Data)) return updateData(_Data, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey);else if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? (() => {
            index = index + 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
          })() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return _Data.map(_data => _data[key] === id ? (() => {
          index = index + 1;
          return updateData(_data, values[_values ? index : curr[key]] || _data, updateCallback, updateKey);
        })() : _data);
        return updateData(_Data, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey);
      })()) : (() => {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData(data, successData, updateCallback, updateKey);else if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? (() => {
            index = index + 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
          })() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return data.map(_data => _data[key] === id ? (() => {
          index = index + 1;
          return updateData(_data, values[_values ? index : curr[key]] || _data, updateCallback, updateKey);
        })() : _data);
        return updateData(data, successData, updateCallback, updateKey);
      })(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.updateKeyHandler = updateKeyHandler;