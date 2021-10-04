import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';

import { fromUser, useAppDispatch } from '../../../../store';
import AdoptionShelterNavigator from './AdoptionShelterNavigator';
import AdoptionUser from './AdoptionUser';

const Adoption = () => {
  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    dispatch(fromUser.doChangeCurrentTab('adoption'));
  });

  const isShelter = useSelector(fromUser.selectIsShelter);

  return isShelter ? <AdoptionShelterNavigator /> : <AdoptionUser />;
};

export default Adoption;
