"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;
exports.nextStore = void 0;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("redux-saga/effects");

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middleWare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var composeEnhancers = _redux.compose;
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

  var sagaMiddleware = (0, _reduxSaga.default)(reduxSagaMonitorOptions); // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state

  var middlewares = [sagaMiddleware].concat(middleWare // isWeb ? [routerMiddleware(History)] : [],
  );
  var enhancers = [(0, _redux.applyMiddleware)(...middlewares)];
  var store = (0, _redux.createStore)((0, _reducers.default)({}), initialState, composeEnhancers(...enhancers)); // Extensions

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry

  store.injectedSagas = {}; // Saga registry
  // Make reducers hot reloadable, see http://mxs.is/googmo

  /* istanbul ignore next */

  if (typeof module === 'object' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer((0, _reducers.default)(store.injectedReducers));
    });
  } // global._redux_store = store;


  return store;
}

var nextStore = (_ref) => {
  var {
    saga,
    reducer
  } = _ref;
  return function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      isServer,
      req = null
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var composeEnhancers = _redux.compose;
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

    var sagaMiddleware = (0, _reduxSaga.default)(reduxSagaMonitorOptions); // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state

    var middlewares = [sagaMiddleware];
    var enhancers = [(0, _redux.applyMiddleware)(...middlewares)];
    var store = (0, _redux.createStore)((0, _redux.combineReducers)(reducer.reduce((acc, e) => _objectSpread({}, acc, {
      [e.name]: e.reducer
    }), {})), initialState, composeEnhancers(...enhancers)); // Extensions

    store.runSaga = sagaMiddleware.run; // store.sagaTask = sagaMiddleware;

    store.injectedReducers = {}; // Reducer registry

    store.injectedSagas = {}; // Saga registry

    store.tasks = {};

    if (req || !isServer) {
      store.sagaTask = sagaMiddleware.run(function* rootSaga() {
        yield (0, _effects.all)(saga.map(_effects.fork));
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

exports.nextStore = nextStore;