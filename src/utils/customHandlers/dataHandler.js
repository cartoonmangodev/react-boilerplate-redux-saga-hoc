/* eslint-disable */
import { generateTimeStamp, updateIn, getIn, newObject } from '../helpers';
import Safe from '../nullCheck';
const _checkIsNotObject = data =>
  Object.prototype.toString.call(data) !== '[object Object]';
export const dataHandler = ({
  task: { clearData, subKey = [] } = {},
  callback: { updateCallback } = {},
  successData = {},
  successDataStatusCode,
}) => ({ data: oldData = {}, statusCode } = {}) => ({
  data: (() => {
    if (subKey.length > 0) {
      const _oldCopyData = {
        ...oldData,
        ...successData,
        [subKey[0]]: oldData[subKey[0]],
      };
      return updateIn(_oldCopyData, subKey, _oldData => {
        if (clearData) return Safe(successData, `.${subKey.join('.')}`);
        return updateCallback
          ? updateCallback(_oldData, Safe(successData, `.${subKey.join('.')}`))
          : _checkIsNotObject(Safe(successData, `.${subKey.join('.')}`)) ||
            _checkIsNotObject(Safe(_oldData, `.${subKey.join('.')}`))
          ? Safe(successData, `.${subKey.join('.')}`)
          : newObject(_oldData, Safe(successData, `.${subKey.join('.')}`));
      });
    }
    return updateCallback
      ? updateCallback(oldData, successData)
      : _checkIsNotObject(successData) ||
        _checkIsNotObject(oldData) ||
        clearData
      ? successData
      : newObject(oldData, successData);
  })(),
  stausCode: successDataStatusCode || statusCode,
  error: false,
  lastUpdated: generateTimeStamp(),
  isInfinite: undefined,
  infiniteEnd: undefined,
  isError: false,
});
