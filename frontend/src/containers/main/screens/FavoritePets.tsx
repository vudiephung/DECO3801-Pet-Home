import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import theme from '../../../core/theme';
import { fromPets } from '../../../store';
import CardItem from './adoption/CardItem';

const FavoritePets = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const pets = useSelector(fromPets.selectFavouritePets);

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

  const handleRefresh = () => {
    setRefreshing(true);
    setSelectedId(null);
  };

  const renderItem = ({ item }: any) => {
    const visible = item._id === selectedId;
    return (
      <CardItem
        isFavPetScreen
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

  return (
    <SafeAreaView style={styles.container}>
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

export default FavoritePets;
