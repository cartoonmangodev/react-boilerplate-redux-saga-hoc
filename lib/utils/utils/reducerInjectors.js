"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectReducerFactory = injectReducerFactory;
exports.default = getInjectors;

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _checkStore = _interopRequireDefault(require("./checkStore"));

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer, customCreateReducer) {
    if (!isValid) (0, _checkStore.default)(store);
    (0, _invariant.default)((0, _lodash.isString)(key) && !(0, _lodash.isEmpty)(key) && (0, _lodash.isFunction)(reducer), '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'); // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    store.replaceReducer((customCreateReducer || _reducers.default)(store.injectedReducers));
  };
}

function getInjectors(store) {
  (0, _checkStore.default)(store);
  return {
    injectReducer: injectReducerFactory(store, true)
  };
}