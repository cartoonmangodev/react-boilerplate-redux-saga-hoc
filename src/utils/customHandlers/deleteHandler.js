/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import { updateIn, generateTimeStamp, typeOf } from '../helpers';

const executeTask = ({ id, key }, data) =>
  !Array.isArray(data)
    ? data
    : Array.isArray(id)
    ? data.reduce(
        (acc, curr) => (id.includes(curr[key]) ? acc : acc.concat([curr])),
        [],
      )
    : data.filter(({ [key]: objId }) => objId !== id);

export const deleteHandler = ({
  task: { key, id, subKey = [] } = {},
  successData = {},
  successDataStatusCode,
}) => ({ data = [], statusCode } = {}) => {
  const commonData = {
    key,
    id,
  };
  const _successData = typeOf(successData) === 'object' ? successData : {};
  return {
    data:
      subKey.length > 0
        ? updateIn(
            {
              ...data,
              ..._successData,
              [subKey[0]]: data[subKey[0]],
            },
            subKey,
            _data => executeTask(commonData, _data),
          )
        : executeTask(commonData, data),
    statusCode: successDataStatusCode || statusCode,
    lastUpdated: generateTimeStamp(),
    isError: false,
  };
};
