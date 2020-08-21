function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */
import { generateTimeStamp, updateIn, getIn, newObject } from '../helpers';
import Safe from '../nullCheck';

var _checkIsNotObject = function _checkIsNotObject(data) {
  return Object.prototype.toString.call(data) !== '[object Object]';
};

export var dataHandler = function dataHandler(_ref) {
  var isMutation = _ref.mutation,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function (_temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutPropertiesLoose(_ref2, ["data", "statusCode"]);

    return isMutation ? _extends({
      data: oldData,
      statusCode: statusCode
    }, rest, {}, successData) : {
      data: function () {
        if (subKey.length > 0) {
          var _extends2;

          var _oldCopyData = _extends({}, oldData, {}, _checkIsNotObject(successData) ? {} : successData, (_extends2 = {}, _extends2[subKey[0]] = oldData[subKey[0]], _extends2));

          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return Safe(successData, "." + subKey.join('.'));
            return updateCallback ? updateCallback(_oldData, Safe(successData, "." + subKey.join('.'))) : _checkIsNotObject(Safe(successData, "." + subKey.join('.'))) || _checkIsNotObject(Safe(_oldData, "." + subKey.join('.'))) ? Safe(successData, "." + subKey.join('.')) : newObject(_oldData, Safe(successData, "." + subKey.join('.')));
          });
        }

        return updateCallback ? updateCallback(oldData, successData) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : newObject(oldData, successData);
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null,
      isError: false
    };
  };
};