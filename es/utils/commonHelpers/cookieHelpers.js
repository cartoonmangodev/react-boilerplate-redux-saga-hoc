"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = exports.deleteCookie = exports.setCookie = void 0;

/* eslint-disable no-plusplus */
var setCookie = (name, value) => {
  document.cookie = "".concat(name, "=").concat(value, "; Path=/;");
};

exports.setCookie = setCookie;

var deleteCookie = name => {
  document.cookie = "".concat(name, "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;");
};

exports.deleteCookie = deleteCookie;

var getCookie = cname => {
  var name = "".concat(cname, "=");
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

exports.getCookie = getCookie;