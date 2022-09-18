/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import { updateIn, generateTimeStamp, typeOf } from '../helpers';

const toggleData = (obj, keyArray) =>
  Object.keys(obj).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: keyArray.includes(curr) ? !obj[curr] : obj[curr],
    }),
    {},
  );

const executeTask = (
  { successData, toggleKey, id, key, updateCallback, type, state },
  _Data,
) => {
  const _updatedData = !Array.isArray(_Data)
    ? toggleData(_Data, toggleKey)
    : Array.isArray(id)
    ? _Data.reduce(
        (acc, curr) =>
          id.includes(curr[key])
            ? acc.concat([toggleData(curr, toggleKey)])
            : acc.concat([curr]),
        [],
      )
    : _Data.map(_data =>
        _data[key] === id ? toggleData(_data, toggleKey) : _data,
      );
  return updateCallback
    ? updateCallback(_updatedData, successData, type, state) || _Data
    : _updatedData;
};

export const toggleKeyHandler = ({
  task: { key, id, toggleKey = [], subKey = [] } = {},
  callback: { updateCallback } = {},
  successData = {},
  successDataStatusCode,
  type,
  state,
}) => ({ data = {}, statusCode } = {}) => {
  const commonData = {
    successData,
    toggleKey,
    id,
    key,
    updateCallback,
    type,
    state,
  };
  return {
    data:
      subKey.length > 0
        ? updateIn(
            {
              ...data,
              ...(typeOf(successData) === 'object' ? successData : {}),
              [subKey[0]]: data[subKey[0]],
            },
            subKey,
            _Data => executeTask(commonData, _Data),
          )
        : executeTask(commonData, data),

    statusCode: successDataStatusCode || statusCode,
    lastUpdated: generateTimeStamp(),
    isError: false,
    initialState: false,
  };
};
