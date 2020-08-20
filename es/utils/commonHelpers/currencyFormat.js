"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatOrdinalSuffix = exports.formatPriceWithUnit = exports.formatPriceWithComma = void 0;

var formatPriceWithComma = price => {
  var formattedPrice;

  if (price) {
    formattedPrice = new Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 3
    }).format(price);
    return "INR ".concat(formattedPrice);
  }

  return 'INR 0';
};

exports.formatPriceWithComma = formatPriceWithComma;

var formatPriceWithUnit = value => {
  var val = Math.abs(value);

  if (val >= 10000000) {
    val = "".concat(val / 10000000);
    return val <= 1 ? "".concat(val, " Crore") : "".concat(val, " Crores");
  }

  if (val >= 100000) {
    val = "".concat(val / 100000);
    return val <= 1 ? "".concat(val, " Lakh") : "".concat(val, " Lakhs");
  }

  return val;
};

exports.formatPriceWithUnit = formatPriceWithUnit;

var formatOrdinalSuffix = value => {
  if (value > 3 && value < 21) return "".concat(value, "th"); // thanks kennebec

  switch (value % 10) {
    case 1:
      return "".concat(value, "st");

    case 2:
      return "".concat(value, "nd");

    case 3:
      return "".concat(value, "rd");

    default:
      return "".concat(value, "th");
  }
};

exports.formatOrdinalSuffix = formatOrdinalSuffix;