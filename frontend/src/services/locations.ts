/* eslint-disable import/prefer-default-export */
import instance from './config';
import { Location } from '../models/location';

export const addPetLocation = async (
  latitude: Required<Pick<Location, 'latitude'>>,
  longitude: Required<Pick<Location, 'longitude'>>,
  images: { uri: string; name: string }[],
) => {
  const formData = new FormData();
  formData.append('longitude', longitude);
  formData.append('latitude', latitude);
  images.forEach((item) => {
    formData.append('image', { uri: item.uri, type: 'image/jpeg', name: item.name });
  });

  const res = await instance.post('/add-location', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getCities = async () => (await instance.get('/all-cities')).data;

export const getZones = async (filter) =>
  (await instance.get('/filter-zone', { params: { state: filter.state, city: filter.city } })).data;
