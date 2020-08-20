/* eslint-disable indent */
import { cloneObject } from './cloneObject';

function updateIn(obj, arr, callback) {
  if (arr === void 0) {
    arr = [];
  }

  var i = 0;
  var o = obj;

  function update() {
    var _cloneObject;

    if (Array.isArray(o)) {
      return o.slice().map(function (data, ind) {
        if (+arr[i] === ind) {
          return arr.length - 1 === i ? callback(data) : function () {
            o = data;
            i += 1;
            return update();
          }();
        }

        return data;
      });
    }

    return cloneObject(o, (_cloneObject = {}, _cloneObject[arr && arr[i]] = arr.length - 1 === i ? callback(o[arr[i]]) : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }(), _cloneObject));
  }

  return arr.length > 0 ? update() : obj;
}

export { updateIn };