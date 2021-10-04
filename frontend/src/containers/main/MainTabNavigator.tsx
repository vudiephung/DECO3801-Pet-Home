import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import Adoption from './screens/adoption';
import Blog from './screens/Blog';
import Donation from './screens/Donation';
import Location from './screens/location';
import theme from '../../core/theme';
import { fromUser } from '../../store';

const Tab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  const isShelter = useSelector(fromUser.selectIsShelter);

  return (
    <Tab.Navigator
      activeColor={theme.colors.active}
      barStyle={{ backgroundColor: '#ffffff' }}
      labeled={false}>
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
        initialParams={{ picture: null }}
      />
      {!isShelter ? (
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
      ) : null}
      {!isShelter ? (
        <Tab.Screen
          name="Donation"
          component={Donation}
          options={{
            tabBarLabel: 'Donation',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="gift" color={color} size={26} />
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
