import { takeEvery } from 'redux-saga/effects';
import { CALL, SUCCESS, ERROR, CANCEL, CUSTOM } from './commonConstants'; // import apiEndPoints from '../../config/apiEndPoints';

import { actionsHandler } from './commonActions';
import { newObject } from '../helpers';
export var convertData = function convertData(apiEndPoints) {
  return Object.keys(apiEndPoints).reduce(function (prev, curr) {
    var _newObject4;

    var constants = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key, _newObject;

      return newObject(acc, (_newObject = {}, _newObject[key] = (_key = {}, _key[CALL] = "app/conatainers/" + curr + "/" + key + "_" + CALL, _key[SUCCESS] = "app/conatainers/" + curr + "/" + key + "_" + SUCCESS, _key[CUSTOM] = "app/conatainers/" + curr + "/" + key + "_" + CUSTOM, _key[ERROR] = "app/conatainers/" + curr + "/" + key + "_" + ERROR, _key[CANCEL] = "app/conatainers/" + curr + "/" + key + "_" + CANCEL, _key), _newObject));
    }, {});
    var actions = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key2, _newObject2;

      return newObject(acc, (_newObject2 = {}, _newObject2[key] = (_key2 = {}, _key2[CALL] = actionsHandler.call(constants[key][CALL]), _key2[SUCCESS] = actionsHandler.success(constants[key][SUCCESS]), _key2[CUSTOM] = actionsHandler.custom(constants[key][CUSTOM]), _key2[ERROR] = actionsHandler.error(constants[key][ERROR]), _key2[CANCEL] = actionsHandler.cancel(constants[key][CANCEL]), _key2), _newObject2));
    }, {});
    var sagaConfig = Object.entries(apiEndPoints[curr]).reduce(function (acc, _ref) {
      var _newObject3;

      var key = _ref[0],
          value = _ref[1];
      return newObject(acc, (_newObject3 = {}, _newObject3[constants[key][CALL]] = {
        api: value,
        cancel: constants[key][CANCEL],
        actions: actions[key],
        effect: value.effect === 'every' && takeEvery
      }, _newObject3));
    }, {});
    return newObject(prev, (_newObject4 = {}, _newObject4[curr] = {
      actions: actions,
      constants: constants,
      sagaConfig: sagaConfig
    }, _newObject4));
  }, {});
};