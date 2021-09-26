import { combineReducers } from '@reduxjs/toolkit';

import userReducer, * as fromUser from './userSlice';
import petsReducer, * as fromPets from './petsSlice';

const rootReducer = combineReducers({
  [fromUser.USER_FEATURE_KEY]: userReducer,
  [fromPets.PETS_FEATURE_KEY]: petsReducer,
});

export { fromUser, fromPets };
export default rootReducer;
