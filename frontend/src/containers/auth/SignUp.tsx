import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import theme from '../../core/theme';

const styles = StyleSheet.create({
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

const SignUp = ({ navigation }: any) => (
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
    <TextInput label="Confirm Password" secureTextEntry />
    <Button mode="contained" onPress={() => {}}>
      Sign Up
    </Button>
    <View style={styles.row}>
      <Text style={styles.label}>Already have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Sign In</Text>
      </TouchableOpacity>
    </View>
  </Background>
);

export default memo(SignUp);
