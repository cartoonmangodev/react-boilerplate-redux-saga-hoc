"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadable = _interopRequireDefault(require("utils/loadable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Asynchronously loads the component for Dashboard
 *
 */
var _default = (0, _loadable.default)(function () {
  return import('./index');
});

exports.default = _default;