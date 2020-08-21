import React, { useState, useEffect, Component } from 'react';
import { ReactReduxContext, useStore, useDispatch, connect } from 'react-redux';
export { useDispatch, useSelector, useStore } from 'react-redux';
import { combineReducers, bindActionCreators, compose, applyMiddleware, createStore } from 'redux';
import http from 'http';
import https from 'https';
import url from 'url';
import assert from 'assert';
import stream from 'stream';
import tty from 'tty';
import util from 'util';
import os from 'os';
import zlib from 'zlib';
import domain$1 from 'domain';
import { takeEvery, takeLatest, race, call, take, cancelled, put, all, fork } from 'redux-saga/effects';
import createSagaMiddleware, { END } from 'redux-saga';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

var invariant_1 = invariant;

function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


  var length = prev.length;

  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;
  var lastArgs = null;
  var lastResult = null; // we reference arguments instead of spreading them for performance reasons

  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++; // apply arguments instead of spreading for performance.

      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      } // apply arguments instead of spreading for performance.


      return memoizedResultFunc.apply(null, params);
    });
    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;

    selector.recomputations = function () {
      return recomputations;
    };

    selector.resetRecomputations = function () {
      return recomputations = 0;
    };

    return selector;
  };
}
var createSelector = createSelectorCreator(defaultMemoize);
function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }

  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

/** Built-in value references. */


var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
var isArray_1 = isArray;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */


var stringTag = '[object String]';
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */

function isString(value) {
  return typeof value == 'string' || !isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag;
}

var isString_1 = isString;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$2;
  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

/** Used for built-in method references. */


var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$3.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty$1.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */


var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto$1 = Function.prototype,
    objectProto$4 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$4.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }

  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */


var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

/* Built-in method references that are verified to be native. */


var Map = _getNative(_root, 'Map');
var _Map = Map;

/* Built-in method references that are verified to be native. */


var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */


var Set = _getNative(_root, 'Set');
var _Set = Set;

/* Built-in method references that are verified to be native. */


var WeakMap = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap;

/** `Object#toString` result references. */


var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map && getTag(new _Map()) != mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function (value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

var _getTag = getTag;

/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */


var objectProto$5 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$3.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
var isArguments_1 = isArguments;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */


var freeExports =  exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? _root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse_1;
module.exports = isBuffer;
});

/** `Object#toString` result references. */


var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag$1 = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */


var freeExports =  exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && _freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
});

/* Node.js helper references. */


var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

/** `Object#toString` result references. */


var mapTag$2 = '[object Map]',
    setTag$2 = '[object Set]';
/** Used for built-in method references. */

var objectProto$6 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArrayLike_1(value) && (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }

  var tag = _getTag(value);

  if (tag == mapTag$2 || tag == setTag$2) {
    return !value.size;
  }

  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }

  for (var key in value) {
    if (hasOwnProperty$4.call(value, key)) {
      return false;
    }
  }

  return true;
}

var isEmpty_1 = isEmpty;

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray$1(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString$1(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject$1(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction$1(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject$1(val) && isFunction$1(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray$1(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function deepMerge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray$1,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber,
  isObject: isObject$1,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction$1,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var isURLSameOrigin = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

var cookies = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies$1 = cookies; // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies$1.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, n, name) {
  if (ms < n) {
    return;
  }

  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }

  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug = createCommonjsModule(function (module, exports) {
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */
exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = ms;
/**
 * Active `debug` instances.
 */

exports.instances = [];
/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];
/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};
/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}
/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */


function createDebug(namespace) {
  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;
    var self = debug; // set `diff` timestamp

    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr; // turn the `arguments` into a proper Array

    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    } // apply any `formatters` transformations


    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];

      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

        args.splice(index, 1);
        index--;
      }

      return match;
    }); // apply env-specific formatting (colors, etc.)

    exports.formatArgs.call(self, args);
    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy; // env-specific initialization logic for debug instances

  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);
  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);

  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}
/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */


function enable(namespaces) {
  exports.save(namespaces);
  exports.names = [];
  exports.skips = [];
  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings

    namespaces = split[i].replace(/\*/g, '.*?');

    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}
/**
 * Disable debug output.
 *
 * @api public
 */


function disable() {
  exports.enable('');
}
/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */


function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }

  var i, len;

  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }

  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }

  return false;
}
/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */


function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}
});
var debug_1 = debug.coerce;
var debug_2 = debug.disable;
var debug_3 = debug.enable;
var debug_4 = debug.enabled;
var debug_5 = debug.humanize;
var debug_6 = debug.instances;
var debug_7 = debug.names;
var debug_8 = debug.skips;
var debug_9 = debug.formatters;

var browser = createCommonjsModule(function (module, exports) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */
exports = module.exports = debug;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */


exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var useColors = this.useColors;
  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
  if (!useColors) return;
  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;

    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.debug;
  } catch (e) {} // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */


exports.enable(load());
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
});
var browser_1 = browser.log;
var browser_2 = browser.formatArgs;
var browser_3 = browser.save;
var browser_4 = browser.load;
var browser_5 = browser.useColors;
var browser_6 = browser.storage;
var browser_7 = browser.colors;

var hasFlag = (flag, argv) => {
  argv = argv || process.argv;
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
  const pos = argv.indexOf(prefix + flag);
  const terminatorPos = argv.indexOf('--');
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

const {
  env
} = process;
let forceColor;

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) {
  forceColor = 0;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
  forceColor = 1;
}

if ('FORCE_COLOR' in env) {
  if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
    forceColor = 1;
  } else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
    forceColor = 0;
  } else {
    forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
  }
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}

function supportsColor(stream) {
  if (forceColor === 0) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (stream && !stream.isTTY && forceColor === undefined) {
    return 0;
  }

  const min = forceColor || 0;

  if (env.TERM === 'dumb') {
    return min;
  }

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    const osRelease = os.release().split('.');

    if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }

  if (env.COLORTERM === 'truecolor') {
    return 3;
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;

      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  return min;
}

function getSupportLevel(stream) {
  const level = supportsColor(stream);
  return translateLevel(level);
}

var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr)
};

var node = createCommonjsModule(function (module, exports) {
/**
 * Module dependencies.
 */



/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */


exports = module.exports = debug;
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  var supportsColor = supportsColor_1;

  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (err) {} // swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // coerce string value into JS value

  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);
  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Map %o to `util.inspect()`, all on a single line.
 */


exports.formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
    return str.trim();
  }).join(' ');
};
/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */


exports.formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}
/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */


exports.enable(load());
});
var node_1 = node.init;
var node_2 = node.log;
var node_3 = node.formatArgs;
var node_4 = node.save;
var node_5 = node.load;
var node_6 = node.useColors;
var node_7 = node.colors;
var node_8 = node.inspectOpts;

var src = createCommonjsModule(function (module) {
/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = browser;
} else {
  module.exports = node;
}
});

var Writable = stream.Writable;

var debug$1 = src("follow-redirects"); // RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.


var SAFE_METHODS = {
  GET: true,
  HEAD: true,
  OPTIONS: true,
  TRACE: true
}; // Create handlers that pass events from native requests

var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
}); // An HTTP(S) request that can be redirected

function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = []; // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.

  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }

    delete options.host;
  } // Attach a callback if passed


  if (responseCallback) {
    this.on("response", responseCallback);
  } // React to responses of native requests


  var self = this;

  this._onNativeResponse = function (response) {
    self._processResponse(response);
  }; // Complete the URL object when necessary


  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");

    if (searchPos < 0) {
      options.pathname = options.path;
    } else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  } // Perform the first request


  this._performRequest();
}

RedirectableRequest.prototype = Object.create(Writable.prototype); // Writes buffered data to the current native request

RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }

  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  } // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066


  if (data.length === 0) {
    if (callback) {
      callback();
    }

    return;
  } // Only write when we don't exceed the maximum body length


  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;

    this._requestBodyBuffers.push({
      data: data,
      encoding: encoding
    });

    this._currentRequest.write(data, encoding, callback);
  } // Error when we exceed the maximum body length
  else {
      this.emit("error", new Error("Request body larger than maxBodyLength limit"));
      this.abort();
    }
}; // Ends the current native request


RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  } else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  } // Write data and end


  var currentRequest = this._currentRequest;
  this.write(data || "", encoding, function () {
    currentRequest.end(null, null, callback);
  });
}; // Sets a header value on the current native request


RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;

  this._currentRequest.setHeader(name, value);
}; // Clears a header value on the current native request


RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];

  this._currentRequest.removeHeader(name);
}; // Proxy all other public ClientRequest methods


["abort", "flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive", "setTimeout"].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
}); // Proxy all public ClientRequest properties

["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () {
      return this._currentRequest[property];
    }
  });
}); // Executes the next native request (initial or redirect)

RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];

  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  } // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)


  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  } // Create the native request


  var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options); // Set up event handlers

  request._redirectable = this;

  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  } // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)


  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var buffers = this._requestBodyBuffers;

    (function writeNext() {
      if (i < buffers.length) {
        var buffer = buffers[i++];
        request.write(buffer.data, buffer.encoding, writeNext);
      } else {
        request.end();
      }
    })();
  }
}; // Processes a response from the current native request


RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode
    });
  } // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.


  var location = response.headers.location;

  if (location && this._options.followRedirects !== false && response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    } // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.


    var header;
    var headers = this._options.headers;

    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET"; // Drop a possible entity and headers related to it

      this._requestBodyBuffers = [];

      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    } // Drop the Host header, as the redirect might lead to a different host


    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    } // Perform the redirected request


    var redirectUrl = url.resolve(this._currentUrl, location);
    debug$1("redirecting to", redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._isRedirect = true;

    this._performRequest(); // Discard the remainder of the response to avoid waiting for data


    response.destroy();
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response); // Clean up

    this._requestBodyBuffers = [];
  }
}; // Wraps the key/value object of protocols with redirect functionality


function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024
  }; // Wrap each protocol

  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol); // Executes a request, following redirects

    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url.parse(options);
        options.maxRedirects = exports.maxRedirects;
      } else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength
        }, options);
      }

      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug$1("options", options);
      return new RedirectableRequest(options, callback);
    }; // Executes a GET request, following redirects


    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
} // Exports


var followRedirects = wrap({
  http: http,
  https: https
});
var wrap_1 = wrap;
followRedirects.wrap = wrap_1;

var name = "axios";
var version = "0.19.2";
var description = "Promise based HTTP client for the browser and node.js";
var main = "index.js";
var scripts = {
	test: "grunt test && bundlesize",
	start: "node ./sandbox/server.js",
	build: "NODE_ENV=production grunt build",
	preversion: "npm test",
	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
	postversion: "git push && git push --tags",
	examples: "node ./examples/server.js",
	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	fix: "eslint --fix lib/**/*.js"
};
var repository = {
	type: "git",
	url: "https://github.com/axios/axios.git"
};
var keywords = [
	"xhr",
	"http",
	"ajax",
	"promise",
	"node"
];
var author = "Matt Zabriskie";
var license = "MIT";
var bugs = {
	url: "https://github.com/axios/axios/issues"
};
var homepage = "https://github.com/axios/axios";
var devDependencies = {
	bundlesize: "^0.17.0",
	coveralls: "^3.0.0",
	"es6-promise": "^4.2.4",
	grunt: "^1.0.2",
	"grunt-banner": "^0.6.0",
	"grunt-cli": "^1.2.0",
	"grunt-contrib-clean": "^1.1.0",
	"grunt-contrib-watch": "^1.0.0",
	"grunt-eslint": "^20.1.0",
	"grunt-karma": "^2.0.0",
	"grunt-mocha-test": "^0.13.3",
	"grunt-ts": "^6.0.0-beta.19",
	"grunt-webpack": "^1.0.18",
	"istanbul-instrumenter-loader": "^1.0.0",
	"jasmine-core": "^2.4.1",
	karma: "^1.3.0",
	"karma-chrome-launcher": "^2.2.0",
	"karma-coverage": "^1.1.1",
	"karma-firefox-launcher": "^1.1.0",
	"karma-jasmine": "^1.1.1",
	"karma-jasmine-ajax": "^0.1.13",
	"karma-opera-launcher": "^1.0.0",
	"karma-safari-launcher": "^1.0.0",
	"karma-sauce-launcher": "^1.2.0",
	"karma-sinon": "^1.0.5",
	"karma-sourcemap-loader": "^0.3.7",
	"karma-webpack": "^1.7.0",
	"load-grunt-tasks": "^3.5.2",
	minimist: "^1.2.0",
	mocha: "^5.2.0",
	sinon: "^4.5.0",
	typescript: "^2.8.1",
	"url-search-params": "^0.10.0",
	webpack: "^1.13.1",
	"webpack-dev-server": "^1.14.1"
};
var browser$1 = {
	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
var typings = "./index.d.ts";
var dependencies = {
	"follow-redirects": "1.5.10"
};
var bundlesize = [
	{
		path: "./dist/axios.min.js",
		threshold: "5kB"
	}
];
var _package = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	browser: browser$1,
	typings: typings,
	dependencies: dependencies,
	bundlesize: bundlesize
};

var _package$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name,
  version: version,
  description: description,
  main: main,
  scripts: scripts,
  repository: repository,
  keywords: keywords,
  author: author,
  license: license,
  bugs: bugs,
  homepage: homepage,
  devDependencies: devDependencies,
  browser: browser$1,
  typings: typings,
  dependencies: dependencies,
  bundlesize: bundlesize,
  'default': _package
});

var pkg = getCjsExportFromNamespace(_package$1);

var httpFollow = followRedirects.http;

var httpsFollow = followRedirects.https;











var isHttps = /https:?/;
/*eslint consistent-return:0*/

var http_1 = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };

    var reject = function reject(value) {
      rejectPromise(value);
    };

    var data = config.data;
    var headers = config.headers; // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69

    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
      } // Add Content-Length header if data exists


      headers['Content-Length'] = data.length;
    } // HTTP basic authentication


    var auth = undefined;

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    } // Parse url


    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: {
        http: config.httpAgent,
        https: config.httpsAgent
      },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;

    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];

      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });
          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }

            if (proxyElement === '*') {
              return true;
            }

            if (proxyElement[0] === '.' && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path; // Basic proxy authorization

      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);

    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }

      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    } // Create the request


    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return; // uncompress the response body transparently if required

      var stream = res;

      switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
          // add the unzipper to the body stream processing pipeline
          stream = res.statusCode === 204 ? stream : stream.pipe(zlib.createUnzip()); // remove the content-encoding in order to not confuse downstream operations

          delete res.headers['content-encoding'];
          break;
      } // return the last request in case of redirects


      var lastRequest = res.req || req;
      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk); // make sure the content length is not over the maxContentLength if specified

          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config, null, lastRequest));
          }
        });
        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });
        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);

          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    }); // Handle errors

    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    }); // Handle request timeout

    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;
        req.abort();
        reject(cancel);
      });
    } // Send the request


    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = http_1;
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults_1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
  var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios_1.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults_1); // Expose Axios class to allow class inheritance

axios.Axios = Axios_1; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel; // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;
var axios_1 = axios; // Allow use of default import syntax in TypeScript

var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

var domain; // The domain module is executed on demand

var hasSetImmediate = typeof setImmediate === "function"; // Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.

var raw = rawAsap;

function rawAsap(task) {
  if (!queue.length) {
    requestFlush();
    flushing = true;
  } // Avoids a function call


  queue[queue.length] = task;
}

var queue = []; // Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.

var flushing = false; // The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.

var index = 0; // If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.

var capacity = 1024; // The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.

function flush() {
  while (index < queue.length) {
    var currentIndex = index; // Advance the index before calling the task. This ensures that we will
    // begin flushing on the next task the task throws an error.

    index = index + 1;
    queue[currentIndex].call(); // Prevent leaking memory for long chains of recursive calls to `asap`.
    // If we call `asap` within tasks scheduled by `asap`, the queue will
    // grow, but to avoid an O(n) walk for every task we execute, we don't
    // shift tasks off the queue after they have been executed.
    // Instead, we periodically shift 1024 tasks off the queue.

    if (index > capacity) {
      // Manually shift all values starting at the index back to the
      // beginning of the queue.
      for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
        queue[scan] = queue[scan + index];
      }

      queue.length -= index;
      index = 0;
    }
  }

  queue.length = 0;
  index = 0;
  flushing = false;
}

rawAsap.requestFlush = requestFlush;

function requestFlush() {
  // Ensure flushing is not bound to any domain.
  // It is not sufficient to exit the domain, because domains exist on a stack.
  // To execute code outside of any domain, the following dance is necessary.
  var parentDomain = process.domain;

  if (parentDomain) {
    if (!domain) {
      // Lazy execute the domain module.
      // Only employed if the user elects to use domains.
      domain = domain$1;
    }

    domain.active = process.domain = null;
  } // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
  // cannot handle recursion.
  // `requestFlush` will only be called recursively from `asap.js`, to resume
  // flushing after an error is thrown into a domain.
  // Conveniently, `setImmediate` was introduced in the same version
  // `process.nextTick` started throwing recursion errors.


  if (flushing && hasSetImmediate) {
    setImmediate(flush);
  } else {
    process.nextTick(flush);
  }

  if (parentDomain) {
    domain.active = process.domain = parentDomain;
  }
}

function noop() {} // States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable
// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.
// to avoid using try/catch inside critical functions, we
// extract them to here.


var LAST_ERROR = null;
var IS_ERROR = {};

function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

var core = Promise$2;

function Promise$2(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }

  this._U = 0;
  this._V = 0;
  this._W = null;
  this._X = null;
  if (fn === noop) return;
  doResolve(fn, this);
}

Promise$2._Y = null;
Promise$2._Z = null;
Promise$2._0 = noop;

