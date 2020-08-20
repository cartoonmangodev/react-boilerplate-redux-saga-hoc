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
  var {
    errorData,
    clearDataOnError = false
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (_ref) => {
    var {
      data: Data = {}
    } = _ref;
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

var _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

var filterArrayErrorHandler = function filterArrayErrorHandler() {
  var {
    errorData,
    filter,
    clearDataOnError
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (_ref2) => {
    var {
      data: Data = {}
    } = _ref2;
    return {
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, (_ref3) => {
            var {
              data: oldData
            } = _ref3;
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
          }) : data), Data);
        }

        return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)(data, (_ref4) => {
          var {
            data: oldData
          } = _ref4;
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
        }));
      })()
    };
  };
};

exports.filterArrayErrorHandler = filterArrayErrorHandler;