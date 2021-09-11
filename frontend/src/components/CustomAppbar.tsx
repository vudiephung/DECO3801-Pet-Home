import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chip from './Chip';
import theme from '../core/theme';

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
  const [visible, setVisible] = useState(false);
  const [selectedDog, setSelectedDog] = useState(false);
  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedKitten, setSelectedKitten] = useState(false);
  const [selectedPuppy, setSelectedPuppy] = useState(false);
  const [selectedMale, setSelectedMale] = useState(false);
  const [selectedFemale, setSelectedFemale] = useState(false);

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
          onPress={() => setVisible(!visible)}
        />
      </View>
      {visible && (
        <View style={styles.column}>
          <View style={styles.row}>
            <Chip
              style={{ backgroundColor: selectedDog ? '#34e5ff' : theme.colors.surface }}
              selected={selectedDog}
              onPress={() => {
                setSelectedDog(!selectedDog);
                setSelectedCat(false);
                setSelectedKitten(false);
              }}>
              Dog
            </Chip>
            <Chip
              style={{ backgroundColor: selectedCat ? '#34e5ff' : theme.colors.surface }}
              selected={selectedCat}
              onPress={() => {
                setSelectedCat(!selectedCat);
                setSelectedDog(false);
                setSelectedPuppy(false);
              }}>
              Cat
            </Chip>
            <Chip
              style={{ backgroundColor: selectedKitten ? '#34e5ff' : theme.colors.surface }}
              selected={selectedKitten}
              onPress={() => {
                setSelectedKitten(!selectedKitten);
                setSelectedCat(true);
                setSelectedDog(false);
                setSelectedPuppy(false);
              }}>
              Kitten
            </Chip>
            <Chip
              style={{ backgroundColor: selectedPuppy ? '#34e5ff' : theme.colors.surface }}
              selected={selectedPuppy}
              onPress={() => {
                setSelectedPuppy(!selectedPuppy);
                setSelectedDog(true);
                setSelectedCat(false);
                setSelectedKitten(false);
              }}>
              Puppy
            </Chip>
          </View>
          <View style={styles.row}>
            <Chip
              style={{ backgroundColor: selectedMale ? '#34e5ff' : theme.colors.surface }}
              selected={selectedMale}
              onPress={() => {
                setSelectedMale(!selectedMale);
                setSelectedFemale(false);
              }}>
              Male
            </Chip>
            <Chip
              style={{ backgroundColor: selectedFemale ? '#34e5ff' : theme.colors.surface }}
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
