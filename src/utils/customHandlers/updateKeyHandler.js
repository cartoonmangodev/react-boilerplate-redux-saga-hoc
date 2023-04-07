/* eslint-disable operator-assignment */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { updateIn, newObject, generateTimeStamp, typeOf } from '../helpers';
import Safe from '../nullCheck';
const updateData = (
  data,
  successData,
  updateCallback,
  updateKey,
  type,
  state,
  config = {},
) => {
  if (updateCallback)
    return (
      updateCallback({ oldData: data, successData, type, state, config }) ||
      data
    );
  if (
    typeof successData === 'object' &&
    !Array.isArray(successData) &&
    typeof data === 'object' &&
    !Array.isArray(data)
  ) {
    return !updateKey
      ? data
      : updateKey.reduce((acc, key) => {
          if (Array.isArray(key) && key.length > 0) {
            return updateIn(acc, key, _data =>
              Safe(successData, `.${key.join('.')}`),
            );
          }
          return {
            ...acc,
            [key]: successData[key],
          };
        }, data);
  }
  return successData;
};

export const updateKeyHandler = ({
  callback: { updateCallback: __updateCallback } = {},
  task: {
    key,
    id,
    subKey = [],
    values = {},
    updateKey = [],
    updateCallback = __updateCallback,
    dontUpdateResponseData,
    dontUpdateSuccessData,
  } = {},
  successData = {},
  successDataStatusCode,
  type,
  state,
}) => ({ data = [], statusCode } = {}) => ({
  data:
    subKey.length > 0
      ? updateIn(
          {
            ...data,
            ...(typeOf(successData) === 'object' &&
            !(dontUpdateResponseData || dontUpdateSuccessData)
              ? successData
              : {}),
            [subKey[0]]: data[subKey[0]],
          },
          subKey,
          _Data =>
            (() => {
              let index = -1;
              const _values = Array.isArray(values);
              /**  update data if old data is object */
              if (!Array.isArray(_Data))
                return updateData(
                  _Data,
                  Safe(successData, `.${subKey.join('.')}`),
                  updateCallback,
                  updateKey,
                  type,
                  state,
                );
              else if (Array.isArray(id) && key && Array.isArray(_Data))
                return _Data.reduce(
                  (acc, curr = {}) =>
                    id.includes(curr[key])
                      ? (() => {
                          index += 1;
                          return acc.concat([
                            updateData(
                              curr,
                              values[_values ? index : curr[key]] || curr,
                              updateCallback,
                              updateKey,
                              type,
                              state,
                              {
                                index,
                                id: _values ? index : curr[key],
                              },
                            ),
                          ]);
                        })()
                      : acc.concat([curr]),
                  [],
                );
              else if ((id === 0 || id) && key)
                return _Data.map(_data =>
                  _data[key] === id
                    ? (() => {
                        index += 1;
                        return updateData(
                          _data,
                          values[_values ? index : _data[key]] || _data,
                          updateCallback,
                          updateKey,
                          type,
                          state,
                          {
                            index,
                            id: _values ? index : _data[key],
                          },
                        );
                      })()
                    : _data,
                );
              return updateData(
                _Data,
                Safe(successData, `.${subKey.join('.')}`),
                updateCallback,
                updateKey,
                type,
                state,
              );
            })(),
        )
      : (() => {
          let index = -1;
          const _values = Array.isArray(values);
          if (!Array.isArray(data))
            return updateData(
              data,
              successData,
              updateCallback,
              updateKey,
              type,
              state,
            );
          else if (Array.isArray(id) && key)
            return data.reduce(
              (acc, curr = {}) =>
                id.includes(curr[key])
                  ? (() => {
                      index = index + 1;
                      return acc.concat([
                        updateData(
                          curr,
                          values[_values ? index : curr[key]] || curr,
                          updateCallback,
                          updateKey,
                          type,
                          state,
                          {
                            index,
                            id: _values ? index : curr[key],
                          },
                        ),
                      ]);
                    })()
                  : acc.concat([curr]),
              [],
            );
          else if ((id === 0 || id) && key)
            return data.map(_data =>
              _data[key] === id
                ? (() => {
                    index = index + 1;
                    return updateData(
                      _data,
                      values[_values ? index : _data[key]],
                      updateCallback,
                      updateKey,
                      type,
                      state,
                      {
                        index,
                        id: _values ? index : _data[key],
                      },
                    );
                  })()
                : _data,
            );
          return updateData(
            data,
            successData,
            updateCallback,
            updateKey,
            type,
            state,
          );
        })(),
  statusCode: successDataStatusCode || statusCode,

  lastUpdated: generateTimeStamp(),
  isError: false,
  initialState: false,
});
