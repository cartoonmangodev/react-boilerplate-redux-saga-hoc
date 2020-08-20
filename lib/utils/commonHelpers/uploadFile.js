"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var _apiEndPoints = require("../../config/apiEndPoints");

var _axios = _interopRequireDefault(require("../../../config/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadImage = file => new Promise(async (resolve, reject) => {
  const imageData = new FormData();
  imageData.append('file', file);
  const requestUrl = `${_apiEndPoints.BASE_URL}uploads/image`;
  const data = await _axios.default.post(requestUrl, imageData).catch(err => {
    reject(err.response);
  });
  if (data && data.data) resolve(data.data);else resolve({});
}); // export const uploadImage = () => {};


exports.uploadImage = uploadImage;