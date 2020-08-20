"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectSagaFactory = injectSagaFactory;
exports.ejectSagaFactory = ejectSagaFactory;
exports.default = getInjectors;

var _invariant = _interopRequireDefault(require("invariant"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _conformsTo = _interopRequireDefault(require("lodash/conformsTo"));

var _checkStore = _interopRequireDefault(require("./checkStore"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const allowedModes = [_constants.RESTART_ON_REMOUNT, _constants.DAEMON, _constants.ONCE_TILL_UNMOUNT];

const checkKey = key => (0, _invariant.default)((0, _isString.default)(key) && !(0, _isEmpty.default)(key), '(app/utils...) injectSaga: Expected `key` to be a non empty string');

const checkDescriptor = descriptor => {
  const shape = {
    saga: _isFunction.default,
    mode: mode => (0, _isString.default)(mode) && allowedModes.includes(mode)
  };
  (0, _invariant.default)((0, _conformsTo.default)(descriptor, shape), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

function injectSagaFactory(store, isValid) {
  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) (0, _checkStore.default)(store);
    const newDescriptor = { ...descriptor,
      mode: descriptor.mode || _constants.DAEMON
    };
    const {
      saga,
      mode
    } = newDescriptor;
    checkKey(key);
    checkDescriptor(newDescriptor);
    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || hasSaga && mode !== _constants.DAEMON && mode !== _constants.ONCE_TILL_UNMOUNT) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = { ...newDescriptor,
        task: store.runSaga(saga, args)
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) (0, _checkStore.default)(store);
    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];

      if (descriptor.mode && descriptor.mode !== _constants.DAEMON) {
        descriptor.task.cancel(); // Clean up in production; in development we need `descriptor.saga` for hot reloading

        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

function getInjectors(store) {
  (0, _checkStore.default)(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}