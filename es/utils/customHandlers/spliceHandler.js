function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable */
import { generateTimeStamp, updateIn, getIn, typeOf } from '../helpers';
import Safe from '../nullCheck';
export var spliceHandler = function spliceHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$spliceKey = _ref$task.spliceKey,
      spliceKey = _ref$task$spliceKey === void 0 ? [] : _ref$task$spliceKey,
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
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _extends2;

          var _oldCopyData = _extends({}, oldData, {}, typeOf(successData) === 'object' ? successData : {}, (_extends2 = {}, _extends2[subKey[0]] = oldData[subKey[0]], _extends2)); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return Safe(successData, "." + subKey.join('.'), []);
            return updateCallback ? updateCallback(_oldData, Safe(successData, "." + subKey.join('.'), [])) : Array.isArray(_oldData) ? function () {
              var _newData = _oldData.slice();

              _newData.splice.apply(_newData, spliceKey.concat(Safe(successData, "." + subKey.join('.'), [])));

              return _newData;
            }() : _oldData;
          });
        }

        var newData = Array.isArray(oldData) ? function () {
          var _newData = oldData.slice();

          return _newData.splice.apply(_newData, spliceKey.concat(Safe(successData, "." + subKey.join('.'), [])));
        }() : oldData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};