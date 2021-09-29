import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LocationUser from './LocationUser';
import LocationPickImages from './LocationPickImages';

const Stack = createStackNavigator();

const LocationUserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LocationUser" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationUser" component={LocationUser} />
      <Stack.Screen name="LocationPickImages" component={LocationPickImages} />
    </Stack.Navigator>
  );
};

export default LocationUserNavigator;
