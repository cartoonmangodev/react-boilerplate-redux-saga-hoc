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
const convertData = apiEndPoints => Object.keys(apiEndPoints).reduce((prev, curr) => {
  const constants = Object.keys(apiEndPoints[curr]).reduce((acc, key) => (0, _helpers.newObject)(acc, {
    [key]: {
      [_commonConstants.CALL]: `app/conatainers/${curr}/${key}_${_commonConstants.CALL}`,
      [_commonConstants.SUCCESS]: `app/conatainers/${curr}/${key}_${_commonConstants.SUCCESS}`,
      [_commonConstants.CUSTOM]: `app/conatainers/${curr}/${key}_${_commonConstants.CUSTOM}`,
      [_commonConstants.ERROR]: `app/conatainers/${curr}/${key}_${_commonConstants.ERROR}`,
      [_commonConstants.CANCEL]: `app/conatainers/${curr}/${key}_${_commonConstants.CANCEL}`
    }
  }), {});
  const actions = Object.keys(apiEndPoints[curr]).reduce((acc, key) => (0, _helpers.newObject)(acc, {
    [key]: {
      [_commonConstants.CALL]: _commonActions.actionsHandler.call(constants[key][_commonConstants.CALL]),
      [_commonConstants.SUCCESS]: _commonActions.actionsHandler.success(constants[key][_commonConstants.SUCCESS]),
      [_commonConstants.CUSTOM]: _commonActions.actionsHandler.custom(constants[key][_commonConstants.CUSTOM]),
      [_commonConstants.ERROR]: _commonActions.actionsHandler.error(constants[key][_commonConstants.ERROR]),
      [_commonConstants.CANCEL]: _commonActions.actionsHandler.cancel(constants[key][_commonConstants.CANCEL])
    }
  }), {});
  const sagaConfig = Object.entries(apiEndPoints[curr]).reduce((acc, [key, value]) => (0, _helpers.newObject)(acc, {
    [constants[key][_commonConstants.CALL]]: {
      api: value,
      cancel: constants[key][_commonConstants.CANCEL],
      actions: actions[key],
      effect: value.effect === 'every' && _effects.takeEvery
    }
  }), {});
  return (0, _helpers.newObject)(prev, {
    [curr]: {
      actions,
      constants,
      sagaConfig
    }
  });
}, {});

exports.convertData = convertData;