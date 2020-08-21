export { cloneObject, newObject } from './cloneObject';
export { deleteIn } from './deleteIn';
export { getIn } from './getIn';
export { objectEquals } from './objectEquals';
export { setIn } from './setIn';
export { updateIn } from './updateIn';
export var generateTimeStamp = function generateTimeStamp() {
  return new Date().getTime();
};
export var toCapitalize = function toCapitalize(string) {
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
export var typeOf = function typeOf(_obj) {
  return type[Object.prototype.toString.call(_obj)];
};