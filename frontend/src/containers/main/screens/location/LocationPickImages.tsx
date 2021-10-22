import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetsSelector } from 'expo-images-picker';
import { MediaType } from 'expo-media-library';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

import theme from '../../../../core/theme';
import { fromLocations, useAppDispatch } from '../../../../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
});

const LocationPickImages = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(fromLocations.selectLoading);

  const onSuccess = async (data: any) => {
    const images = data.map((element: any) => {
      return { uri: element.uri, name: element.filename };
    });
    const { latitude, longitude } = route.params;
    await dispatch(fromLocations.doAddLocation({ latitude, longitude, images }));
    navigation.navigate('Adoption');
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
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 1,
      maxSelection: 3,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    [],
  );

  const textStyle = {
    color: 'white',
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
      minSelection: 1,
      maxSelection: 3,
      buttonTextStyle: textStyle,
      buttonStyle,
      onBack: () => {
        navigation.navigate('LocationUser');
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

  return (
    <SafeAreaView style={styles.container}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
      />
      <Spinner
        visible={loading}
        textContent="Loading..."
        animation="fade"
        textStyle={{ color: 'white' }}
      />
    </SafeAreaView>
  );
};

export default LocationPickImages;
