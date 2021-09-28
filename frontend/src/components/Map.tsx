import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const Map = ({ initialRegion, region }) => (
  <View>
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
  </View>
);

export default Map;
