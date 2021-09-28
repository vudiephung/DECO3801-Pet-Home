import { useEffect } from 'react';

import { fromUser, useAppDispatch } from '../../store';

type SignOutProps = {
  navigation: any;
};

const SignOut = ({ navigation }: SignOutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromUser.doSignout);
    navigation.navigate('SignIn');
  }, []);

  return null;
};

export default SignOut;
