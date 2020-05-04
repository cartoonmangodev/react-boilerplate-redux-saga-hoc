/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

const _CheckFilter = Filter =>
  Array.isArray(Filter) && Filter.length > 0
    ? Filter
    : Filter && typeof Filter === 'string'
    ? Filter.split('.')
    : [];
export const filterArrayToastEmptyHandler = ({ filter, isInfinite } = {}) => ({
  data: Data = {},
}) => ({
  data: (() => {
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce(
        (accumulator, filterArray) =>
          updateIn(accumulator, _CheckFilter(filterArray), data =>
            _CheckFilter(filterArray).length > 0
              ? newObject(data, ({ toast = {} }) => ({
                  isInfinite,
                  toast: newObject(toast, {
                    message: '',
                    status: '',
                    isError: null,
                    key: '',
                  }),
                }))
              : data,
          ),
        Data,
      );
    }
    return updateIn(Data, filter, data =>
      newObject(data, ({ toast = {} }) => ({
        isInfinite,
        toast: newObject(toast, {
          message: '',
          status: '',
          isError: null,
          key: '',
        }),
      })),
    );
  })(),
});

// export const filterArrayToastEmptyHandler = ({ filter, isInfinite }) => ({
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

export const filterToastEmptyHandler = ({ isInfinite, filter }) => ({
  data: Data = {},
} = {}) => ({
  data: newObject(Data, ({ [filter]: filterData = {} }) => ({
    [filter]: newObject(filterData, ({ toast = {} }) => ({
      isInfinite,
      toast: newObject(toast, {
        message: '',
        status: '',
        isError: null,
        key: '',
      }),
    })),
  })),
});

// export const filterArrayToastHandler = ({
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

export const filterArrayToastHandler = ({
  statusCode,
  filter,
  message,
  isError,
  type,
} = {}) => ({ data: Data = {} }) => ({
  data: (() => {
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce(
        (accumulator, filterArray) =>
          updateIn(accumulator, _CheckFilter(filterArray), data =>
            _CheckFilter(filterArray).length > 0
              ? newObject(data, {
                  toast: {
                    isError:
                      typeof isError === 'boolean'
                        ? isError
                        : ![200, 201].includes(statusCode),
                    status: statusCode,
                    message,
                    key: type,
                    lastUpdated: generateTimeStamp(),
                  },
                })
              : data,
          ),
        Data,
      );
    }
    return updateIn(Data, filter, data =>
      newObject(data, {
        toast: {
          isError:
            typeof isError === 'boolean'
              ? isError
              : ![200, 201].includes(statusCode),
          status: statusCode,
          message,
          key: type,
          lastUpdated: generateTimeStamp(),
        },
      }),
    );
  })(),
});
