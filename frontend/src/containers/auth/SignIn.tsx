import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import theme from '../../core/theme';

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

const SignIn = ({ navigation }: any) => (
  <Background>
    <Logo />
    <Header>Pet Home</Header>
    <TextInput
      label="Email"
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
    />
    <TextInput label="Password" secureTextEntry />
    <View style={styles.forgotPassword}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.label}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
    <Button mode="contained" onPress={() => {}}>
      Login
    </Button>
    <View style={styles.row}>
      <Text style={styles.label}>Don’t have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </Background>
);

export default memo(SignIn);
