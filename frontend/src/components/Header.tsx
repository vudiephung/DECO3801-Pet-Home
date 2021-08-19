import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
});

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.text}>PET HOME</Text>
  </View>
);
export default Header;
