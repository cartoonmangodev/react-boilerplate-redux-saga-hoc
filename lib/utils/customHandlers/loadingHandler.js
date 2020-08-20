/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */
import { updateIn, newObject, generateTimeStamp } from '../helpers'; // export const filterArrayloadingHandler = ({ filter, loader }) => ({
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

export var filterArrayloadingHandler = function filterArrayloadingHandler(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
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
            return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? newObject(data, {
                loading: {
                  status: loader,
                  lastUpdated: generateTimeStamp()
                }
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, {
            loading: {
              status: loader,
              lastUpdated: generateTimeStamp()
            }
          });
        });
      }()
    };
  };
};