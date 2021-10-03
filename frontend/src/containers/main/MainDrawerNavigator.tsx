import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import UserProfile from './screens/UserProfile';
import FavoritePets from './screens/FavoritePets';
import { fromUser } from '../../store';
import SignOut from '../auth/SignOut';
import theme from '../../core/theme';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = ({ navigation }: any) => {
  const isShelter = useSelector(fromUser.selectIsShelter);

  return (
    <Drawer.Navigator
      initialRouteName="Pet Home"
      screenOptions={{ headerShown: false, drawerActiveTintColor: theme.colors.active }}>
      <Drawer.Screen name="Pet Home" component={MainTabNavigator} />
      <Drawer.Screen name="My Profile" component={UserProfile} />
      {!isShelter && <Drawer.Screen name="Favorite Pets" component={FavoritePets} />}
      {/* eslint-disable-next-line react/no-children-prop */}
      <Drawer.Screen name="Sign Out" children={() => <SignOut navigation={navigation} />} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
