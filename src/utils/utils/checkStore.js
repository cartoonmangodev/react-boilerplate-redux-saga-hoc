// import isFunction from 'lodash/isFunction';
// import isObject from 'lodash/isObject';
// import conformsTo from 'lodash/conformsTo';
import invariant from 'invariant';
import { typeOf } from '../helpers';

/**
 * Validate the shape of redux store
 */
// export default function checkStore(store) {
//   const shape = {
//     dispatch: isFunction,
//     subscribe: isFunction,
//     getState: isFunction,
//     replaceReducer: isFunction,
//     runSaga: isFunction,
//     injectedReducers: isObject,
//     injectedSagas: isObject,
// //   };
//   invariant(
//     conformsTo(store, shape),
//     '(app/utils...) injectors: Expected a valid redux store',
//   );
// }

export default function checkStore(store) {
  invariant(
    typeOf(store) === 'object' &&
      typeOf(store.dispatch) === 'function' &&
      typeOf(store.subscribe) === 'function' &&
      typeOf(store.getState) === 'function' &&
      typeOf(store.replaceReducer) === 'function' &&
      typeOf(store.runSaga) === 'function' &&
      typeOf(store.injectedReducers) === 'object' &&
      typeOf(store.injectedSagas) === 'object',
    '(app/utils...) injectors: Expected a valid redux store',
  );
}
