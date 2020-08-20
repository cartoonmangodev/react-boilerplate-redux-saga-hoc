"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sagaConverter = require("../../utils/commonReduxSagaConverter/sagaConverter");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _helpers = require("../../utils/helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      generatorKey = _ref.generatorKey,
      dontResetOnLogout = _ref.dontResetOnLogout;
  var ConvertData = (0, _sagaConverter.convertData)(apiEndPoints);
  var initialState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return (0, _helpers.newObject)(acc, _defineProperty({}, ConvertData[generatorKey].constants[key][_commonConstants.CALL], _objectSpread({
      loading: {},
      toast: {}
    }, apiEndPoints[generatorKey][key].initialData ? {
      data: apiEndPoints[generatorKey][key]
    } : {})));
  }, {});
  var resetState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return !Object.keys(dontResetOnLogout || {}).includes(key) && (0, _helpers.newObject)(acc, _defineProperty({}, ConvertData[generatorKey].constants[key][_commonConstants.CALL], _objectSpread({
      loading: {},
      toast: {}
    }, apiEndPoints[generatorKey][key].initialData ? {
      data: apiEndPoints[generatorKey][key]
    } : {}))) || acc;
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