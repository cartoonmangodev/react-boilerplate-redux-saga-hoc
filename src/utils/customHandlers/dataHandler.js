/* eslint-disable */
import { generateTimeStamp, updateIn, getIn, newObject } from '../helpers';
import Safe from '../nullCheck';
const _checkIsNotObject = data =>
  Object.prototype.toString.call(data) !== '[object Object]';
export const dataHandler = ({
  mutation: isMutation,
  task: { clearData, subKey = [] } = {},
  callback: { updateCallback } = {},
  successData = {},
  successDataStatusCode,
  type,
  state,
}) => ({ data: oldData = {}, statusCode, ...rest } = {}) =>
  isMutation
    ? { data: oldData, statusCode, ...rest, ...successData }
    : {
        data: (() => {
          if (subKey.length > 0) {
            const _oldCopyData = {
              ...oldData,
              ...(_checkIsNotObject(successData) ? {} : successData),
              [subKey[0]]: oldData[subKey[0]],
            };
            return updateIn(_oldCopyData, subKey, _oldData => {
              if (clearData) return Safe(successData, `.${subKey.join('.')}`);
              return updateCallback
                ? updateCallback({
                    oldData: _oldData,
                    successData: Safe(successData, `.${subKey.join('.')}`),
                    type,
                    state,
                  })
                : _checkIsNotObject(
                    Safe(successData, `.${subKey.join('.')}`),
                  ) || _checkIsNotObject(Safe(_oldData, `.${subKey.join('.')}`))
                ? Safe(successData, `.${subKey.join('.')}`)
                : newObject(
                    _oldData,
                    Safe(successData, `.${subKey.join('.')}`),
                  );
            });
          }
          return updateCallback
            ? updateCallback({ oldData, successData, type, state })
            : _checkIsNotObject(successData) ||
              _checkIsNotObject(oldData) ||
              clearData
            ? successData
            : newObject(oldData, successData);
        })(),
        statusCode: successDataStatusCode || statusCode,
        error: false,
        lastUpdated: generateTimeStamp(),
        isInfinite: null,
        infiniteEnd: null,
        isError: false,
        initialState: false,
      };
