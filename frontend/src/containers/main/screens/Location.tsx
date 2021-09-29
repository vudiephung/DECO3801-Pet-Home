import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Image, StyleSheet, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import * as ExpoLocation from 'expo-location';

import Map from '../../../components/Map';
import Button from '../../../components/Button';
import theme from '../../../core/theme';

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
    backgroundColor: 'rgba(145, 118, 129, 0.5)',
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

const Location = ({ route, navigation }) => {
  // Use global store (redux) instead of route.params
  const { picture } = route.params;

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

  // Upload picture
  const handleUploadPicture = (picture) => {
    console.log(picture);
    navigation.navigate('Location', { picture: null });
  };

  return (
    <View style={styles.container}>
      <Map initialRegion={region} region={region} />
      <View style={styles.buttonContainer}>
        <View style={[styles.bubble]}>
          {picture === null ? (
            <IconButton
              style={styles.button}
              icon="camera"
              size={36}
              onPress={() => navigation.navigate('Camera')}
            />
          ) : (
            <View style={styles.cardContainer}>
              <View style={styles.imageContainer}>
                <Image source={route.params.picture} style={styles.image} />
              </View>
              <IconButton
                style={styles.button}
                icon="camera"
                size={36}
                onPress={() => navigation.navigate('Camera')}
              />
              <Button
                mode="contained"
                style={styles.uploadButton}
                labelStyle={[styles.buttonText, { color: theme.colors.primary }]}
                onPress={() => {
                  handleUploadPicture(picture);
                }}>
                Upload
              </Button>
              <Button
                mode="contained"
                style={styles.deleteButton}
                labelStyle={styles.buttonText}
                onPress={() => {
                  navigation.navigate('Location', { picture: null });
                }}>
                Cancel
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Location;
