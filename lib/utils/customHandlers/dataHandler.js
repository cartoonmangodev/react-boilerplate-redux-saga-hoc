"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _checkIsNotObject = function _checkIsNotObject(data) {
  return Object.prototype.toString.call(data) !== '[object Object]';
};

var dataHandler = function dataHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
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
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0) {
          var _oldCopyData = _objectSpread({}, oldData, {}, _checkIsNotObject(successData) ? {} : successData, _defineProperty({}, subKey[0], oldData[subKey[0]]));

          return (0, _helpers.updateIn)(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return (0, _nullCheck.default)(successData, ".".concat(subKey.join('.')));
            return updateCallback ? updateCallback(_oldData, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.')))) : _checkIsNotObject((0, _nullCheck.default)(successData, ".".concat(subKey.join('.')))) || _checkIsNotObject((0, _nullCheck.default)(_oldData, ".".concat(subKey.join('.')))) ? (0, _nullCheck.default)(successData, ".".concat(subKey.join('.'))) : (0, _helpers.newObject)(_oldData, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.'))));
          });
        }

        return updateCallback ? updateCallback(oldData, successData) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : (0, _helpers.newObject)(oldData, successData);
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isInfinite: null,
      infiniteEnd: null,
      isError: false
    };
  };
};

exports.dataHandler = dataHandler;