"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateForm;

var validate = _interopRequireWildcard(require("./Validator"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import findKey from 'lodash/isEmpty';

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
        isEmpty = validate._isEmpty(value);
      }

      var typeMatch = {};

      if (!isEmpty) {
        // Add more cases depending upon the types that need to be checked
        // eslint-disable-next-line default-case
        switch (type) {
          case 'email':
            typeMatch.hasPassed = validate._isValidEmail(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Email eg. (abc@abc.com)';
            }

            break;

          case 'mobile':
            typeMatch.hasPassed = validate._isValidMobile(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Mobile Number';
            }

            break;

          case 'password':
            typeMatch.hasPassed = validate._isValidPassword(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Passwords must contain at least 6 characters to 20 characters';
            }

            break;

          case 'confirmPassword':
            {
              // eslint-disable-line no-case-declarations
              // const password  = findKey(validationData, { type: 'password' });
              var password = validationData[key].compareValue;
              typeMatch.hasPassed = validate._isMatching(password, value);

              if (!typeMatch.hasPassed) {
                error["".concat(key)] = message || 'Password & Confirm password do not match';
              }

              break;
            }

          case 'string':
            typeMatch.hasPassed = validate._isValidString(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'name':
            typeMatch.hasPassed = validate._isValidName(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            if (validationData[value] && value.length < 3) {
              error["".concat(key)] = message || 'Name Must Be Greater Than 2 Characters';
            }

            break;

          case 'number':
            typeMatch.hasPassed = validate._isValidNumber(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'float':
            typeMatch.hasPassed = validate._isValidFloatNumber(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'postiveIntegerReg':
            typeMatch.hasPassed = validate._isPostiveInteger(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Enter a valid input';
            }

            break;

          case 'array':
            typeMatch.hasPassed = validate._isValidArray(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please upload Images';
            }

            break;

          case 'textarea':
            typeMatch.hasPassed = validate._isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;

          case 'dateString':
            typeMatch.hasPassed = validate._isValidTextAreaInput(value);

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