Promise$2.prototype.then = function (onFulfilled, onRejected) {
  if (this.constructor !== Promise$2) {
    return safeThen(this, onFulfilled, onRejected);
  }

  var res = new Promise$2(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise$2(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}

function handle(self, deferred) {
  while (self._V === 3) {
    self = self._W;
  }

  if (Promise$2._Y) {
    Promise$2._Y(self);
  }

  if (self._V === 0) {
    if (self._U === 0) {
      self._U = 1;
      self._X = deferred;
      return;
    }

    if (self._U === 1) {
      self._U = 2;
      self._X = [self._X, deferred];
      return;
    }

    self._X.push(deferred);

    return;
  }

  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  raw(function () {
    var cb = self._V === 1 ? deferred.onFulfilled : deferred.onRejected;

    if (cb === null) {
      if (self._V === 1) {
        resolve(deferred.promise, self._W);
      } else {
        reject(deferred.promise, self._W);
      }

      return;
    }

    var ret = tryCallOne(cb, self._W);

    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}

function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(self, new TypeError('A promise cannot be resolved with itself.'));
  }

  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
    var then = getThen(newValue);

    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }

    if (then === self.then && newValue instanceof Promise$2) {
      self._V = 3;
      self._W = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }

  self._V = 1;
  self._W = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._V = 2;
  self._W = newValue;

  if (Promise$2._Z) {
    Promise$2._Z(self, newValue);
  }

  finale(self);
}

function finale(self) {
  if (self._U === 1) {
    handle(self, self._X);
    self._X = null;
  }

  if (self._U === 2) {
    for (var i = 0; i < self._X.length; i++) {
      handle(self, self._X[i]);
    }

    self._X = null;
  }
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}
/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */


function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });

  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

core.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

core.prototype.finally = function (f) {
  return this.then(function (value) {
    return core.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return core.resolve(f()).then(function () {
      throw err;
    });
  });
};

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new core(core._0);
  p._V = 1;
  p._W = value;
  return p;
}

core.resolve = function (value) {
  if (value instanceof core) return value;
  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;

      if (typeof then === 'function') {
        return new core(then.bind(value));
      }
    } catch (ex) {
      return new core(function (resolve, reject) {
        reject(ex);
      });
    }
  }

  return valuePromise(value);
};

var iterableToArray = function (iterable) {
  if (typeof Array.from === 'function') {
    // ES2015+, iterables exist
    iterableToArray = Array.from;
    return Array.from(iterable);
  } // ES5, only arrays and array-likes exist


  iterableToArray = function (x) {
    return Array.prototype.slice.call(x);
  };

  return Array.prototype.slice.call(iterable);
};

core.all = function (arr) {
  var args = iterableToArray(arr);
  return new core(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof core && val.then === core.prototype.then) {
          while (val._V === 3) {
            val = val._W;
          }

          if (val._V === 1) return res(i, val._W);
          if (val._V === 2) reject(val._W);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;

          if (typeof then === 'function') {
            var p = new core(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }

      args[i] = val;

      if (--remaining === 0) {
        resolve(args);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

core.reject = function (value) {
  return new core(function (resolve, reject) {
    reject(value);
  });
};

core.race = function (values) {
  return new core(function (resolve, reject) {
    iterableToArray(values).forEach(function (value) {
      core.resolve(value).then(resolve, reject);
    });
  });
};
/* Prototype Methods */


core.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

var freeTasks = [];
/**
 * Calls a task as soon as possible after returning, in its own event, with
 * priority over IO events. An exception thrown in a task can be handled by
 * `process.on("uncaughtException") or `domain.on("error")`, but will otherwise
 * crash the process. If the error is handled, all subsequent tasks will
 * resume.
 *
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */

var asap_1 = asap;

function asap(task) {
  var rawTask;

  if (freeTasks.length) {
    rawTask = freeTasks.pop();
  } else {
    rawTask = new RawTask();
  }

  rawTask.task = task;
  rawTask.domain = process.domain;
  raw(rawTask);
}

function RawTask() {
  this.task = null;
  this.domain = null;
}

RawTask.prototype.call = function () {
  if (this.domain) {
    this.domain.enter();
  }

  var threw = true;

  try {
    this.task.call();
    threw = false; // If the task throws an exception (presumably) Node.js restores the
    // domain stack for the next event.

    if (this.domain) {
      this.domain.exit();
    }
  } finally {
    // We use try/finally and a threw flag to avoid messing up stack traces
    // when we catch and release errors.
    if (threw) {
      // In Node.js, uncaught exceptions are considered fatal errors.
      // Re-throw them to interrupt flushing!
      // Ensure that flushing continues if an uncaught exception is
      // suppressed listening process.on("uncaughtException") or
      // domain.on("error").
      raw.requestFlush();
    } // If the task threw an error, we do not want to exit the domain here.
    // Exiting the domain would prevent the domain from catching the error.


    this.task = null;
    this.domain = null;
    freeTasks.push(this);
  }
};

/* Static Functions */

core.denodeify = function (fn, argumentCount) {
  if (typeof argumentCount === 'number' && argumentCount !== Infinity) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
};

var callbackFn = 'function (err, res) {' + 'if (err) { rj(err); } else { rs(res); }' + '}';

function denodeifyWithCount(fn, argumentCount) {
  var args = [];

  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }

  var body = ['return function (' + args.join(',') + ') {', 'var self = this;', 'return new Promise(function (rs, rj) {', 'var res = fn.call(', ['self'].concat(args).concat([callbackFn]).join(','), ');', 'if (res &&', '(typeof res === "object" || typeof res === "function") &&', 'typeof res.then === "function"', ') {rs(res);}', '});', '};'].join('');
  return Function(['Promise', 'fn'], body)(core, fn);
}

function denodeifyWithoutCount(fn) {
  var fnLength = Math.max(fn.length - 1, 3);
  var args = [];

  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }

  var body = ['return function (' + args.join(',') + ') {', 'var self = this;', 'var args;', 'var argLength = arguments.length;', 'if (arguments.length > ' + fnLength + ') {', 'args = new Array(arguments.length + 1);', 'for (var i = 0; i < arguments.length; i++) {', 'args[i] = arguments[i];', '}', '}', 'return new Promise(function (rs, rj) {', 'var cb = ' + callbackFn + ';', 'var res;', 'switch (argLength) {', args.concat(['extra']).map(function (_, index) {
    return 'case ' + index + ':' + 'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' + 'break;';
  }).join(''), 'default:', 'args[argLength] = cb;', 'res = fn.apply(self, args);', '}', 'if (res &&', '(typeof res === "object" || typeof res === "function") &&', 'typeof res.then === "function"', ') {rs(res);}', '});', '};'].join('');
  return Function(['Promise', 'fn'], body)(core, fn);
}

core.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;

    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new core(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap_1(function () {
          callback.call(ctx, ex);
        });
      }
    }
  };
};

core.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;
  this.then(function (value) {
    asap_1(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap_1(function () {
      callback.call(ctx, err);
    });
  });
};

core.enableSynchronous = function () {
  core.prototype.isPending = function () {
    return this.getState() == 0;
  };

  core.prototype.isFulfilled = function () {
    return this.getState() == 1;
  };

  core.prototype.isRejected = function () {
    return this.getState() == 2;
  };

  core.prototype.getValue = function () {
    if (this._V === 3) {
      return this._W.getValue();
    }

    if (!this.isFulfilled()) {
      throw new Error('Cannot get a value of an unfulfilled promise.');
    }

    return this._W;
  };

  core.prototype.getReason = function () {
    if (this._V === 3) {
      return this._W.getReason();
    }

    if (!this.isRejected()) {
      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
    }

    return this._W;
  };

  core.prototype.getState = function () {
    if (this._V === 3) {
      return this._W.getState();
    }

    if (this._V === -1 || this._V === -2) {
      return 0;
    }

    return this._V;
  };
};

core.disableSynchronous = function () {
  core.prototype.isPending = undefined;
  core.prototype.isFulfilled = undefined;
  core.prototype.isRejected = undefined;
  core.prototype.getValue = undefined;
  core.prototype.getReason = undefined;
  core.prototype.getState = undefined;
};

var lib = core;

var promise = lib;

/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
// import { SPECIFIC_ERROR_HANDLER } from './errorHandler';

var request = axios$1;
request.defaults.withCredentials = true; // request.defaults.headers.common.origin = 'www.example.com'; // for cookie based auth

request.interceptors.request.use(function (config) {
  // if (!config.baseURL) {
  //   request.defaults.baseURL = BASE_URL;
  //   config.baseURL = BASE_URL; // eslint-disable-line no-param-reassign
  // }
  if (!config.headers.Authorization) ;

  return config;
}, // SPECIFIC_ERROR_HANDLER([], error);
function (error) {
  return promise.reject(error);
}); // eslint-disable-next-line arrow-body-style

request.interceptors.response.use( // eslint-disable-next-line arrow-body-style
function (response) {
  // if (response.config.url === BASE_URL + authentication.VERIFY_OTP_API.url) {
  //   // CookieManager.get(response.config.url).then(async res => {
  //   // `res` will be true or false depending on success.
  //   request.defaults.headers.common.Authorization = `bearer ${
  //     response.data.data.token
  //   }`;
  //   try {
  //     window.localStorage.setItem('token', response.data.data.token);
  //   } catch (error) {
  //     // console.log('error while setting token in storage', error);
  //   }
  //   // });
  // }
  return response;
}, function (error) {
  return Promise.reject(error);
});

var API_LOADING_STATUS = 'app/API_LOADING_STATUS';
var ON_CANCEL_ERROR = 'API_CANCEL_ERROR';
var ON_ERROR = 'ERROR';
var ON_SUCCESS = 'SUCCESS';
var ON_FINALLY = 'FINALLY';
var ON_CANCEL = 'CANCEL';
var ON_REQUEST = 'REQUEST';
var ON_LOADING = 'LOADING';
var ON_UNMOUNT = 'UNMOUNT';
var ON_TOAST = 'TOAST';
var ERROR = 'ERROR';
var SUCCESS = 'SUCCESS';
var CALL = 'CALL';
var CANCEL = 'CANCEL';
var CUSTOM = 'CUSTOM_TASK';
var commonConstants = {
  ON_CANCEL_ERROR: ON_CANCEL_ERROR,
  ON_ERROR: ON_ERROR,
  ON_SUCCESS: ON_SUCCESS,
  ON_FINALLY: ON_FINALLY,
  ON_CANCEL: ON_CANCEL,
  ON_REQUEST: ON_REQUEST,
  ON_LOADING: ON_LOADING,
  ON_UNMOUNT: ON_UNMOUNT,
  ON_TOAST: ON_TOAST,
  ERROR: ERROR,
  SUCCESS: SUCCESS,
  CALL: CALL,
  CANCEL: CANCEL,
  CUSTOM: CUSTOM
};

// <============================ common actions ==============================>

var successAction = function successAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return {
      type: actionType,
      response: {
        type: type,
        data: data,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var errorAction = function errorAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var error = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return {
      type: actionType,
      response: {
        type: type,
        error: error,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var callAction = function callAction(actionType) {
  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      type: actionType,
      payload: payload
    };
  };
};

var cancelAction = function cancelAction(actionType) {
  return function (type, method, filter) {
    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        payload: {
          filter: filter
        }
      }
    };
  };
};

var customAction = function customAction(actionType) {
  return function (type, method, payload) {
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var statusCode = arguments.length > 4 ? arguments[4] : undefined;
    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        data: data,
        statusCode: statusCode || method === ON_SUCCESS ? 200 : null,
        customTask: true,
        payload: payload
      }
    };
  };
};

var actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};
function apiLoadingStatus(_ref) {
  var type = _ref.type,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? true : _ref$status,
      loader = _ref.loader,
      payload = _ref.payload;
  return {
    type: API_LOADING_STATUS,
    response: {
      type: type,
      status: status,
      data: data,
      loader: loader,
      payload: payload,
      method: ON_LOADING
    }
  };
}

var cloneObject = function cloneObject(oldState) {
  var newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({}, oldState, newState);
};
var newObject = function newObject() {
  var oldState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.reduce(function (acc, curr) {
    return cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr);
  }, cloneObject(oldState));
};

function deleteIn(obj, arr) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return function () {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map(function (data, ind) {
          if (+arr[i] === ind) {
            if (arr.length - 1 === i) {
              if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
              return Array.isArray(o) ? null : o;
            }

            return function () {
              o = data;
              i += 1;
              return update();
            }();
          }

          return data;
        }).filter(function (e) {
          return e;
        }) : function () {
          if (arr.length - 1 === i) {
            if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
            return o;
          }

          return o;
        }();
        return a;
      }();
    }

    return function () {
      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }

      return cloneObject(o, _defineProperty({}, arr[i], function () {
        o = o[arr[i]];
        i += 1;
        return update();
      }()));
    }();
  }

  return update();
}

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */
function getIn(obj, arr) {
  var i = 0;
  var o = obj;

  function get() {
    return arr.length > 0 && arr.length - 1 === i ? typeof o === 'undefined' || o === null ? o : o[arr[i]] : function () {
      if (typeof o === 'undefined' || o === null) return o;
      o = o[arr[i]];
      i += 1;
      return get();
    }();
  }

  return arr.length > 0 ? get() : obj;
}

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-continue */
function objectEquals(x, y) {
  if (x === y) return true; // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false; // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false; // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var _i = 0, _Object$entries = Object.entries(x); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 1),
        p = _Object$entries$_i[0];

    if (!(p in x)) continue; // other properties were tested using x.constructor === y.constructor

    if (!(p in y)) return false; // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue; // if they have the same strict value or identity then they are equal

    if (_typeof(x[p]) !== 'object') return false; // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!Object.equals(x[p], y[p])) return false; // Objects and Arrays must be tested recursively
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(y); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 1),
        _p = _Object$entries2$_i[0];

    if (_p in y && !(_p in x)) return false; // allows x[ p ] to be set to undefined
  }

  return true;
}

function setIn(obj, arr, value) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return function () {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map(function (data, ind) {
          if (+arr[i] === ind) {
            return arr.length - 1 === i ? value : function () {
              o = data;
              i += 1;
              return update();
            }();
          }

          return data;
        }) : function () {
          o[+arr[i]] = value;
          return o;
        }();
        return a;
      }();
    }

    return cloneObject(o, _defineProperty({}, arr[i], arr.length - 1 === i ? value : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return update();
}

function updateIn(obj) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return o.slice().map(function (data, ind) {
        if (+arr[i] === ind) {
          return arr.length - 1 === i ? callback(data) : function () {
            o = data;
            i += 1;
            return update();
          }();
        }

        return data;
      });
    }

    return cloneObject(o, _defineProperty({}, arr && arr[i], arr.length - 1 === i ? callback(o[arr[i]]) : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return arr.length > 0 ? update() : obj;
}

var generateTimeStamp = function generateTimeStamp() {
  return new Date().getTime();
};
var toCapitalize = function toCapitalize(string) {
  return string && typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : null;
};
var type = {
  '[object Null]': 'null',
  '[object Undefined]': 'undefined',
  '[object String]': 'string',
  '[object Array]': 'array',
  '[object Boolean]': 'boolean',
  '[object Object]': 'object',
  '[object Function]': 'function',
  '[object Symbol]': 'symbol'
};
var typeOf = function typeOf(_obj) {
  return type[Object.prototype.toString.call(_obj)];
};

var convertData = function convertData(apiEndPoints) {
  return Object.keys(apiEndPoints).reduce(function (prev, curr) {
    var constants = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key;

      return newObject(acc, _defineProperty({}, key, (_key = {}, _defineProperty(_key, CALL, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(CALL)), _defineProperty(_key, SUCCESS, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(SUCCESS)), _defineProperty(_key, CUSTOM, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(CUSTOM)), _defineProperty(_key, ERROR, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(ERROR)), _defineProperty(_key, CANCEL, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(CANCEL)), _key)));
    }, {});
    var actions = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key2;

      return newObject(acc, _defineProperty({}, key, (_key2 = {}, _defineProperty(_key2, CALL, actionsHandler.call(constants[key][CALL])), _defineProperty(_key2, SUCCESS, actionsHandler.success(constants[key][SUCCESS])), _defineProperty(_key2, CUSTOM, actionsHandler.custom(constants[key][CUSTOM])), _defineProperty(_key2, ERROR, actionsHandler.error(constants[key][ERROR])), _defineProperty(_key2, CANCEL, actionsHandler.cancel(constants[key][CANCEL])), _key2)));
    }, {});
    var sagaConfig = Object.entries(apiEndPoints[curr]).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return newObject(acc, _defineProperty({}, constants[key][CALL], {
        api: value,
        cancel: constants[key][CANCEL],
        actions: actions[key],
        effect: value.effect === 'every' && takeEvery
      }));
    }, {});
    return newObject(prev, _defineProperty({}, curr, {
      actions: actions,
      constants: constants,
      sagaConfig: sagaConfig
    }));
  }, {});
};

var generateConstants = (function (_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      generatorKey = _ref.generatorKey,
      dontResetOnLogout = _ref.dontResetOnLogout;
  var ConvertData = convertData(apiEndPoints);
  var initialState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return newObject(acc, _defineProperty({}, ConvertData[generatorKey].constants[key][CALL], _objectSpread2({
      loading: {},
      toast: {}
    }, apiEndPoints[generatorKey][key].initialData ? {
      data: apiEndPoints[generatorKey][key].initialData
    } : {})));
  }, {});
  var resetState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return !Object.keys(dontResetOnLogout || {}).includes(key) && newObject(acc, _defineProperty({}, ConvertData[generatorKey].constants[key][CALL], _objectSpread2({
      loading: {},
      toast: {}
    }, apiEndPoints[generatorKey][key].initialData ? {
      data: apiEndPoints[generatorKey][key]
    } : {}))) || acc;
  }, {});
  var _ConvertData$generato = ConvertData[generatorKey],
      constants = _ConvertData$generato.constants,
      actions = _ConvertData$generato.actions,
      sagaConfig = _ConvertData$generato.sagaConfig;
  return {
    constants: constants,
    initialState: initialState,
    generatorKey: generatorKey,
    actions: actions,
    sagaConfig: sagaConfig,
    resetState: resetState
  };
});

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d$1 = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h$1 = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m$1 = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y$1 = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m$1:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h$1:
                return a;

              default:
                return u;
            }

        }

      case d$1:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m$1;
}

