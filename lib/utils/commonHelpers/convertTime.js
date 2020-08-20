"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeCovert = void 0;

var timeCovert = t => {
  switch (t) {
    case '09:00-10:00':
      return '09:00 AM to 10:00 AM';

    case '10:00-11:00':
      return '10:00 AM to 11:00 AM';

    case '11:00-12:00':
      return '11:00 AM to 12:00 PM';

    case '12:00-13:00':
      return '12:00 PM to 01:00 PM';

    case '13:00-14:00':
      return '01:00 PM to 02:00 PM';

    case '14:00-15:00':
      return '02:00 PM to 03:00 PM';

    case '15:00-16:00':
      return '03:00 PM to 04:00 PM';

    case '16:00-17:00':
      return '04:00 PM to 05:00 PM';

    case '17:00-18:00':
      return '05:00 PM to 06:00 PM';

    default:
  }

  return null;
};

exports.timeCovert = timeCovert;