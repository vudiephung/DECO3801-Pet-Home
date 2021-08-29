import Axios from 'axios';

import { User } from '../models/user';
import { DataResponse } from '../models/DataResponse';

const instance = Axios.create({ baseURL: 'http://localhost:5000' });

// export const signin = async (credential: Required<Pick<User, 'email' | 'password'>>) => {
//   let response = await instance.post<DataResponse<User>>('/signin', credential);
//   console.log(response.data);
//   return response.data;
// };

export const signin = async (credential: Required<Pick<User, 'email' | 'password'>>) =>
  (await instance.post<DataResponse<User>>('/signin', credential)).data;

export const signup = async (input: Required<Pick<User, 'email' | 'password'>>) =>
  (await instance.post('/signup', input)).data;
