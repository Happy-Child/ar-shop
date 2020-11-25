import axios from 'axios';
import { cookies } from './cookies';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
  transformRequest: [
    function (data, headers) {
      const token = cookies.get('token');

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      console.log('token ', token);
      console.log('headers ', headers);
      console.log('data ', data);

      let formData = new FormData();
      if (data) {
        Object.keys(data).forEach((attr) => {
          formData.append(attr, data[attr]);
        });
      }
      console.log('formData ', formData);

      return formData;
    },
  ],
});

export default axiosInstance;
