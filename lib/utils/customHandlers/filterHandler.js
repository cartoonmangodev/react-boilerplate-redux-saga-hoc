"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonFilterHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable indent */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-nested-ternary */
const _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

const commonFilterHandler = customHandler => ({
  filter = [],
  successDataStatusCode,
  ...rest
} = {}) => ({
  data: Data = {},
  statusCode
}) => ({
  data: (() => {
    const paramKey = {
      filter,
      ...rest
    };

    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, customHandler(paramKey)) : data), Data);
    }

    return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)({ ...data,
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: (0, _helpers.generateTimeStamp)(),
      error: false,
      isError: false
    }, customHandler(paramKey)));
  })()
});
/** for Future reference */
// export const filterArrayCustomHandler = ({
//   isInfinite,
//   successData,
//   clearData,
//   query,
//   filter,
//   customHandler,
//   ...rest
// } = {}) => ({ data: Data = {} }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(
//       oldData,
//       customHandler({ isInfinite, successData, query, clearData, ...rest }),
//     ),
//   ),
// });


exports.commonFilterHandler = commonFilterHandler;