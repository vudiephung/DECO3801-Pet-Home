import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';

import { Pet } from '../models/pet';
import { AppState } from '.';

export const PETS_FEATURE_KEY = 'pets';

const PetsAdapter = createEntityAdapter<Pet>({
  selectId: (pet) => pet.petId,
});
interface PetsState extends EntityState<Pet> {
  loading: boolean;
  selectedId: Pet['petId'] | null;
}

export const createInitialState = (): PetsState =>
  PetsAdapter.getInitialState({
    loading: false,
    selectedId: null,
  });

export const doGetPets = createAsyncThunk('/getPets', async () => {
  try {
    // TODO
  } catch (e) {
    // TODO
  }
});

export const doGetOwnedPets = createAsyncThunk('/getOwnedPets', async () => {
  try {
    // TODO
  } catch (e) {
    // TODO
  }
});

export const doAddPet = createAsyncThunk('/addPet', async (pet: Pet, { rejectWithValue }) => {
  try {
    // TODO
    return pet;
  } catch (e) {
    // TODO
    return rejectWithValue(e);
  }
});

export const doRemovePet = createAsyncThunk('/removePet', async (pet: Pet, { rejectWithValue }) => {
  try {
    // TODO
    return pet;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const petsSlice = createSlice({
  name: 'pets',
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetPets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doGetPets.fulfilled, (state, action) => {
      state.loading = false;
      // PetsAdapter.setAll(state, action.payload)
    });
    builder.addCase(doGetOwnedPets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doGetOwnedPets.fulfilled, (state, action) => {
      state.loading = false;
      // PetsAdapter.setAll(state, action.payload)
    });
    builder.addCase(doAddPet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doAddPet.fulfilled, (state, action) => {
      state.loading = false;
      PetsAdapter.addOne(state, action.payload);
    });
    builder.addCase(doRemovePet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doRemovePet.fulfilled, (state, action) => {
      state.loading = false;
      PetsAdapter.removeOne(state, action.payload.petId);
    });
  },
});

const selectPetsFeature = (state: AppState) => state[PETS_FEATURE_KEY];

export const { selectAll: selectAllPets, selectEntities } =
  PetsAdapter.getSelectors(selectPetsFeature);

export const selectSelectedId = () =>
  createSelector(selectPetsFeature, (petsState) => petsState.selectedId);

export const selectSelectedPet = () =>
  createSelector(selectPetsFeature, selectEntities, (petsState, entities) =>
    petsState.selectedId ? entities[petsState.selectedId] : null,
  );

export default petsSlice.reducer;
