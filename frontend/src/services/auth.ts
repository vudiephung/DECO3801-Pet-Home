import instance from './config';
import { User } from '../models/user';

export const signin = async (credential: Required<Pick<User, 'email' | 'password'>>) =>
  (await instance.post<User>('/signin', credential)).data;

export const signup = async (input: Required<Pick<User, 'email' | 'password' | 'username'>>) =>
  (await instance.post('/signup', input)).data;
