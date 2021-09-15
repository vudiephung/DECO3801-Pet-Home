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

  const res = await instance.post('/shelter-add-pet', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deletePet = async (petId: Pet['_id']) => {
  return (await instance.delete(`/shelter-delete-pet/${petId}`)).data;
};

export const addFavoritePet = async (petId: Pet['_id']) => {
  return (await instance.post(`/user-add-favorite/${petId}`)).data;
};

export const deleteFavoritePet = async (petId: Pet['_id']) => {
  return (await instance.post(`/user-delete-favorite/${petId}`)).data;
};

export const userGetAllPets = async () => (await instance.get('/all-pets')).data;

export const userGetFavPets = async () => (await instance.get('/user-favorite-pets')).data;

export const shelterGetOwnedPets = async () => (await instance.get('/shelter-owned-pets')).data;

export const getFilterPets = async (petType: Pet['type']) =>
  (await instance.get(`/filtered-pets/${petType}`)).data;
