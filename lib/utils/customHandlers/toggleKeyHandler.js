"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleKeyHandler = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toggleData = function toggleData(obj, keyArray) {
  return Object.keys(obj).reduce(function (acc, curr) {
    return _objectSpread({}, acc, _defineProperty({}, curr, keyArray.includes(curr) ? !obj[curr] : obj[curr]));
  }, {});
};

var executeTask = function executeTask(_ref, _Data) {
  var successData = _ref.successData,
      toggleKey = _ref.toggleKey,
      id = _ref.id,
      key = _ref.key,
      updateCallback = _ref.updateCallback;
  return updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
  }, []) : _Data.map(function (_data) {
    return _data[key] === id ? toggleData(_data, toggleKey) : _data;
  });
};

var toggleKeyHandler = function toggleKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$toggleKey = _ref2$task.toggleKey,
      toggleKey = _ref2$task$toggleKey === void 0 ? [] : _ref2$task$toggleKey,
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
      successData: successData,
      toggleKey: toggleKey,
      id: id,
      key: key,
      updateCallback: updateCallback
    };
    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, (0, _helpers.typeOf)(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask(commonData, _Data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.toggleKeyHandler = toggleKeyHandler;