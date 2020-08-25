/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable global-require */
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const reducer =
    Object.keys(injectedReducers).length > 0
      ? injectedReducers
      : {
          global: () => ({}),
        };
  const rootReducer = combineReducers(reducer);
  return rootReducer;
}