var AsyncMode = l;
var ConcurrentMode = m$1;
var ContextConsumer = k;
var ContextProvider = h$1;
var Element = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d$1;
var Profiler = g;
var StrictMode = f;
var Suspense = p;

var isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};

var isConcurrentMode = A;

var isContextConsumer = function (a) {
  return z(a) === k;
};

var isContextProvider = function (a) {
  return z(a) === h$1;
};

var isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

var isForwardRef = function (a) {
  return z(a) === n;
};

var isFragment = function (a) {
  return z(a) === e;
};

var isLazy = function (a) {
  return z(a) === t;
};

var isMemo = function (a) {
  return z(a) === r;
};

var isPortal = function (a) {
  return z(a) === d$1;
};

var isProfiler = function (a) {
  return z(a) === g;
};

var isStrictMode = function (a) {
  return z(a) === f;
};

var isSuspense = function (a) {
  return z(a) === p;
};

var isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m$1 || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h$1 || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y$1 || a.$$typeof === v);
};

var typeOf$1 = z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf$1
};

var reactIs_development = createCommonjsModule(function (module, exports) {

if (process.env.NODE_ENV !== "production") {
  (function () {
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
    exports.isValidElementType = isValidElementType;
    exports.typeOf = typeOf;
  })();
}
});
var reactIs_development_1 = reactIs_development.AsyncMode;
var reactIs_development_2 = reactIs_development.ConcurrentMode;
var reactIs_development_3 = reactIs_development.ContextConsumer;
var reactIs_development_4 = reactIs_development.ContextProvider;
var reactIs_development_5 = reactIs_development.Element;
var reactIs_development_6 = reactIs_development.ForwardRef;
var reactIs_development_7 = reactIs_development.Fragment;
var reactIs_development_8 = reactIs_development.Lazy;
var reactIs_development_9 = reactIs_development.Memo;
var reactIs_development_10 = reactIs_development.Portal;
var reactIs_development_11 = reactIs_development.Profiler;
var reactIs_development_12 = reactIs_development.StrictMode;
var reactIs_development_13 = reactIs_development.Suspense;
var reactIs_development_14 = reactIs_development.isAsyncMode;
var reactIs_development_15 = reactIs_development.isConcurrentMode;
var reactIs_development_16 = reactIs_development.isContextConsumer;
var reactIs_development_17 = reactIs_development.isContextProvider;
var reactIs_development_18 = reactIs_development.isElement;
var reactIs_development_19 = reactIs_development.isForwardRef;
var reactIs_development_20 = reactIs_development.isFragment;
var reactIs_development_21 = reactIs_development.isLazy;
var reactIs_development_22 = reactIs_development.isMemo;
var reactIs_development_23 = reactIs_development.isPortal;
var reactIs_development_24 = reactIs_development.isProfiler;
var reactIs_development_25 = reactIs_development.isStrictMode;
var reactIs_development_26 = reactIs_development.isSuspense;
var reactIs_development_27 = reactIs_development.isValidElementType;
var reactIs_development_28 = reactIs_development.typeOf;

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

/**
 * The base implementation of `_.conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
function baseConformsTo(object, source, props) {
  var length = props.length;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (length--) {
    var key = props[length],
        predicate = source[key],
        value = object[key];

    if (value === undefined && !(key in object) || !predicate(value)) {
      return false;
    }
  }

  return true;
}

var _baseConformsTo = baseConformsTo;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var _baseTimes = baseTimes;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;

/** Used for built-in method references. */


var objectProto$7 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Checks if `object` conforms to `source` by invoking the predicate
 * properties of `source` with the corresponding property values of `object`.
 *
 * **Note:** This method is equivalent to `_.conforms` when `source` is
 * partially applied.
 *
 * @static
 * @memberOf _
 * @since 4.14.0
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 *
 * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
 * // => true
 *
 * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
 * // => false
 */


function conformsTo(object, source) {
  return source == null || _baseConformsTo(object, source, keys_1(source));
}

var conformsTo_1 = conformsTo;

/**
 * Validate the shape of redux store
 */

function checkStore(store) {
  var shape = {
    dispatch: isFunction_1,
    subscribe: isFunction_1,
    getState: isFunction_1,
    replaceReducer: isFunction_1,
    runSaga: isFunction_1,
    injectedReducers: isObject_1,
    injectedSagas: isObject_1
  };
  invariant_1(conformsTo_1(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}

var RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
var DAEMON = '@@saga-injector/daemon';
var ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

var allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

var checkKey = function checkKey(key) {
  return invariant_1(isString_1(key) && !isEmpty_1(key), '(app/utils...) injectSaga: Expected `key` to be a non empty string');
};

var checkDescriptor = function checkDescriptor(descriptor) {
  var shape = {
    saga: isFunction_1,
    mode: function mode(_mode) {
      return isString_1(_mode) && allowedModes.includes(_mode);
    }
  };
  invariant_1(conformsTo_1(descriptor, shape), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

function injectSagaFactory(store, isValid) {
  return function injectSaga(key) {
    var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var args = arguments.length > 2 ? arguments[2] : undefined;
    if (!isValid) checkStore(store);

    var newDescriptor = _objectSpread2({}, descriptor, {
      mode: descriptor.mode || DAEMON
    });

    var saga = newDescriptor.saga,
        mode = newDescriptor.mode;
    checkKey(key);
    checkDescriptor(newDescriptor);
    var hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      var oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = _objectSpread2({}, newDescriptor, {
        task: store.runSaga(saga, args)
      });
      /* eslint-enable no-param-reassign */
    }
  };
}
function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);
    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      var descriptor = store.injectedSagas[key];

      if (descriptor.mode && descriptor.mode !== DAEMON) {
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
  checkStore(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */

var injectSaga = (function (_ref) {
  var key = _ref.key,
      saga = _ref.saga,
      mode = _ref.mode;
  return function (WrappedComponent) {
    var InjectSaga = /*#__PURE__*/function (_React$Component) {
      _inherits(InjectSaga, _React$Component);

      var _super = _createSuper(InjectSaga);

      function InjectSaga(props, context) {
        var _this;

        _classCallCheck(this, InjectSaga);

        _this = _super.call(this, props, context);
        _this.injectors = getInjectors(context.store);

        _this.injectors.injectSaga(key, {
          saga: saga,
          mode: mode
        }, _this.props);

        return _this;
      }

      _createClass(InjectSaga, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.injectors.ejectSaga(key);
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement(WrappedComponent, this.props);
        }
      }]);

      return InjectSaga;
    }(React.Component);

    _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);

    _defineProperty(InjectSaga, "contextType", ReactReduxContext);

    _defineProperty(InjectSaga, "displayName", "withSaga(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return hoistNonReactStatics_cjs(InjectSaga, WrappedComponent);
  };
});

var useInjectSaga = function useInjectSaga(_ref2) {
  var key = _ref2.key,
      saga = _ref2.saga,
      mode = _ref2.mode;
  var context = React.useContext(ReactReduxContext);
  React.useEffect(function () {
    var injectors = getInjectors(context.store);
    injectors.injectSaga(key, {
      saga: saga,
      mode: mode
    });
    return function () {
      injectors.ejectSaga(key);
    };
  }, []);
};

/* eslint-disable no-underscore-dangle */
// import history from './utils/history';
// import globalReducer from 'containers/App/reducer';
// import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

function createReducer() {
  var injectedReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // const connectRouter = history
  //   ? require('connected-react-router').connectRouter
  //   : null;
  // const History = history ? require('./utils/history').default : '';
  var reducer = Object.keys(injectedReducers).length > 0 ? injectedReducers : {
    global: function global() {
      return {};
    }
  }; // const reducer = history
  //   ? {
  //       ..._reducer,
  //       router: connectRouter(History),
  //     }
  //   : {
  //       ..._reducer,
  //     };

  var rootReducer = combineReducers(reducer);
  return rootReducer;
}

function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer, customCreateReducer) {
    if (!isValid) checkStore(store);
    invariant_1(isString_1(key) && !isEmpty_1(key) && isFunction_1(reducer), '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'); // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    store.replaceReducer((customCreateReducer || createReducer)(store.injectedReducers));
  };
}
function getInjectors$1(store) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true)
  };
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

var injectReducer = (function (_ref, createReducer) {
  var key = _ref.key,
      reducer = _ref.reducer;
  return function (WrappedComponent) {
    var ReducerInjector = /*#__PURE__*/function (_React$Component) {
      _inherits(ReducerInjector, _React$Component);

      var _super = _createSuper(ReducerInjector);

      function ReducerInjector(props, context) {
        var _this;

        _classCallCheck(this, ReducerInjector);

        _this = _super.call(this, props, context);
        getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
        return _this;
      }

      _createClass(ReducerInjector, [{
        key: "render",
        value: function render() {
          return React.createElement(WrappedComponent, this.props);
        }
      }]);

      return ReducerInjector;
    }(React.Component);

    _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);

    _defineProperty(ReducerInjector, "contextType", ReactReduxContext);

    _defineProperty(ReducerInjector, "displayName", "withReducer(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return hoistNonReactStatics_cjs(ReducerInjector, WrappedComponent);
  };
});

var useInjectReducer = function useInjectReducer(_ref2, createReducer) {
  var key = _ref2.key,
      reducer = _ref2.reducer;
  var context = React.useContext(ReactReduxContext);
  React.useEffect(function () {
    getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

var selectAuthenticationDomain = function selectAuthenticationDomain(initialState, generatorKey) {
  return function (state) {
    return state[generatorKey] || initialState;
  };
};

var makeSelectAuthenticationState = function makeSelectAuthenticationState(_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      initialState = _ref.initialState,
      InitialState = _ref.InitialState,
      generatorKey = _ref.generatorKey,
      constants = _ref.constants;
  return function () {
    return createSelector(selectAuthenticationDomain(initialState, generatorKey), function (substate) {
      return newObject(Object.keys(InitialState).reduce(function (acc, key) {
        return _objectSpread2({}, acc, _defineProperty({}, key, substate[key]));
      }, {}), Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
        return _objectSpread2({}, acc, _defineProperty({}, key, substate[constants[key][CALL]]));
      }, {}));
    });
  };
};

var ignore = {
  component: [SUCCESS, ERROR],
  saga: [CALL, CANCEL, CUSTOM],
  cancel: [SUCCESS, ERROR, CALL, CUSTOM]
};
var bindKey = [CANCEL, CUSTOM];

var actionConverter = function actionConverter(action, actionName, ignoreStatus, type) {
  return Object.entries(action).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return ignoreStatus && ignore[type].includes(key) && acc || cloneObject(acc, _defineProperty({}, "".concat(actionName, "_").concat(key), bindKey.includes(key) && value.bind({}, action[CALL]().type) || value));
  }, {});
};

var actionConverter$1 = (function (action) {
  return Object.entries(action).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return {
      actions: cloneObject(acc.actions, actionConverter(value, key)),
      sagaActions: cloneObject(acc.sagaActions, actionConverter(value, key, true, 'saga')),
      componentActions: cloneObject(acc.componentActions, actionConverter(value, key, true, 'component')),
      cancelActions: cloneObject(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
    };
  }, {});
});

var generateAction = (function (Actions) {
  var _actionConverter = actionConverter$1(Actions),
      componentActions = _actionConverter.componentActions,
      actions = _actionConverter.actions,
      sagaActions = _actionConverter.sagaActions,
      cancelActions = _actionConverter.cancelActions;

  return {
    componentActions: componentActions,
    actions: actions,
    sagaActions: sagaActions,
    cancelActions: cancelActions
  };
});

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/* Built-in method references that are verified to be native. */


var nativeCreate = _getNative(Object, 'create');
var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$8 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */


var objectProto$9 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof _ListCache) {
    var pairs = data.__data__;

    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new _MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);

  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */


function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Assume cyclic values are equal.


  var stacked = stack.get(array);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!_arraySome(other, function (othValue, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */


var Uint8Array$1 = _root.Uint8Array;
var _Uint8Array = Uint8Array$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
/** `Object#toString` result references. */

var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    mapTag$3 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag = '[object Symbol]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$2:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$1:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$1:
    case stringTag$2:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag$3:
      var convert = _mapToArray;

    case setTag$3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var _arrayPush = arrayPush;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */


var objectProto$a = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG$2 = 1;
/** Used for built-in method references. */

var objectProto$b = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
      return false;
    }
  } // Assume cyclic values are equal.


  var stacked = stack.get(object);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG$3 = 1;
/** `Object#toString` result references. */

var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';
/** Used for built-in method references. */

var objectProto$c = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);
  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }

  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */


function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

var executeTask = function executeTask(_ref, data) {
  var id = _ref.id,
      key = _ref.key;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc : acc.concat([curr]);
  }, []) : data.filter(function (_ref2) {
    var objId = _ref2[key];
    return objId !== id;
  });
};

var deleteHandler = function deleteHandler(_ref3) {
  var _ref3$task = _ref3.task;
  _ref3$task = _ref3$task === void 0 ? {} : _ref3$task;
  var key = _ref3$task.key,
      id = _ref3$task.id,
      _ref3$task$subKey = _ref3$task.subKey,
      subKey = _ref3$task$subKey === void 0 ? [] : _ref3$task$subKey,
      _ref3$successData = _ref3.successData,
      successData = _ref3$successData === void 0 ? {} : _ref3$successData,
      successDataStatusCode = _ref3.successDataStatusCode;
  return function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$data = _ref4.data,
        data = _ref4$data === void 0 ? [] : _ref4$data,
        statusCode = _ref4.statusCode;

    var commonData = {
      key: key,
      id: id
    };

    var _successData = typeOf(successData) === 'object' ? successData : {};

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread2({}, data, {}, _successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_data) {
        return executeTask(commonData, _data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

//   data: Data = {},
// }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       error: errorData || null,
//       isError: true,
//       lastUpdated: generateTimeStamp(),
//       isInfinite: undefined,
//       infiniteEnd: undefined,
//     }),
//   ),
// });

var errorHandler = function errorHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref.errorData,
      _ref$clearDataOnError = _ref.clearDataOnError,
      clearDataOnError = _ref$clearDataOnError === void 0 ? false : _ref$clearDataOnError;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return _objectSpread2({}, clearDataOnError ? {
      data: Array.isArray(Data) ? [] : {}
    } : {}, {
      error: errorData || null,
      isError: true,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null
    });
  };
};

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayErrorHandler = function filterArrayErrorHandler() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref3.errorData,
      filter = _ref3.filter,
      clearDataOnError = _ref3.clearDataOnError;

  return function (_ref4) {
    var _ref4$data = _ref4.data,
        Data = _ref4$data === void 0 ? {} : _ref4$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? newObject(data, function (_ref5) {
                var oldData = _ref5.data;
                return _objectSpread2({}, clearDataOnError ? {
                  data: Array.isArray(oldData) ? [] : {}
                } : {}, {
                  error: errorData || null,
                  isError: true,
                  statusCode: 'ERROR',
                  lastUpdated: generateTimeStamp(),
                  isInfinite: null,
                  infiniteEnd: null
                });
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref6) {
            var oldData = _ref6.data;
            return _objectSpread2({}, clearDataOnError ? {
              data: Array.isArray(oldData) ? [] : {}
            } : {}, {
              error: errorData || null,
              isError: true,
              statusCode: 'ERROR',
              lastUpdated: generateTimeStamp(),
              isInfinite: null,
              infiniteEnd: null
            });
          });
        });
      }()
    };
  };
};

var _CheckFilter$1 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var commonFilterHandler = function commonFilterHandler(customHandler) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? [] : _ref$filter,
        successDataStatusCode = _ref.successDataStatusCode,
        rest = _objectWithoutProperties(_ref, ["filter", "successDataStatusCode"]);

    return function (_ref2) {
      var _ref2$data = _ref2.data,
          Data = _ref2$data === void 0 ? {} : _ref2$data,
          statusCode = _ref2.statusCode;
      return {
        data: function () {
          var paramKey = _objectSpread2({
            filter: filter
          }, rest);

          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter$1(filterArray), function (data) {
                return _CheckFilter$1(filterArray).length > 0 ? newObject(data, customHandler(paramKey)) : data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (data) {
            return newObject(_objectSpread2({}, data, {
              statusCode: successDataStatusCode || statusCode,
              lastUpdated: generateTimeStamp(),
              error: false,
              isError: false
            }), customHandler(paramKey));
          });
        }()
      };
    };
  };
};
/** for Future reference */
// export const filterArrayCustomHandler = ({
//   isInfinite,
//   successData,
//   clearData,
//   query,
//   filter,
//   customHandler,
//   ...rest
// } = {}) => ({ data: Data = {} }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(
//       oldData,
//       customHandler({ isInfinite, successData, query, clearData, ...rest }),
//     ),
//   ),
// });

/* eslint-disable no-console */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-self-compare */

/* eslint-disable prefer-const */

/* eslint-disable no-var */

/* eslint-disable no-plusplus */

/* eslint-disable no-lonely-if */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-underscore-dangle */
var CONSTRUCTOR_CHECK = {
  string: String,
  number: Number,
  boolean: Boolean
};

var errorConsole = function errorConsole(parentObj, error, path) {
  var func = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var notFound = arguments.length > 4 ? arguments[4] : undefined;
  if (!func) console.log("%c".concat(notFound ? '%c key' : "".concat(parentObj, " %c is undefined"), "%c \"").concat(error, "\" %cnot found ").concat(notFound ? "in %c\"".concat(parentObj, "\"%c object") : '%c%c', " %c ").concat(path, " %c is invalid"), 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: green; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');else console.log("%c".concat(parentObj, " %c is found %c \"").concat(error, "\" %c not a function %c ").concat(path, " %c is invalid"), 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');
};

