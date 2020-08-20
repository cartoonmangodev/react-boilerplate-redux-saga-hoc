"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var errorLog = () => {
  var e = new Error();
  var stack = e.stack.toString().split(/\r\n|\n/);
  console.log('Error :');
  stack.splice(0, 1);
  stack.map((err, index) => console.log("[".concat(stack[stack.length - 1 - index], " ]"))); // console.log(`[ Error ${stack[stack.length - 1]} ]`);
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
  propNames = propNames.map(prop => prop.replace(/\]|\(/g, '').replace(/\)/, '()'));
  var parent = propNames.splice(0, 1);

  if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
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

        if (typeof data !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
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
        if (CONSTRUCTOR_CHECK[typeof type]) {
          if (func && func[index]) data = CONSTRUCTOR_CHECK[typeof type].prototype[propNames[key - 1]].apply(type, func[index]);else data = CONSTRUCTOR_CHECK[typeof type].prototype[propNames[key - 1]].call(type);
        } else {
          if (func && func[index]) data = data.apply({}, [...func[index]]);else data = data();
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

        if (typeof data !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
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

var _default = nullCheck.bind(null, Error);

exports.default = _default;