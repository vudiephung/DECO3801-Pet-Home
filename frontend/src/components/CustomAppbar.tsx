import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/routers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chip from './Chip';
import theme from '../core/theme';
import { fromPets, useAppDispatch } from '../store';

const styles = StyleSheet.create({
  column: { flexDirection: 'column', justifyContent: 'center', padding: 8 },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});

const CustomAppbar = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedDog, setSelectedDog] = useState(false);
  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedHamster, setSelectedHamster] = useState(false);
  const [selectedMale, setSelectedMale] = useState(false);
  const [selectedFemale, setSelectedFemale] = useState(false);
  const navigation = useNavigation();

  const handlePressDog = () => {
    if (selectedDog) {
      dispatch(fromPets.doGetPets());
    } else {
      dispatch(fromPets.doGetFilteredPets('dog'));
    }
    setSelectedDog(!selectedDog);
    setSelectedCat(false);
    setSelectedHamster(false);
  };

  const handlePressCat = () => {
    if (selectedCat) {
      dispatch(fromPets.doGetPets());
    } else {
      dispatch(fromPets.doGetFilteredPets('cat'));
    }
    setSelectedCat(!selectedCat);
    setSelectedDog(false);
    setSelectedHamster(false);
  };

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
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name="tune" color="white" size={26} />}
          onPress={() => setVisible(!visible)}
        />
      </View>
      {visible && (
        <View style={styles.column}>
          <View style={styles.row}>
            <Chip
              style={{ backgroundColor: selectedDog ? theme.colors.active : theme.colors.surface }}
              selected={selectedDog}
              onPress={handlePressDog}>
              Dog
            </Chip>
            <Chip
              style={{ backgroundColor: selectedCat ? theme.colors.active : theme.colors.surface }}
              selected={selectedCat}
              onPress={handlePressCat}>
              Cat
            </Chip>
            <Chip
              style={{
                backgroundColor: selectedHamster ? theme.colors.active : theme.colors.surface,
              }}
              selected={selectedHamster}
              onPress={() => {
                setSelectedHamster(!selectedHamster);
                setSelectedCat(false);
                setSelectedDog(false);
              }}>
              Hamster
            </Chip>
          </View>
          <View style={styles.row}>
            <Chip
              style={{ backgroundColor: selectedMale ? theme.colors.active : theme.colors.surface }}
              selected={selectedMale}
              onPress={() => {
                setSelectedMale(!selectedMale);
                setSelectedFemale(false);
              }}>
              Male
            </Chip>
            <Chip
              style={{
                backgroundColor: selectedFemale ? theme.colors.active : theme.colors.surface,
              }}
              selected={selectedFemale}
              onPress={() => {
                setSelectedFemale(!selectedFemale);
                setSelectedMale(false);
              }}>
              Female
            </Chip>
          </View>
        </View>
      )}
    </Appbar.Header>
  );
};

export default CustomAppbar;
