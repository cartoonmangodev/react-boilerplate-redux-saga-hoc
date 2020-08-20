"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayloadingHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */
// export const filterArrayloadingHandler = ({ filter, loader }) => ({
//   data: Data = {},
// } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       loading: {
//         status: loader,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });
var _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

var filterArrayloadingHandler = function filterArrayloadingHandler() {
  var {
    loader,
    filter
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (_ref) => {
    var {
      data: Data = {}
    } = _ref;
    return {
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, {
            loading: {
              status: loader,
              lastUpdated: (0, _helpers.generateTimeStamp)()
            }
          }) : data), Data);
        }

        return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)(data, {
          loading: {
            status: loader,
            lastUpdated: (0, _helpers.generateTimeStamp)()
          }
        }));
      })()
    };
  };
};

exports.filterArrayloadingHandler = filterArrayloadingHandler;