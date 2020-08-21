/* eslint-disable indent */
import { cloneObject } from './cloneObject';

function setIn(obj, arr, value) {
  var i = 0;
  var o = obj;

  function update() {
    var _cloneObject;

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

    return cloneObject(o, (_cloneObject = {}, _cloneObject[arr[i]] = arr.length - 1 === i ? value : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }(), _cloneObject));
  }

  return update();
}

export { setIn };