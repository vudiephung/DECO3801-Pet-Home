import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { Location } from '../models/location';
import { LocationService } from '../services';

const LocationsAdaptor = createEntityAdapter<Location>({
  selectId: (location) => location._id,
});

interface LocationsState extends EntityState<Location> {
  loading: boolean;
  selectedId: Location['_id'] | null;
}

export const createInitialState = (): LocationsState =>
  LocationsAdaptor.getInitialState({
    loading: false,
    selectedId: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doAddLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doAddLocation.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default locationSlice.reducer;
