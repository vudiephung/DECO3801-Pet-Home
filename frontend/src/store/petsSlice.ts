import { createSlice } from '@reduxjs/toolkit';

const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
  },
  reducers: {},
});

export default petsSlice;
