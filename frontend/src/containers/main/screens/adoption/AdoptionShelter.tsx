import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Button from '../../../../components/Button';
import theme from '../../../../core/theme';
import { fromPets, useAppDispatch } from '../../../../store';
import CardItem from './CardItem';

const styles = StyleSheet.create({
  container: { flex: 1 },
  addButton: {
    backgroundColor: theme.colors.primary,
    width: '30%',
    alignSelf: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    color: 'white',
  },
});

const AdoptionShelter = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const pets: any[] = useSelector(fromPets.selectAllPets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fromPets.doGetOwnedPets());
      } catch (e) {
        console.log(e);
      }
    })();
    setRefreshing(false);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setSelectedId(null);
  };

  const renderItem = ({ item }: any) => {
    const visible = item._id === selectedId;
    return (
      <CardItem
        item={item}
        onPress={() => {
          if (!selectedId) setSelectedId(item._id);
          else setSelectedId(null);
        }}
        visible={visible}
        navigation={navigation}
      />
    );
  };

  const handleAddPet = () => {
    navigation.navigate('AddPet');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button style={styles.addButton} labelStyle={styles.addButtonText} onPress={handleAddPet}>
        +
      </Button>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default AdoptionShelter;
