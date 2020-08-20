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
var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayloadingHandler = function filterArrayloadingHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      loader = _ref.loader,
      filter = _ref.filter;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, {
                loading: {
                  status: loader,
                  lastUpdated: (0, _helpers.generateTimeStamp)()
                }
              }) : data;
            });
          }, Data);
        }

        return (0, _helpers.updateIn)(Data, filter, function (data) {
          return (0, _helpers.newObject)(data, {
            loading: {
              status: loader,
              lastUpdated: (0, _helpers.generateTimeStamp)()
            }
          });
        });
      }()
    };
  };
};

exports.filterArrayloadingHandler = filterArrayloadingHandler;