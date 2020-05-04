"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;

var _redux = require("redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { connectRouter } from 'connected-react-router';
// import history from './utils/history';
// import globalReducer from 'containers/App/reducer';
// import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
function createReducer() {
  var injectedReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var history = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var connectRouter = history ? require('connected-react-router').connectRouter : null;
  var History = history ? require('./utils/history').default : '';

  var _reducer = Object.keys(injectedReducers).length > 0 ? injectedReducers : {
    router: function router() {
      return {};
    }
  };

  var reducer = history ? _objectSpread({}, _reducer, {
    router: connectRouter(History)
  }) : _objectSpread({}, _reducer);
  var rootReducer = (0, _redux.combineReducers)(reducer);
  return rootReducer;
}