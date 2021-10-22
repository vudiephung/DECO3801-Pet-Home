import React, { useMemo, useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Image, ScrollView, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetsSelector } from 'expo-images-picker';
import { MediaType } from 'expo-media-library';
import { useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';

import { baseURL } from '../../../../../services/config';
import theme from '../../../../../core/theme';
import { fromPets, fromUser, useAppDispatch } from '../../../../../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  chosenImageContainer: {
    margin: 5,
    width: 350,
    height: 220,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 15,
    paddingVertical: 3,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: theme.colors.secondary,
    textAlign: 'center',
  },
  chosenImage: {
    flex: 1,
    borderRadius: 10,
  },
  overlayDeleteButton: {
    margin: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    color: 'tomato',
  },
});

const ImageItem = ({ imageId, iconOnPress }: any) => {
  const token = useSelector(fromUser.selectToken);
  return (
    <View style={styles.chosenImageContainer}>
      <Image
        resizeMode="cover"
        style={styles.chosenImage}
        source={{
          uri: `${baseURL}/image/${imageId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
      />
      <Ionicons
        name="close-circle-sharp"
        size={25}
        style={styles.overlayDeleteButton}
        onPress={() => iconOnPress(imageId)}
      />
    </View>
  );
};

const PickImages = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();
  const { petData, mode, currentImages } = route.params;

  const [uploadedList, setUploadedList] = useState<string[]>(
    currentImages ? [...currentImages] : [],
  );

  const deletedImageIds = useRef<string[]>([]);

  const onSuccess = async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    showAlert(
      'Are you sure you want to submit?',
      mode === 'ADD'
        ? 'This pet will be uploaded as a new pet'
        : 'This pet will be updated with the new information provided',
      async () => {
        const images = data.map((element: any) => {
          return { uri: element.uri, name: element.filename };
        });
        if (mode === 'ADD') {
          await dispatch(fromPets.doAddPet({ petInfo: petData, images }));
        } else {
          await dispatch(
            fromPets.doEditPet({
              petInfo: petData,
              imagesToDelete: deletedImageIds.current,
              newImages: images,
            }),
          );
        }
        navigation.navigate('AdoptionShelter');
      },
    );
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was error while loading images.',
        hasErrorWithResizing: 'There was error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    [],
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: mode === 'ADD' ? 1 : 0,
      maxSelection: mode === 'ADD' ? 3 : 3 - uploadedList.length,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    [],
  );

  const textStyle = {
    color: theme.colors.primary,
    fontWeight: 'bold' as 'bold',
  };

  const buttonStyle = {
    backgroundColor: theme.colors.button,
    borderRadius: 50,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'SUBMIT',
        back: 'BACK',
        selected: 'selected',
      },
      midTextColor: 'black',
      minSelection: mode === 'ADD' ? 1 : 0,
      maxSelection: mode === 'ADD' ? 3 : 3 - uploadedList.length,
      buttonTextStyle: textStyle,
      buttonStyle,
      onBack: () => {
        navigation.goBack();
      },
      onSuccess: (e: any) => onSuccess(e),
    }),
    [],
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#cfcfcf70',
        size: 26,
      },
    }),
    [],
  );

  const showToastMessage = (message: string) => {
    Toast.show(message, {
      position: Toast.positions.BOTTOM,
      duration: 7000,
      hideOnPress: true,
      animation: true,
      shadow: true,
      delay: 0,
    });
  };

  const showAlert = (title: string, message: string, confirmHandler: () => void) => {
    Alert.alert(title, message, [
      {
        text: 'Yes',
        onPress: () => confirmHandler(),
      },
      {
        text: 'No',
        style: 'cancel',
        onPress: () => {},
      },
    ]);
  };

  const handleDeleteUploadedImage = (imageId: string) => {
    showAlert('Are you sure you want to delete this image?', 'This can not be undone', () => {
      deletedImageIds.current.push(imageId);
      const updatedList = uploadedList.filter((id) => id !== imageId);
      if (updatedList.length === 0) {
        widgetNavigator.minSelection = 1;
        widgetSettings.minSelection = 1;
      }
      widgetNavigator.maxSelection = 3 - updatedList.length;
      widgetSettings.maxSelection = 3 - updatedList.length;
      setUploadedList(updatedList);
    });
  };

  useEffect(() => {
    if (mode === 'ADD') {
      showToastMessage('The maximum number of images you can choose is 3');
    } else {
      showToastMessage('The maximum number of uploaded and newly chosen images combined is 3');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {mode === 'EDIT' && <Text style={styles.sectionTitle}>Uploaded Images</Text>}
      {mode === 'EDIT' && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {uploadedList.length > 0 ? (
            <ScrollView>
              {uploadedList.map((imageId: string, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <ImageItem key={index} imageId={imageId} iconOnPress={handleDeleteUploadedImage} />
              ))}
            </ScrollView>
          ) : (
            <Text>All uploaded images have been deleted</Text>
          )}
        </View>
      )}
      <View style={{ flex: 1 }}>
        {mode === 'EDIT' && <Text style={styles.sectionTitle}>Choose New Images</Text>}
        <AssetsSelector
          Settings={widgetSettings}
          Errors={widgetErrors}
          Styles={widgetStyles}
          Navigator={widgetNavigator}
          // Resize={widgetResize} know how to use first , perform slower results.
        />
      </View>
    </SafeAreaView>
  );
};

export default PickImages;
