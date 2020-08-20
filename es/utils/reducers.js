"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;

var _redux = require("redux");

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */

/* eslint-disable global-require */

/**
 * Combine all reducers in this file and export the combined reducers.
 */
// import { connectRouter } from 'connected-react-router';
// import history from './utils/history';
// import globalReducer from 'containers/App/reducer';
// import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
function createReducer() {
  var injectedReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // const connectRouter = history
  //   ? require('connected-react-router').connectRouter
  //   : null;
  // const History = history ? require('./utils/history').default : '';
  var reducer = Object.keys(injectedReducers).length > 0 ? injectedReducers : {
    global: () => ({})
  }; // const reducer = history
  //   ? {
  //       ..._reducer,
  //       router: connectRouter(History),
  //     }
  //   : {
  //       ..._reducer,
  //     };

  var rootReducer = (0, _redux.combineReducers)(reducer);
  return rootReducer;
}