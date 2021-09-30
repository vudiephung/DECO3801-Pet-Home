import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import * as ExpoLocation from 'expo-location';

import Map from '../../../../components/Map';
import theme from '../../../../core/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    backgroundColor: theme.colors.button,
    opacity: 0.8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: { backgroundColor: Colors.white },
  cardContainer: { alignItems: 'center' },
  imageContainer: {
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 4,
  },
  uploadButton: {
    width: '60%',
    backgroundColor: theme.colors.button,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    width: '60%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 26,
    color: 'white',
  },
});

const Location = ({ navigation }) => {
  // Initial region
  const [region, setRegion] = useState({
    latitude: -25.2744,
    longitude: 133.7751,
    latitudeDelta: 50,
    longitudeDelta: 50 * (width / height),
  });

  useEffect(() => {
    // Retrieve current user location (Latitude & Longitude)
    (async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Access denied');
        return;
      }
      const { coords } = await ExpoLocation.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01844,
        longitudeDelta: 0.01844 * (width / height),
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Map initialRegion={region} region={region} />
      <View style={styles.buttonContainer}>
        <View style={[styles.bubble]}>
          <IconButton
            style={styles.button}
            icon="camera"
            size={36}
            onPress={() => {
              navigation.navigate('LocationPickImages', region);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Location;
