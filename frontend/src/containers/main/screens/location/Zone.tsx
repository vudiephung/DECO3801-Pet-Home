import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import openMap from 'react-native-open-maps';

import Location from '../../../../models/location';
import Button from '../../../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
});

const Zone = ({ route }: any) => {
  const { rank } = route.params;
  console.log(rank);
  const [selectedLocation, setSelectedLocation] = useState<null | Location>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const locations = [
    {
      latitude: 37.42273010379259,
      longitude: -122.08003741212114,
    },
    {
      latitude: 37.40795644334263,
      longitude: -122.09548638770042,
    },
    {
      latitude: 37.423429954309334,
      longitude: -122.10489356315546,
    },
    {
      latitude: 37.41644075799896,
      longitude: -122.12243339351996,
    },
    {
      latitude: 37.40729577401165,
      longitude: -122.05804222080211,
    },
  ];

  const handleMarkerPress = (marker: Location) => {
    setSelectedLocation(marker);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleButtonPress = () => {
    openMap({ end: `${selectedLocation?.latitude}, ${selectedLocation?.longitude}` });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...locations[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {locations.map((marker, index) => (
          <Marker
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            coordinate={marker}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
      <Modal isVisible={openModal} onBackdropPress={closeModal} onBackButtonPress={closeModal}>
        <Button onPress={handleButtonPress}>Open Map</Button>
      </Modal>
    </View>
  );
};

export default Zone;
