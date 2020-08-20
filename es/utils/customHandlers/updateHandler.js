"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var updateData = function updateData(data, successData, updateCallback) {
  if (updateCallback) return updateCallback(data, successData) || data;
  if (_typeof(successData) === 'object' && !Array.isArray(successData) && _typeof(data) === 'object' && !Array.isArray(data)) return (0, _helpers.newObject)(data, successData);
  return successData;
};

var updateHandler = function updateHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? (0, _helpers.updateIn)(_objectSpread({}, data, {}, (0, _helpers.typeOf)(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData(_Data, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.'))), updateCallback);
          if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
            }() : acc.concat([curr]);
          }, []);
          if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
            }() : _data;
          });
          return updateData(_Data, (0, _nullCheck.default)(successData, ".".concat(subKey.join('.'))), updateCallback);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData(data, successData, updateCallback);
        if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
          }() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index += 1;
            return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
          }() : _data;
        });
        return updateData(data, successData, updateCallback);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isError: false
    };
  };
};

exports.updateHandler = updateHandler;