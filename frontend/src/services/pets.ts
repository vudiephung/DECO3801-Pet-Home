import instance from './config';
import { Pet } from '../models/pet';

export const getPets = async () => (await instance.post<Pet>('/pets')).data;

export const getOwnedPets = async () => (await instance.post<Pet>('/pets')).data;
