import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Adoption from './screens/Adoption';
import Blog from './screens/Blog';
import Location from './screens/Location';
import Donation from './screens/Donation';

const Tab = createBottomTabNavigator();

const Main = () => (
  <Tab.Navigator>
    <Tab.Screen name="Adoption" component={Adoption} />
    <Tab.Screen name="Location" component={Location} />
    <Tab.Screen name="Donation" component={Donation} />
    <Tab.Screen name="Blog" component={Blog} />
  </Tab.Navigator>
);

export default Main;
