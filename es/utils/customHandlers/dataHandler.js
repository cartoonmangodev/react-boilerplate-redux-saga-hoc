"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const _checkIsNotObject = data => Object.prototype.toString.call(data) !== '[object Object]';

const dataHandler = ({
  mutation: isMutation,
  task: {
    clearData,
    subKey = []
  } = {},
  callback: {
    updateCallback
  } = {},
  successData = {},
  successDataStatusCode
}) => ({
  data: oldData = {},
  statusCode,
  ...rest
} = {}) => isMutation ? {
  data: oldData,
  statusCode,
  ...rest,
  ...successData
} : {
  data: (() => {
    if (subKey.length > 0) {
      const _oldCopyData = { ...oldData,
        ...(_checkIsNotObject(successData) ? {} : successData),
        [subKey[0]]: oldData[subKey[0]]
      };
      return (0, _helpers.updateIn)(_oldCopyData, subKey, _oldData => {
        if (clearData) return (0, _nullCheck.default)(successData, `.${subKey.join('.')}`);
        return updateCallback ? updateCallback(_oldData, (0, _nullCheck.default)(successData, `.${subKey.join('.')}`)) : _checkIsNotObject((0, _nullCheck.default)(successData, `.${subKey.join('.')}`)) || _checkIsNotObject((0, _nullCheck.default)(_oldData, `.${subKey.join('.')}`)) ? (0, _nullCheck.default)(successData, `.${subKey.join('.')}`) : (0, _helpers.newObject)(_oldData, (0, _nullCheck.default)(successData, `.${subKey.join('.')}`));
      });
    }

    return updateCallback ? updateCallback(oldData, successData) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : (0, _helpers.newObject)(oldData, successData);
  })(),
  statusCode: successDataStatusCode || statusCode,
  error: false,
  lastUpdated: (0, _helpers.generateTimeStamp)(),
  isInfinite: null,
  infiniteEnd: null,
  isError: false
};

exports.dataHandler = dataHandler;