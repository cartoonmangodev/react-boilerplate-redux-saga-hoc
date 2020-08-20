"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayToastHandler = exports.filterToastEmptyHandler = exports.filterArrayToastEmptyHandler = void 0;

var _helpers = require("../helpers");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayToastEmptyHandler = function filterArrayToastEmptyHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
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
            return (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, function (_ref3) {
                var _ref3$toast = _ref3.toast,
                    toast = _ref3$toast === void 0 ? {} : _ref3$toast;
                return {
                  isInfinite: isInfinite,
                  toast: (0, _helpers.newObject)(toast, {
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

        return (0, _helpers.updateIn)(Data, filter, function (data) {
          return (0, _helpers.newObject)(data, function (_ref4) {
            var _ref4$toast = _ref4.toast,
                toast = _ref4$toast === void 0 ? {} : _ref4$toast;
            return {
              isInfinite: isInfinite,
              toast: (0, _helpers.newObject)(toast, {
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


exports.filterArrayToastEmptyHandler = filterArrayToastEmptyHandler;

var filterToastEmptyHandler = function filterToastEmptyHandler(_ref5) {
  var isInfinite = _ref5.isInfinite,
      filter = _ref5.filter;
  return function () {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$data = _ref6.data,
        Data = _ref6$data === void 0 ? {} : _ref6$data;

    return {
      data: (0, _helpers.newObject)(Data, function (_ref7) {
        var _ref7$filter = _ref7[filter],
            filterData = _ref7$filter === void 0 ? {} : _ref7$filter;
        return _defineProperty({}, filter, (0, _helpers.newObject)(filterData, function (_ref8) {
          var _ref8$toast = _ref8.toast,
              toast = _ref8$toast === void 0 ? {} : _ref8$toast;
          return {
            isInfinite: isInfinite,
            toast: (0, _helpers.newObject)(toast, {
              message: '',
              status: '',
              isError: null,
              key: ''
            })
          };
        }));
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


exports.filterToastEmptyHandler = filterToastEmptyHandler;

var filterArrayToastHandler = function filterArrayToastHandler() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
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
            return (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, {
                toast: {
                  isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
                  status: statusCode,
                  message: message,
                  key: type,
                  lastUpdated: (0, _helpers.generateTimeStamp)()
                }
              }) : data;
            });
          }, Data);
        }

        return (0, _helpers.updateIn)(Data, filter, function (data) {
          return (0, _helpers.newObject)(data, {
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message: message,
              key: type,
              lastUpdated: (0, _helpers.generateTimeStamp)()
            }
          });
        });
      }()
    };
  };
};

exports.filterArrayToastHandler = filterArrayToastHandler;