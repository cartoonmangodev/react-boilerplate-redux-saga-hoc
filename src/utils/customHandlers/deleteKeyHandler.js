/* eslint-disable */
import { updateIn, newObject, generateTimeStamp, deleteIn } from '../helpers';
import _remove from 'lodash/remove';
const deletedData = (obj = {}, keyArray = []) => {
  let _obj = obj;
  _obj =
    Object.prototype.toString.call(obj) === '[object Object]'
      ? { ..._obj }
      : {};
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(_key => {
      _obj = Array.isArray(_key)
        ? deleteIn(_obj, _key)
        : deleteIn(_obj, [_key]);
    });
    return _obj;
  }
  return obj;
};
export const deleteKeyHandler = ({
  task: { key, id, deleteKey = [], subKey = [] } = {},
  callback: { updateCallback } = {},
  successData = {},
  successDataStatusCode,
}) => ({ data = {}, statusCode } = {}) => ({
  data:
    subKey.length > 0
      ? updateIn(
          {
            ...data,
            ...successData,
            [subKey[0]]: data[subKey[0]],
          },
          subKey,
          _Data =>
            updateCallback
              ? updateCallback(_Data, successData) || _Data
              : (!Array.isArray(_Data) && deletedData(_Data, deleteKey)) ||
                (Array.isArray(id) &&
                  _Data.reduce(
                    (acc, curr) =>
                      id.includes(curr[key])
                        ? acc.concat([deletedData(curr, deleteKey)])
                        : acc.concat([curr]),
                    [],
                  )) ||
                _Data.map(_data =>
                  _data[key] === id ? deletedData(_data, deleteKey) : _data,
                ),
        )
      : updateCallback
      ? updateCallback(data, successData) || data
      : (!Array.isArray(data) && deletedData(data, deleteKey)) ||
        (Array.isArray(id) &&
          data.reduce(
            (acc, curr) =>
              id.includes(curr[key])
                ? acc.concat([deletedData(curr, deleteKey)])
                : acc.concat([curr]),
            [],
          )) ||
        data.map(_data =>
          _data[key] === id ? deletedData(_data, deleteKey) : _data,
        ),
  statusCode: successDataStatusCode || statusCode,
  lastUpdated: generateTimeStamp(),
  isError: false,
});
