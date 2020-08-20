"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertData = void 0;

var _effects = require("redux-saga/effects");

var _commonConstants = require("./commonConstants");

var _commonActions = require("./commonActions");

var _helpers = require("../helpers");

// import apiEndPoints from '../../config/apiEndPoints';
var convertData = apiEndPoints => Object.keys(apiEndPoints).reduce((prev, curr) => {
  var constants = Object.keys(apiEndPoints[curr]).reduce((acc, key) => (0, _helpers.newObject)(acc, {
    [key]: {
      [_commonConstants.CALL]: "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.CALL),
      [_commonConstants.SUCCESS]: "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.SUCCESS),
      [_commonConstants.CUSTOM]: "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.CUSTOM),
      [_commonConstants.ERROR]: "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.ERROR),
      [_commonConstants.CANCEL]: "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.CANCEL)
    }
  }), {});
  var actions = Object.keys(apiEndPoints[curr]).reduce((acc, key) => (0, _helpers.newObject)(acc, {
    [key]: {
      [_commonConstants.CALL]: _commonActions.actionsHandler.call(constants[key][_commonConstants.CALL]),
      [_commonConstants.SUCCESS]: _commonActions.actionsHandler.success(constants[key][_commonConstants.SUCCESS]),
      [_commonConstants.CUSTOM]: _commonActions.actionsHandler.custom(constants[key][_commonConstants.CUSTOM]),
      [_commonConstants.ERROR]: _commonActions.actionsHandler.error(constants[key][_commonConstants.ERROR]),
      [_commonConstants.CANCEL]: _commonActions.actionsHandler.cancel(constants[key][_commonConstants.CANCEL])
    }
  }), {});
  var sagaConfig = Object.entries(apiEndPoints[curr]).reduce((acc, _ref) => {
    var [key, value] = _ref;
    return (0, _helpers.newObject)(acc, {
      [constants[key][_commonConstants.CALL]]: {
        api: value,
        cancel: constants[key][_commonConstants.CANCEL],
        actions: actions[key],
        effect: value.effect === 'every' && _effects.takeEvery
      }
    });
  }, {});
  return (0, _helpers.newObject)(prev, {
    [curr]: {
      actions,
      constants,
      sagaConfig
    }
  });
}, {});

exports.convertData = convertData;