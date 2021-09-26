import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdoptionShelter from './AdoptionShelter';
import AddPet from './add-edit-pet/AddPet';
import EditPet from './add-edit-pet/EditPet';
import PickImages from './add-edit-pet/PickImages';

const Stack = createStackNavigator();

const AdoptionShelterNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AdoptionShelter" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdoptionShelter" component={AdoptionShelter} />
      <Stack.Screen name="AddPet" component={AddPet} />
      <Stack.Screen name="EditPet" component={EditPet} />
      <Stack.Screen name="PickImages" component={PickImages} />
    </Stack.Navigator>
  );
};

export default AdoptionShelterNavigator;
