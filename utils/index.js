'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread2'));
var React = require('react');
var React__default = _interopDefault(React);
var redux = require('redux');
var reactRedux = require('react-redux');
var isEqual = _interopDefault(require('lodash.isequal'));
var invariant = _interopDefault(require('invariant'));
require('@babel/runtime/helpers/objectWithoutProperties');
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _createSuper = _interopDefault(require('@babel/runtime/helpers/createSuper'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));

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
  var returnDefaultData = def !== undefined ? def : null;

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
      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
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

        if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

        if (!data && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path);
          }

          return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
        }
      } else {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path, true);
        }

        return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
      }

      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
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
  '[object Function]': 'function' // '[object Symbol]': 'symbol',
  // '[object GeneratorFunction]': 'generatorFunction',

};
var typeOf = function typeOf(_obj) {
  return type[Object.prototype.toString.call(_obj)] || _typeof(_obj);
};

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

// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';

var cache = {};
var cacheActions = {};
var safe = nullcheck;
var getData = function getData(data, def) {
  var loader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return _objectSpread({}, safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.')), {}), {
    data: safe(data, ".data".concat(filter.length ? '.' : '').concat(filter.join('.')).concat(filter.length ? '.data' : ''), def),
    loader: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".loading.status"), typeof loader !== 'boolean' ? true : loader),
    lastUpdated: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".lastUpdated"), generateTimeStamp()),
    isInfinite: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isInfinite"), false),
    infiniteEnd: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".infiniteEnd"), false),
    isError: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isError"), false),
    toast: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".toast"), {}),
    error: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".error"), {})
  });
};
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );

var checkKey = function checkKey(key, name, dataType, message) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be  ").concat(message || dataType));
};

var checkKeyWithMessage = function checkKeyWithMessage(key, dataType, message) {
  invariant(typeOf(key) === dataType, message);
};

var previousDataKey = [];
var previousData = {};
var useHook = function useHook() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var store = reactRedux.useStore();

  var exeuteRequiredData = function exeuteRequiredData(_data) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return e.requiredKey && Array.isArray(e.requiredKey) && typeOf(_data) === 'object' ? Object.entries(_data).reduce(function (acc, _ref18) {
      var _ref19 = _slicedToArray(_ref18, 2),
          _DataKey = _ref19[0],
          _DataValue = _ref19[1];

      return _objectSpread({}, acc, {}, e.requiredKey.includes(_DataKey) ? _defineProperty({}, _DataKey, _DataValue) : {});
    }, {}) : _data;
  };

  var _GetData = function _GetData() {
    var _data = {};

    var _checkFilter = function _checkFilter(e) {
      return e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
    };

    var _getData = function _getData(e, isString) {
      return (typeof e.defaultDataFormat === 'boolean' || !(isString ? array : e.key) ? !e.defaultDataFormat || !(isString ? array : e.key) : false) ? (isString ? array : e.key) ? safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]").concat(e.query ? e.query : ''), e.default) : name ? safe(store, ".getState()[".concat(name, "]").concat(e.query ? e.query : ''), e.default) : safe(store, ".getState()".concat(e.query ? e.query : ''), e.default) : safe(getData(safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e), e.dataQuery), "".concat(e.query && typeOf(e.query) === 'string' ? e.query : ''), e.query ? e.default !== undefined ? e.default : undefined : undefined);
    };

    if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = (typeOf(array) === 'object' ? [array] : array).reduce(function (acc, e) {
        if (typeOf(e) === 'object') {
          if (typeOf(array) === 'object') return exeuteRequiredData(_getData(e), e);

          var _arr2 = _toConsumableArray(acc);

          _arr2.push(exeuteRequiredData(_getData(e), e));

          return _arr2;
        }

        if (typeOf(array) === 'object') return safe(store, ".getState()[".concat(name, "][").concat(e, "]"));

        var _arr = _toConsumableArray(acc);

        _arr.push(safe(store, ".getState()[".concat(name, "][").concat(e, "]")));

        return _arr;
      }, typeOf(array) === 'object' ? {} : []); // if()
    } else if (typeof array === 'string' && config && typeOf(config) === 'array') _data = config.reduce(function (acc, _config) {
      return [].concat(_toConsumableArray(acc), [exeuteRequiredData(_getData(_config, true), _config)]);
    }, []);else if (typeof array === 'string') _data = exeuteRequiredData(_getData(config, true), config);else if (name) _data = safe(store, ".getState()[".concat(name, "]"));else _data = safe(store, ".getState()") || {};

    return _data;
  };

  var _useState = React.useState(_GetData()),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = React.useState({}),
      _useState4 = _slicedToArray(_useState3, 1),
      _key = _useState4[0];

  if (name) checkKey(name, 'reducer name', 'string', 'valid string');

  var execute = function execute() {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    var _data = _GetData();

    var index = previousDataKey.indexOf(_key);

    if (!isEqual(_data, previousData[index])) {
      // previousData[`${key || name}_${_key}`] = _data;
      var callbackData;
      if (callback && typeof callback === 'function') callbackData = callback(_data);
      previousData[index] = _data;
      if (callbackData) setData(callbackData);else setData(_data);
    }
  };

  React.useEffect(function () {
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
  var _useState5 = React.useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      dispatchAction = _useState6[0],
      setDispatchAction = _useState6[1];

  var dispatch = reactRedux.useDispatch();
  React.useEffect(function () {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = redux.bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};
var useMutation = function useMutation(reducerName) {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  var store = reactRedux.useStore();
  React.useEffect(function () {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', " reducerName '".concat(reducerName, "' not a valid reducer key."));
  }, []);
  var dispatch = reactRedux.useDispatch();
  return function (_ref21) {
    var type = _ref21.key,
        value = _ref21.value,
        _ref21$filter = _ref21.filter,
        filter = _ref21$filter === void 0 ? [] : _ref21$filter;
    if (!type) checkKey(null, 'key', 'string', 'valid string');

    var _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) invariant(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    "'key' is invalid.".concat(type, " not found in ").concat(reducerName, " reducer"));
    checkKey(filter, 'filter', 'array');
    checkKey(value, 'value', 'object');
    checkKey(type, 'key', 'string');
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
    return action(_objectSpread({}, config, {
      resolve: resolve,
      reject: reject
    }));
  });
};
var CACHE = {};

function stringify(val) {
  return _typeof(val) === 'object' ? JSON.stringify(val) : String(val);
}

function hashArgs() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.reduce(function (acc, arg) {
    return "".concat(stringify(arg), ":").concat(acc);
  }, '');
}