var errorLog = function errorLog() {
  var e = new Error();
  var stack = e.stack.toString().split(/\r\n|\n/);
  console.log('Error :');
  stack.splice(0, 1);
  stack.map(function (err, index) {
    return console.log("[".concat(stack[stack.length - 1 - index], " ]"));
  }); // console.log(`[ Error ${stack[stack.length - 1]} ]`);
};
/**
 * Required parameter for nullcheck
 *  @param object parent object {},[] !9
 *  @param path  path to be execute eg: a.b.c.e()[0]().f !(Required)
 *  @param default  default value to be print if it is null or error (optional)
 *  @param func  function parameters [ [1],[2]] (optional)
 *  @param errorDisplay  whether to show error in console - default false (optional)
 */


var nullCheck = function nullCheck(Error) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = arguments.length > 2 ? arguments[2] : undefined;
  var def = arguments.length > 3 ? arguments[3] : undefined;
  var callBack = arguments.length > 4 ? arguments[4] : undefined;
  var func = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var errorDisplay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var returnDefaultData = def || null;

  if (typeof path !== 'string') {
    if (errorDisplay) {
      console.log("%c[Object] path is invalid it should be string", 'background: #000; color: orange; font-size: 12px');
      errorLog(new Error());
    }

    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }

  var propNames = path.split(/\.|\[|\(/);
  propNames = propNames.map(function (prop) {
    return prop.replace(/\]|\(/g, '').replace(/\)/, '()');
  });
  var parent = propNames.splice(0, 1);

  if (!obj || _typeof(obj) !== 'object' || Object.keys(obj).length === 0) {
    if (errorDisplay) errorLog(new Error());
    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }

  var data = obj;
  var error = parent;
  var index = 0;
  var parentObj = error; // eslint-disable-next-line no-undef-init

  var type = undefined;

  for (var key = 0; key < propNames.length; key++) {
    if (data[propNames[key]] || typeof data === 'boolean' || Object.prototype.hasOwnProperty.call(data, propNames[key])) {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = "".concat(error, "[").concat(propNames[key], "]");else error = "".concat(error, ".").concat(propNames[key]);
      data = data[propNames[key]];
      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def || data) : def || data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def || data) : def || data;
      }

      if ((data || typeof data === 'boolean') && propNames[key + 1] && typeof data[propNames[key + 1]] === 'function') {
        type = data;
      }

      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }

        if (_typeof(data) !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, false);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }
    } else if (propNames[key] === '()') {
      error = "".concat(error).concat(propNames[key]);

      if (typeof data === 'function') {
        if (CONSTRUCTOR_CHECK[_typeof(type)]) {
          if (func && func[index]) data = CONSTRUCTOR_CHECK[_typeof(type)].prototype[propNames[key - 1]].apply(type, func[index]);else data = CONSTRUCTOR_CHECK[_typeof(type)].prototype[propNames[key - 1]].call(type);
        } else {
          if (func && func[index]) data = data.apply({}, _toConsumableArray(func[index]));else data = data();
        }

        if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def || data) : def || data;

        if (!data && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path);
          }

          return typeof callBack === 'function' ? callBack(def || data) : def || data;
        }
      } else {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path, true);
        }

        return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
      }

      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def || data) : def || data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def || data) : def || data;
      }

      if ((data || typeof data === 'boolean') && propNames[key + 1] && typeof data[propNames[key + 1]] === 'function') {
        type = data;
      }

      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }

        if (_typeof(data) !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }

      index += 1;
    } else {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = "".concat(error, "[").concat(propNames[key], "]");else error = "".concat(error, ".").concat(propNames[key]);

      if (errorDisplay) {
        errorLog(new Error());
        errorConsole(error, propNames[key], path, false, true);
      }

      return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
    }

    parentObj = error;
  }

  var verifyData = (data || typeof data === 'boolean') && Object.prototype.toString.call(def) !== '[object Null]' && typeof def !== 'undefined' && Object.prototype.toString.call(data) === Object.prototype.toString.call(def) ? data : typeof def !== 'undefined' ? def : data;
  return typeof callBack === 'function' ? callBack(verifyData) : verifyData;
};

var nullcheck = nullCheck.bind(null, Error);

var infiniteHandler = function infiniteHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      limit = _ref$task.limit,
      _ref$task$isAppendTop = _ref$task.isAppendTop,
      isAppendTop = _ref$task$isAppendTop === void 0 ? false : _ref$task$isAppendTop,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _oldCopyData = _objectSpread2({}, oldData, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], oldData[subKey[0]])); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback(_oldData, nullcheck(successData, ".".concat(subKey.join('.')), [])) : isAppendTop ? nullcheck(successData, ".".concat(subKey.join('.')), []).concat(_oldData) : _oldData.concat(nullcheck(successData, ".".concat(subKey.join('.')), []));
          });
        }

        var getData = Array.isArray(successData) ? successData : [];
        var appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
        var newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      }(),
      error: false,
      lastUpdated: generateTimeStamp(),
      statusCode: successDataStatusCode || statusCode,
      isInfinite: true,
      isError: false,
      infiniteEnd: (subKey.length > 0 ? nullcheck(successData, ".".concat(subKey.join('.')), []) : successData).length < limit
    };
  };
};

/* eslint-disable indent */
//   data: Data = {},
// } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       loading: {
//         status: loader,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

var _CheckFilter$2 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayloadingHandler = function filterArrayloadingHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      loader = _ref.loader,
      filter = _ref.filter;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$2(filterArray), function (data) {
              return _CheckFilter$2(filterArray).length > 0 ? newObject(data, {
                loading: {
                  status: loader,
                  lastUpdated: generateTimeStamp()
                }
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, {
            loading: {
              status: loader,
              lastUpdated: generateTimeStamp()
            }
          });
        });
      }()
    };
  };
};

var _CheckFilter$3 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayToastEmptyHandler = function filterArrayToastEmptyHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      filter = _ref.filter,
      isInfinite = _ref.isInfinite;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$3(filterArray), function (data) {
              return _CheckFilter$3(filterArray).length > 0 ? newObject(data, function (_ref3) {
                var _ref3$toast = _ref3.toast,
                    toast = _ref3$toast === void 0 ? {} : _ref3$toast;
                return {
                  isInfinite: isInfinite,
                  toast: newObject(toast, {
                    message: '',
                    status: '',
                    isError: null,
                    key: ''
                  })
                };
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref4) {
            var _ref4$toast = _ref4.toast,
                toast = _ref4$toast === void 0 ? {} : _ref4$toast;
            return {
              isInfinite: isInfinite,
              toast: newObject(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          });
        });
      }()
    };
  };
}; // export const filterArrayToastEmptyHandler = ({ filter, isInfinite }) => ({
//   statusCode,
//   filter,
//   message,
//   isError,
//   type,
// } = {}) => ({ data: Data = {} } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       toast: {
//         isError:
//           typeof isError === 'boolean'
//             ? isError
//             : ![200, 201].includes(statusCode),
//         status: statusCode,
//         message,
//         key: type,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

var filterArrayToastHandler = function filterArrayToastHandler() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      statusCode = _ref10.statusCode,
      filter = _ref10.filter,
      message = _ref10.message,
      isError = _ref10.isError,
      type = _ref10.type;

  return function (_ref11) {
    var _ref11$data = _ref11.data,
        Data = _ref11$data === void 0 ? {} : _ref11$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$3(filterArray), function (data) {
              return _CheckFilter$3(filterArray).length > 0 ? newObject(data, {
                toast: {
                  isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
                  status: statusCode,
                  message: message,
                  key: type,
                  lastUpdated: generateTimeStamp()
                }
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, {
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message: message,
              key: type,
              lastUpdated: generateTimeStamp()
            }
          });
        });
      }()
    };
  };
};

var updateData = function updateData(data, successData, updateCallback) {
  if (updateCallback) return updateCallback(data, successData) || data;
  if (_typeof(successData) === 'object' && !Array.isArray(successData) && _typeof(data) === 'object' && !Array.isArray(data)) return newObject(data, successData);
  return successData;
};

var updateHandler = function updateHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread2({}, data, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback);
          if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
            }() : acc.concat([curr]);
          }, []);
          if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
            }() : _data;
          });
          return updateData(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData(data, successData, updateCallback);
        if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
          }() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index += 1;
            return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
          }() : _data;
        });
        return updateData(data, successData, updateCallback);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var deletedData = function deletedData() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keyArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line no-underscore-dangle
  var _obj = obj;
  _obj = typeOf(obj) === 'object' ? _objectSpread2({}, _obj) : _obj;

  if (typeOf(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(function (_key) {
      _obj = Array.isArray(_key) ? deleteIn(_obj, _key) : deleteIn(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

var executeTask$1 = function executeTask(_ref, data) {
  var updateCallback = _ref.updateCallback,
      successData = _ref.successData,
      deleteKey = _ref.deleteKey,
      id = _ref.id,
      key = _ref.key;
  return updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]);
  }, []) : data.map(function (_data) {
    return _data[key] === id ? deletedData(_data, deleteKey) : _data;
  });
};

var deleteKeyHandler = function deleteKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$deleteKey = _ref2$task.deleteKey,
      deleteKey = _ref2$task$deleteKey === void 0 ? [] : _ref2$task$deleteKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      updateCallback: updateCallback,
      successData: successData,
      deleteKey: deleteKey,
      id: id,
      key: key
    };
    return {
      data: subKey.length > 0 ? updateIn(_objectSpread2({}, data, {}, successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask$1(commonData, _Data);
      }) : executeTask$1(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var resetHandler = function resetHandler(state, newState, _ref) {
  var type = _ref.response.type;
  var customType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return newObject(state, function (_ref2) {
    var Data = _ref2[customType || type];
    return _defineProperty({}, customType || type, newObject(Data, function (_ref3) {
      var data = _ref3.data,
          toast = _ref3.toast,
          infiniteEnd = _ref3.infiniteEnd;
      return {
        data: Array.isArray(data) && [] || {},
        toast: newObject(toast, {
          message: '',
          status: ''
        }),
        isError: false,
        statusCode: 200,
        infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
        lastUpdated: generateTimeStamp()
      };
    }));
  });
};

var _CheckFilter$4 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayResetHandler = function filterArrayResetHandler(state, newState, action, filter) {
  var customType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var type = action.response.type;
  return newObject(state, function (_ref5) {
    var oldData = _ref5[customType || type];
    return _defineProperty({}, type, newObject(oldData, function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$data = _ref6.data,
          Data = _ref6$data === void 0 ? {} : _ref6$data;

      return {
        data: function () {
          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter$4(filterArray), function (_data) {
                return _CheckFilter$4(filterArray).length > 0 ? newObject(_data, function (_ref7) {
                  var data = _ref7.data,
                      toast = _ref7.toast,
                      infiniteEnd = _ref7.infiniteEnd;
                  return {
                    data: Array.isArray(data) && [] || {},
                    toast: newObject(toast, {
                      message: '',
                      status: ''
                    }),
                    isError: false,
                    infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                    lastUpdated: generateTimeStamp()
                  };
                }) : _data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (updateData) {
            return newObject(updateData, function (_ref8) {
              var data = _ref8.data,
                  toast = _ref8.toast,
                  infiniteEnd = _ref8.infiniteEnd;
              return {
                data: Array.isArray(data) && [] || {},
                toast: newObject(toast, {
                  message: '',
                  status: ''
                }),
                isError: false,
                infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                lastUpdated: generateTimeStamp()
              };
            });
          });
        }()
      };
    }));
  });
};

var updateData$1 = function updateData(data, successData, updateCallback, updateKey) {
  if (updateCallback) return updateCallback(data, successData) || data;

  if (_typeof(successData) === 'object' && !Array.isArray(successData) && _typeof(data) === 'object' && !Array.isArray(data)) {
    return !updateKey ? data : updateKey.reduce(function (acc, key) {
      if (Array.isArray(key) && key.length > 0) {
        return updateIn(acc, key, function (_data) {
          return nullcheck(successData, ".".concat(key.join('.')));
        });
      }

      return _objectSpread2({}, acc, _defineProperty({}, key, successData[key]));
    }, data);
  }

  return successData;
};

var updateKeyHandler = function updateKeyHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$task$updateKey = _ref$task.updateKey,
      updateKey = _ref$task$updateKey === void 0 ? [] : _ref$task$updateKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread2({}, data, {}, successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData$1(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey);else if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index = index + 1;
              return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
            }() : acc.concat([curr]);
          }, []);else if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index = index + 1;
              return updateData$1(_data, values[_values ? index : curr[key]] || _data, updateCallback, updateKey);
            }() : _data;
          });
          return updateData$1(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData$1(data, successData, updateCallback, updateKey);else if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index = index + 1;
            return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
          }() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index = index + 1;
            return updateData$1(_data, values[_values ? index : curr[key]] || _data, updateCallback, updateKey);
          }() : _data;
        });
        return updateData$1(data, successData, updateCallback, updateKey);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var toggleData = function toggleData(obj, keyArray) {
  return Object.keys(obj).reduce(function (acc, curr) {
    return _objectSpread2({}, acc, _defineProperty({}, curr, keyArray.includes(curr) ? !obj[curr] : obj[curr]));
  }, {});
};

var executeTask$2 = function executeTask(_ref, _Data) {
  var successData = _ref.successData,
      toggleKey = _ref.toggleKey,
      id = _ref.id,
      key = _ref.key,
      updateCallback = _ref.updateCallback;
  return updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
  }, []) : _Data.map(function (_data) {
    return _data[key] === id ? toggleData(_data, toggleKey) : _data;
  });
};

var toggleKeyHandler = function toggleKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$toggleKey = _ref2$task.toggleKey,
      toggleKey = _ref2$task$toggleKey === void 0 ? [] : _ref2$task$toggleKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      successData: successData,
      toggleKey: toggleKey,
      id: id,
      key: key,
      updateCallback: updateCallback
    };
    return {
      data: subKey.length > 0 ? updateIn(_objectSpread2({}, data, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask$2(commonData, _Data);
      }) : executeTask$2(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var _checkIsNotObject = function _checkIsNotObject(data) {
  return Object.prototype.toString.call(data) !== '[object Object]';
};

var dataHandler = function dataHandler(_ref) {
  var isMutation = _ref.mutation,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties(_ref2, ["data", "statusCode"]);

    return isMutation ? _objectSpread2({
      data: oldData,
      statusCode: statusCode
    }, rest, {}, successData) : {
      data: function () {
        if (subKey.length > 0) {
          var _oldCopyData = _objectSpread2({}, oldData, {}, _checkIsNotObject(successData) ? {} : successData, _defineProperty({}, subKey[0], oldData[subKey[0]]));

          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')));
            return updateCallback ? updateCallback(_oldData, nullcheck(successData, ".".concat(subKey.join('.')))) : _checkIsNotObject(nullcheck(successData, ".".concat(subKey.join('.')))) || _checkIsNotObject(nullcheck(_oldData, ".".concat(subKey.join('.')))) ? nullcheck(successData, ".".concat(subKey.join('.'))) : newObject(_oldData, nullcheck(successData, ".".concat(subKey.join('.'))));
          });
        }

        return updateCallback ? updateCallback(oldData, successData) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : newObject(oldData, successData);
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null,
      isError: false
    };
  };
};

/* eslint-disable */
var dontUpdateDataHandler = function dontUpdateDataHandler(_ref) {
  var successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        statusCode = _ref2.statusCode;

    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var spliceHandler = function spliceHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$spliceKey = _ref$task.spliceKey,
      spliceKey = _ref$task$spliceKey === void 0 ? [] : _ref$task$spliceKey,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _oldCopyData = _objectSpread2({}, oldData, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], oldData[subKey[0]])); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback(_oldData, nullcheck(successData, ".".concat(subKey.join('.')), [])) : Array.isArray(_oldData) ? function () {
              var _newData = _oldData.slice();

              _newData.splice.apply(_newData, _toConsumableArray(spliceKey).concat(_toConsumableArray(nullcheck(successData, ".".concat(subKey.join('.')), []))));

              return _newData;
            }() : _oldData;
          });
        }

        var newData = Array.isArray(oldData) ? function () {
          var _newData = oldData.slice();

          return _newData.splice.apply(_newData, _toConsumableArray(spliceKey).concat(_toConsumableArray(nullcheck(successData, ".".concat(subKey.join('.')), []))));
        }() : oldData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';

