import React from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { fromUser, useAppDispatch } from '../../../../store';
import LocationUser from './Location-User';
import LocationShelter from './Location-Shelter';

const Location = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    dispatch(fromUser.doChangeCurrentTab('location'));
  });

  const isShelter = useSelector(fromUser.selectIsShelter);

  return isShelter ? <LocationShelter navigation={navigation} /> : <LocationUser />;
};

export default Location;
