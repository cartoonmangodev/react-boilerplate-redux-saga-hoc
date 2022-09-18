import invariant from 'invariant';
// import isEmpty from 'lodash/isEmpty';
// import isFunction from 'lodash/isFunction';
// import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../reducers';
import { typeOf } from '../helpers';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer, customCreateReducer) {
    if (!isValid) checkStore(store);

    invariant(
      typeOf(key) === 'string' && key && typeOf(reducer) === 'function',
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(
      (customCreateReducer || createReducer)(store.injectedReducers),
    );
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
