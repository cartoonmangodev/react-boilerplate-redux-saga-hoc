import { BASE_URL } from '../../config/apiEndPoints';
import axios from '../../../config/axios';

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

export var uploadImage = function uploadImage(file) {
  return new Promise(_async(function (resolve, reject) {
    var imageData = new FormData();
    imageData.append('file', file);
    var requestUrl = BASE_URL + "uploads/image";
    return _await(axios.post(requestUrl, imageData).catch(function (err) {
      reject(err.response);
    }), function (data) {
      if (data && data.data) resolve(data.data);else resolve({});
    });
  }));
};