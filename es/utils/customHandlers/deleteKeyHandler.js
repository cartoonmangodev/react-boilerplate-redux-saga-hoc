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
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(function (_key) {
      _obj = Array.isArray(_key) ? (0, _helpers.deleteIn)(_obj, _key) : (0, _helpers.deleteIn)(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

var executeTask = function executeTask(_ref, data) {
  var updateCallback = _ref.updateCallback,
      successData = _ref.successData,
      deleteKey = _ref.deleteKey,
      id = _ref.id,
      key = _ref.key;
  return updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]);
  }, []) : data.map(function (_data) {
    return _data[key] === id ? deletedData(_data, deleteKey) : _data;
  });
};

var deleteKeyHandler = function deleteKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$deleteKey = _ref2$task.deleteKey,
      deleteKey = _ref2$task$deleteKey === void 0 ? [] : _ref2$task$deleteKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      updateCallback: updateCallback,
      successData: successData,
      deleteKey: deleteKey,
      id: id,
      key: key
    };
    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask(commonData, _Data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.deleteKeyHandler = deleteKeyHandler;