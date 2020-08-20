"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newObject = exports.cloneObject = void 0;

const cloneObject = (oldState, newState = {}) => Object.assign({}, oldState, newState);

exports.cloneObject = cloneObject;

const newObject = (oldState = {}, ...rest) => rest.reduce((acc, curr) => cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr), cloneObject(oldState));

exports.newObject = newObject;