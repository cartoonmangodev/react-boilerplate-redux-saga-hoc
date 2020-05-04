/* eslint-disable */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

const deletedData = (obj, keyArray) =>
  Object.keys(obj).reduce(
    (acc, curr) =>
      (keyArray.includes(curr) && acc) || { ...acc, [curr]: obj[curr] },
    {},
  );
export const deleteKeyHandler = ({
  task: { key, id, deleteKey = [], subKey = [] } = {},
  callback: { updateCallback } = {},
  successData = {},
}) => ({ data = {} } = {}) => ({
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
  lastUpdated: generateTimeStamp(),
  isError: false,
});
