"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkStore;

var _lodash = require("lodash");

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate the shape of redux store
 */
function checkStore(store) {
  var shape = {
    dispatch: _lodash.isFunction,
    subscribe: _lodash.isFunction,
    getState: _lodash.isFunction,
    replaceReducer: _lodash.isFunction,
    runSaga: _lodash.isFunction,
    injectedReducers: _lodash.isObject,
    injectedSagas: _lodash.isObject
  };
  (0, _invariant.default)((0, _lodash.conformsTo)(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}