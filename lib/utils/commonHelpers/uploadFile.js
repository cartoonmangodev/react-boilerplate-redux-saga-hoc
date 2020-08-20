"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var _apiEndPoints = require("../../config/apiEndPoints");

var _axios = _interopRequireDefault(require("../../../config/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
} // export const uploadImage = () => {};


function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

var uploadImage = file => new Promise(_async(function (resolve, reject) {
  var imageData = new FormData();
  imageData.append('file', file);
  var requestUrl = "".concat(_apiEndPoints.BASE_URL, "uploads/image");
  return _await(_axios.default.post(requestUrl, imageData).catch(err => {
    reject(err.response);
  }), function (data) {
    if (data && data.data) resolve(data.data);else resolve({});
  });
}));

exports.uploadImage = uploadImage;