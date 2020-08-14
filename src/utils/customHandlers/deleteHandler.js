/* eslint-disable indent */
import { updateIn, generateTimeStamp } from '../helpers';
export const deleteHandler = ({
  task: { key, id, subKey = [] } = {},
  successData = {},
  successDataStatusCode,
}) => ({ data = [], statusCode } = {}) => ({
  data:
    subKey.length > 0
      ? updateIn(
          {
            ...data,
            ...successData,
            [subKey[0]]: data[subKey[0]],
          },
          subKey,
          _data =>
            (!Array.isArray(_data) && {}) ||
            (Array.isArray(id) &&
              _data.reduce(
                (acc, curr) =>
                  id.includes(curr[key]) ? acc : acc.concat([curr]),
                [],
              )) ||
            _data.filter(({ [key]: objId }) => objId !== id),
        )
      : (!Array.isArray(data) && data) ||
        (Array.isArray(id) &&
          data.reduce(
            (acc, curr) => (id.includes(curr[key]) ? acc : acc.concat([curr])),
            [],
          )) ||
        data.filter(({ [key]: objId }) => objId !== id),
  statusCode: successDataStatusCode || statusCode,
  lastUpdated: generateTimeStamp(),
  isError: false,
});
