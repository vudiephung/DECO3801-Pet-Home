import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

import { fromUser, useAppDispatch } from '../../../store';

const Donation = () => {
  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    dispatch(fromUser.doChangeCurrentTab('donation'));
  });

  return (
    <View>
      <Text>Donation</Text>
    </View>
  );
};

export default Donation;
