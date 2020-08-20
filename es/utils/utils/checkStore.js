"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkStore;

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _conformsTo = _interopRequireDefault(require("lodash/conformsTo"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate the shape of redux store
 */
function checkStore(store) {
  const shape = {
    dispatch: _isFunction.default,
    subscribe: _isFunction.default,
    getState: _isFunction.default,
    replaceReducer: _isFunction.default,
    runSaga: _isFunction.default,
    injectedReducers: _isObject.default,
    injectedSagas: _isObject.default
  };
  (0, _invariant.default)((0, _conformsTo.default)(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}