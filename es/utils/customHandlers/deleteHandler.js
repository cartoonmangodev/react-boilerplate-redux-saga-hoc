"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteHandler = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var executeTask = (_ref, data) => {
  var {
    id,
    key
  } = _ref;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce((acc, curr) => id.includes(curr[key]) ? acc : acc.concat([curr]), []) : data.filter((_ref2) => {
    var {
      [key]: objId
    } = _ref2;
    return objId !== id;
  });
};

var deleteHandler = (_ref3) => {
  var {
    task: {
      key,
      id,
      subKey = []
    } = {},
    successData = {},
    successDataStatusCode
  } = _ref3;
  return function () {
    var {
      data = [],
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var commonData = {
      key,
      id
    };

    var _successData = (0, _helpers.typeOf)(successData) === 'object' ? successData : {};

    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, _successData, {
        [subKey[0]]: data[subKey[0]]
      }), subKey, _data => executeTask(commonData, _data)) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.deleteHandler = deleteHandler;