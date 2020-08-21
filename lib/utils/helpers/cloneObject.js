"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newObject = exports.cloneObject = void 0;

var cloneObject = function cloneObject(oldState) {
  var newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({}, oldState, newState);
};

exports.cloneObject = cloneObject;

var newObject = function newObject() {
  var oldState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.reduce(function (acc, curr) {
    return cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr);
  }, cloneObject(oldState));
};

exports.newObject = newObject;