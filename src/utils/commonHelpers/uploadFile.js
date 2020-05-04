import { BASE_URL } from '../../config/apiEndPoints';
import axios from '../../../config/axios';

export const uploadImage = file =>
  new Promise(async (resolve, reject) => {
    const imageData = new FormData();
    imageData.append('file', file);
    const requestUrl = `${BASE_URL}uploads/image`;
    const data = await axios.post(requestUrl, imageData).catch(err => {
      reject(err.response);
    });
    if (data && data.data) resolve(data.data);
    else resolve({});
  });

// export const uploadImage = () => {};
