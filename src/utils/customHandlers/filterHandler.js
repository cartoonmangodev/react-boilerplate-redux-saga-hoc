/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

const _CheckFilter = Filter =>
  Array.isArray(Filter) && Filter.length > 0
    ? Filter
    : Filter && typeof Filter === 'string'
    ? Filter.split('.')
    : [];

export const commonFilterHandler = customHandler => ({
  filter = [],
  successDataStatusCode,
  ...rest
} = {}) => ({ data: Data = {}, statusCode }) => ({
  lastUpdated: generateTimeStamp(),
  data: (() => {
    const paramKey = { filter, ...rest };
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce(
        (accumulator, filterArray) =>
          updateIn(accumulator, _CheckFilter(filterArray), data =>
            _CheckFilter(filterArray).length > 0
              ? newObject(data, customHandler(paramKey))
              : data,
          ),
        Data,
      );
    }
    return updateIn(Data, filter, data =>
      newObject(
        {
          ...data,
          statusCode: successDataStatusCode || statusCode,
          lastUpdated: generateTimeStamp(),
          error: false,
          isError: false,
          initialState: false,
        },
        customHandler(paramKey),
      ),
    );
  })(),
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
