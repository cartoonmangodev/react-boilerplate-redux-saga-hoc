"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIn = setIn;

var _cloneObject2 = require("./cloneObject");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setIn(obj, arr, value) {
  var i = 0;
  var o = obj;

  function update() {
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

    return (0, _cloneObject2.cloneObject)(o, _defineProperty({}, arr[i], arr.length - 1 === i ? value : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return update();
}