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
const CONSTRUCTOR_CHECK = {
  string: String,
  number: Number,
  boolean: Boolean,
};

let errorConsole = (parentObj, error, path, func = [], notFound) => {
  if (!func)
    console.log(
      `%c${
        notFound ? '%c key' : `${parentObj} %c is undefined`
      }%c "${error}" %cnot found ${
        notFound ? `in %c"${parentObj}"%c object` : '%c%c'
      } %c ${path} %c is invalid`,
      'background: #000; color: red; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',
      'background: #000; color: red; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',
      'background: #000; color: green; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',

      'background: #000; color: red; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',
    );
  else
    console.log(
      `%c${parentObj} %c is found %c "${error}" %c not a function %c ${path} %c is invalid`,
      'background: #000; color: red; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',
      'background: #000; color: red; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',
      'background: #000; color: red; font-size: 12px',
      'background: #000; color: orange; font-size: 12px',
    );
};
const errorLog = () => {
  let e = new Error();
  let stack = e.stack.toString().split(/\r\n|\n/);
  console.log('Error :');
  stack.splice(0, 1);
  stack.map((err, index) =>
    console.log(`[${stack[stack.length - 1 - index]} ]`),
  );
  // console.log(`[ Error ${stack[stack.length - 1]} ]`);
};

/**
 * Required parameter for nullcheck
 *  @param object parent object {},[] !9
 *  @param path  path to be execute eg: a.b.c.e()[0]().f !(Required)
 *  @param default  default value to be print if it is null or error (optional)
 *  @param func  function parameters [ [1],[2]] (optional)
 *  @param errorDisplay  whether to show error in console - default false (optional)
 */

const nullCheck = (
  Error,
  obj = {},
  path,
  def,
  callBack,
  func = [],
  errorDisplay = false,
) => {
  const returnDefaultData = def !== undefined ? def : undefined;
  if (typeof path !== 'string') {
    if (errorDisplay) {
      console.log(
        `%c[Object] path is invalid it should be string`,
        'background: #000; color: orange; font-size: 12px',
      );
      errorLog(new Error());
    }
    return typeof callBack === 'function'
      ? callBack(returnDefaultData)
      : returnDefaultData;
  }
  let propNames = path.split(/\.|\[|\(/);
  propNames = propNames.map(prop =>
    prop.replace(/\]|\(/g, '').replace(/\)/, '()'),
  );
  const parent = propNames.splice(0, 1);
  if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
    if (errorDisplay) errorLog(new Error());
    return typeof callBack === 'function'
      ? callBack(returnDefaultData)
      : returnDefaultData;
  }
  let data = obj;
  let error = parent;
  let index = 0;
  let parentObj = error;
  // eslint-disable-next-line no-undef-init
  let type = undefined;
  for (let key = 0; key < propNames.length; key++) {
    if (
      data[propNames[key]] ||
      typeof data === 'boolean' ||
      Object.prototype.hasOwnProperty.call(data, propNames[key])
    ) {
      if (Number(propNames[key]) || Number(propNames[key]) === 0)
        error = `${error}[${propNames[key]}]`;
      else error = `${error}.${propNames[key]}`;
      data = data[propNames[key]];
      if (!data && typeof data !== 'boolean' && key === propNames.length - 1)
        return typeof callBack === 'function'
          ? callBack(def !== undefined ? def : data)
          : def !== undefined
          ? def
          : data;
      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }
        return typeof callBack === 'function'
          ? callBack(def !== undefined ? def : data)
          : def !== undefined
          ? def
          : data;
      }
      if (
        (data || typeof data === 'boolean') &&
        propNames[key + 1] &&
        typeof data[propNames[key + 1]] === 'function'
      ) {
        type = data;
      }
      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }
          return typeof callBack === 'function'
            ? callBack(returnDefaultData)
            : returnDefaultData;
        }
        if (
          typeof data !== 'object' &&
          propNames[key + 1] !== '()' &&
          !data[propNames[key + 1]] &&
          typeof data !== 'boolean'
        ) {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, false);
          }
          return typeof callBack === 'function'
            ? callBack(returnDefaultData)
            : returnDefaultData;
        }
      }
    } else if (propNames[key] === '()') {
      error = `${error}${propNames[key]}`;
      if (typeof data === 'function') {
        if (CONSTRUCTOR_CHECK[typeof type]) {
          if (func && func[index])
            data = CONSTRUCTOR_CHECK[typeof type].prototype[
              propNames[key - 1]
            ].apply(type, func[index]);
          else
            data = CONSTRUCTOR_CHECK[typeof type].prototype[
              propNames[key - 1]
            ].call(type);
        } else {
          if (func && func[index]) data = data.apply(null, [...func[index]]);
          else data = data();
        }
        if (!data && typeof data !== 'boolean' && key === propNames.length - 1)
          return typeof callBack === 'function'
            ? callBack(def !== undefined ? def : data)
            : def !== undefined
            ? def
            : data;
        if (!data && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path);
          }
          return typeof callBack === 'function'
            ? callBack(def !== undefined ? def : data)
            : def !== undefined
            ? def
            : data;
        }
      } else {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path, true);
        }
        return typeof callBack === 'function'
          ? callBack(returnDefaultData)
          : returnDefaultData;
      }
      if (!data && typeof data !== 'boolean' && key === propNames.length - 1)
        return typeof callBack === 'function'
          ? callBack(def !== undefined ? def : data)
          : def !== undefined
          ? def
          : data;
      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }
        return typeof callBack === 'function'
          ? callBack(def !== undefined ? def : data)
          : def !== undefined
          ? def
          : data;
      }
      if (
        (data || typeof data === 'boolean') &&
        propNames[key + 1] &&
        typeof data[propNames[key + 1]] === 'function'
      ) {
        type = data;
      }
      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }
          return typeof callBack === 'function'
            ? callBack(returnDefaultData)
            : returnDefaultData;
        }
        if (
          typeof data !== 'object' &&
          propNames[key + 1] !== '()' &&
          !data[propNames[key + 1]] &&
          typeof data !== 'boolean'
        ) {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }
          return typeof callBack === 'function'
            ? callBack(returnDefaultData)
            : returnDefaultData;
        }
      }
      index += 1;
    } else {
      if (Number(propNames[key]) || Number(propNames[key]) === 0)
        error = `${error}[${propNames[key]}]`;
      else error = `${error}.${propNames[key]}`;
      if (errorDisplay) {
        errorLog(new Error());
        errorConsole(error, propNames[key], path, false, true);
      }
      return typeof callBack === 'function'
        ? callBack(returnDefaultData)
        : returnDefaultData;
    }
    parentObj = error;
  }

  const verifyData =
    (data || typeof data === 'boolean') &&
    Object.prototype.toString.call(def) !== '[object Null]' &&
    typeof def !== 'undefined' &&
    Object.prototype.toString.call(data) === Object.prototype.toString.call(def)
      ? data
      : typeof def !== 'undefined' &&
        Object.prototype.toString.call(def) !== '[object Null]'
      ? def
      : data;
  return typeof callBack === 'function' ? callBack(verifyData) : verifyData;
};
export default nullCheck.bind(null, Error);
