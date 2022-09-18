/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import { updateIn, generateTimeStamp, deleteIn, typeOf } from '../helpers';
// import _remove from 'lodash/remove';
const deletedData = (obj = {}, keyArray = []) => {
  // eslint-disable-next-line no-underscore-dangle
  let _obj = obj;
  _obj = typeOf(obj) === 'object' ? { ..._obj } : _obj;
  if (typeOf(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(_key => {
      _obj = Array.isArray(_key)
        ? deleteIn(_obj, _key)
        : deleteIn(_obj, [_key]);
    });
    return _obj;
  }
  return obj;
};

const executeTask = (
  { updateCallback, successData, deleteKey, id, key, type, state },
  data,
) =>
  updateCallback
    ? updateCallback({ oldData: data, successData, type, state }) || data
    : !Array.isArray(data)
    ? deletedData(data, deleteKey)
    : Array.isArray(id)
    ? data.reduce(
        (acc, curr) =>
          id.includes(curr[key])
            ? acc.concat([deletedData(curr, deleteKey)])
            : acc.concat([curr]),
        [],
      )
    : data.map(_data =>
        _data[key] === id ? deletedData(_data, deleteKey) : _data,
      );

export const deleteKeyHandler = ({
  callback: { updateCallback: __updateCallback } = {},
  task: {
    key,
    id,
    deleteKey = [],
    subKey = [],
    updateCallback = __updateCallback,
  } = {},
  successData = {},
  successDataStatusCode,
  type,
  state,
}) => ({ data = {}, statusCode } = {}) => {
  const commonData = {
    updateCallback,
    successData,
    deleteKey,
    id,
    key,
    type,
    state,
  };
  return {
    data:
      subKey.length > 0
        ? updateIn(
            {
              ...data,
              ...successData,
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
