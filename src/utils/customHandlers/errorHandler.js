/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

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

export const errorHandler = ({ errorData, clearDataOnError = false } = {}) => ({
  data: Data = {},
}) => ({
  ...(clearDataOnError ? { data: Array.isArray(Data) ? [] : {} } : {}),
  error: errorData || null,
  isError: true,
  lastUpdated: generateTimeStamp(),
  isInfinite: undefined,
  infiniteEnd: undefined,
});

const _CheckFilter = Filter =>
  Array.isArray(Filter) && Filter.length > 0
    ? Filter
    : Filter && typeof Filter === 'string'
    ? Filter.split('.')
    : [];

export const filterArrayErrorHandler = ({
  errorData,
  filter,
  clearDataOnError,
} = {}) => ({ data: Data = {} }) => ({
  data: (() => {
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce(
        (accumulator, filterArray) =>
          updateIn(accumulator, _CheckFilter(filterArray), data =>
            _CheckFilter(filterArray).length > 0
              ? newObject(data, ({ data: oldData }) => ({
                  ...(clearDataOnError
                    ? { data: Array.isArray(oldData) ? [] : {} }
                    : {}),
                  error: errorData || null,
                  isError: true,
                  statusCode: 'ERROR',
                  lastUpdated: generateTimeStamp(),
                  isInfinite: undefined,
                  infiniteEnd: undefined,
                }))
              : data,
          ),
        Data,
      );
    }
    return updateIn(Data, filter, data =>
      newObject(data, ({ data: oldData }) => ({
        ...(clearDataOnError ? { data: Array.isArray(oldData) ? [] : {} } : {}),
        error: errorData || null,
        isError: true,
        statusCode: 'ERROR',
        lastUpdated: generateTimeStamp(),
        isInfinite: undefined,
        infiniteEnd: undefined,
      })),
    );
  })(),
});
