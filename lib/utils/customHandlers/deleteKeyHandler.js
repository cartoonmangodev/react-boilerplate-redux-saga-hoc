"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteKeyHandler = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import _remove from 'lodash/remove';
var deletedData = function deletedData() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keyArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line no-underscore-dangle
  var _obj = obj;
  _obj = (0, _helpers.typeOf)(obj) === 'object' ? _objectSpread({}, _obj) : _obj;

  if ((0, _helpers.typeOf)(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(_key => {
      _obj = Array.isArray(_key) ? (0, _helpers.deleteIn)(_obj, _key) : (0, _helpers.deleteIn)(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

var executeTask = (_ref, data) => {
  var {
    updateCallback,
    successData,
    deleteKey,
    id,
    key
  } = _ref;
  return updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce((acc, curr) => id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]), []) : data.map(_data => _data[key] === id ? deletedData(_data, deleteKey) : _data);
};

var deleteKeyHandler = (_ref2) => {
  var {
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
  } = _ref2;
  return function () {
    var {
      data = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var commonData = {
      updateCallback,
      successData,
      deleteKey,
      id,
      key
    };
    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, successData, {
        [subKey[0]]: data[subKey[0]]
      }), subKey, _Data => executeTask(commonData, _Data)) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.deleteKeyHandler = deleteKeyHandler;