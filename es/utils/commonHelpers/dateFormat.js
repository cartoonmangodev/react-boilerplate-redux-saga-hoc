"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.getDate = void 0;

function formatDate(date) {
  var showDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var shortMonth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var newDate = new Date(date);
  var day = newDate.getDate();
  var monthIndex = newDate.getMonth();
  var year = newDate.getFullYear();
  var monthToDisplay = shortMonth ? months[monthIndex] : months[monthIndex] && months[monthIndex].substring(0, 3);
  var dayToDisplay = showDate ? day : '';
  return date ? "".concat(dayToDisplay, " ").concat(monthToDisplay, " ").concat(year) : date;
}

var getDate = function getDate(date) {
  var day = new Date(date);
  var dd = day.getDate();
  var mm = day.getMonth() + 1;
  var yyyy = day.getFullYear();

  if (dd < 10) {
    dd = "0".concat(dd);
  }

  if (mm < 10) {
    mm = "0".concat(mm);
  }

  return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
};

exports.getDate = getDate;