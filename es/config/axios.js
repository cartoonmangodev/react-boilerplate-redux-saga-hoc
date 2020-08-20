"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _promise = _interopRequireDefault(require("promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
// import { BASE_URL, authentication } from '../shared/config/apiEndPoints';
// import { SPECIFIC_ERROR_HANDLER } from './errorHandler';
var request = _axios.default;
request.defaults.withCredentials = true; // request.defaults.headers.common.origin = 'www.example.com'; // for cookie based auth

request.interceptors.request.use(config => {
  // if (!config.baseURL) {
  //   request.defaults.baseURL = BASE_URL;
  //   config.baseURL = BASE_URL; // eslint-disable-line no-param-reassign
  // }
  if (!config.headers.Authorization) {// setting token if it not present
    // const token = localStorage.getItem('token');
    // if (token)
    //   request.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
}, // SPECIFIC_ERROR_HANDLER([], error);
error => _promise.default.reject(error)); // eslint-disable-next-line arrow-body-style

request.interceptors.response.use( // eslint-disable-next-line arrow-body-style
response => {
  // if (response.config.url === BASE_URL + authentication.VERIFY_OTP_API.url) {
  //   // CookieManager.get(response.config.url).then(async res => {
  //   // `res` will be true or false depending on success.
  //   request.defaults.headers.common.Authorization = `bearer ${
  //     response.data.data.token
  //   }`;
  //   try {
  //     window.localStorage.setItem('token', response.data.data.token);
  //   } catch (error) {
  //     // console.log('error while setting token in storage', error);
  //   }
  //   // });
  // }
  return response;
}, error => Promise.reject(error));
var _default = request;
exports.default = _default;