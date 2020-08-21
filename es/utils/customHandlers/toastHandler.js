/* eslint-disable no-nested-ternary */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

export var filterArrayToastEmptyHandler = function filterArrayToastEmptyHandler(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      filter = _ref.filter,
      isInfinite = _ref.isInfinite;

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
              return _CheckFilter(filterArray).length > 0 ? newObject(data, function (_ref3) {
                var _ref3$toast = _ref3.toast,
                    toast = _ref3$toast === void 0 ? {} : _ref3$toast;
                return {
                  isInfinite: isInfinite,
                  toast: newObject(toast, {
                    message: '',
                    status: '',
                    isError: null,
                    key: ''
                  })
                };
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref4) {
            var _ref4$toast = _ref4.toast,
                toast = _ref4$toast === void 0 ? {} : _ref4$toast;
            return {
              isInfinite: isInfinite,
              toast: newObject(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          });
        });
      }()
    };
  };
}; // export const filterArrayToastEmptyHandler = ({ filter, isInfinite }) => ({
//   data: Data = {},
// } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, ({ toast = {} }) => ({
//       isInfinite,
//       toast: newObject(toast, {
//         message: '',
//         status: '',
//         isError: null,
//         key: '',
//       }),
//     })),
//   ),
// });

export var filterToastEmptyHandler = function filterToastEmptyHandler(_ref5) {
  var isInfinite = _ref5.isInfinite,
      filter = _ref5.filter;
  return function (_temp2) {
    var _ref6 = _temp2 === void 0 ? {} : _temp2,
        _ref6$data = _ref6.data,
        Data = _ref6$data === void 0 ? {} : _ref6$data;

    return {
      data: newObject(Data, function (_ref7) {
        var _ref9;

        var _ref7$filter = _ref7[filter],
            filterData = _ref7$filter === void 0 ? {} : _ref7$filter;
        return _ref9 = {}, _ref9[filter] = newObject(filterData, function (_ref8) {
          var _ref8$toast = _ref8.toast,
              toast = _ref8$toast === void 0 ? {} : _ref8$toast;
          return {
            isInfinite: isInfinite,
            toast: newObject(toast, {
              message: '',
              status: '',
              isError: null,
              key: ''
            })
          };
        }), _ref9;
      })
    };
  };
}; // export const filterArrayToastHandler = ({
//   statusCode,
//   filter,
//   message,
//   isError,
//   type,
// } = {}) => ({ data: Data = {} } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       toast: {
//         isError:
//           typeof isError === 'boolean'
//             ? isError
//             : ![200, 201].includes(statusCode),
//         status: statusCode,
//         message,
//         key: type,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

export var filterArrayToastHandler = function filterArrayToastHandler(_temp3) {
  var _ref10 = _temp3 === void 0 ? {} : _temp3,
      statusCode = _ref10.statusCode,
      filter = _ref10.filter,
      message = _ref10.message,
      isError = _ref10.isError,
      type = _ref10.type;

  return function (_ref11) {
    var _ref11$data = _ref11.data,
        Data = _ref11$data === void 0 ? {} : _ref11$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? newObject(data, {
                toast: {
                  isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
                  status: statusCode,
                  message: message,
                  key: type,
                  lastUpdated: generateTimeStamp()
                }
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, {
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message: message,
              key: type,
              lastUpdated: generateTimeStamp()
            }
          });
        });
      }()
    };
  };
};