"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayErrorHandler = exports.errorHandler = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// export const filterArrayErrorHandler = ({ errorData, filter } = {}) => ({
//   data: Data = {},
// }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       error: errorData || null,
//       isError: true,
//       lastUpdated: generateTimeStamp(),
//       isInfinite: undefined,
//       infiniteEnd: undefined,
//     }),
//   ),
// });
var errorHandler = function errorHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref.errorData;

  return function () {
    return {
      error: errorData || null,
      isError: true,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isInfinite: undefined,
      infiniteEnd: undefined
    };
  };
};

exports.errorHandler = errorHandler;

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayErrorHandler = function filterArrayErrorHandler() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref2.errorData,
      filter = _ref2.filter,
      clearDataOnError = _ref2.clearDataOnError;

  return function (_ref3) {
    var _ref3$data = _ref3.data,
        Data = _ref3$data === void 0 ? {} : _ref3$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, _objectSpread({}, clearDataOnError ? {
                data: Array.isArray(data && data.data) ? [] : {}
              } : {}, {
                error: errorData || null,
                isError: true,
                statusCode: 'ERROR',
                lastUpdated: (0, _helpers.generateTimeStamp)(),
                isInfinite: undefined,
                infiniteEnd: undefined
              })) : data;
            });
          }, Data);
        }

        return (0, _helpers.updateIn)(Data, filter, function (data) {
          return (0, _helpers.newObject)(data, {
            error: errorData || null,
            isError: true,
            statusCode: 'ERROR',
            lastUpdated: (0, _helpers.generateTimeStamp)(),
            isInfinite: undefined,
            infiniteEnd: undefined
          });
        });
      }()
    };
  };
};

exports.filterArrayErrorHandler = filterArrayErrorHandler;