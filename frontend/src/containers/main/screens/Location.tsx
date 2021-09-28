import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ExpoLocation from 'expo-location';

import Map from '../../../components/Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Location = () => {
  // Initial region
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Retrieve current user location
    (async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const { coords } = await ExpoLocation.getCurrentPositionAsync({});
      setRegion({ ...region, latitude: coords.latitude, longitude: coords.longitude });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Map initialRegion={region} region={region} />
    </View>
  );
};

export default Location;
