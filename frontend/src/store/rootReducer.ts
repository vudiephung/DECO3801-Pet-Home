import { combineReducers } from '@reduxjs/toolkit';

import usersReducer, * as fromUsers from './userSlice';

const rootReducer = combineReducers({
  [fromUsers.USER_FEATURE_KEY]: usersReducer,
});

export { fromUsers };
export default rootReducer;
