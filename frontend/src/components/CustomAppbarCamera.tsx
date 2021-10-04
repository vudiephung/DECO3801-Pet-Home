import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const styles = StyleSheet.create({
  header: { backgroundColor: 'transparent' },
});

const CustomAppbarCamera = ({ navigation }) => (
  <Appbar.Header style={styles.header}>
    <Appbar.BackAction
      color="white"
      onPress={() => {
        navigation.goBack();
      }}
    />
  </Appbar.Header>
);

export default CustomAppbarCamera;
