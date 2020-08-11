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
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr, keyArray.includes(curr) ? !obj[curr] : obj[curr]));
  }, {});
};

var toggleKeyHandler = function toggleKeyHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$toggleKey = _ref$task.toggleKey,
      toggleKey = _ref$task$toggleKey === void 0 ? [] : _ref$task$toggleKey,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread(_objectSpread(_objectSpread({}, data), successData), {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) && toggleData(_Data, toggleKey) || Array.isArray(id) && _Data.reduce(function (acc, curr) {
          return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
        }, []) || _Data.map(function (_data) {
          return _data[key] === id ? toggleData(_data, toggleKey) : _data;
        });
      }) : updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) && toggleData(data, toggleKey) || Array.isArray(id) && data.reduce(function (acc, curr) {
        return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
      }, []) || data.map(function (_data) {
        return _data[key] === id ? toggleData(_data, toggleKey) : _data;
      }),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.toggleKeyHandler = toggleKeyHandler;