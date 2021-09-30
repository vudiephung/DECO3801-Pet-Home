import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { fromUser, useAppDispatch } from '../../../../store';
import LocationUser from './LocationUser';
import LocationPickImages from './LocationPickImages';
import LocationShelter from './LocationShelter';
import Zone from './Zone';

const Stack = createStackNavigator();

const Location = () => {
  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    dispatch(fromUser.doChangeCurrentTab('location'));
  });

  const isShelter = useSelector(fromUser.selectIsShelter);

  return (
    <Stack.Navigator
      initialRouteName={isShelter ? 'LocationShelter' : 'LocationUser'}
      screenOptions={{ headerShown: false }}>
      {isShelter ? (
        <>
          <Stack.Screen name="LocationShelter" component={LocationShelter} />
          <Stack.Screen name="Zone" component={Zone} />
        </>
      ) : (
        <>
          <Stack.Screen name="LocationUser" component={LocationUser} />
          <Stack.Screen name="LocationPickImages" component={LocationPickImages} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Location;
