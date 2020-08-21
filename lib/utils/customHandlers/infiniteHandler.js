function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable */
import { generateTimeStamp, updateIn, getIn, typeOf } from '../helpers';
import Safe from '../nullCheck';
export var infiniteHandler = function infiniteHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      limit = _ref$task.limit,
      _ref$task$isAppendTop = _ref$task.isAppendTop,
      isAppendTop = _ref$task$isAppendTop === void 0 ? false : _ref$task$isAppendTop,
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
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _extends2;

          var _oldCopyData = _extends({}, oldData, {}, typeOf(successData) === 'object' ? successData : {}, (_extends2 = {}, _extends2[subKey[0]] = oldData[subKey[0]], _extends2)); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return Safe(successData, "." + subKey.join('.'), []);
            return updateCallback ? updateCallback(_oldData, Safe(successData, "." + subKey.join('.'), [])) : isAppendTop ? Safe(successData, "." + subKey.join('.'), []).concat(_oldData) : _oldData.concat(Safe(successData, "." + subKey.join('.'), []));
          });
        }

        var getData = Array.isArray(successData) ? successData : [];
        var appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
        var newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      }(),
      error: false,
      lastUpdated: generateTimeStamp(),
      statusCode: successDataStatusCode || statusCode,
      isInfinite: true,
      isError: false,
      infiniteEnd: (subKey.length > 0 ? Safe(successData, "." + subKey.join('.'), []) : successData).length < limit
    };
  };
};