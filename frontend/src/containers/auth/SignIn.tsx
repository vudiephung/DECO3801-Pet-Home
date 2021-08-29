import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import theme from '../../core/theme';

import { fromUsers, useAppDispatch } from '../../store';
import store from '../../store';
import { useSelector } from 'react-redux';

interface SignInFormInputs {
  email: string;
  password: string;
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

const SignIn = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isAuthenticated = useSelector(fromUsers.selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const handleSignIn = async ({ email, password }: SignInFormInputs) => {
    await dispatch(fromUsers.doSignin({ userInfo: { email, password } }));
  };

  if (isAuthenticated) {
    navigation.navigate('Main');
  }

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
        label="Password"
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={async () => handleSignIn({ email, password })}>
        Sign In
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(SignIn);
