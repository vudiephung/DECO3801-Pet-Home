import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import theme from '../../core/theme';
import { fromPets, useAppDispatch } from '../../store';
import Chip from '../Chip';

const styles = StyleSheet.create({
  column: { flexDirection: 'column', justifyContent: 'center', padding: 8 },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});

const AdoptionFilter = () => {
  const dispatch = useAppDispatch();
  const [selectedDog, setSelectedDog] = useState(false);
  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedHamster, setSelectedHamster] = useState(false);
  const [selectedMale, setSelectedMale] = useState(false);
  const [selectedFemale, setSelectedFemale] = useState(false);

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
    <View style={styles.column}>
      <View style={styles.row}>
        <Chip
          style={{ backgroundColor: selectedDog ? theme.colors.active : theme.colors.secondary }}
          selected={selectedDog}
          onPress={handlePressDog}>
          Dog
        </Chip>
        <Chip
          style={{ backgroundColor: selectedCat ? theme.colors.active : theme.colors.secondary }}
          selected={selectedCat}
          onPress={handlePressCat}>
          Cat
        </Chip>
        <Chip
          style={{
            backgroundColor: selectedHamster ? theme.colors.active : theme.colors.secondary,
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
          style={{ backgroundColor: selectedMale ? theme.colors.active : theme.colors.secondary }}
          selected={selectedMale}
          onPress={() => {
            setSelectedMale(!selectedMale);
            setSelectedFemale(false);
          }}>
          Male
        </Chip>
        <Chip
          style={{ backgroundColor: selectedFemale ? theme.colors.active : theme.colors.secondary }}
          selected={selectedFemale}
          onPress={() => {
            setSelectedFemale(!selectedFemale);
            setSelectedMale(false);
          }}>
          Female
        </Chip>
      </View>
    </View>
  );
};

export default AdoptionFilter;
