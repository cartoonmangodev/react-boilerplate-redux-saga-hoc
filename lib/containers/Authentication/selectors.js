function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { createSelector } from 'reselect';
import { CALL } from '../../utils/commonReduxSagaConverter/commonConstants'; // import * as apiEndPoints from '../../config/apiEndPoints';

import { newObject } from '../../utils/helpers';

var selectAuthenticationDomain = function selectAuthenticationDomain(initialState, generatorKey) {
  return function (state) {
    return state[generatorKey] || initialState;
  };
};

var makeSelectAuthenticationState = function makeSelectAuthenticationState(_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      initialState = _ref.initialState,
      InitialState = _ref.InitialState,
      generatorKey = _ref.generatorKey,
      constants = _ref.constants;
  return function () {
    return createSelector(selectAuthenticationDomain(initialState, generatorKey), function (substate) {
      return newObject(Object.keys(InitialState).reduce(function (acc, key) {
        var _extends2;

        return _extends({}, acc, (_extends2 = {}, _extends2[key] = substate[key], _extends2));
      }, {}), Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
        var _extends3;

        return _extends({}, acc, (_extends3 = {}, _extends3[key] = substate[constants[key][CALL]], _extends3));
      }, {}));
    });
  };
};

export { selectAuthenticationDomain, makeSelectAuthenticationState };