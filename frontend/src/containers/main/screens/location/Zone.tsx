import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import openMap from 'react-native-open-maps';
import { useSelector } from 'react-redux';
import { SliderBox } from 'react-native-image-slider-box';

import Button from '../../../../components/Button';
import { baseURL } from '../../../../services/config';
import { fromUser } from '../../../../store';

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
  modal: {
    width: '100%',
  },
});

const Zone = ({ route }: any) => {
  const { zone } = route.params;
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const token = useSelector(fromUser.selectToken);

  const locations = zone.locations.map((location) => {
    return {
      longitude: location.longitude,
      latitude: location.latitude,
    };
  });

  const handleMarkerPress = (index: number) => {
    setSelectedIndex(index);
    setImages(
      zone.locations[index].images.map((image: string) => {
        return {
          uri: `${baseURL}/image/${image}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }),
    );
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleButtonPress = () => {
    if (selectedIndex) {
      const location = zone.locations[selectedIndex];
      openMap({ end: `${location?.latitude}, ${location?.longitude}` });
    }
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
            onPress={() => handleMarkerPress(index)}
          />
        ))}
      </MapView>
      <Modal isVisible={openModal} onBackdropPress={closeModal} onBackButtonPress={closeModal}>
        <View style={styles.modal}>
          {images && <SliderBox images={images} />}
          <Button onPress={handleButtonPress}>Open Map</Button>
        </View>
      </Modal>
    </View>
  );
};

export default Zone;
