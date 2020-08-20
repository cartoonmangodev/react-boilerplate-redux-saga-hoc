/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
import axios from 'axios';
import promise from 'promise'; // import { BASE_URL, authentication } from '../shared/config/apiEndPoints';
// import { SPECIFIC_ERROR_HANDLER } from './errorHandler';

var request = axios;
request.defaults.withCredentials = true; // request.defaults.headers.common.origin = 'www.example.com'; // for cookie based auth

request.interceptors.request.use(function (config) {
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
function (error) {
  return promise.reject(error);
}); // eslint-disable-next-line arrow-body-style

request.interceptors.response.use( // eslint-disable-next-line arrow-body-style
function (response) {
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
}, function (error) {
  return Promise.reject(error);
});
export default request;