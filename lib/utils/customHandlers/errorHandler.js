"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayErrorHandler = exports.errorHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */
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
      filter = _ref2.filter;

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
              return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, {
                error: errorData || null,
                isError: true,
                lastUpdated: (0, _helpers.generateTimeStamp)(),
                isInfinite: undefined,
                infiniteEnd: undefined
              }) : data;
            });
          }, Data);
        }

        return (0, _helpers.updateIn)(Data, filter, function (data) {
          return (0, _helpers.newObject)(data, {
            error: errorData || null,
            isError: true,
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