"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelectAuthenticationState = exports.selectAuthenticationDomain = void 0;

var _reselect = require("reselect");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _helpers = require("../../utils/helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectAuthenticationDomain = (initialState, generatorKey) => state => state[generatorKey] || initialState;

exports.selectAuthenticationDomain = selectAuthenticationDomain;

var makeSelectAuthenticationState = (_ref) => {
  var {
    apiEndPoints,
    initialState,
    InitialState,
    generatorKey,
    constants
  } = _ref;
  return () => (0, _reselect.createSelector)(selectAuthenticationDomain(initialState, generatorKey), substate => (0, _helpers.newObject)(Object.keys(InitialState).reduce((acc, key) => _objectSpread({}, acc, {
    [key]: substate[key]
  }), {}), Object.keys(apiEndPoints[generatorKey]).reduce((acc, key) => _objectSpread({}, acc, {
    [key]: substate[constants[key][_commonConstants.CALL]]
  }), {})));
};

exports.makeSelectAuthenticationState = makeSelectAuthenticationState;