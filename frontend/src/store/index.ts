import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rootReducer, { fromUser, fromPets, fromLocations, fromBlogs } from './rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: isDevelopment,
});

export type AppState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
export { fromUser, fromPets, fromLocations, fromBlogs };