function useStaleRefresh(fn, name) // initialLoadingstate = true,
{
  var arg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var prevArgs = React.useRef(null); // const [data, setData] = useState(null);

  var refresh = React.useCallback(function () {
    var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        loader = _ref22.loader,
        clearData = _ref22.clearData,
        config = _ref22.config;

    var args = config || arg;
    var cacheID = hashArgs(name, args); // look in cache and set response if present
    // fetch new data

    toPromise(fn, Object.assign({}, args, CACHE[cacheID] && !loader ? {
      initialCallData: CACHE[cacheID]
    } : {}, clearData ? {
      task: args.task ? _objectSpread({}, args.task, {
        clearDataOnStart: true
      }) : {
        clearDataOnStart: true
      }
    } : {})).then(function (newData) {
      if (newData && newData.status === 'SUCCESS') {
        CACHE[cacheID] = newData.data; // setData(newData);
      } // setLoading(false);

    });
  }, []);
  React.useEffect(function () {
    // args is an object so deep compare to rule out false changes
    if (isEqual(arg, prevArgs.current)) {
      return;
    }

    refresh(); // cacheID is how a cache is identified against a unique request
  }, [arg, fn, name]);
  React.useEffect(function () {
    prevArgs.current = arg;
  });
  return [refresh];
}

var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = {
  type: CHANNEL_END_TYPE
};

if (process.env.NODE_ENV !== 'production') ;

function withReduxSaga() {
  var BaseComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
        return React__default.createElement(BaseComponent, this.props);
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var props,
              isServer,
              store,
              pageProps,
              _args = arguments;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  props = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  isServer = props.ctx ? props.ctx.isServer : props.isServer;
                  store = props.ctx ? props.ctx.store : props.store;
                  pageProps = {};

                  if (!BaseComponent.getInitialProps) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 7;
                  return BaseComponent.getInitialProps(props);

                case 7:
                  pageProps = _context.sent;

                case 8:
                  if (!isServer) {
                    _context.next = 17;
                    break;
                  }

                  store.dispatch(END);

                  if (!store.sagaTask.toPromise) {
                    _context.next = 15;
                    break;
                  }

                  _context.next = 13;
                  return store.sagaTask.toPromise();

                case 13:
                  _context.next = 17;
                  break;

                case 15:
                  _context.next = 17;
                  return store.sagaTask.done;

                case 17:
                  return _context.abrupt("return", pageProps);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function getInitialProps() {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WrappedComponent;
  }(React.Component);

  _defineProperty(WrappedComponent, "displayName", "withReduxSaga(".concat(BaseComponent.displayName || BaseComponent.name || 'BaseComponent', ")"));

  return WrappedComponent;
}

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

exports.CustomError = CustomError;
exports.FormValidator = validateForm;
exports.IndianStates = indianStates;
exports.Safe = nullcheck;
exports.cloneObject = cloneObject;
exports.commonConstants = commonConstants;
exports.deleteIn = deleteIn;
exports.generateTimeStamp = generateTimeStamp;
exports.getData = getData;
exports.getIn = getIn;
exports.newObject = newObject;
exports.objectEquals = objectEquals;
exports.setIn = setIn;
exports.toCapitalize = toCapitalize;
exports.toPromise = toPromise;
exports.typeOf = typeOf;
exports.updateIn = updateIn;
exports.useActions = useActionsHook;
exports.useMutation = useMutation;
exports.useQuery = useHook;
exports.useStaleRefresh = useStaleRefresh;
exports.withReduxSaga = withReduxSaga;
