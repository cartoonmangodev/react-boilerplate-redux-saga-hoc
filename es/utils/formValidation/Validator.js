/* eslint-disable */
import { passwordReg, emailReg, mobileReg, nameReg, stringReg, numberReg, postiveIntegerReg, decimalReg } from './ValidationRegex'; // Keep below functions pure, that is, output should be a predictable state (truthy or false). Invocations of the below functions should be in `ValidationHandler`

export function _isEmpty(value) {
  if (value && typeof value === 'string' && value.trim()) return false;
  if (typeof value === 'number' && (value || value === 0)) return false;
  return true;
}
export function _isValidPassword(value) {
  return passwordReg.test(value.trim());
}
export function _isValidEmail(value) {
  return emailReg.test(value.trim());
}
export function _isValidMobile(value) {
  return mobileReg.test(value.trim());
}
export function _isValidNumber(value) {
  return numberReg.test(value);
}
export function _isValidFloatNumber(value) {
  return decimalReg.test(value);
}
export function _isPostiveInteger(value) {
  return postiveIntegerReg.test(value);
}
export function _isMatching(val1, val2) {
  // return type should be boolean
  if (val1 && val2 && typeof val1 === 'string' && typeof val2 === 'string' && val1.trim() == val2.trim()) return true;
  return false;
}
export function _isValidName(value) {
  return nameReg.test(value.trim());
}
export function _isValidString(value) {
  return stringReg.test(value.trim());
}
export function _isValidTextAreaInput(value) {
  return value.length > 4 ? false : true;
}
export function _isValidArray(value) {
  return value.length > 0 ? false : true;
}