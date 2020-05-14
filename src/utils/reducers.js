/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable global-require */
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';

// import history from './utils/history';
// import globalReducer from 'containers/App/reducer';
// import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  // const connectRouter = history
  //   ? require('connected-react-router').connectRouter
  //   : null;
  // const History = history ? require('./utils/history').default : '';
  const reducer =
    Object.keys(injectedReducers).length > 0
      ? injectedReducers
      : {
          global: () => ({}),
        };
  // const reducer = history
  //   ? {
  //       ..._reducer,
  //       router: connectRouter(History),
  //     }
  //   : {
  //       ..._reducer,
  //     };
  const rootReducer = combineReducers(reducer);

  return rootReducer;
}
