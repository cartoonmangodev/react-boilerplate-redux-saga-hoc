/* eslint-disable */
import { generateTimeStamp, updateIn, getIn } from '../helpers';
import Safe from '../nullCheck';
export const infiniteHandler = ({
  task: { clearData, subKey = [], limit, isAppendTop = false } = {},
  callback: { updateCallback } = {},
  successData = {},
}) => ({ data: oldData = {} } = {}) => ({
  data: (() => {
    if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
      const _oldCopyData = {
        ...oldData,
        ...successData,
        [subKey[0]]: oldData[subKey[0]],
      };
      // return _oldCopyData
      return updateIn(_oldCopyData, subKey, _oldData => {
        if (clearData) return Safe(successData, `.${subKey.join('.')}`, []);
        return updateCallback
          ? updateCallback(
              _oldData,
              Safe(successData, `.${subKey.join('.')}`, []),
            )
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
    const newData =
      (clearData && successData) ||
      (Array.isArray(successData) && appendData) ||
      successData;
    return updateCallback ? updateCallback(oldData, successData) : newData;
  })(),
  error: false,
  lastUpdated: generateTimeStamp(),
  isInfinite: true,
  isError: false,
  infiniteEnd:
    (subKey.length > 0
      ? Safe(successData, `.${subKey.join('.')}`, [])
      : successData
    ).length < limit,
});
