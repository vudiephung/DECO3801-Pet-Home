import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { fromUser } from '../../store';
import AdoptionFilter from './Adoption-Filter';
import LocationFilter from './Location-Filter';

const CustomAppbar = () => {
  const [visible, setVisible] = useState(false);
  const currentTab = useSelector(fromUser.selectCurrentTab);

  return (
    <Appbar.Header style={{ height: visible ? 'auto' : 55, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name="menu" color="white" size={26} />}
          onPress={() => {}}
        />
        <Appbar.Content title="" />
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name="tune" color="white" size={26} />}
          onPress={() => {
            setVisible(!visible);
          }}
        />
      </View>
      {visible && currentTab === 'adoption' ? <AdoptionFilter /> : null}
      {visible && currentTab === 'location' ? <LocationFilter /> : null}
    </Appbar.Header>
  );
};

export default CustomAppbar;
