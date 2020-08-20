function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */
import { updateIn, generateTimeStamp, typeOf } from '../helpers';

var toggleData = function toggleData(obj, keyArray) {
  return Object.keys(obj).reduce(function (acc, curr) {
    var _extends2;

    return _extends({}, acc, (_extends2 = {}, _extends2[curr] = keyArray.includes(curr) ? !obj[curr] : obj[curr], _extends2));
  }, {});
};

var executeTask = function executeTask(_ref, _Data) {
  var successData = _ref.successData,
      toggleKey = _ref.toggleKey,
      id = _ref.id,
      key = _ref.key,
      updateCallback = _ref.updateCallback;
  return updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
  }, []) : _Data.map(function (_data) {
    return _data[key] === id ? toggleData(_data, toggleKey) : _data;
  });
};

export var toggleKeyHandler = function toggleKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$toggleKey = _ref2$task.toggleKey,
      toggleKey = _ref2$task$toggleKey === void 0 ? [] : _ref2$task$toggleKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function (_temp) {
    var _extends3;

    var _ref3 = _temp === void 0 ? {} : _temp,
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      successData: successData,
      toggleKey: toggleKey,
      id: id,
      key: key,
      updateCallback: updateCallback
    };
    return {
      data: subKey.length > 0 ? updateIn(_extends({}, data, {}, typeOf(successData) === 'object' ? successData : {}, (_extends3 = {}, _extends3[subKey[0]] = data[subKey[0]], _extends3)), subKey, function (_Data) {
        return executeTask(commonData, _Data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};