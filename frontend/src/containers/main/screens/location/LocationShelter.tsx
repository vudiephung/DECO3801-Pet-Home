import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';

import theme from '../../../../core/theme';
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

const zones = [
  {
    rank: 1,
  },
  {
    rank: 2,
  },
  {
    rank: 3,
  },
  {
    rank: 4,
  },
];

const LocationShelter = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return <CardItem item={item} navigation={navigation} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={zones}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank.toString()}
      />
    </SafeAreaView>
  );
};

export default LocationShelter;
