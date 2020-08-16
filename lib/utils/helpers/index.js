"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "cloneObject", {
  enumerable: true,
  get: function get() {
    return _cloneObject.cloneObject;
  }
});
Object.defineProperty(exports, "newObject", {
  enumerable: true,
  get: function get() {
    return _cloneObject.newObject;
  }
});
Object.defineProperty(exports, "deleteIn", {
  enumerable: true,
  get: function get() {
    return _deleteIn.deleteIn;
  }
});
Object.defineProperty(exports, "getIn", {
  enumerable: true,
  get: function get() {
    return _getIn.getIn;
  }
});
Object.defineProperty(exports, "objectEquals", {
  enumerable: true,
  get: function get() {
    return _objectEquals.objectEquals;
  }
});
Object.defineProperty(exports, "setIn", {
  enumerable: true,
  get: function get() {
    return _setIn.setIn;
  }
});
Object.defineProperty(exports, "updateIn", {
  enumerable: true,
  get: function get() {
    return _updateIn.updateIn;
  }
});
exports.typeOf = exports.toCapitalize = exports.generateTimeStamp = void 0;

var _cloneObject = require("./cloneObject");

var _deleteIn = require("./deleteIn");

var _getIn = require("./getIn");

var _objectEquals = require("./objectEquals");

var _setIn = require("./setIn");

var _updateIn = require("./updateIn");

var generateTimeStamp = function generateTimeStamp() {
  return new Date().getTime();
};

exports.generateTimeStamp = generateTimeStamp;

var toCapitalize = function toCapitalize(string) {
  return string && typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : null;
};

exports.toCapitalize = toCapitalize;
var type = {
  '[object Null]': 'null',
  '[object Undefined]': 'undefined',
  '[object String]': 'string',
  '[object Array]': 'array',
  '[object Boolean]': 'boolean',
  '[object Object]': 'object'
};

var typeOf = function typeOf(_obj) {
  return type[Object.prototype.toString.call(_obj)];
};

exports.typeOf = typeOf;