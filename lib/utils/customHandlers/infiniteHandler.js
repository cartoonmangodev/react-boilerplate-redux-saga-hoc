"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infiniteHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var infiniteHandler = (_ref) => {
  var {
    task: {
      clearData,
      subKey = [],
      limit,
      isAppendTop = false
    } = {},
    callback: {
      updateCallback
    } = {},
    successData = {},
    successDataStatusCode
  } = _ref;
  return function () {
    var {
      data: oldData = {},
      statusCode
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: (() => {
        if (subKey.length > 0 && Array.isArray((0, _helpers.getIn)(oldData, subKey))) {
          var _oldCopyData = _objectSpread({}, oldData, {}, (0, _helpers.typeOf)(successData) === 'object' ? successData : {}, {
            [subKey[0]]: oldData[subKey[0]]
          }); // return _oldCopyData


          return (0, _helpers.updateIn)(_oldCopyData, subKey, _oldData => {
            if (clearData) return (0, _nullCheck.default)(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback(_oldData, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.')), [])) : isAppendTop ? (0, _nullCheck.default)(successData, ".".concat(subKey.join('.')), []).concat(_oldData) : _oldData.concat((0, _nullCheck.default)(successData, ".".concat(subKey.join('.')), []));
          });
        }

        var getData = Array.isArray(successData) ? successData : [];
        var appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
        var newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      })(),
      error: false,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      statusCode: successDataStatusCode || statusCode,
      isInfinite: true,
      isError: false,
      infiniteEnd: (subKey.length > 0 ? (0, _nullCheck.default)(successData, ".".concat(subKey.join('.')), []) : successData).length < limit
    };
  };
};

exports.infiniteHandler = infiniteHandler;