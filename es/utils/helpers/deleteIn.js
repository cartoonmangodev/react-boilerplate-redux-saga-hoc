/* eslint-disable indent */
import { cloneObject } from './cloneObject';

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
      var _cloneObject;

      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }

      return cloneObject(o, (_cloneObject = {}, _cloneObject[arr[i]] = function () {
        o = o[arr[i]];
        i += 1;
        return update();
      }(), _cloneObject));
    }();
  }

  return update();
}

export { deleteIn };