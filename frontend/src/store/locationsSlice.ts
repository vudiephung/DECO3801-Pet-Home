import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { LocationService } from '../services';
import { LOCATIONS_FEATURE_KEY } from './keywords';

interface LocationsState {
  loading: boolean;
  state: string;
  city: string;
}

export const createInitialState = (): LocationsState => ({
  loading: false,
  state: '',
  city: '',
});

export const doAddLocation = createAsyncThunk(
  '/addPetLocation',
  async (
    location: {
      latitude: Parameters<typeof LocationService['addPetLocation']>[0];
      longitude: Parameters<typeof LocationService['addPetLocation']>[1];
      images: Parameters<typeof LocationService['addPetLocation']>[2];
    },
    { rejectWithValue },
  ) => {
    try {
      const successMessage = await LocationService.addPetLocation(
        location.latitude,
        location.longitude,
        location.images,
      );
      return successMessage;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const locationSlice = createSlice({
  name: 'locations',
  initialState: createInitialState(),
  reducers: {
    doFilter(state, action) {
      state.state = action.payload.state;
      state.city = action.payload.city;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doAddLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doAddLocation.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

const selectLocationFeature = (state: any) => state[LOCATIONS_FEATURE_KEY];

export const selectFilter = createSelector(selectLocationFeature, (locationState) => {
  return {
    state: locationState.state,
    city: locationState.city,
  };
});

export const { doFilter } = locationSlice.actions;

export default locationSlice.reducer;
