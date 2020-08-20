"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = exports.deleteCookie = exports.setCookie = void 0;

/* eslint-disable no-plusplus */
const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; Path=/;`;
};

exports.setCookie = setCookie;

const deleteCookie = name => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

exports.deleteCookie = deleteCookie;

const getCookie = cname => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

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