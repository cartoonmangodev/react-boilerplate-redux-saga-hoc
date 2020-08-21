"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var _apiEndPoints = require("../../config/apiEndPoints");

var _axios = _interopRequireDefault(require("../../../config/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadImage = function uploadImage(file) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var imageData, requestUrl, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              imageData = new FormData();
              imageData.append('file', file);
              requestUrl = "".concat(_apiEndPoints.BASE_URL, "uploads/image");
              _context.next = 5;
              return _axios.default.post(requestUrl, imageData).catch(function (err) {
                reject(err.response);
              });

            case 5:
              data = _context.sent;
              if (data && data.data) resolve(data.data);else resolve({});

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}; // export const uploadImage = () => {};


exports.uploadImage = uploadImage;