var cache = {};
var cacheActions = {};
var safe = nullcheck;
var responseErrorParser = function responseErrorParser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(data) && data.reduce(function (acc, curr) {
    var _Object$entries$ = _slicedToArray(Object.entries(curr)[0], 2),
        key = _Object$entries$[0],
        message = _Object$entries$[1];

    var payloadKey = key.split(',')[1];
    return _objectSpread2({}, acc, _defineProperty({}, payloadKey, message));
  }, {}) || {};
};
var commmonStateHandler = function commmonStateHandler(_ref) {
  var state = _ref.state,
      action = _ref.action,
      newState = _ref.newState,
      method = _ref.method,
      constants = _ref.constants,
      updateState = _ref.updateState;

  /** This action for initial call  */
  var _action$payload = action.payload;
  _action$payload = _action$payload === void 0 ? {} : _action$payload;
  var filter = _action$payload.filter,
      _action$payload$task = _action$payload.task,
      task = _action$payload$task === void 0 ? {} : _action$payload$task;
  /** This action for after api gets success or failure  */

  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var type = _action$response.type,
      statusCode = _action$response.statusCode,
      message = _action$response.message,
      status = _action$response.status,
      customTask = _action$response.customTask,
      _action$response$payl = _action$response.payload;
  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var responseFilter = _action$response$payl.filter,
      customLoader = _action$response$payl.loader,
      customToast = _action$response$payl.toast;
  var loader = Object.keys(constants).includes(action.type);
  var State = newObject(state);

  if ((method === ON_LOADING || loader || [ON_SUCCESS, ON_ERROR].includes(method)) && !customTask || customLoader && customTask && (Array.isArray(method) ? method : [method]).includes(ON_LOADING)) {
    if ((status || loader) && filter) State = newState(function (_ref2) {
      var obj = _ref2[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, filterArrayToastEmptyHandler({
        isInfinite: task.name === 'Infinite-Handler',
        filter: Array.isArray(filter) && filter || [filter]
      })(obj)));
    });else if (status || loader) State = newState(function (_ref4) {
      var obj = _ref4[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, function (_ref5) {
        var _ref5$toast = _ref5.toast,
            toast = _ref5$toast === void 0 ? {} : _ref5$toast;
        return {
          toast: newObject(toast, {
            message: '',
            status: '',
            isError: false,
            key: ''
          })
        };
      }));
    });
    if (filter || responseFilter || customTask && customLoader) State = newObject(State, function (_ref7) {
      var obj = _ref7[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, filterArrayloadingHandler({
        filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
        loader: customTask && customLoader ? customLoader : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader
      })(obj)));
    });else State = newObject(State, function (_ref9) {
      var obj = _ref9[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, {
        loading: customTask && customLoader ? customLoader : {
          status: [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
          lastUpdated: generateTimeStamp()
        }
      }));
    });
    if (method === ON_LOADING || loader) return State;
  }

  if ([ON_SUCCESS, ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(type) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST)) {
    if (responseFilter) State = newObject(State, function (_ref11) {
      var obj = _ref11[type];
      return _defineProperty({}, type, newObject(obj, filterArrayToastHandler(_objectSpread2({
        statusCode: statusCode,
        filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
        message: message,
        type: type
      }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {}))(obj)));
    });else State = newObject(State, function (_ref13) {
      var obj = _ref13[type];
      return _defineProperty({}, type, newObject(obj, {
        toast: _objectSpread2({
          isError: ![200, 201].includes(statusCode),
          status: statusCode,
          message: message,
          key: type,
          lastUpdated: generateTimeStamp()
        }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {})
      }));
    });
  }

  var changeState = newObject.bind({}, State);
  var reset = responseFilter ? filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action: action,
    reset: reset
  });
};
var getData = function getData(data, def) {
  var loader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    data: safe(data, ".data".concat(filter.length ? '.' : '').concat(filter.join('.')).concat(filter.length ? '.data' : ''), def),
    loader: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".loading.status"), loader),
    lastUpdated: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".lastUpdated"), 0),
    isInfinite: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isInfinite"), false),
    infiniteEnd: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".infiniteEnd"), false),
    isError: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isError"), false),
    toast: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".toast"), {}),
    error: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".error"), {})
  };
};
var mapDispatchToProps = function mapDispatchToProps(actions, componentData, reducerName) {
  return function (dispatch) {
    return _objectSpread2({
      dispatch: dispatch
    }, actions && Object.keys(actions).length ? newObject(componentData, function (_ref15) {
      var data = _ref15["".concat(reducerName, "_hoc")];

      return _defineProperty({}, "".concat(reducerName, "_hoc"), newObject(data, {
        actions: bindActionCreators(actions, dispatch)
      }));
    }) : {});
  };
}; // export const connectHoc = connect(
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );

var checkKey$1 = function checkKey(key, name, dataType, message) {
  invariant_1(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be  ").concat(message || dataType));
};

var checkKeyWithMessage = function checkKeyWithMessage(key, dataType, message) {
  invariant_1(typeOf(key) === dataType, message);
};

var previousDataKey = [];
var previousData = {};
var useHook = function useHook() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var store = useStore();

  var _GetData = function _GetData() {
    var _data = {};

    var _checkFilter = function _checkFilter(e) {
      return e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
    };

    var _getData = function _getData(e, isString) {
      return safe(getData(safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e)), "".concat(e.query && typeOf(e.query) === 'string' ? e.query : ''), e.query ? e.default || undefined : undefined);
    };

    if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = (typeOf(array) === 'object' ? [array] : array).reduce(function (acc, e) {
        return typeOf(e) === 'object' ? typeOf(array) === 'object' ? _getData(e) : _objectSpread2({}, acc, _defineProperty({}, e.name || e.key, _getData(e))) : typeOf(array) === 'object' ? safe(store, ".getState()[".concat(name, "][").concat(e, "]")) : _objectSpread2({}, acc, _defineProperty({}, e, safe(store, ".getState()[".concat(name, "][").concat(e, "]"))));
      }, {});
    } else if (typeof array === 'string') _data = _getData(config, true);else if (name) _data = safe(store, ".getState()[".concat(name, "]"));else _data = safe(store, ".getState()") || {};

    return _data;
  };

  var _useState = useState(_GetData()),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 1),
      _key = _useState4[0];

  if (name) checkKey$1(name, 'reducer name', 'string', 'valid string');

  var execute = function execute() {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    var _data = _GetData();

    var index = previousDataKey.indexOf(_key);

    if (!isEqual_1(_data, previousData[index])) {
      // previousData[`${key || name}_${_key}`] = _data;
      previousData[index] = _data;
      setData(_data);
    }
  };

  useEffect(function () {
    var length = previousDataKey.length;
    previousDataKey.push(_key);
    previousData[length] = {};
    execute();
    var unSubscribe = store.subscribe(execute);
    return function () {
      delete previousData[length];
      unSubscribe();
    };
  }, []);
  return data;
};
var useActionsHook = function useActionsHook(name, actions) {
  var _useState5 = useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      dispatchAction = _useState6[0],
      setDispatchAction = _useState6[1];

  var dispatch = useDispatch();
  useEffect(function () {
    if (!isEqual_1(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual_1(cacheActions[name], actions)]);
  return dispatchAction;
};
var useMutation = function useMutation(reducerName) {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  var store = useStore();
  useEffect(function () {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', " reducerName '".concat(reducerName, "' not a valid reducer key."));
  }, []);
  var dispatch = useDispatch();
  return function (_ref17) {
    var type = _ref17.key,
        value = _ref17.value,
        _ref17$filter = _ref17.filter,
        filter = _ref17$filter === void 0 ? [] : _ref17$filter;
    if (!type) checkKey$1(null, 'key', 'string', 'valid string');

    var _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) invariant_1(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    "'key' is invalid.".concat(type, " not found in ").concat(reducerName, " reducer"));
    checkKey$1(filter, 'filter', 'array');
    checkKey$1(value, 'value', 'object');
    checkKey$1(type, 'key', 'string');
    if (type.includes('_CALL') && type.slice(-5) === '_CALL') dispatch({
      type: type.slice(0, -4).concat('CUSTOM_TASK'),
      response: {
        type: type,
        method: ON_SUCCESS,
        statusCode: 200,
        mutation: true,
        customTask: true,
        data: {
          data: value
        },
        payload: {
          filter: filter
        }
      }
    });else dispatch({
      type: type,
      value: value,
      filter: filter
    });
  };
};
var toPromise = function toPromise(action) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', "toPromise() : Expected a config (second parameter) to be object");
  return new Promise(function (resolve, reject) {
    return action(_objectSpread2({}, config, {
      resolve: resolve,
      reject: reject
    }));
  });
};

var HANDLERS = [{
  name: 'Infinite-Handler',
  handler: infiniteHandler
}, {
  name: 'Data-Handler',
  handler: dataHandler
}, {
  name: 'Delete-Handler',
  handler: deleteHandler
}, {
  name: 'Update-Handler',
  handler: updateHandler
}, {
  name: 'Update-Key-Handler',
  handler: updateKeyHandler
}, {
  name: 'Delete-Key-Handler',
  handler: deleteKeyHandler
}, {
  name: 'Toggle-Key-Handler',
  handler: toggleKeyHandler
}, {
  name: 'Splice-Data-Handler',
  handler: spliceHandler
}, {
  name: "Don't-Update-Data-Handler",
  handler: dontUpdateDataHandler
}];

var checkKey$2 = function checkKey(key, name, dataType) {
  invariant_1(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var CheckCustomHanderFormat = function CheckCustomHanderFormat(_handler) {
  return _handler ? typeof _handler === 'function' ? // ? typeof _handler() === 'function'
  // ? typeof _handler()() !== 'function'
  _handler : // : null
  null : // : null
  null;
};

var _CheckFilter$5 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : null;
};

var COMMON_HANDLER = function COMMON_HANDLER(payload, data) {
  var DATA = data; // const bindAction = Action => Action(payload);

  (payload.tasks || Array(1).fill(payload)).forEach( // eslint-disable-next-line consistent-return
  function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$task = _ref.task,
        task = _ref$task === void 0 ? {} : _ref$task,
        filter = _ref.filter;

    var customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    if (task.response) checkKey$2(task.response, 'task { response  : { data }}', 'object');

    customTaskBindAction = function customTaskBindAction(Action) {
      return Action(_objectSpread2({}, payload, {
        filter: _CheckFilter$5(filter || payload.filter),
        successData: (task.response || {}).data || payload.successData
      }));
    };

    var customHandler = CheckCustomHanderFormat(task.customHandler);

    var isFilter = _CheckFilter$5(filter);

    var BindHandler = function BindHandler(handler) {
      return newObject(DATA, customTaskBindAction(handler));
    };

    var _handler = HANDLERS.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(function (_ref2) {
      var name = _ref2.name;
      return name === task.name;
    });

    if (_handler) {
      checkKey$2(_handler.handler, "".concat(_handler.name, " handler with key name handler"), 'function');
      DATA = isFilter ? BindHandler(commonFilterHandler(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === 'Custom-Handler') DATA = (isFilter ? BindHandler(commonFilterHandler(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === "Don't-Update-Data-Handler") return DATA;else DATA = isFilter ? BindHandler(commonFilterHandler(dataHandler)) : BindHandler(dataHandler);
  });
  return DATA;
};

var COMMON_REDUCER_HANDLER = function COMMON_REDUCER_HANDLER(action, handlers) {
  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var customTask = _action$response.customTask,
      mutation = _action$response.mutation,
      _action$response$data = _action$response.data;
  _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

  var _action$response$data2 = _action$response$data.data,
      successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
      rest = _objectWithoutProperties(_action$response$data, ["data"]),
      _action$response$payl = _action$response.payload;

  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var _action$response$payl2 = _action$response$payl.request;
  _action$response$payl2 = _action$response$payl2 === void 0 ? {} : _action$response$payl2;
  var _action$response$payl3 = _action$response$payl2.query,
      query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
      _action$response$payl4 = _action$response$payl2.clearDataOnError,
      clearDataOnError = _action$response$payl4 === void 0 ? false : _action$response$payl4,
      Filter = _action$response$payl.filter,
      error = _action$response$payl.error,
      _action$response$erro = _action$response.error;
  _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;
  var _action$response$erro2 = _action$response$erro.data,
      errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2; // console.log(rest, 'common reducer handler');

  var filter = _CheckFilter$5(Filter);

  var commonHandler = COMMON_HANDLER.bind(null, _objectSpread2({
    handlers: handlers,
    successData: successData,
    errorData: errorData,
    successDataStatusCode: rest.statusCode,
    customTask: customTask,
    mutation: mutation
  }, action.response.payload));
  var ErrorHandler = filter && filterArrayErrorHandler || errorHandler;
  var commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query: query,
    filter: filter,
    clearDataOnError: clearDataOnError
  });
  return [commonHandler, commmonErrorHandler];
};
var DEFAULT_REDUCER_HANDLER = function DEFAULT_REDUCER_HANDLER(_ref3) {
  var method = _ref3.method,
      reset = _ref3.reset,
      state = _ref3.state,
      action = _ref3.action,
      handlers = _ref3.handlers,
      type = _ref3.type;

  var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
      _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
      commonHandler = _COMMON_REDUCER_HANDL2[0],
      commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

  var _action$response2 = action.response;
  _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
  var _action$response2$dat = _action$response2.data;
  _action$response2$dat = _action$response2$dat === void 0 ? {} : _action$response2$dat;
  var _action$response2$dat2 = _action$response2$dat.data,
      successData = _action$response2$dat2 === void 0 ? {} : _action$response2$dat2,
      _action$response2$pay = _action$response2.payload;
  _action$response2$pay = _action$response2$pay === void 0 ? {} : _action$response2$pay;
  var _action$response2$pay2 = _action$response2$pay.callback;
  _action$response2$pay2 = _action$response2$pay2 === void 0 ? {} : _action$response2$pay2;
  var updateStateCallback = _action$response2$pay2.updateStateCallback;
  var DATA = state;

  var _method = (Array.isArray(method) ? method : [method]).filter(function (e) {
    return [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e);
  });

  for (var i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS:
        {
          var updatedState = newObject(DATA, function (_ref4) {
            var Data = _ref4[type];
            return _defineProperty({}, type, commonHandler(Data, state, type));
          });
          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData
          }) || updatedState : updatedState;
          break;
        }

      case ON_ERROR:
        {
          DATA = newObject(DATA, function (_ref6) {
            var Data = _ref6[type];
            return _defineProperty({}, type, newObject(Data, commmonErrorHandler()));
          });
          break;
        }

      case ON_UNMOUNT:
        {
          DATA = reset();
          break;
        }
    }
  }

  return DATA;
};

var componentState = {// profile: {},
  // isLoggedIn: false,
  // authorization: true,
  // language: 'EN',
};
var otherReducerConstants = [];

var updateState = function updateState(_ref) {
  var authenticationConstants = _ref.authenticationConstants,
      ResetState = _ref.ResetState,
      _ref$isMobileApp = _ref.isMobileApp,
      InitialState = _ref.initialState,
      reducerFunction = _ref.reducerFunction,
      _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  return function (_ref2) {
    var state = _ref2.state,
        newState = _ref2.newState,
        action = _ref2.action,
        reset = _ref2.reset;
    var _action$response = action.response;
    _action$response = _action$response === void 0 ? {} : _action$response;
    var _action$response$data = _action$response.data;
    _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

    var _action$response$data2 = _action$response$data.data,
        successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
        restSuccessData = _objectWithoutProperties(_action$response$data, ["data"]),
        _action$response$payl = _action$response.payload;

    _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;

    var _action$response$payl2 = _action$response$payl.payload,
        payload = _action$response$payl2 === void 0 ? {} : _action$response$payl2,
        _action$response$payl3 = _action$response$payl.query,
        query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
        _action$response$payl4 = _action$response$payl.params,
        params = _action$response$payl4 === void 0 ? {} : _action$response$payl4,
        restPayload = _objectWithoutProperties(_action$response$payl, ["payload", "query", "params"]),
        loadingStatus = _action$response.status,
        statusCode = _action$response.statusCode,
        type = _action$response.type,
        method = _action$response.method,
        statusMessage = _action$response.message,
        _action$response$erro = _action$response.error;

    _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;

    var _action$response$erro2 = _action$response$erro.data,
        errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2,
        restErrorData = _objectWithoutProperties(_action$response$erro, ["data"]);

    var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
        _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
        commonHandler = _COMMON_REDUCER_HANDL2[0],
        commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

    var defaultReducerHandler = function defaultReducerHandler() {
      return DEFAULT_REDUCER_HANDLER({
        method: method,
        reset: reset,
        state: state,
        action: action,
        handlers: handlers,
        type: type
      });
    };

    switch (type) {
      case 'RESET':
        switch (method) {
          case ON_SUCCESS:
            return newObject(state, ResetState);

          default:
            return state;
        }

      // case authenticationConstants.REGISTER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGIN_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.VERIFY_OTP_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         isLoggedIn: !!successData.data.mobile_number,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(state, {
      //         profile: {},
      //         isLoggedIn: false,
      //         authorization: false,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.EDIT_MOBILE_NUMBER_API[CALL]:
      //   return state;
      // case authenticationConstants.VERIFY_OTP_FOR_EDIT_MOBILE_NUMBER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_USER_DETAILS_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, payload, successData),
      //         isLoggedIn: true,
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(initialState, {
      //         authorization: true,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         authorization: true,
      //         isLoggedIn: !!successData.name,
      //         profile: newObject(profile, successData),
      //         [type]: newObject(Data, commonHandler()),
      //       }));
      //    case ON_ERROR: {
      //         return newObject(state, ({ [type]: Data }) => ({
      //           [type]: newObject(Data, commmonErrorHandler()),
      //        }));
      // }
      //     default:
      //       return state;
      //   }

      default:
        {
          if (reducerFunction) {
            var returnData = reducerFunction({
              constants: authenticationConstants,
              successData: successData,
              restSuccessData: restSuccessData,
              payload: payload,
              query: query,
              state: state,
              params: params,
              restPayload: restPayload,
              loadingStatus: loadingStatus,
              statusCode: statusCode,
              type: type,
              reset: reset,
              newState: newState,
              method: method,
              statusMessage: statusMessage,
              errorData: errorData,
              restErrorData: restErrorData,
              resetState: ResetState,
              initialState: InitialState,
              commonHandler: commonHandler,
              commmonErrorHandler: commmonErrorHandler,
              defaultReducerHandler: defaultReducerHandler
            });
            if (returnData) return returnData;
          }

          return defaultReducerHandler();
        }
    }
  };
};

var Reducer = (function (_ref3) {
  var reducerFunction = _ref3.reducerFunction,
      authenticationConstants = _ref3.constants,
      InitialState = _ref3.InitialState,
      _ref3$handlers = _ref3.handlers,
      handlers = _ref3$handlers === void 0 ? [] : _ref3$handlers,
      _ref3$resetState = _ref3.resetState,
      ResetState = _ref3$resetState === void 0 ? {} : _ref3$resetState,
      _ref3$isMobile = _ref3.isMobile,
      isMobileApp = _ref3$isMobile === void 0 ? false : _ref3$isMobile,
      constantReducer = _ref3.constantReducer;
  var initialState = newObject(InitialState, componentState);
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      // case LANGUAGE_CONSTANTS:
      //   return newObject(state, { language: action.payload });
      // case PROFILE_UPDATE:
      //   return newObject(state, ({ profile }) => ({
      //     profile: newObject(profile, action.payload),
      //     isLoggedIn: true,
      //     authorization: true,
      //   }));
      default:
        {
          var reducerState = newObject(state);

          if (constantReducer) {
            var returnData = constantReducer({
              state: reducerState,
              type: type || action.type,
              action: action,
              constants: authenticationConstants,
              isMobile: isMobileApp,
              initialState: InitialState,
              resetState: ResetState
            });
            if (typeof returnData !== 'undefined') reducerState = returnData;
          }

          var newState = newObject.bind({}, reducerState);
          var _action$response2 = action.response;
          _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
          var method = _action$response2.method,
              type = _action$response2.type;
          var execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          var constants = InitialState;
          if (execute) return commmonStateHandler({
            constants: constants,
            state: reducerState,
            action: action,
            method: method,
            newState: newState,
            updateState: updateState({
              authenticationConstants: authenticationConstants,
              ResetState: ResetState,
              isMobileApp: isMobileApp,
              handlers: handlers,
              initialState: initialState,
              reducerFunction: reducerFunction
            })
          });
          return reducerState;
        }
    }
  };
});

