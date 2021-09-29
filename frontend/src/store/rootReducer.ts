import { combineReducers } from '@reduxjs/toolkit';

import userReducer, * as fromUser from './userSlice';
import petsReducer, * as fromPets from './petsSlice';
import locationsReducer, * as fromLocations from './locationsSlice';

const rootReducer = combineReducers({
  [fromUser.USER_FEATURE_KEY]: userReducer,
  [fromPets.PETS_FEATURE_KEY]: petsReducer,
  [fromLocations.LOCATIONS_FEATURE_KEY]: locationsReducer,
});

export { fromUser, fromPets, fromLocations };
export default rootReducer;
