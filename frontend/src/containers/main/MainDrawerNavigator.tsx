import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import UserProfile from './screens/UserProfile';
import FavoritePets from './screens/FavoritePets';
import { fromUser } from '../../store';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  const isShelter = useSelector(fromUser.selectIsShelter);

  return (
    <Drawer.Navigator initialRouteName="Pet Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Pet Home" component={MainTabNavigator} />
      <Drawer.Screen name="My Profile" component={UserProfile} />
      {!isShelter && <Drawer.Screen name="Saved Pets" component={FavoritePets} />}
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
