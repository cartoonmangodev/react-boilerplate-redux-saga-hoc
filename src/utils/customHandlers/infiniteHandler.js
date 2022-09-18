/* eslint-disable */
import { generateTimeStamp, updateIn, getIn, typeOf } from '../helpers';
import Safe from '../nullCheck';
export const infiniteHandler = ({
  callback: { updateCallback: __updateCallback } = {},
  task: {
    clearData,
    subKey = [],
    limit,
    isAppendTop = false,
    setInfiniteEnd,
    updateCallback = __updateCallback,
  } = {},
  successData = {},
  successDataStatusCode,
  type,
  state,
}) => ({ data: oldData = {}, statusCode } = {}) => ({
  data: (() => {
    if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
      const _oldCopyData = {
        ...oldData,
        ...(typeOf(successData) === 'object' ? successData : {}),
        [subKey[0]]: oldData[subKey[0]],
      };
      // return _oldCopyData
      return updateIn(_oldCopyData, subKey, _oldData => {
        if (clearData) return Safe(successData, `.${subKey.join('.')}`, []);
        return updateCallback
          ? updateCallback({
              oldData: _oldData,
              successData: Safe(successData, `.${subKey.join('.')}`, []),
              type,
              state,
            })
          : isAppendTop
          ? Safe(successData, `.${subKey.join('.')}`, []).concat(_oldData)
          : _oldData.concat(Safe(successData, `.${subKey.join('.')}`, []));
      });
    }
    const getData = Array.isArray(successData) ? successData : [];
    const appendData = Array.isArray(oldData)
      ? isAppendTop
        ? getData.concat(oldData)
        : oldData.concat(getData)
      : getData;
    const newData = clearData
      ? successData
      : Array.isArray(successData)
      ? appendData
      : successData;
    return updateCallback
      ? updateCallback({ oldData, successData, type, state })
      : newData;
  })(),
  error: false,
  lastUpdated: generateTimeStamp(),
  statusCode: successDataStatusCode || statusCode,
  isInfinite: typeof limit === 'number',
  isError: false,
  initialState: false,
  infiniteEnd:
    setInfiniteEnd !== undefined && typeof setInfiniteEnd === 'function'
      ? setInfiniteEnd(successData)
      : limit !== undefined && typeof limit === 'number'
      ? (subKey.length > 0
          ? Safe(successData, `.${subKey.join('.')}`, [])
          : successData
        ).length < limit
      : null,
});
