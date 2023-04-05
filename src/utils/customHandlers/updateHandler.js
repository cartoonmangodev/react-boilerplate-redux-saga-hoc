/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import { updateIn, newObject, generateTimeStamp, typeOf } from '../helpers';
import Safe from '../nullCheck';
const updateData = (
  data,
  successData,
  updateCallback,
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
  )
    return newObject(data, successData);
  return successData;
};

export const updateHandler = ({
  callback: { updateCallback: __updateCallback } = {},
  task: {
    key,
    id,
    subKey = [],
    values = {},
    dontUpdateResponseData = false,
    updateCallback = __updateCallback,
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
            ...(typeOf(successData) === 'object' && !dontUpdateResponseData
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
                  Safe(successData, `.${subKey.join('.')}`) || successData,
                  updateCallback,
                  type,
                  state,
                );
              if (Array.isArray(id) && key && Array.isArray(_Data))
                return _Data.reduce(
                  (acc, curr = {}) =>
                    id.includes(curr[key])
                      ? (() => {
                          index += 1;
                          return acc.concat([
                            updateData(
                              curr,
                              values[_values ? index : curr[key]] ||
                                successData ||
                                curr,
                              updateCallback,
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
              if ((id === 0 || id) && key)
                return _Data.map(_data =>
                  _data[key] === id
                    ? (() => {
                        index += 1;
                        return updateData(
                          _data,
                          values[_values ? index : _data[key]] ||
                            successData ||
                            _data,
                          updateCallback,
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
                Safe(successData, `.${subKey.join('.')}`) || successData,
                updateCallback,
                type,
                state,
              );
            })(),
        )
      : (() => {
          let index = -1;
          const _values = Array.isArray(values);
          if (!Array.isArray(data))
            return updateData(data, successData, updateCallback, type, state);
          if (Array.isArray(id) && key)
            return data.reduce(
              (acc, curr = {}) =>
                id.includes(curr[key])
                  ? (() => {
                      index += 1;
                      return acc.concat([
                        updateData(
                          curr,
                          values[_values ? index : curr[key]] ||
                            successData ||
                            curr,
                          updateCallback,
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
          if ((id === 0 || id) && key)
            return data.map(_data =>
              _data[key] === id
                ? (() => {
                    index += 1;
                    return updateData(
                      _data,
                      values[_values ? index : _data[key]] ||
                        successData ||
                        _data,
                      updateCallback,
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
          return updateData(data, successData, updateCallback, type, state);
        })(),
  statusCode: successDataStatusCode || statusCode,
  lastUpdated: generateTimeStamp(),
  isError: false,
  initialState: false,
});
