import Axios from 'axios';

import { User } from '../models/user';
import { DataResponse } from '../models/DataResponse';

export const signin = async (credential: Required<Pick<User, 'email' | 'password'>>) =>
  (await Axios.post<DataResponse<User>>('/signin', credential)).data.data;

export const signup = async (input: Required<Pick<User, 'email' | 'password'>>) =>
  await (
    await Axios.post('/signup', input)
  ).data.data;
