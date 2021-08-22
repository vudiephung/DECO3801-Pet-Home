import React from 'react';
import { View, Button } from 'react-native';

const SignUp = ({ navigation }: any) => (
  <View>
    <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
  </View>
);

export default SignUp;