var strictUriEncode = function (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty$a = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty$a.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols$1) {
      symbols = getOwnPropertySymbols$1(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

var decodeUriComponent = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};

function encoderForArrayFormat(opts) {
  switch (opts.arrayFormat) {
    case 'index':
      return function (key, value, index) {
        return value === null ? [encode$1(key, opts), '[', index, ']'].join('') : [encode$1(key, opts), '[', encode$1(index, opts), ']=', encode$1(value, opts)].join('');
      };

    case 'bracket':
      return function (key, value) {
        return value === null ? encode$1(key, opts) : [encode$1(key, opts), '[]=', encode$1(value, opts)].join('');
      };

    default:
      return function (key, value) {
        return value === null ? encode$1(key, opts) : [encode$1(key, opts), '=', encode$1(value, opts)].join('');
      };
  }
}

function parserForArrayFormat(opts) {
  var result;

  switch (opts.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        } else if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function encode$1(value, opts) {
  if (opts.encode) {
    return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  } else if (typeof input === 'object') {
    return keysSorter(Object.keys(input)).sort(function (a, b) {
      return Number(a) - Number(b);
    }).map(function (key) {
      return input[key];
    });
  }

  return input;
}

function extract(str) {
  var queryStart = str.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return str.slice(queryStart + 1);
}

function parse$1(str, opts) {
  opts = objectAssign({
    arrayFormat: 'none'
  }, opts);
  var formatter = parserForArrayFormat(opts); // Create an object with no prototype
  // https://github.com/sindresorhus/query-string/issues/47

  var ret = Object.create(null);

  if (typeof str !== 'string') {
    return ret;
  }

  str = str.trim().replace(/^[?#&]/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('='); // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37

    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined; // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    val = val === undefined ? null : decodeUriComponent(val);
    formatter(decodeUriComponent(key), val, ret);
  });
  return Object.keys(ret).sort().reduce(function (result, key) {
    var val = ret[key];

    if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
      // Sort object keys, not values
      result[key] = keysSorter(val);
    } else {
      result[key] = val;
    }

    return result;
  }, Object.create(null));
}

var extract_1 = extract;
var parse_1 = parse$1;

var stringify = function (obj, opts) {
  var defaults = {
    encode: true,
    strict: true,
    arrayFormat: 'none'
  };
  opts = objectAssign(defaults, opts);

  if (opts.sort === false) {
    opts.sort = function () {};
  }

  var formatter = encoderForArrayFormat(opts);
  return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode$1(key, opts);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        result.push(formatter(key, val2, result.length));
      });
      return result.join('&');
    }

    return encode$1(key, opts) + '=' + encode$1(val, opts);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : '';
};

var parseUrl = function (str, opts) {
  return {
    url: str.split('?')[0] || '',
    query: parse$1(extract(str), opts)
  };
};

var queryString = {
	extract: extract_1,
	parse: parse_1,
	stringify: stringify,
	parseUrl: parseUrl
};

function CustomError(err) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fileName = arguments.length > 2 ? arguments[2] : undefined;
  var lineNumber = arguments.length > 3 ? arguments[3] : undefined;
  var instance = new Error(message, fileName, lineNumber);
  instance = err;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError);
  }

  return instance;
}

CustomError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomError, Error);
}

var _marked = /*#__PURE__*/regeneratorRuntime.mark(loaderGenerator);
var headers = '';

function loaderGenerator(_ref) {
  var type, commonData;
  return regeneratorRuntime.wrap(function loaderGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = _ref.type, commonData = _ref.commonData;
          _context.next = 3;
          return put(apiLoadingStatus({
            type: type,
            payload: commonData,
            status: false
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var checkKey$3 = function checkKey(key, name, dataType) {
  invariant_1(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

function _sagaHandler (_ref2) {
  var _marked2 = /*#__PURE__*/regeneratorRuntime.mark(commonGenerator);

  var _ref2$actionType = _ref2.actionType,
      actionType = _ref2$actionType === void 0 ? {} : _ref2$actionType,
      requestResponseHandler = _ref2.requestResponseHandler,
      axiosInterceptors = _ref2.axiosInterceptors;

  function commonGenerator(_ref3) {
    var _ref3$payload, resolve, reject, _ref3$payload$request, _ref3$payload$request2, asyncFunction, _ref3$payload$request3, asyncFunctionParams, _ref3$payload$request4, payload, _ref3$payload$request5, params, query, _ref3$payload$request6, paramsSerializer, _ref3$payload$request7, axiosConfig, _ref3$payload$request8, errorDataHandling, _ref3$payload$request9, clearDataOnError, _ref3$payload$request10, polling, _ref3$payload$request11, errorParser, _ref3$payload$request12, isResponseErrorParser, _ref3$payload$request13, Delay, _ref3$payload$request14, retry, _ref3$payload$request15, pollingCount, rest, _ref3$payload$callbac, successCallback, errorCallback, logoutCallback, finalCallback, pollingCallback, restCallback, restPayload, type, loop, count, pollingRequestConfig, _loop;

    return regeneratorRuntime.wrap(function commonGenerator$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3$payload = _ref3.payload;
            _ref3$payload = _ref3$payload === void 0 ? {} : _ref3$payload;
            resolve = _ref3$payload.resolve, reject = _ref3$payload.reject, _ref3$payload$request = _ref3$payload.request;
            _ref3$payload$request = _ref3$payload$request === void 0 ? {} : _ref3$payload$request;
            _ref3$payload$request2 = _ref3$payload$request.asyncFunction, asyncFunction = _ref3$payload$request2 === void 0 ? null : _ref3$payload$request2, _ref3$payload$request3 = _ref3$payload$request.asyncFunctionParams, asyncFunctionParams = _ref3$payload$request3 === void 0 ? null : _ref3$payload$request3, _ref3$payload$request4 = _ref3$payload$request.payload, payload = _ref3$payload$request4 === void 0 ? {} : _ref3$payload$request4, _ref3$payload$request5 = _ref3$payload$request.params, params = _ref3$payload$request5 === void 0 ? {} : _ref3$payload$request5, query = _ref3$payload$request.query, _ref3$payload$request6 = _ref3$payload$request.paramsSerializer, paramsSerializer = _ref3$payload$request6 === void 0 ? {
              arrayFormat: 'brackets'
            } : _ref3$payload$request6, _ref3$payload$request7 = _ref3$payload$request.axiosConfig, axiosConfig = _ref3$payload$request7 === void 0 ? {} : _ref3$payload$request7, _ref3$payload$request8 = _ref3$payload$request.errorDataHandling, errorDataHandling = _ref3$payload$request8 === void 0 ? true : _ref3$payload$request8, _ref3$payload$request9 = _ref3$payload$request.clearDataOnError, clearDataOnError = _ref3$payload$request9 === void 0 ? false : _ref3$payload$request9, _ref3$payload$request10 = _ref3$payload$request.polling, polling = _ref3$payload$request10 === void 0 ? false : _ref3$payload$request10, _ref3$payload$request11 = _ref3$payload$request.errorParser, errorParser = _ref3$payload$request11 === void 0 ? false : _ref3$payload$request11, _ref3$payload$request12 = _ref3$payload$request.defaultErrorParser, isResponseErrorParser = _ref3$payload$request12 === void 0 ? false : _ref3$payload$request12, _ref3$payload$request13 = _ref3$payload$request.delay, Delay = _ref3$payload$request13 === void 0 ? 8000 : _ref3$payload$request13, _ref3$payload$request14 = _ref3$payload$request.retry, retry = _ref3$payload$request14 === void 0 ? 0 : _ref3$payload$request14, _ref3$payload$request15 = _ref3$payload$request.pollingCount, pollingCount = _ref3$payload$request15 === void 0 ? 'unlimited' : _ref3$payload$request15, rest = _objectWithoutProperties(_ref3$payload$request, ["asyncFunction", "asyncFunctionParams", "payload", "params", "query", "paramsSerializer", "axiosConfig", "errorDataHandling", "clearDataOnError", "polling", "errorParser", "defaultErrorParser", "delay", "retry", "pollingCount"]), _ref3$payload$callbac = _ref3$payload.callback;
            _ref3$payload$callbac = _ref3$payload$callbac === void 0 ? {} : _ref3$payload$callbac;
            successCallback = _ref3$payload$callbac.successCallback, errorCallback = _ref3$payload$callbac.errorCallback, logoutCallback = _ref3$payload$callbac.logoutCallback, finalCallback = _ref3$payload$callbac.finalCallback, pollingCallback = _ref3$payload$callbac.pollingCallback, restCallback = _objectWithoutProperties(_ref3$payload$callbac, ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback"]), restPayload = _objectWithoutProperties(_ref3$payload, ["resolve", "reject", "request", "callback"]), type = _ref3.type;
            loop = true;
            count = 1;
            pollingRequestConfig = {};
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var axios, CancelToken, source, action, url, commonData, actionBind, request$1, requestData, _yield$race, postData, cancelTask, data, statusKey, _ref4, _ref4$data, _ref4$data$status, successStatus, _ref4$data$message, successMessage, successCallbackResponse, loader, _ref5, customMethod, _ref6, _ref6$data, _ref6$data$status, _successStatus, _ref6$data$message, _successMessage, pollingRes, _ref7, _ref7$response, _ref7$response$data, _ref7$response$data2, errorData, _ref7$response$data$s, errorStatus, _ref7$response$data$m, errorMessage, _loader, Cancelled, _yield$race2, CancelPolling;

              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      axios = axiosInterceptors || request;
                      CancelToken = axios.CancelToken;
                      _context2.next = 4;
                      return CancelToken.source();

                    case 4:
                      source = _context2.sent;
                      _context2.next = 7;
                      return actionType[type];

                    case 7:
                      action = _context2.sent;
                      _context2.next = 10;
                      return action = _objectSpread2({}, action, {
                        error: action.error || action.actions[ERROR],
                        success: action.success || action.actions[SUCCESS],
                        customTask: action.custom || action.actions[CUSTOM]
                      });

                    case 10:
                      url = '';

                      if (typeof action.api === 'string') {
                        url = action.api;
                        action.api = {};
                      }

                      commonData = _objectSpread2({
                        payload: payload,
                        params: params,
                        query: query
                      }, rest, {}, pollingRequestConfig, {
                        request: _objectSpread2({
                          payload: payload,
                          params: params,
                          query: query,
                          errorDataHandling: errorDataHandling,
                          clearDataOnError: clearDataOnError
                        }, rest, {}, pollingRequestConfig),
                        callback: restCallback
                      }, restPayload);

                      actionBind = function actionBind(_action, _method) {
                        return _action.bind({}, type, _method, commonData);
                      };

                      if (!(typeof action.error === 'function')) {
                        _context2.next = 19;
                        break;
                      }

                      _context2.next = 17;
                      return actionBind(action.error, ON_ERROR);

                    case 17:
                      _context2.next = 19;
                      return action.error = _context2.sent;

                    case 19:
                      if (!(typeof action.success === 'function')) {
                        _context2.next = 24;
                        break;
                      }

                      _context2.next = 22;
                      return actionBind(action.success, ON_SUCCESS);

                    case 22:
                      _context2.next = 24;
                      return action.success = _context2.sent;

                    case 24:
                      _context2.next = 26;
                      return _objectSpread2({}, action.api || {}, {
                        cancelToken: source.token,
                        url: action.api.url || url,
                        method: action.api.method || 'GET',
                        data: payload,
                        headers: headers
                      });

                    case 26:
                      request$1 = _context2.sent;

                      if (!action.effect) {
                        _context2.next = 30;
                        break;
                      }

                      _context2.next = 30;
                      return delete action.effect;

                    case 30:
                      if (!action.actions) {
                        _context2.next = 33;
                        break;
                      }

                      _context2.next = 33;
                      return delete action.actions;

                    case 33:
                      if (!((pollingRequestConfig && pollingRequestConfig.params || params) && typeof request$1.url === 'function')) {
                        _context2.next = 38;
                        break;
                      }

                      checkKey$3(params, '{request: { params }}', 'object'); // throw new Error(
                      //   `key 'params' should be object not a ${typeOf(params)}`,
                      // );

                      _context2.next = 37;
                      return request$1.url(pollingRequestConfig && pollingRequestConfig.params || params);

                    case 37:
                      request$1.url = _context2.sent;

                    case 38:
                      if (query || pollingRequestConfig && pollingRequestConfig.query) {
                        request$1.params = pollingRequestConfig && pollingRequestConfig.query || query; // eslint-disable-next-line no-loop-func

                        request$1.paramsSerializer = function (param) {
                          return queryString.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
                        };
                      }

                      if (!(process.env.NODE_ENV !== 'test' || !action.test)) {
                        _context2.next = 42;
                        break;
                      }

                      _context2.next = 42;
                      return delete request$1.headers;

                    case 42:
                      _context2.next = 44;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        request: request$1,
                        payload: commonData,
                        actionData: rest,
                        method: ON_REQUEST
                      });

                    case 44:
                      requestData = _context2.sent;
                      _context2.next = 47;
                      return request$1 = requestData || request$1;

                    case 47:
                      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(request$1.method)) {
                        _context2.next = 50;
                        break;
                      }

                      _context2.next = 50;
                      return delete request$1.data;

                    case 50:
                      if (request$1.effect) delete request$1.effect;
                      _context2.prev = 51;
                      _context2.next = 54;
                      return race({
                        posts: typeof asyncFunction === 'function' ? call.apply(void 0, [asyncFunction].concat(_toConsumableArray(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : []))) : call(axios, _objectSpread2({}, request$1, {}, pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)),
                        cancel: take(action.cancel)
                      });

                    case 54:
                      _yield$race = _context2.sent;
                      postData = _yield$race.posts;
                      cancelTask = _yield$race.cancel;
                      data = postData ? _objectSpread2({}, postData) : postData;

                      if (!(postData && postData.data)) {
                        _context2.next = 63;
                        break;
                      }

                      statusKey = action.api.responseStatusCodeKey || '';
                      data = {
                        data: {
                          status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? 200 : (postData.data || {})[statusKey]) || postData.status,
                          statusCode: (postData.data || {})[statusKey] || postData.status,
                          message: (postData.data || {})[action.api.responseMessageKey || 'message'],
                          data: (postData.data || {})[action.api.responseDataKey] || postData.data || postData
                        }
                      };

                      if (!(action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status))) {
                        _context2.next = 63;
                        break;
                      }

                      throw new CustomError({
                        isAxiosError: true,
                        response: {
                          data: {
                            error: (postData.data || {})[action.api.errorDataKey || 'error'] || postData.data || postData,
                            status: data.data.status,
                            statusCode: data.data.status,
                            message: data.data.message || 'Error'
                          }
                        }
                      });

                    case 63:
                      if (!data) {
                        _context2.next = 84;
                        break;
                      }

                      _ref4 = data || {}, _ref4$data = _ref4.data;
                      _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
                      _ref4$data$status = _ref4$data.status, successStatus = _ref4$data$status === void 0 ? postData.status : _ref4$data$status, _ref4$data$message = _ref4$data.message, successMessage = _ref4$data$message === void 0 ? '' : _ref4$data$message;
                      _context2.next = 69;
                      return action.success = action.success.bind({}, successStatus, successMessage);

                    case 69:
                      successCallbackResponse = null;

                      if (!(typeof successCallback === 'function')) {
                        _context2.next = 74;
                        break;
                      }

                      _context2.next = 73;
                      return call(successCallback, {
                        response: postData,
                        posts: data,
                        data: data.data,
                        message: successMessage,
                        status: successStatus
                      });

                    case 73:
                      successCallbackResponse = _context2.sent;

                    case 74:
                      if (successCallbackResponse) if (typeOf(successCallbackResponse) === 'object') {
                        if (typeOf(successCallbackResponse.task) === 'object') commonData.task = successCallbackResponse.task;
                        if (successCallbackResponse.filter) commonData.filter = successCallbackResponse.filter;
                        if (successCallbackResponse.tasks) commonData.tasks = successCallbackResponse.tasks;
                      } else if (typeOf(successCallbackResponse) === 'array') commonData.tasks = successCallbackResponse;
                      _context2.next = 77;
                      return call(requestResponseHandler, {
                        data: data,
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_SUCCESS
                      });

                    case 77:
                      loader = _context2.sent;

                      if (!loader) {
                        _context2.next = 81;
                        break;
                      }

                      _context2.next = 81;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 81:
                      if (typeof logoutCallback === 'function') setTimeout(function () {
                        return logoutCallback(data);
                      }, 500);
                      _context2.next = 102;
                      break;

                    case 84:
                      if (!(cancelTask && typeof source.cancel === 'function')) {
                        _context2.next = 95;
                        break;
                      }

                      _context2.next = 87;
                      return source.cancel();

                    case 87:
                      _ref5 = cancelTask || {}, customMethod = _ref5.response.method;

                      if (customMethod) {
                        _context2.next = 91;
                        break;
                      }

                      _context2.next = 91;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL,
                        axiosCancel: cancelTask
                      });

                    case 91:
                      _context2.next = 93;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 93:
                      _context2.next = 102;
                      break;

                    case 95:
                      if (!(process.env.NODE_ENV === 'test' && action.success)) {
                        _context2.next = 100;
                        break;
                      }

                      _context2.next = 98;
                      return put(action.success({
                        data: data
                      }));

                    case 98:
                      _context2.next = 102;
                      break;

                    case 100:
                      _context2.next = 102;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 102:
                      if (!(polling && typeof window !== 'undefined' && typeof pollingCallback === 'function')) {
                        _context2.next = 110;
                        break;
                      }

                      _ref6 = data || {}, _ref6$data = _ref6.data;
                      _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;
                      _ref6$data$status = _ref6$data.status, _successStatus = _ref6$data$status === void 0 ? postData.status : _ref6$data$status, _ref6$data$message = _ref6$data.message, _successMessage = _ref6$data$message === void 0 ? '' : _ref6$data$message;
                      _context2.next = 108;
                      return call(pollingCallback, {
                        response: data,
                        data: data.data,
                        message: _successMessage,
                        status: _successStatus,
                        count: count
                      });

                    case 108:
                      pollingRes = _context2.sent;
                      if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;

                    case 110:
                      if (!polling && retry) loop = false;
                      if (resolve && typeOf(resolve) === 'function') resolve({
                        status: 'SUCCESS',
                        response: postData,
                        data: data.data
                      });
                      _context2.next = 148;
                      break;

                    case 114:
                      _context2.prev = 114;
                      _context2.t0 = _context2["catch"](51);
                      if (resolve && typeOf(resolve) === 'function') resolve({
                        status: 'ERROR',
                        error: _context2.t0,
                        respone: _context2.t0 && _context2.t0.response
                      });

                      if (!(_context2.t0 && _typeof(_context2.t0) === 'object' && !_context2.t0.isAxiosError)) {
                        _context2.next = 121;
                        break;
                      }

                      throw new Error(_context2.t0);

                    case 121:
                      if (!(!polling && retry && retry - 1 >= count)) {
                        _context2.next = 124;
                        break;
                      }

                      _context2.next = 148;
                      break;

                    case 124:
                      if (process.env.NODE_ENV === 'test') console.log(_context2.t0);
                      _ref7 = _context2.t0 || {}, _ref7$response = _ref7.response;
                      _ref7$response = _ref7$response === void 0 ? {} : _ref7$response;
                      _ref7$response$data = _ref7$response.data;
                      _ref7$response$data = _ref7$response$data === void 0 ? {} : _ref7$response$data;
                      _ref7$response$data2 = _ref7$response$data[action.api.errorDataKey || 'error'], errorData = _ref7$response$data2 === void 0 ? _context2.t0 && _context2.t0.response && _context2.t0.response.data || _context2.t0 && _context2.t0.response || '' : _ref7$response$data2, _ref7$response$data$s = _ref7$response$data.status, errorStatus = _ref7$response$data$s === void 0 ? _context2.t0.response && _context2.t0.response.data && (_context2.t0.response.data[action.api.errorStatusKey] || _context2.t0.response.status) : _ref7$response$data$s, _ref7$response$data$m = _ref7$response$data.message, errorMessage = _ref7$response$data$m === void 0 ? _context2.t0.response && _context2.t0.response.data && _context2.t0.response.data[action.api.errorMessageKey] || _context2.t0.response && _context2.t0.response.statusText || '' : _ref7$response$data$m;

                      if (!(typeof errorCallback === 'function')) {
                        _context2.next = 133;
                        break;
                      }

                      _context2.next = 133;
                      return errorCallback(_objectSpread2({
                        error: _context2.t0,
                        errorData: isResponseErrorParser ? errorData && _typeof(responseErrorParser(errorData)) === 'object' && Object.keys(responseErrorParser(errorData) || {}).length > 0 ? responseErrorParser(errorData) : errorData : errorData
                      }, typeof errorParser === 'function' ? {
                        errorParser: errorParser({
                          error: _context2.t0,
                          errorData: errorData,
                          status: errorStatus,
                          response: _context2.t0 && _context2.t0.response,
                          message: errorMessage
                        })
                      } : {}, {
                        message: errorMessage,
                        status: errorStatus,
                        response: _context2.t0 && _context2.t0.response,
                        errors: errorData
                      }));

                    case 133:
                      _context2.next = 135;
                      return action.error = action.error.bind({}, errorStatus, errorMessage);

                    case 135:
                      if (!(axios.isCancel(_context2.t0) && action.cancel)) {
                        _context2.next = 142;
                        break;
                      }

                      _context2.next = 138;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 138:
                      _context2.next = 140;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL_ERROR
                      });

                    case 140:
                      _context2.next = 148;
                      break;

                    case 142:
                      _context2.next = 144;
                      return call(requestResponseHandler, {
                        error: {
                          response: {
                            data: {
                              status: errorStatus,
                              data: errorDataHandling ? errorData : null,
                              message: errorMessage
                            }
                          }
                        },
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_ERROR
                      });

                    case 144:
                      _loader = _context2.sent;

                      if (!_loader) {
                        _context2.next = 148;
                        break;
                      }

                      _context2.next = 148;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 148:
                      _context2.prev = 148;
                      _context2.next = 151;
                      return cancelled();

                    case 151:
                      Cancelled = _context2.sent;

                      if (!(typeof finalCallback === 'function')) {
                        _context2.next = 155;
                        break;
                      }

                      _context2.next = 155;
                      return finalCallback({
                        type: type,
                        action: action,
                        payload: commonData,
                        Cancelled: Cancelled
                      });

                    case 155:
                      _context2.next = 157;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_FINALLY,
                        cancelled: Cancelled
                      });

                    case 157:
                      if (!Cancelled) {
                        _context2.next = 162;
                        break;
                      }

                      if (!(typeof source.cancel === 'function')) {
                        _context2.next = 161;
                        break;
                      }

                      _context2.next = 161;
                      return source.cancel();

                    case 161:
                      loop = false;

                    case 162:
                      return _context2.finish(148);

                    case 163:
                      if (!(polling && typeof window !== 'undefined' && loop)) {
                        _context2.next = 176;
                        break;
                      }

                      if (!(pollingCount === 'unlimited' || pollingCount - 1 >= count)) {
                        _context2.next = 173;
                        break;
                      }

                      count += 1;
                      _context2.next = 168;
                      return race({
                        posts: call(delay, Delay),
                        cancel: take(action.cancel)
                      });

                    case 168:
                      _yield$race2 = _context2.sent;
                      CancelPolling = _yield$race2.cancel;
                      if (CancelPolling) loop = false;
                      _context2.next = 174;
                      break;

                    case 173:
                      loop = false;

                    case 174:
                      _context2.next = 177;
                      break;

                    case 176:
                      if (!polling && retry && loop) {
                        if (retry - 1 >= count) {
                          loop = true;
                          count += 1;
                        } else loop = false;
                      } else loop = false;

                    case 177:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, null, [[51, 114, 148, 163]]);
            });

          case 11:
            return _context3.delegateYield(_loop(), "t0", 12);

          case 12:
            if (loop) {
              _context3.next = 11;
              break;
            }

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked2);
  }

  var generatorPattern = Object.keys(actionType).map(function (pattern) {
    return (actionType[pattern].effect || takeLatest)(pattern, commonGenerator);
  });
  return [generatorPattern, commonGenerator];
}

