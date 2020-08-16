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
      errorData = _ref.errorData,
      _ref$clearDataOnError = _ref.clearDataOnError,
      clearDataOnError = _ref$clearDataOnError === void 0 ? false : _ref$clearDataOnError;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return _objectSpread({}, clearDataOnError ? {
      data: Array.isArray(Data) ? [] : {}
    } : {}, {
      error: errorData || null,
      isError: true,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isInfinite: null,
      infiniteEnd: null
    });
  };
};

exports.errorHandler = errorHandler;

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayErrorHandler = function filterArrayErrorHandler() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref3.errorData,
      filter = _ref3.filter,
      clearDataOnError = _ref3.clearDataOnError;

  return function (_ref4) {
    var _ref4$data = _ref4.data,
        Data = _ref4$data === void 0 ? {} : _ref4$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, function (_ref5) {
                var oldData = _ref5.data;
                return _objectSpread({}, clearDataOnError ? {
                  data: Array.isArray(oldData) ? [] : {}
                } : {}, {
                  error: errorData || null,
                  isError: true,
                  statusCode: 'ERROR',
                  lastUpdated: (0, _helpers.generateTimeStamp)(),
                  isInfinite: null,
                  infiniteEnd: null
                });
              }) : data;
            });
          }, Data);
        }

        return (0, _helpers.updateIn)(Data, filter, function (data) {
          return (0, _helpers.newObject)(data, function (_ref6) {
            var oldData = _ref6.data;
            return _objectSpread({}, clearDataOnError ? {
              data: Array.isArray(oldData) ? [] : {}
            } : {}, {
              error: errorData || null,
              isError: true,
              statusCode: 'ERROR',
              lastUpdated: (0, _helpers.generateTimeStamp)(),
              isInfinite: null,
              infiniteEnd: null
            });
          });
        });
      }()
    };
  };
};

exports.filterArrayErrorHandler = filterArrayErrorHandler;