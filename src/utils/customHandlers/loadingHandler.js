/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { updateIn, newObject, generateTimeStamp } from '../helpers';
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

const _CheckFilter = Filter =>
  Array.isArray(Filter) && Filter.length > 0
    ? Filter
    : Filter && typeof Filter === 'string'
    ? Filter.split('.')
    : [];

export const filterArrayloadingHandler = ({
  loader,
  filter,
  clearData,
} = {}) => ({ data: Data = {} }) => ({
  data: (() => {
    if (filter && filter.some(fil => Array.isArray(fil))) {
      return filter.reduce(
        (accumulator, filterArray) =>
          updateIn(accumulator, _CheckFilter(filterArray), data =>
            _CheckFilter(filterArray).length > 0
              ? newObject(data, ({ data: _data }) => ({
                  loading: {
                    status: loader,
                    lastUpdated: generateTimeStamp(),
                  },
                  ...(clearData
                    ? { data: Array.isArray(_data) ? [] : {} }
                    : {}),
                }))
              : data,
          ),
        Data,
      );
    }
    return updateIn(Data, filter, data =>
      newObject(data, ({ data: _data }) => ({
        loading: {
          status: loader,
          lastUpdated: generateTimeStamp(),
        },
        ...(clearData ? { data: Array.isArray(_data) ? [] : {} } : {}),
      })),
    );
  })(),
});
