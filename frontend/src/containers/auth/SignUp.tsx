import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import theme from '../../core/theme';
import { fromUser, useAppDispatch } from '../../store';

interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  normal: {
    color: 'black',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
});

const SignUp = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSignUp = async ({ email, password, confirmPassword }: SignUpFormInputs) => {
    if (password === confirmPassword) {
      await dispatch(fromUser.doSignup({ userInfo: { email, password, username } }));
      navigation.navigate('SignIn');
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Pet Home</Header>
      <TextInput
        label="Email"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        label="Username"
        autoCapitalize="none"
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        label="Password"
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        label="Confirm Password"
        secureTextEntry
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Button
        mode="contained"
        onPress={async () => handleSignUp({ email, password, confirmPassword })}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text style={styles.normal}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(SignUp);
