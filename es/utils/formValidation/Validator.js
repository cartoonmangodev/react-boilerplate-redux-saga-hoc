"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._isEmpty = _isEmpty;
exports._isValidPassword = _isValidPassword;
exports._isValidEmail = _isValidEmail;
exports._isValidMobile = _isValidMobile;
exports._isValidNumber = _isValidNumber;
exports._isValidFloatNumber = _isValidFloatNumber;
exports._isPostiveInteger = _isPostiveInteger;
exports._isMatching = _isMatching;
exports._isValidName = _isValidName;
exports._isValidString = _isValidString;
exports._isValidTextAreaInput = _isValidTextAreaInput;
exports._isValidArray = _isValidArray;

var _ValidationRegex = require("./ValidationRegex");

/* eslint-disable */
// Keep below functions pure, that is, output should be a predictable state (truthy or false). Invocations of the below functions should be in `ValidationHandler`
function _isEmpty(value) {
  if (value && typeof value === 'string' && value.trim()) return false;
  if (typeof value === 'number' && (value || value === 0)) return false;
  return true;
}

function _isValidPassword(value) {
  return _ValidationRegex.passwordReg.test(value.trim());
}

function _isValidEmail(value) {
  return _ValidationRegex.emailReg.test(value.trim());
}

function _isValidMobile(value) {
  return _ValidationRegex.mobileReg.test(value.trim());
}

function _isValidNumber(value) {
  return _ValidationRegex.numberReg.test(value);
}

function _isValidFloatNumber(value) {
  return _ValidationRegex.decimalReg.test(value);
}

function _isPostiveInteger(value) {
  return _ValidationRegex.postiveIntegerReg.test(value);
}

function _isMatching(val1, val2) {
  // return type should be boolean
  if (val1 && val2 && typeof val1 === 'string' && typeof val2 === 'string' && val1.trim() == val2.trim()) return true;
  return false;
}

function _isValidName(value) {
  return _ValidationRegex.nameReg.test(value.trim());
}

function _isValidString(value) {
  return _ValidationRegex.stringReg.test(value.trim());
}

function _isValidTextAreaInput(value) {
  return value.length > 4 ? false : true;
}

function _isValidArray(value) {
  return value.length > 0 ? false : true;
}