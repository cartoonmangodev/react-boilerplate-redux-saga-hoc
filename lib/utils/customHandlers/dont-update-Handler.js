/* eslint-disable */
import { generateTimeStamp } from '../helpers';
export var dontUpdateDataHandler = function dontUpdateDataHandler(_ref) {
  var successDataStatusCode = _ref.successDataStatusCode;
  return function (_temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        statusCode = _ref2.statusCode;

    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};