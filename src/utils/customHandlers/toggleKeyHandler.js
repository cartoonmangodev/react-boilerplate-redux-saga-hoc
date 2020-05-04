/* eslint-disable */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

const toggleData = (obj, keyArray) =>
  Object.keys(obj).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: keyArray.includes(curr) ? !obj[curr] : obj[curr],
    }),
    {},
  );
export const toggleKeyHandler = ({
  task: { key, id, toggleKey = [], subKey = [] } = {},
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
              : (!Array.isArray(_Data) && toggleData(_Data, toggleKey)) ||
                (Array.isArray(id) &&
                  _Data.reduce(
                    (acc, curr) =>
                      id.includes(curr[key])
                        ? acc.concat([toggleData(curr, toggleKey)])
                        : acc.concat([curr]),
                    [],
                  )) ||
                _Data.map(_data =>
                  _data[key] === id ? toggleData(_data, toggleKey) : _data,
                ),
        )
      : updateCallback
      ? updateCallback(data, successData) || data
      : (!Array.isArray(data) && toggleData(data, toggleKey)) ||
        (Array.isArray(id) &&
          data.reduce(
            (acc, curr) =>
              id.includes(curr[key])
                ? acc.concat([toggleData(curr, toggleKey)])
                : acc.concat([curr]),
            [],
          )) ||
        data.map(_data =>
          _data[key] === id ? toggleData(_data, toggleKey) : _data,
        ),
  lastUpdated: generateTimeStamp(),
  isError: false,
});
