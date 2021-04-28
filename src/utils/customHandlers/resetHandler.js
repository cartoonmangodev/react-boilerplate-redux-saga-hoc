/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

export const resetHandler = (
  state,
  newState,
  { response: { type } },
  customType = undefined,
) =>
  newObject(state, ({ [customType || type]: Data }) => ({
    [customType || type]: newObject(Data, ({ data, toast, infiniteEnd }) => ({
      data: (Array.isArray(data) && []) || {},
      toast: newObject(toast, {
        message: '',
        status: '',
      }),
      loading: {},
      isError: false,
      statusCode: 200,
      infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
      lastUpdated: generateTimeStamp(),
      initialState: true,
    })),
  }));
const _CheckFilter = Filter =>
  Array.isArray(Filter) && Filter.length > 0
    ? Filter
    : Filter && typeof Filter === 'string'
    ? Filter.split('.')
    : [];
export const filterArrayResetHandler = (
  state,
  newState,
  action,
  filter,
  customType = undefined,
) => {
  const {
    response: { type },
  } = action;
  return newObject(state, ({ [customType || type]: oldData }) => ({
    [type]: newObject(oldData, ({ data: Data = {} } = {}) => ({
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce(
            (accumulator, filterArray) =>
              updateIn(accumulator, _CheckFilter(filterArray), _data =>
                _CheckFilter(filterArray).length > 0
                  ? newObject(_data, ({ data, toast, infiniteEnd }) => ({
                      data: (Array.isArray(data) && []) || {},
                      toast: newObject(toast, {
                        message: '',
                        status: '',
                      }),
                      isError: false,
                      infiniteEnd:
                        typeof infiniteEnd === 'boolean' ? false : undefined,
                      lastUpdated: generateTimeStamp(),
                    }))
                  : _data,
              ),
            Data,
          );
        }
        return updateIn(Data, filter, updateData =>
          newObject(updateData, ({ data, toast, infiniteEnd }) => ({
            data: (Array.isArray(data) && []) || {},
            toast: newObject(toast, {
              message: '',
              status: '',
            }),
            isError: false,
            infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
            lastUpdated: generateTimeStamp(),
            initialState: true,
          })),
        );
      })(),
    })),
  }));
};
