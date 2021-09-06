import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetsSelector } from 'expo-images-picker';
import { MediaType } from 'expo-media-library';
import Constants from 'expo-constants';

import theme from '../../core/theme';
import { fromPets, useAppDispatch } from '../../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});

const PickImages = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();

  const onSuccess = (data: any) => {
    const images = data.map((element: any) => {
      return { uri: element.uri, name: element.filename };
    });
    dispatch(fromPets.doAddPet({ petInfo: route.params, images }));
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
      minSelection: 1,
      maxSelection: 3,
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
      minSelection: 1,
      maxSelection: 3,
      buttonTextStyle: textStyle,
      buttonStyle,
      onBack: () => {
        navigation.navigate('AddPet');
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
        // Resize={widgetResize} know how to use first , perform slower results.
      />
    </SafeAreaView>
  );
};

export default PickImages;
