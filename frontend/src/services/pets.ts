import AsyncStorage from '@react-native-async-storage/async-storage';

import instance from './config';
import { Pet } from '../models/pet';

export const addPet = async (
  pet: Required<Pick<Pet, 'name' | 'type' | 'breed' | 'age' | 'description'>>,
  images: { uri: string; name: string }[],
) => {
  const formData = new FormData();
  formData.append('name', pet.name);
  formData.append('type', pet.type);
  formData.append('breed', pet.breed);
  formData.append('age', pet.age.toString());
  pet.description.forEach((item) => {
    formData.append('description', item);
  });
  images.forEach((item) => {
    formData.append('image', { uri: item.uri, type: 'image/jpeg', name: item.name });
  });

  const token = await AsyncStorage.getItem('token');
  formData.append('token', token);

  const res = await instance.post('/shelter-add-pet', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deletePet = async (petId: Pet['petId']) => {
  const token = await AsyncStorage.getItem('token');
  return (await instance.delete(`/shelter-delete-pet/${petId}`, { data: { token } })).data;
};

export const addFavoritePet = async (petId: Pet['petId']) => {
  const token = await AsyncStorage.getItem('token');
  return (await instance.post(`/user-add-favorite/${petId}`, { token })).data;
};

export const deleteFavoritePet = async (petId: Pet['petId']) => {
  const token = await AsyncStorage.getItem('token');
  return (await instance.post(`/user-delete-favorite/${petId}`, { token })).data;
};
