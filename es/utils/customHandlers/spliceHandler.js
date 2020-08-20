"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spliceHandler = void 0;

var _helpers = require("../helpers");

var _nullCheck = _interopRequireDefault(require("../nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const spliceHandler = ({
  task: {
    clearData,
    spliceKey = [],
    subKey = []
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
        return updateCallback ? updateCallback(_oldData, (0, _nullCheck.default)(successData, `.${subKey.join('.')}`, [])) : Array.isArray(_oldData) ? (() => {
          const _newData = _oldData.slice();

          _newData.splice(...spliceKey, ...(0, _nullCheck.default)(successData, `.${subKey.join('.')}`, []));

          return _newData;
        })() : _oldData;
      });
    }

    const newData = Array.isArray(oldData) ? (() => {
      const _newData = oldData.slice();

      return _newData.splice(...spliceKey, ...(0, _nullCheck.default)(successData, `.${subKey.join('.')}`, []));
    })() : oldData;
    return updateCallback ? updateCallback(oldData, successData) : newData;
  })(),
  statusCode: successDataStatusCode || statusCode,
  error: false,
  lastUpdated: (0, _helpers.generateTimeStamp)(),
  isError: false
});

exports.spliceHandler = spliceHandler;