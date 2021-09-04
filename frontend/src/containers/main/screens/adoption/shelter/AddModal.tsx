import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

import TextInput from '../../../../../components/TextInput';
import Button from '../../../../../components/Button';

const styles = StyleSheet.create({
  center: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  add: {
    color: 'black',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    color: 'black',
    marginVertical: 12,
  },
});

const AddModal = ({ isOpen, closeModal }) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          // Alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    // TODO
  };

  return (
    <Modal
      backdropOpacity={0.6}
      isVisible={isOpen}
      onBackdropPress={closeModal}
      swipeDirection={['down']}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <ScrollView style={styles.modalView} contentContainerStyle={styles.center}>
        <TextInput
          label="Name"
          autoCapitalize="sentences"
          autoFocus
          maxLength={30}
          onChangeText={(value) => setName(value)}
        />
        <RNPickerSelect
          onValueChange={(value) => setType(value)}
          placeholder={{ label: 'Select a type of pet...', value: null }}
          items={[
            { label: 'Dog', value: 'dog' },
            { label: 'Cat', value: 'cat' },
            { label: 'Hamster', value: 'hamster' },
          ]}
          style={pickerSelectStyles}
        />
        <TextInput
          label="Breed"
          autoCapitalize="sentences"
          maxLength={30}
          onChangeText={(value) => setBreed(value)}
        />
        <TextInput
          label="Age"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(value) => setAge(+value)}
        />
        <TextInput label="Description" multiline numberOfLines={3} />
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.add}>Add Image</Text>
        </TouchableOpacity>
        <View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderColor: 'black', borderWidth: 1 }}
            />
          )}
        </View>
        <Button onPress={() => handleSubmit}>Submittt</Button>
      </ScrollView>
    </Modal>
  );
};

export default AddModal;
