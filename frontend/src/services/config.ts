import Axios from 'axios';

export const baseURL = 'http://10.0.2.2:5000';
// export const baseURL = "https://resilience.uqcloud.net" // Request to and Response from UQ cloud zone
// export const baseURL = 'http://localhost:5000';

const instance = Axios.create({ baseURL });

export const setAuthToken = (token: any) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

export default instance;
