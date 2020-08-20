"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteIn = deleteIn;

var _cloneObject = require("./cloneObject");

/* eslint-disable indent */
function deleteIn(obj, arr) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return (() => {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map((data, ind) => {
          if (+arr[i] === ind) {
            if (arr.length - 1 === i) {
              if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
              return Array.isArray(o) ? null : o;
            }

            return (() => {
              o = data;
              i += 1;
              return update();
            })();
          }

          return data;
        }).filter(e => e) : (() => {
          if (arr.length - 1 === i) {
            if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
            return o;
          }

          return o;
        })();
        return a;
      })();
    }

    return (() => {
      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }

      return (0, _cloneObject.cloneObject)(o, {
        [arr[i]]: (() => {
          o = o[arr[i]];
          i += 1;
          return update();
        })()
      });
    })();
  }

  return update();
}