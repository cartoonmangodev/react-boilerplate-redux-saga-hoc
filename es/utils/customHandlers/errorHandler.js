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
const errorHandler = ({
  errorData,
  clearDataOnError = false
} = {}) => ({
  data: Data = {}
}) => ({ ...(clearDataOnError ? {
    data: Array.isArray(Data) ? [] : {}
  } : {}),
  error: errorData || null,
  isError: true,
  lastUpdated: (0, _helpers.generateTimeStamp)(),
  isInfinite: null,
  infiniteEnd: null
});

exports.errorHandler = errorHandler;

const _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

const filterArrayErrorHandler = ({
  errorData,
  filter,
  clearDataOnError
} = {}) => ({
  data: Data = {}
}) => ({
  data: (() => {
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, ({
        data: oldData
      }) => ({ ...(clearDataOnError ? {
          data: Array.isArray(oldData) ? [] : {}
        } : {}),
        error: errorData || null,
        isError: true,
        statusCode: 'ERROR',
        lastUpdated: (0, _helpers.generateTimeStamp)(),
        isInfinite: null,
        infiniteEnd: null
      })) : data), Data);
    }

    return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)(data, ({
      data: oldData
    }) => ({ ...(clearDataOnError ? {
        data: Array.isArray(oldData) ? [] : {}
      } : {}),
      error: errorData || null,
      isError: true,
      statusCode: 'ERROR',
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      isInfinite: null,
      infiniteEnd: null
    })));
  })()
});

exports.filterArrayErrorHandler = filterArrayErrorHandler;