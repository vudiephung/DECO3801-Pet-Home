import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthService, PetsService } from '../services';
import { User } from '../models/user';
import { Pet } from '../models/pet';
import { setAuthToken } from '../services/config';
import { USER_FEATURE_KEY } from './keywords';

interface UserState {
  user: User | null;
  loading: boolean;
  didLogin: boolean;
  currentTab: string;
  // errors: any[];
}

const tokenKey: string = 'token';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`Cannot store ${key}in storage`);
  }
};

const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(`Can not delete ${key} in storage`);
  }
};

export const createInitialState = (): UserState => ({
  user: null,
  loading: false,
  didLogin: false,
  currentTab: 'adoption',
  // errors: [],
});

export const doSignin = createAsyncThunk(
  '/signin',
  async (
    credential: { userInfo: Parameters<typeof AuthService['signin']>[0] },
    { rejectWithValue },
  ) => {
    try {
      const user = await AuthService.signin(credential.userInfo);
      await storeData(tokenKey, user.token);
      setAuthToken(user.token);
      return user;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const doSignup = createAsyncThunk(
  '/signup',
  async (input: { userInfo: Parameters<typeof AuthService['signup']>[0] }, { rejectWithValue }) => {
    try {
      const user = await AuthService.signup(input.userInfo);
      return { user };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const doSignout = createAsyncThunk('auth/signout', async () => {
  await deleteData(tokenKey);
});

export const doAddFavoritePet = createAsyncThunk(
  '/addFavoritePet',
  async (petId: Pet['_id'], { rejectWithValue }) => {
    try {
      await PetsService.addFavoritePet(petId);
      return petId;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const doDeleteFavoritePet = createAsyncThunk(
  '/deleteFavoritePet',
  async (petId: Pet['_id'], { rejectWithValue }) => {
    try {
      await PetsService.deleteFavoritePet(petId);
      return petId;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {
    doChangeCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doSignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.didLogin = true;
      state.loading = false;
    });
    builder.addCase(doSignin.rejected, (state) => {
      state.user = null;
      state.loading = false;
      deleteData(tokenKey);
      // state.errors.push(payload);
    });
    builder.addCase(doSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(doSignup.rejected, (state) => {
      state.loading = false;
      // state.errors.push(payload);
    });
    builder.addCase(doSignout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignout.fulfilled, (state) => {
      state.didLogin = false;
      state.user = null;
      state.loading = false;
    });
    builder.addCase(doAddFavoritePet.fulfilled, (state, action) => {
      if (state.user && !state.user.favouritePets) {
        state.user.favouritePets = [action.payload];
      } else if (state.user && state.user.favouritePets) {
        state.user.favouritePets.push(action.payload);
      }
    });
    builder.addCase(doDeleteFavoritePet.fulfilled, (state, action) => {
      if (state.user && state.user.favouritePets) {
        const index = state.user.favouritePets.indexOf(action.payload);
        if (index > -1) {
          state.user.favouritePets.splice(index, 1);
        }
      }
    });
  },
});

const selectAuthFeature = (state: any) => state[USER_FEATURE_KEY];

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (userState) => userState.didLogin,
);

export const selectIsShelter = createSelector(
  selectAuthFeature,
  (userState) => userState.user?.isShelter,
);

export const selectCurrentTab = createSelector(
  selectAuthFeature,
  (userState) => userState.currentTab,
);

export const selectFavPetIds = createSelector(
  selectAuthFeature,
  (userState) => userState.user?.favouritePets,
);

export const selectUser = createSelector(selectAuthFeature, (userState) => userState.user);

export const selectToken = createSelector(selectAuthFeature, (userState) => userState.user?.token);
export const { doChangeCurrentTab } = userSlice.actions;

export default userSlice.reducer;
