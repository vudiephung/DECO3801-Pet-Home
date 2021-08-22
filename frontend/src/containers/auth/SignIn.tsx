import React from 'react';
import { View, Button } from 'react-native';

const SignIn = ({ navigation }: any) => (
  <View>
    <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
  </View>
);

export default SignIn;
