"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infiniteHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const infiniteHandler = ({
  task: {
    clearData,
    subKey = [],
    limit,
    isAppendTop = false
  } = {},
  callback: {
    updateCallback
  } = {},
  successData = {},
  successDataStatusCode
}) => ({
  data: oldData = {},
  statusCode
} = {}) => ({
  data: (() => {
    if (subKey.length > 0 && Array.isArray((0, _helpers.getIn)(oldData, subKey))) {
      const _oldCopyData = { ...oldData,
        ...((0, _helpers.typeOf)(successData) === 'object' ? successData : {}),
        [subKey[0]]: oldData[subKey[0]]
      }; // return _oldCopyData

      return (0, _helpers.updateIn)(_oldCopyData, subKey, _oldData => {
        if (clearData) return (0, _nullCheck.default)(successData, `.${subKey.join('.')}`, []);
        return updateCallback ? updateCallback(_oldData, (0, _nullCheck.default)(successData, `.${subKey.join('.')}`, [])) : isAppendTop ? (0, _nullCheck.default)(successData, `.${subKey.join('.')}`, []).concat(_oldData) : _oldData.concat((0, _nullCheck.default)(successData, `.${subKey.join('.')}`, []));
      });
    }

    const getData = Array.isArray(successData) ? successData : [];
    const appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
    const newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
    return updateCallback ? updateCallback(oldData, successData) : newData;
  })(),
  error: false,
  lastUpdated: (0, _helpers.generateTimeStamp)(),
  statusCode: successDataStatusCode || statusCode,
  isInfinite: true,
  isError: false,
  infiniteEnd: (subKey.length > 0 ? (0, _nullCheck.default)(successData, `.${subKey.join('.')}`, []) : successData).length < limit
});

exports.infiniteHandler = infiniteHandler;