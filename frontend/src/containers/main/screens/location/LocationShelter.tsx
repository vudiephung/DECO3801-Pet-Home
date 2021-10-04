import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import theme from '../../../../core/theme';
import { getZones } from '../../../../services/locations';
import { fromLocations } from '../../../../store';
import CardItem from './CardItem';

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  body: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
});

const LocationShelter = ({ navigation }: any) => {
  const [zones, setZones] = useState(null);
  const filter = useSelector(fromLocations.selectFilter);

  useEffect(() => {
    (async () => {
      setZones(null);
      try {
        if (filter.city && filter.state) {
          const fetchedZones = await getZones({ state: filter.state, city: filter.city });
          setZones(fetchedZones);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [filter]);

  const clearZones = () => {
    setZones(null);
  };

  const renderItem = ({ item }: any) => {
    return <CardItem zone={item} navigation={navigation} clearZones={clearZones} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Zones</Text>
      {zones ? (
        <FlatList
          data={zones}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.body}>Select the state and city to view zones...</Text>
      )}
    </SafeAreaView>
  );
};

export default LocationShelter;
