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
const _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

const filterArrayToastEmptyHandler = ({
  filter,
  isInfinite
} = {}) => ({
  data: Data = {}
}) => ({
  data: (() => {
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(data, ({
        toast = {}
      }) => ({
        isInfinite,
        toast: (0, _helpers.newObject)(toast, {
          message: '',
          status: '',
          isError: null,
          key: ''
        })
      })) : data), Data);
    }

    return (0, _helpers.updateIn)(Data, filter, data => (0, _helpers.newObject)(data, ({
      toast = {}
    }) => ({
      isInfinite,
      toast: (0, _helpers.newObject)(toast, {
        message: '',
        status: '',
        isError: null,
        key: ''
      })
    })));
  })()
}); // export const filterArrayToastEmptyHandler = ({ filter, isInfinite }) => ({
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

const filterToastEmptyHandler = ({
  isInfinite,
  filter
}) => ({
  data: Data = {}
} = {}) => ({
  data: (0, _helpers.newObject)(Data, ({
    [filter]: filterData = {}
  }) => ({
    [filter]: (0, _helpers.newObject)(filterData, ({
      toast = {}
    }) => ({
      isInfinite,
      toast: (0, _helpers.newObject)(toast, {
        message: '',
        status: '',
        isError: null,
        key: ''
      })
    }))
  }))
}); // export const filterArrayToastHandler = ({
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

const filterArrayToastHandler = ({
  statusCode,
  filter,
  message,
  isError,
  type
} = {}) => ({
  data: Data = {}
}) => ({
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
});

exports.filterArrayToastHandler = filterArrayToastHandler;