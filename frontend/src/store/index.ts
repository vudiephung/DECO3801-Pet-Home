import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer, { fromUsers } from './rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
});

export type AppState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
export { fromUsers };
