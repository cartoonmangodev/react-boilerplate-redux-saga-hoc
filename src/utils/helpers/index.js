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
