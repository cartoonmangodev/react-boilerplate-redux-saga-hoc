"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayToastHandler = exports.filterToastEmptyHandler = exports.filterArrayToastEmptyHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */
var _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

var filterArrayToastEmptyHandler = function filterArrayToastEmptyHandler() {
  var {
    filter,
    isInfinite
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (_ref) => {
    var {
      data: Data = {}
    } = _ref;
    return {
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, (_ref2) => {
            var {
              toast = {}
            } = _ref2;
            return {
              isInfinite,
              toast: (0, _helpers.newObject)(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          }) : data), Data);
        }

        return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)(data, (_ref3) => {
          var {
            toast = {}
          } = _ref3;
          return {
            isInfinite,
            toast: (0, _helpers.newObject)(toast, {
              message: '',
              status: '',
              isError: null,
              key: ''
            })
          };
        }));
      })()
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

var filterToastEmptyHandler = (_ref4) => {
  var {
    isInfinite,
    filter
  } = _ref4;
  return function () {
    var {
      data: Data = {}
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      data: (0, _helpers.newObject)(Data, (_ref5) => {
        var {
          [filter]: filterData = {}
        } = _ref5;
        return {
          [filter]: (0, _helpers.newObject)(filterData, (_ref6) => {
            var {
              toast = {}
            } = _ref6;
            return {
              isInfinite,
              toast: (0, _helpers.newObject)(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          })
        };
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
  var {
    statusCode,
    filter,
    message,
    isError,
    type
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (_ref7) => {
    var {
      data: Data = {}
    } = _ref7;
    return {
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, {
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message,
              key: type,
              lastUpdated: (0, _helpers.generateTimeStamp)()
            }
          }) : data), Data);
        }

        return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)(data, {
          toast: {
            isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
            status: statusCode,
            message,
            key: type,
            lastUpdated: (0, _helpers.generateTimeStamp)()
          }
        }));
      })()
    };
  };
};

exports.filterArrayToastHandler = filterArrayToastHandler;