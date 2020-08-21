function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */
import { updateIn, generateTimeStamp, deleteIn, typeOf } from '../helpers'; // import _remove from 'lodash/remove';

var deletedData = function deletedData(obj, keyArray) {
  if (obj === void 0) {
    obj = {};
  }

  if (keyArray === void 0) {
    keyArray = [];
  }

  // eslint-disable-next-line no-underscore-dangle
  var _obj = obj;
  _obj = typeOf(obj) === 'object' ? _extends({}, _obj) : _obj;

  if (typeOf(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(function (_key) {
      _obj = Array.isArray(_key) ? deleteIn(_obj, _key) : deleteIn(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

var executeTask = function executeTask(_ref, data) {
  var updateCallback = _ref.updateCallback,
      successData = _ref.successData,
      deleteKey = _ref.deleteKey,
      id = _ref.id,
      key = _ref.key;
  return updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]);
  }, []) : data.map(function (_data) {
    return _data[key] === id ? deletedData(_data, deleteKey) : _data;
  });
};

export var deleteKeyHandler = function deleteKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$deleteKey = _ref2$task.deleteKey,
      deleteKey = _ref2$task$deleteKey === void 0 ? [] : _ref2$task$deleteKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function (_temp) {
    var _extends2;

    var _ref3 = _temp === void 0 ? {} : _temp,
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      updateCallback: updateCallback,
      successData: successData,
      deleteKey: deleteKey,
      id: id,
      key: key
    };
    return {
      data: subKey.length > 0 ? updateIn(_extends({}, data, {}, successData, (_extends2 = {}, _extends2[subKey[0]] = data[subKey[0]], _extends2)), subKey, function (_Data) {
        return executeTask(commonData, _Data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};