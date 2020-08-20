"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteHandler = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var executeTask = function executeTask(_ref, data) {
  var id = _ref.id,
      key = _ref.key;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc : acc.concat([curr]);
  }, []) : data.filter(function (_ref2) {
    var objId = _ref2[key];
    return objId !== id;
  });
};

var deleteHandler = function deleteHandler(_ref3) {
  var _ref3$task = _ref3.task;
  _ref3$task = _ref3$task === void 0 ? {} : _ref3$task;
  var key = _ref3$task.key,
      id = _ref3$task.id,
      _ref3$task$subKey = _ref3$task.subKey,
      subKey = _ref3$task$subKey === void 0 ? [] : _ref3$task$subKey,
      _ref3$successData = _ref3.successData,
      successData = _ref3$successData === void 0 ? {} : _ref3$successData,
      successDataStatusCode = _ref3.successDataStatusCode;
  return function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$data = _ref4.data,
        data = _ref4$data === void 0 ? [] : _ref4$data,
        statusCode = _ref4.statusCode;

    var commonData = {
      key: key,
      id: id
    };

    var _successData = (0, _helpers.typeOf)(successData) === 'object' ? successData : {};

    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, _successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_data) {
        return executeTask(commonData, _data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.deleteHandler = deleteHandler;