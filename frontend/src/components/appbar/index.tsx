import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/routers';
import { useSelector } from 'react-redux';

import { fromUser } from '../../store';
import AdoptionFilter from './Adoption-Filter';
import LocationFilter from './Location-Filter';

const CustomAppbar = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const currentTab = useSelector(fromUser.selectCurrentTab);

  useEffect(() => {
    setVisible(false);
  }, [currentTab]);

  return (
    <Appbar.Header style={{ height: visible ? 'auto' : 55, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name="menu" color="white" size={26} />}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
        <Appbar.Content title="" />
        {currentTab === 'adoption' || currentTab === 'location' ? (
          <Appbar.Action
            icon={() => <MaterialCommunityIcons name="tune" color="white" size={26} />}
            onPress={() => {
              setVisible(!visible);
            }}
          />
        ) : null}
      </View>
      {visible && currentTab === 'adoption' ? <AdoptionFilter /> : null}
      {visible && currentTab === 'location' ? <LocationFilter /> : null}
    </Appbar.Header>
  );
};

export default CustomAppbar;
