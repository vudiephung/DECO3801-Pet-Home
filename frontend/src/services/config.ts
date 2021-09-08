import Axios from 'axios';

const instance = Axios.create({ baseURL: 'http://10.0.2.2:5000/' });
// const instance = Axios.create({ baseURL: 'http://localhost:5000/' });

export const setAuthToken = (token: any) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

export default instance;
