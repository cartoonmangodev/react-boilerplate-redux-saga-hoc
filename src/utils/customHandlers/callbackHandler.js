/* eslint-disable */
// import { generateTimeStamp, updateIn, getIn, newObject } from '../helpers';
// import Safe from '../nullCheck';
// const _checkIsNotObject = data =>
//   Object.prototype.toString.call(data) !== '[object Object]';
export const callbackHandler = ({
  task: { callback } = {},
  successData = {},
  successDataStatusCode,
}) => ({ data: oldData = {}, statusCode, ...rest } = {}) =>
  callback({
    oldData: oldData,
    newData: successData,
    rest: { ...rest, statusCode },
    status: statusCode || successDataStatusCode,
  });
