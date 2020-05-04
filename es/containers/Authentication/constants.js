"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sagaConverter = require("../../utils/commonReduxSagaConverter/sagaConverter");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _helpers = require("../../utils/helpers");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      generatorKey = _ref.generatorKey,
      dontResetOnLogout = _ref.dontResetOnLogout;
  var ConvertData = (0, _sagaConverter.convertData)(apiEndPoints);
  var initialState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return (0, _helpers.newObject)(acc, _defineProperty({}, ConvertData[generatorKey].constants[key][_commonConstants.CALL], {
      loading: {},
      toast: {}
    }));
  }, {});
  var resetState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return !Object.keys(dontResetOnLogout || {}).includes(key) && (0, _helpers.newObject)(acc, _defineProperty({}, ConvertData[generatorKey].constants[key][_commonConstants.CALL], {
      loading: {},
      toast: {}
    })) || acc;
  }, {});
  var _ConvertData$generato = ConvertData[generatorKey],
      constants = _ConvertData$generato.constants,
      actions = _ConvertData$generato.actions,
      sagaConfig = _ConvertData$generato.sagaConfig;
  return {
    constants: constants,
    initialState: initialState,
    generatorKey: generatorKey,
    actions: actions,
    sagaConfig: sagaConfig,
    resetState: resetState
  };
};

exports.default = _default;