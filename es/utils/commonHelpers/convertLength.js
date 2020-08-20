"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertLength = void 0;

var convertLength = (value, convertTo) => value ? (convertTo === 'inch' ? +value / 2.54 : +value * 2.54).toFixed(2) : '';

exports.convertLength = convertLength;