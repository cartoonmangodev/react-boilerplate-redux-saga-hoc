export { cloneObject, newObject } from './cloneObject';
export { deleteIn } from './deleteIn';
export { getIn } from './getIn';
export { objectEquals } from './objectEquals';
export { setIn } from './setIn';
export { updateIn } from './updateIn';

export const generateTimeStamp = () => new Date().getTime();

export const toCapitalize = string =>
  string && typeof string === 'string'
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : null;

const type = {
  '[object Null]': 'null',
  '[object Undefined]': 'undefined',
  '[object String]': 'string',
  '[object Array]': 'array',
  '[object Boolean]': 'boolean',
  '[object Object]': 'object',
  '[object Function]': 'function',
  '[object Symbol]': 'symbol',
  '[object GeneratorFunction]': 'function',
};

export const typeOf = _obj => type[Object.prototype.toString.call(_obj)];
