import React from 'react';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomAppbar = () => (
  <Appbar.Header>
    <Appbar.Action
      icon={({ color }) => <MaterialCommunityIcons name="menu" color={color} size={26} />}
      onPress={() => {}}
    />
    <Appbar.Content title="" />
    <Appbar.Action
      icon={({ color }) => <MaterialCommunityIcons name="tune" color={color} size={26} />}
      onPress={() => {}}
    />
  </Appbar.Header>
);

export default CustomAppbar;
