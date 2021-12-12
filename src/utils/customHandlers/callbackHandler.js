/* eslint-disable */
// import { generateTimeStamp, updateIn, getIn, newObject } from '../helpers';
// import Safe from '../nullCheck';
// const _checkIsNotObject = data =>
//   Object.prototype.toString.call(data) !== '[object Object]';
import invariant from 'invariant';
import { typeOf, generateTimeStamp } from '../helpers';
const checkKey = callback => {
  invariant(
    typeOf(callback) === 'function',
    `(react-boilerplate-redux-saga-hoc) ${
      typeof callback === 'undefined'
        ? "'Callback-Handler' required callback key"
        : 'callback is not a function'
    }`,
  );
};
export const callbackHandler = ({
  task: { callback } = {},
  successData = {},
  successDataStatusCode,
}) => ({ data: oldData = {}, statusCode, ...rest } = {}) => {
  checkKey(callback);
  return {
    lastUpdated: generateTimeStamp(),
    ...callback({
      oldData: oldData,
      newData: successData,
      rest: { ...rest, statusCode },
      status: statusCode || successDataStatusCode,
    }),
  };
};
