import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = ({ initialRegion, region }) => (
  <MapView
    style={styles.map}
    provider="google"
    region={region}
    initialRegion={initialRegion}
    showsUserLocation
    followsUserLocation
    zoomControlEnabled
    loadingEnabled
  />
);

export default Map;
