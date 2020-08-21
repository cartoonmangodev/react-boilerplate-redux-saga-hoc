function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable global-require */

/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; // import { routerMiddleware } from 'connected-react-router';

import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import createReducer from './reducers';
export default function configureStore(initialState, middleWare) {
  if (initialState === void 0) {
    initialState = {};
  }

  if (middleWare === void 0) {
    middleWare = [];
  }

  var composeEnhancers = compose;
  var reduxSagaMonitorOptions = {}; // const routerMiddleware = isWeb
  //   ? require('connected-react-router').routerMiddleware
  //   : null;
  // const History = isWeb ? require('./utils/history').default : null;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

  /* istanbul ignore next */

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}); // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };

    /* eslint-enable */
  }

  var sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions); // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state

  var middlewares = [sagaMiddleware].concat(middleWare // isWeb ? [routerMiddleware(History)] : [],
  );
  var enhancers = [applyMiddleware.apply(void 0, middlewares)];
  var store = createStore(createReducer({}), initialState, composeEnhancers.apply(void 0, enhancers)); // Extensions

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry

  store.injectedSagas = {}; // Saga registry
  // Make reducers hot reloadable, see http://mxs.is/googmo

  /* istanbul ignore next */

  if (typeof module === 'object' && module.hot) {
    module.hot.accept('./reducers', function () {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  } // global._redux_store = store;


  return store;
}

var nextStore = function nextStore(_ref) {
  var saga = _ref.saga,
      reducer = _ref.reducer;
  return function (initialState, _temp) {
    if (initialState === void 0) {
      initialState = {};
    }

    var _ref2 = _temp === void 0 ? {} : _temp,
        isServer = _ref2.isServer,
        _ref2$req = _ref2.req,
        req = _ref2$req === void 0 ? null : _ref2$req;

    var composeEnhancers = compose;
    var monitor = null; // if (typeof window !== "undefined")
    //   monitor = window["__SAGA_MONITOR_EXTENSION__"];

    var reduxSagaMonitorOptions = {
      sagaMonitor: monitor
    }; // eslint-disable-next-line global-require
    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

    /* istanbul ignore next */

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
      /* eslint-disable no-underscore-dangle */
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}); // NOTE: Uncomment the code below to restore support for Redux Saga
      // Dev Tools once it supports redux-saga version 1.x.x
      // if (window.__SAGA_MONITOR_EXTENSION__)
      //   reduxSagaMonitorOptions = {
      //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
      //   };

      /* eslint-enable */
    }

    var sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions); // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state

    var middlewares = [sagaMiddleware];
    var enhancers = [applyMiddleware.apply(void 0, middlewares)];
    var store = createStore(combineReducers(reducer.reduce(function (acc, e) {
      var _extends2;

      return _extends({}, acc, (_extends2 = {}, _extends2[e.name] = e.reducer, _extends2));
    }, {})), initialState, composeEnhancers.apply(void 0, enhancers)); // Extensions

    store.runSaga = sagaMiddleware.run; // store.sagaTask = sagaMiddleware;

    store.injectedReducers = {}; // Reducer registry

    store.injectedSagas = {}; // Saga registry

    store.tasks = {};

    if (req || !isServer) {
      store.sagaTask = sagaMiddleware.run(function* rootSaga() {
        yield all(saga.map(fork));
      });
    } // Make reducers hot reloadable, see http://mxs.is/googmo

    /* istanbul ignore next */
    // if (module && module.hot) {
    //   module.hot.accept("./reducers", () => {`
    //     store.replaceReducer(createReducer(store.injectedReducers));
    //   });
    // }


    return store;
  };
};

export { nextStore };