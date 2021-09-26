import React, { memo } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Background = ({ children }: Props) => (
  <ImageBackground
    source={require('../assets/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

export default memo(Background);
