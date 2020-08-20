"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleKeyHandler = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toggleData = (obj, keyArray) => Object.keys(obj).reduce((acc, curr) => _objectSpread({}, acc, {
  [curr]: keyArray.includes(curr) ? !obj[curr] : obj[curr]
}), {});

var executeTask = (_ref, _Data) => {
  var {
    successData,
    toggleKey,
    id,
    key,
    updateCallback
  } = _ref;
  return updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce((acc, curr) => id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]), []) : _Data.map(_data => _data[key] === id ? toggleData(_data, toggleKey) : _data);
};

var toggleKeyHandler = (_ref2) => {
  var {
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
  } = _ref2;
  return function () {
    var {
      data = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var commonData = {
      successData,
      toggleKey,
      id,
      key,
      updateCallback
    };
    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, (0, _helpers.typeOf)(successData) === 'object' ? successData : {}, {
        [subKey[0]]: data[subKey[0]]
      }), subKey, _Data => executeTask(commonData, _Data)) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.toggleKeyHandler = toggleKeyHandler;