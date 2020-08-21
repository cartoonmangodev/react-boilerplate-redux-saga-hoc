function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */
import { updateIn, newObject, generateTimeStamp } from '../helpers'; // export const filterArrayErrorHandler = ({ errorData, filter } = {}) => ({
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

export var errorHandler = function errorHandler(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      errorData = _ref.errorData,
      _ref$clearDataOnError = _ref.clearDataOnError,
      clearDataOnError = _ref$clearDataOnError === void 0 ? false : _ref$clearDataOnError;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return _extends({}, clearDataOnError ? {
      data: Array.isArray(Data) ? [] : {}
    } : {}, {
      error: errorData || null,
      isError: true,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null
    });
  };
};

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

export var filterArrayErrorHandler = function filterArrayErrorHandler(_temp2) {
  var _ref3 = _temp2 === void 0 ? {} : _temp2,
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
            return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? newObject(data, function (_ref5) {
                var oldData = _ref5.data;
                return _extends({}, clearDataOnError ? {
                  data: Array.isArray(oldData) ? [] : {}
                } : {}, {
                  error: errorData || null,
                  isError: true,
                  statusCode: 'ERROR',
                  lastUpdated: generateTimeStamp(),
                  isInfinite: null,
                  infiniteEnd: null
                });
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref6) {
            var oldData = _ref6.data;
            return _extends({}, clearDataOnError ? {
              data: Array.isArray(oldData) ? [] : {}
            } : {}, {
              error: errorData || null,
              isError: true,
              statusCode: 'ERROR',
              lastUpdated: generateTimeStamp(),
              isInfinite: null,
              infiniteEnd: null
            });
          });
        });
      }()
    };
  };
};