"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateIn = updateIn;

var _cloneObject = require("./cloneObject");

/* eslint-disable indent */
function updateIn(obj, arr = [], callback) {
  let i = 0;
  let o = obj;

  function update() {
    if (Array.isArray(o)) {
      return o.slice().map((data, ind) => {
        if (+arr[i] === ind) {
          return arr.length - 1 === i ? callback(data) : (() => {
            o = data;
            i += 1;
            return update();
          })();
        }

        return data;
      });
    }

    return (0, _cloneObject.cloneObject)(o, {
      [arr && arr[i]]: arr.length - 1 === i ? callback(o[arr[i]]) : (() => {
        o = o[arr[i]] || {};
        i += 1;
        return update();
      })()
    });
  }

  return arr.length > 0 ? update() : obj;
}