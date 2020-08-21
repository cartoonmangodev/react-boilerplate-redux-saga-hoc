function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */
import { updateIn, generateTimeStamp, typeOf } from '../helpers';

var executeTask = function executeTask(_ref, data) {
  var id = _ref.id,
      key = _ref.key;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc : acc.concat([curr]);
  }, []) : data.filter(function (_ref2) {
    var objId = _ref2[key];
    return objId !== id;
  });
};

export var deleteHandler = function deleteHandler(_ref3) {
  var _ref3$task = _ref3.task;
  _ref3$task = _ref3$task === void 0 ? {} : _ref3$task;
  var key = _ref3$task.key,
      id = _ref3$task.id,
      _ref3$task$subKey = _ref3$task.subKey,
      subKey = _ref3$task$subKey === void 0 ? [] : _ref3$task$subKey,
      _ref3$successData = _ref3.successData,
      successData = _ref3$successData === void 0 ? {} : _ref3$successData,
      successDataStatusCode = _ref3.successDataStatusCode;
  return function (_temp) {
    var _extends2;

    var _ref4 = _temp === void 0 ? {} : _temp,
        _ref4$data = _ref4.data,
        data = _ref4$data === void 0 ? [] : _ref4$data,
        statusCode = _ref4.statusCode;

    var commonData = {
      key: key,
      id: id
    };

    var _successData = typeOf(successData) === 'object' ? successData : {};

    return {
      data: subKey.length > 0 ? updateIn(_extends({}, data, {}, _successData, (_extends2 = {}, _extends2[subKey[0]] = data[subKey[0]], _extends2)), subKey, function (_data) {
        return executeTask(commonData, _data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};