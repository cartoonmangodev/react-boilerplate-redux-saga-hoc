"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelectAuthenticationState = exports.selectAuthenticationDomain = void 0;

var _reselect = require("reselect");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _helpers = require("../../utils/helpers");

// import * as apiEndPoints from '../../config/apiEndPoints';
const selectAuthenticationDomain = (initialState, generatorKey) => state => state[generatorKey] || initialState;

exports.selectAuthenticationDomain = selectAuthenticationDomain;

const makeSelectAuthenticationState = ({
  apiEndPoints,
  initialState,
  InitialState,
  generatorKey,
  constants
}) => () => (0, _reselect.createSelector)(selectAuthenticationDomain(initialState, generatorKey), substate => (0, _helpers.newObject)(Object.keys(InitialState).reduce((acc, key) => ({ ...acc,
  [key]: substate[key]
}), {}), Object.keys(apiEndPoints[generatorKey]).reduce((acc, key) => ({ ...acc,
  [key]: substate[constants[key][_commonConstants.CALL]]
}), {})));

exports.makeSelectAuthenticationState = makeSelectAuthenticationState;