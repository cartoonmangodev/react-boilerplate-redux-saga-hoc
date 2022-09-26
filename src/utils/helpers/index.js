import {
  TYPE_NULL,
  TYPE_UNDEFINED,
  TYPE_STRING,
  TYPE_ARRAY,
  TYPE_BOOLEAN,
  TYPE_OBJECT,
  TYPE_FUNCTION,
  TYPE_ERROR,
  TYPE_SYMBOL,
  TYPE_GENERATOR_FUNCTION,
} from '../commonReduxSagaConverter/commonConstants';

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
  '[object Null]': TYPE_NULL,
  '[object Undefined]': TYPE_UNDEFINED,
  '[object String]': TYPE_STRING,
  '[object Array]': TYPE_ARRAY,
  '[object Boolean]': TYPE_BOOLEAN,
  '[object Object]': TYPE_OBJECT,
  '[object Function]': TYPE_FUNCTION,
  '[object Error]': TYPE_ERROR,
  '[object Symbol]': TYPE_SYMBOL,
  '[object GeneratorFunction]': TYPE_GENERATOR_FUNCTION,
};

export const typeOf = _obj =>
  typeof _obj === 'undefined'
    ? typeof _obj
    : type[Object.prototype.toString.call(_obj)] || typeof _obj;
