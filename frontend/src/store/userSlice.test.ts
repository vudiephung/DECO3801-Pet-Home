import Axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { AuthService } from '../services';
import { doSignin, createInitialState } from './userSlice';

jest.mock('axios');
jest.mock('../services/auth');

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

describe('userSlice', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store: ReturnType<typeof mockStore>;
  const dummyUser = { email: 'test@mail.com', password: 'test' };
  const dummyCredential = { userInfo: dummyUser };

  beforeEach(() => {
    store = mockStore({
      ['auth']: createInitialState(),
    });
  });

  const loginResponse = {
    data: {
      userId: 'userId',
      token: 'token',
    } as unknown as PromiseType<ReturnType<typeof AuthService['signin']>>,
  };

  it('should login', async () => {
    (Axios.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(loginResponse));

    await store.dispatch(doSignin(dummyCredential) as any);
    const actions = store.getActions();
    console.log(store.getState());
    console.log(actions);

    expect(actions.map((action) => action.type)).toEqual([
      doSignin.pending.type,
      doSignin.fulfilled.type,
    ]);
  });
});
