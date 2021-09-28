import { combineReducers } from '@reduxjs/toolkit';

import userReducer, * as fromUser from './userSlice';
import petsReducer, * as fromPets from './petsSlice';
import { USER_FEATURE_KEY, PETS_FEATURE_KEY } from './keywords';

const rootReducer = combineReducers({
  [USER_FEATURE_KEY]: userReducer,
  [PETS_FEATURE_KEY]: petsReducer,
});

export { fromUser, fromPets };
export default rootReducer;
