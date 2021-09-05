import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Adoption from './screens/Adoption';
import Blog from './screens/Blog';
import Location from './screens/Location';
import Donation from './screens/Donation';

const Tab = createMaterialBottomTabNavigator();

const Main = () => (
  <Tab.Navigator activeColor="#34e5ff" barStyle={{ backgroundColor: '#ffffff' }} labeled={false}>
    <Tab.Screen
      name="Adoption"
      component={Adoption}
      options={{
        tabBarLabel: 'Adoption',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Location"
      component={Location}
      options={{
        tabBarLabel: 'Location',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Blog"
      component={Blog}
      options={{
        tabBarLabel: 'Blog',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="alert-circle" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Donation"
      component={Donation}
      options={{
        tabBarLabel: 'Donation',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="gift" color={color} size={26} />,
      }}
    />
  </Tab.Navigator>
);

export default Main;