var _marked$1 = /*#__PURE__*/regeneratorRuntime.mark(DEFAULT_SAGA_HANDLER);
function DEFAULT_SAGA_HANDLER(_ref) {
  var method, action, successData, requestData, successStatus, restSuccessData, errorStatus, errorData;
  return regeneratorRuntime.wrap(function DEFAULT_SAGA_HANDLER$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _ref.method, action = _ref.action, successData = _ref.successData, requestData = _ref.requestData, successStatus = _ref.successStatus, restSuccessData = _ref.restSuccessData, errorStatus = _ref.errorStatus, errorData = _ref.errorData;
          _context.t0 = method;
          _context.next = _context.t0 === ON_REQUEST ? 4 : _context.t0 === ON_CANCEL ? 5 : _context.t0 === ON_SUCCESS ? 6 : _context.t0 === ON_ERROR ? 13 : 21;
          break;

        case 4:
          return _context.abrupt("return", requestData);

        case 5:
          return _context.abrupt("return", true);

        case 6:
          if (![200, 201].includes(successStatus)) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return put(action.success(_objectSpread2({
            data: successData
          }, restSuccessData)));

        case 9:
          _context.next = 12;
          break;

        case 11:
          return _context.abrupt("return", true);

        case 12:
          return _context.abrupt("break", 21);

        case 13:
          if (!errorStatus) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return put(action.error({
            data: errorData
          }));

        case 16:
          _context.next = 20;
          break;

        case 18:
          _context.next = 20;
          return put(action.error({
            data: {}
          }));

        case 20:
          return _context.abrupt("break", 21);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var requestResponseHandler = function requestResponseHandler(_ref) {
  var constants = _ref.constants,
      sagaFunction = _ref.sagaFunction;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line func-names
    regeneratorRuntime.mark(function _callee(_ref2) {
      var _ref2$data, _ref2$data$data, successStatus, _ref2$data$data$data, successData, successMessage, restSuccessData, request, action, type, _ref2$payload, _ref2$payload$payload, _ref2$payload$query, _ref2$payload$params, restPayload, method, actionData, axiosCancel, _ref2$error, _ref2$error$response, _ref2$error$response$, errorStatus, _ref2$error$response$2, errorData, errorMessage, restErrorData, cancelled, requestData, requestParams, DEFAULT_SAGA_HANDLER$1;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$data = _ref2.data;
              _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
              _ref2$data$data = _ref2$data.data;
              _ref2$data$data = _ref2$data$data === void 0 ? {} : _ref2$data$data;
              successStatus = _ref2$data$data.status, _ref2$data$data$data = _ref2$data$data.data, successData = _ref2$data$data$data === void 0 ? {} : _ref2$data$data$data, successMessage = _ref2$data$data.message, restSuccessData = _objectWithoutProperties(_ref2$data$data, ["status", "data", "message"]), request = _ref2.request, action = _ref2.action, type = _ref2.type, _ref2$payload = _ref2.payload;
              _ref2$payload = _ref2$payload === void 0 ? {} : _ref2$payload;
              _ref2$payload$payload = _ref2$payload.payload, _ref2$payload$query = _ref2$payload.query, _ref2$payload$params = _ref2$payload.params, restPayload = _objectWithoutProperties(_ref2$payload, ["payload", "query", "params"]), method = _ref2.method, actionData = _ref2.actionData, axiosCancel = _ref2.axiosCancel, _ref2$error = _ref2.error;
              _ref2$error = _ref2$error === void 0 ? {} : _ref2$error;
              _ref2$error$response = _ref2$error.response;
              _ref2$error$response = _ref2$error$response === void 0 ? {} : _ref2$error$response;
              _ref2$error$response$ = _ref2$error$response.data;
              _ref2$error$response$ = _ref2$error$response$ === void 0 ? {} : _ref2$error$response$;
              errorStatus = _ref2$error$response$.status, _ref2$error$response$2 = _ref2$error$response$.data, errorData = _ref2$error$response$2 === void 0 ? [] : _ref2$error$response$2, errorMessage = _ref2$error$response$.message, restErrorData = _objectWithoutProperties(_ref2$error$response$, ["status", "data", "message"]), cancelled = _ref2.cancelled;
              requestData = {};
              if (method === ON_REQUEST) requestData = newObject(request);
              requestParams = {
                method: method,
                action: action,
                successData: successData,
                requestData: requestData,
                successStatus: successStatus,
                restSuccessData: restSuccessData,
                errorStatus: errorStatus,
                errorData: errorData,
                restPayload: restPayload,
                restErrorData: restErrorData
              };
              DEFAULT_SAGA_HANDLER$1 = DEFAULT_SAGA_HANDLER.bind(null, requestParams);

              if (!sagaFunction) {
                _context.next = 21;
                break;
              }

              _context.next = 20;
              return call(sagaFunction, newObject({
                type: type,
                constants: constants,
                DEFAULT_SAGA_HANDLER: DEFAULT_SAGA_HANDLER$1
              }, requestParams));

            case 20:
              return _context.abrupt("return", _context.sent);

            case 21:
              _context.t0 = method;
              _context.next = _context.t0 === ON_REQUEST ? 24 : 25;
              break;

            case 24:
              return _context.abrupt("return", requestData);

            case 25:
              _context.next = 27;
              return call(DEFAULT_SAGA_HANDLER$1);

            case 27:
              return _context.abrupt("return", _context.sent);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
};

var Saga = (function (_ref) {
  var sagaConfig = _ref.sagaConfig,
      constants = _ref.constants,
      sagaFunction = _ref.sagaFunction,
      axiosInterceptors = _ref.axiosInterceptors,
      _ref$constantSaga = _ref.constantSaga,
      OtherGenerator = _ref$constantSaga === void 0 ? [] : _ref$constantSaga;

  var _sagaHandler2 = _sagaHandler({
    requestResponseHandler: requestResponseHandler({
      constants: constants,
      sagaFunction: sagaFunction
    }),
    actionType: sagaConfig,
    axiosInterceptors: axiosInterceptors
  }),
      _sagaHandler3 = _slicedToArray(_sagaHandler2, 2),
      generatorPattern = _sagaHandler3[0],
      sagaGenerator = _sagaHandler3[1]; // For Test Purpose


  var Generator = sagaGenerator; // eslint-disable-next-line func-names

  var saga = /*#__PURE__*/regeneratorRuntime.mark(function saga() {
    return regeneratorRuntime.wrap(function saga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return all(generatorPattern.concat(OtherGenerator || []));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, saga);
  });
  return {
    saga: saga,
    Generator: Generator
  };
});

var safe$1 = nullcheck; // const shape = {
//   reducerName: isString,
// };

var checkKey$4 = function checkKey(key, name, dataType) {
  invariant_1(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var index$1 = (function (_ref) {
  var _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers,
      _ref$nextJS = _ref.nextJS,
      nextJS = _ref$nextJS === void 0 ? false : _ref$nextJS,
      _ref$createReducer = _ref.createReducer,
      createReducer = _ref$createReducer === void 0 ? null : _ref$createReducer,
      _ref$useHook = _ref.useHook,
      useHook = _ref$useHook === void 0 ? false : _ref$useHook,
      _ref$useHocHook = _ref.useHocHook,
      useHocHook = _ref$useHocHook === void 0 ? false : _ref$useHocHook;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$apiEndPoints = _ref2.apiEndPoints,
        apiEndPoints = _ref2$apiEndPoints === void 0 ? {} : _ref2$apiEndPoints,
        _ref2$initialState = _ref2.initialState,
        initialState = _ref2$initialState === void 0 ? {} : _ref2$initialState,
        _ref2$getDefaultConfi = _ref2.getDefaultConfig,
        getDefaultConfig = _ref2$getDefaultConfi === void 0 ? false : _ref2$getDefaultConfi,
        _ref2$dontReset = _ref2.dontReset,
        dontResetOnLogout = _ref2$dontReset === void 0 ? {} : _ref2$dontReset,
        _ref2$isMobile = _ref2.isMobile,
        isMobile = _ref2$isMobile === void 0 ? false : _ref2$isMobile,
        sagaFunction = _ref2.saga,
        _ref2$constantSaga = _ref2.constantSaga,
        constantSaga = _ref2$constantSaga === void 0 ? [] : _ref2$constantSaga,
        constantReducer = _ref2.constantReducer,
        reducerFunction = _ref2.reducer,
        reducerName = _ref2.name,
        axiosInterceptors = _ref2.axiosInterceptors,
        _ref2$useHook = _ref2.useHook,
        _useHook = _ref2$useHook === void 0 ? false : _ref2$useHook;

    invariant_1(isString_1(reducerName) && !isEmpty_1(reducerName), '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string');
    checkKey$4(apiEndPoints, 'apiEndPoints', 'object');
    checkKey$4(initialState, 'initialState', 'object');
    checkKey$4(dontResetOnLogout, 'dontReset', 'object');
    if (sagaFunction) checkKey$4(sagaFunction, 'saga', 'function');
    checkKey$4(constantSaga, 'constantSaga', 'array');
    checkKey$4(handlers, 'handlers', 'array');
    if (constantReducer) checkKey$4(constantReducer, 'constantReducer', 'function');
    if (reducerFunction) checkKey$4(reducerFunction, 'reducer', 'function');
    if (createReducer) checkKey$4(createReducer, 'createReducer', 'function');

    var ApiEndPoints = _defineProperty({}, reducerName, apiEndPoints);

    var _generateConstants = generateConstants({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout: dontResetOnLogout
    }),
        constants = _generateConstants.constants,
        InitialState = _generateConstants.initialState,
        resetState = _generateConstants.resetState,
        Action = _generateConstants.actions,
        sagaConfig = _generateConstants.sagaConfig;

    var _generateAction = generateAction(Action),
        componentActions = _generateAction.componentActions;

    var _Saga = Saga({
      sagaConfig: sagaConfig,
      constants: constants,
      sagaFunction: sagaFunction,
      axiosInterceptors: axiosInterceptors,
      constantSaga: constantSaga
    }),
        saga = _Saga.saga;

    var reducer = Reducer({
      constants: constants,
      InitialState: newObject(initialState, InitialState),
      reducerFunction: reducerFunction,
      resetState: resetState,
      constantReducer: constantReducer,
      isMobile: isMobile,
      handlers: handlers
    });

    var componentData = _defineProperty({}, "".concat(reducerName, "_hoc"), {
      reducerConstants: Object.entries(constants).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        return _objectSpread2({}, acc, _defineProperty({}, key, value[commonConstants.CALL]));
      }, {}),
      constants: constants,
      initialState: initialState,
      axios: axiosInterceptors || request,
      resetState: resetState,
      reducerName: reducerName
    });

    var commonProps = useHook || _useHook ? {
      safe: safe$1
    } : {
      safe: safe$1,
      getData: getData
    }; // eslint-disable-next-line no-underscore-dangle

    var _useHocHook = function _useHocHook() {
      useInjectSaga({
        key: reducerName,
        saga: saga
      });
      useInjectReducer({
        key: reducerName,
        reducer: reducer
      }, createReducer);
      var dispatch = useDispatch();

      var _React$useState = React.useState(_objectSpread2({}, componentData["".concat(reducerName, "_hoc")], {
        actions: bindActionCreators(componentActions, dispatch),
        dispatch: dispatch
      })),
          _React$useState2 = _slicedToArray(_React$useState, 1),
          state = _React$useState2[0];

      return state;
    };

    if (useHocHook && !nextJS) return _useHocHook; // eslint-disable-next-line no-unused-vars

    var hoc = function hoc(WrapperComponent) {

      function WithHoc(props) {
        // const [language, setLanguage] = useState(getLanguage('EN'));
        // useEffect(() => {
        //   if (props.authentication.language !== language)
        //     setLanguage(getLanguage(props.authentication.language));
        // }, [props.authentication.language]);
        // console.log(props, '================');
        return React.createElement(WrapperComponent // language={language}
        , _extends({}, commonProps, props));
      }

      WithHoc.propTypes = {// [reducerName]: PropTypes.object.isRequired,
      };
      WithHoc.displayName = "withReactBoilerplateReduxSagaHoc(".concat(WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent', ")");
      var MakeSelectAuthenticationState = makeSelectAuthenticationState({
        apiEndPoints: ApiEndPoints,
        initialState: newObject(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants: constants
      });
      var mapStateToProps = createStructuredSelector(_defineProperty({}, "".concat(reducerName, "_data"), MakeSelectAuthenticationState()));
      var authenticationReducer = injectReducer({
        key: reducerName,
        reducer: reducer
      }, createReducer);
      var authenticationSaga = injectSaga({
        key: reducerName,
        saga: saga
      });
      var withConnect = connect(mapStateToProps, mapDispatchToProps(componentActions, componentData, reducerName));

      if (nextJS) {
        WithHoc.getInitialProps = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
            var _ref6, res, req, store, rest, data;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref6 = props.ctx || props, res = _ref6.res, req = _ref6.req, store = _ref6.store, rest = _objectWithoutProperties(_ref6, ["res", "req", "store"]);
                    data = _objectSpread2({
                      res: res,
                      req: req,
                      store: store
                    }, rest);

                    if (!WrapperComponent.getInitialProps) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return WrapperComponent.getInitialProps(_objectSpread2({}, props, {}, mapDispatchToProps(componentActions, componentData, reducerName)(store.dispatch)));

                  case 5:
                    data = _context.sent;

                  case 6:
                    return _context.abrupt("return", data || {});

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }();

        return withConnect(WithHoc);
      }

      return (useHook || _useHook ? compose(connect(null, mapDispatchToProps(componentActions, componentData, reducerName)), authenticationReducer, authenticationSaga) : compose(withConnect, authenticationReducer, authenticationSaga))(WithHoc);
    };

    if (nextJS && getDefaultConfig) return _objectSpread2({
      hoc: hoc,
      saga: saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      },
      actions: _objectSpread2({}, componentActions)
    }, componentData["".concat(reducerName, "_hoc")]);
    if (nextJS) return {
      hoc: hoc,
      saga: saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      }
    };

    if (getDefaultConfig) {
      return _objectSpread2({
        hoc: hoc,
        actions: _objectSpread2({}, componentActions)
      }, componentData["".concat(reducerName, "_hoc")]);
    }

    return hoc;
  };
});

var indianStates = [{
  label: 'Andaman and Nicobar Islands',
  value: 'Andaman and Nicobar Islands'
}, {
  label: 'Andhra Pradesh',
  value: 'Andhra Pradesh'
}, {
  label: 'Arunachal Pradesh',
  value: 'Arunachal Pradesh'
}, {
  label: 'Assam',
  value: 'Assam'
}, {
  label: 'Bihar',
  value: 'Bihar'
}, {
  label: 'Chandigarh',
  value: 'Chandigarh'
}, {
  label: 'Chhattisgarh',
  value: 'Chhattisgarh'
}, {
  label: 'Dadra and Nagar Haveli',
  value: 'Dadra and Nagar Haveli'
}, {
  label: 'Daman and Diu',
  value: 'Daman and Diu'
}, {
  label: 'Delhi',
  value: 'Delhi'
}, {
  label: 'Goa',
  value: 'Goa'
}, {
  label: 'Gujarat',
  value: 'Gujarat'
}, {
  label: 'Haryana',
  value: 'Haryana'
}, {
  label: 'Himachal Pradesh',
  value: 'Himachal Pradesh'
}, {
  label: 'Jammu and Kashmir',
  value: 'Jammu and Kashmir'
}, {
  label: 'Jharkhand',
  value: 'Jharkhand'
}, {
  label: 'Karnataka',
  value: 'Karnataka'
}, {
  label: 'Kerala',
  value: 'Kerala'
}, {
  label: 'Lakshadweep',
  value: 'Lakshadweep'
}, {
  label: 'Madhya Pradesh',
  value: 'Madhya Pradesh'
}, {
  label: 'Maharashtra',
  value: 'Maharashtra'
}, {
  label: 'Manipur',
  value: 'Manipur'
}, {
  label: 'Meghalaya',
  value: 'Meghalaya'
}, {
  label: 'Mizoram',
  value: 'Mizoram'
}, {
  label: 'Nagaland',
  value: 'Nagaland'
}, {
  label: 'Odisha',
  value: 'Odisha'
}, {
  label: 'Puducherry',
  value: 'Puducherry'
}, {
  label: 'Punjab',
  value: 'Punjab'
}, {
  label: 'Rajasthan',
  value: 'Rajasthan'
}, {
  label: 'Sikkim',
  value: 'Sikkim'
}, {
  label: 'Tamil Nadu',
  value: 'Tamil Nadu'
}, {
  label: 'Telangana',
  value: 'Telangana'
}, {
  label: 'Tripura',
  value: 'Tripura'
}, {
  label: 'Uttar Pradesh',
  value: 'Uttar Pradesh'
}, {
  label: 'Uttarakhand',
  value: 'Uttarakhand'
}, {
  label: 'West Bengal',
  value: 'West Bengal'
}];

var passwordReg = new RegExp(/^.{6,16}$/);
var emailReg = new RegExp('^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$');
var mobileReg = new RegExp(/^\d{10,10}$/);
var nameReg = new RegExp('^[a-zA-Z ]+$');
var stringReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
var numberReg = new RegExp('^[\\d]+$');
var decimalReg = new RegExp('^[+-]?([0-9]*[.])?[0-9]+');
var postiveIntegerReg = new RegExp('^([1-9][0-9]+|[0-9])$');

/* eslint-disable */

function _isEmpty(value) {
  if (value && typeof value === 'string' && value.trim()) return false;
  if (typeof value === 'number' && (value || value === 0)) return false;
  return true;
}
function _isValidPassword(value) {
  return passwordReg.test(value.trim());
}
function _isValidEmail(value) {
  return emailReg.test(value.trim());
}
function _isValidMobile(value) {
  return mobileReg.test(value.trim());
}
function _isValidNumber(value) {
  return numberReg.test(value);
}
function _isValidFloatNumber(value) {
  return decimalReg.test(value);
}
function _isPostiveInteger(value) {
  return postiveIntegerReg.test(value);
}
function _isMatching(val1, val2) {
  // return type should be boolean
  if (val1 && val2 && typeof val1 === 'string' && typeof val2 === 'string' && val1.trim() == val2.trim()) return true;
  return false;
}
function _isValidName(value) {
  return nameReg.test(value.trim());
}
function _isValidString(value) {
  return stringReg.test(value.trim());
}
function _isValidTextAreaInput(value) {
  return value.length > 4 ? false : true;
}
function _isValidArray(value) {
  return value.length > 0 ? false : true;
}

/* eslint-disable no-underscore-dangle */

function validateForm(validationData) {
  // let value = this[`${type}Ref`].value(),
  var error = {
    isError: false
  }; // eslint-disable-next-line

  Object.entries(validationData).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        formObject = _ref2[1];

    var type = formObject.type,
        value = formObject.value,
        message = formObject.message,
        _formObject$optional = formObject.optional,
        optional = _formObject$optional === void 0 ? false : _formObject$optional; // const isEmpty = validate._isEmpty(validationData[value].value);

    var isEmpty;

    if (!optional || value) {
      if (Array.isArray(value)) {
        isEmpty = !value.length > 0;
      } else {
        isEmpty = _isEmpty(value);
      }

      var typeMatch = {};

      if (!isEmpty) {
        // Add more cases depending upon the types that need to be checked
        // eslint-disable-next-line default-case
        switch (type) {
          case 'email':
            typeMatch.hasPassed = _isValidEmail(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Email eg. (abc@abc.com)';
            }

            break;

          case 'mobile':
            typeMatch.hasPassed = _isValidMobile(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Mobile Number';
            }

            break;

          case 'password':
            typeMatch.hasPassed = _isValidPassword(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Passwords must contain at least 6 characters to 20 characters';
            }

            break;

          case 'confirmPassword':
            {
              // eslint-disable-line no-case-declarations
              // const password  = findKey(validationData, { type: 'password' });
              var password = validationData[key].compareValue;
              typeMatch.hasPassed = _isMatching(password, value);

              if (!typeMatch.hasPassed) {
                error["".concat(key)] = message || 'Password & Confirm password do not match';
              }

              break;
            }

          case 'string':
            typeMatch.hasPassed = _isValidString(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'name':
            typeMatch.hasPassed = _isValidName(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            if (validationData[value] && value.length < 3) {
              error["".concat(key)] = message || 'Name Must Be Greater Than 2 Characters';
            }

            break;

          case 'number':
            typeMatch.hasPassed = _isValidNumber(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'float':
            typeMatch.hasPassed = _isValidFloatNumber(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'postiveIntegerReg':
            typeMatch.hasPassed = _isPostiveInteger(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Enter a valid input';
            }

            break;

          case 'array':
            typeMatch.hasPassed = _isValidArray(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please upload Images';
            }

            break;

          case 'textarea':
            typeMatch.hasPassed = _isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;

          case 'dateString':
            typeMatch.hasPassed = _isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;
        }
      } else {
        error[key] = validationData[key].type === 'mobile' ? message || 'Please enter Valid Mobile Number' : message || 'Please provide the necessary details';
      }
    }
  });

  if (Object.keys(error).length > 1) {
    error.isError = true;
  }

  return error;
}

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middleWare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var composeEnhancers = compose;
  var reduxSagaMonitorOptions = {}; // const routerMiddleware = isWeb
  //   ? require('connected-react-router').routerMiddleware
  //   : null;
  // const History = isWeb ? require('./utils/history').default : null;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

  /* istanbul ignore next */

  if (process.env.NODE_ENV !== 'production' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
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
  var enhancers = [applyMiddleware.apply(void 0, _toConsumableArray(middlewares))];
  var store = createStore(createReducer({}), initialState, composeEnhancers.apply(void 0, enhancers)); // Extensions

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry

  store.injectedSagas = {}; // Saga registry
  // Make reducers hot reloadable, see http://mxs.is/googmo

  /* istanbul ignore next */

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.hot) {
    module.hot.accept('./reducers', function () {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  } // global._redux_store = store;


  return store;
}

var nextStore = function nextStore(_ref) {
  var saga = _ref.saga,
      reducer = _ref.reducer;
  return function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

    if (process.env.NODE_ENV !== 'production' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
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
      return _objectSpread2({}, acc, _defineProperty({}, e.name, e.reducer));
    }, {})), initialState, composeEnhancers.apply(void 0, enhancers)); // Extensions

    store.runSaga = sagaMiddleware.run; // store.sagaTask = sagaMiddleware;

    store.injectedReducers = {}; // Reducer registry

    store.injectedSagas = {}; // Saga registry

    store.tasks = {};

    if (req || !isServer) {
      store.sagaTask = sagaMiddleware.run( /*#__PURE__*/regeneratorRuntime.mark(function rootSaga() {
        return regeneratorRuntime.wrap(function rootSaga$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return all(saga.map(fork));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, rootSaga);
      }));
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

function withReduxSaga(BaseComponent) {
  var WrappedComponent = /*#__PURE__*/function (_Component) {
    _inherits(WrappedComponent, _Component);

    var _super = _createSuper(WrappedComponent);

    function WrappedComponent() {
      _classCallCheck(this, WrappedComponent);

      return _super.apply(this, arguments);
    }

    _createClass(WrappedComponent, [{
      key: "render",
      value: function render() {
        return React.createElement(BaseComponent, this.props);
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
          var _ref, isServer, store, pageProps;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ref = props.ctx || props, isServer = _ref.isServer, store = _ref.store;
                  pageProps = {};

                  if (!BaseComponent.getInitialProps) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 5;
                  return BaseComponent.getInitialProps(props);

                case 5:
                  pageProps = _context.sent;

                case 6:
                  if (!isServer) {
                    _context.next = 15;
                    break;
                  }

                  store.dispatch(END);

                  if (!store.sagaTask.toPromise) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 11;
                  return store.sagaTask.toPromise();

                case 11:
                  _context.next = 15;
                  break;

                case 13:
                  _context.next = 15;
                  return store.sagaTask.done;

                case 15:
                  return _context.abrupt("return", pageProps);

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WrappedComponent;
  }(Component);

  _defineProperty(WrappedComponent, "displayName", "withReduxSaga(".concat(BaseComponent.displayName || BaseComponent.name || 'BaseComponent', ")"));

  return WrappedComponent;
}

var withRedux = createCommonjsModule(function (module, exports) {

var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    throw: verb(1),
    return: verb(2)
  }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __rest = commonjsGlobal && commonjsGlobal.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === 'function') for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result['default'] = mod;
  return result;
};

Object.defineProperty(exports, '__esModule', {
  value: true
});

var react_1 = __importStar(React);

var defaultConfig = {
  storeKey: '__NEXT_REDUX_STORE__',
  debug: false,
  serializeState: function serializeState(state) {
    return state;
  },
  deserializeState: function deserializeState(state) {
    return state;
  }
};

exports.default = function (makeStore, config) {
  config = __assign(__assign({}, defaultConfig), config);
  var isServer = typeof window === 'undefined';

  var initStore = function initStore(_a) {
    var initialState = _a.initialState,
        ctx = _a.ctx;
    var storeKey = config.storeKey;

    var createStore = function createStore() {
      return makeStore(config.deserializeState(initialState), __assign(__assign(__assign({}, ctx), config), {
        isServer: isServer
      }));
    };

    if (isServer) return createStore(); // Memoize store if client

    if (!(storeKey in window)) {
      window[storeKey] = createStore();
    }

    return window[storeKey];
  };

  return function (App) {
    var _a;

    return _a =
    /** @class */
    function (_super) {
      __extends(WrappedApp, _super);

      function WrappedApp(props, context) {
        var _this = _super.call(this, props, context) || this;

        var initialState = props.initialState;
        if (config.debug) console.log('4. WrappedApp.render created new store with initialState', initialState);
        _this.store = initStore({
          initialState: initialState
        });
        return _this;
      }

      WrappedApp.prototype.render = function () {
        var _a = this.props,
            initialProps = _a.initialProps,
            initialState = _a.initialState,
            props = __rest(_a, ['initialProps', 'initialState']); // Cmp render must return something like <Provider><Component/></Provider>


        return react_1.default.createElement(App, __assign({}, props, initialProps, {
          store: this.store
        }));
      };

      return WrappedApp;
    }(react_1.Component),
    /* istanbul ignore next */
    _a.displayName = 'withRedux(' + (App.displayName || App.name || 'App') + ')', _a.getInitialProps = function (appCtx) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, initialProps;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              /* istanbul ignore next */
              if (!appCtx) throw new Error('No app context');
              /* istanbul ignore next */

              if (!appCtx.ctx) throw new Error('No page context');
              store = initStore({
                ctx: appCtx.ctx
              });
              if (config.debug) console.log('1. WrappedApp.getInitialProps wrapper got the store with state', store.getState());
              appCtx.ctx.store = store;
              appCtx.ctx.isServer = isServer;
              initialProps = {};
              if (!('getInitialProps' in App)) return [3
              /*break*/
              , 2];
              return [4
              /*yield*/
              , App.getInitialProps.call(App, appCtx)];

            case 1:
              initialProps = _a.sent();
              _a.label = 2;

            case 2:
              if (config.debug) console.log('3. WrappedApp.getInitialProps has store state', store.getState());
              return [2
              /*return*/
              , {
                isServer: isServer,
                initialState: isServer ? config.serializeState(store.getState()) : store.getState(),
                initialProps: initialProps
              }];
          }
        });
      });
    }, _a;
  };
};
});

var withRedux$1 = unwrapExports(withRedux);

export { CustomError, validateForm as FormValidator, index$1 as HOC, indianStates as IndianStates, nullcheck as Safe, request as axios, cloneObject, commonConstants, deleteIn, generateTimeStamp, getData, getIn, injectReducer, injectSaga, newObject, nextStore, objectEquals, setIn, configureStore as store, toCapitalize, toPromise, typeOf, updateIn, useActionsHook as useActions, useInjectReducer, useInjectSaga, useMutation, useHook as useQuery, withRedux$1 as withRedux, withReduxSaga };
//# sourceMappingURL=react-boilerplate-redux-saga-hoc.mjs.map
