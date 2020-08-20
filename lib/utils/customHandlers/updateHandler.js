function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */
import { updateIn, newObject, generateTimeStamp, typeOf } from '../helpers';
import Safe from '../nullCheck';

var updateData = function updateData(data, successData, updateCallback) {
  if (updateCallback) return updateCallback(data, successData) || data;
  if (typeof successData === 'object' && !Array.isArray(successData) && typeof data === 'object' && !Array.isArray(data)) return newObject(data, successData);
  return successData;
};

export var updateHandler = function updateHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function (_temp) {
    var _extends2;

    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_extends({}, data, {}, typeOf(successData) === 'object' ? successData : {}, (_extends2 = {}, _extends2[subKey[0]] = data[subKey[0]], _extends2)), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData(_Data, Safe(successData, "." + subKey.join('.')), updateCallback);
          if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc, curr) {
            if (curr === void 0) {
              curr = {};
            }

            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
            }() : acc.concat([curr]);
          }, []);
          if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
            }() : _data;
          });
          return updateData(_Data, Safe(successData, "." + subKey.join('.')), updateCallback);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData(data, successData, updateCallback);
        if (Array.isArray(id) && key) return data.reduce(function (acc, curr) {
          if (curr === void 0) {
            curr = {};
          }

          return id.includes(curr[key]) ? function () {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
          }() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index += 1;
            return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
          }() : _data;
        });
        return updateData(data, successData, updateCallback);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};