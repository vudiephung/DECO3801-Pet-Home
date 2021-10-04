import React, { useState, useEffect } from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

let camera: any = null;

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  cameraPreviewContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: { backgroundColor: Colors.white },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  icon: { backgroundColor: 'transparent' },
});

const UserCamera = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedPicture, setCapturedPicture] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        Alert.alert('Camera Access denied');
        return;
      }
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus.status !== 'granted') {
        Alert.alert('Media Access denied');
        return;
      }
      setHasPermission(cameraStatus.status === 'granted' && mediaStatus.status === 'granted');
    })();
  }, []);

  const handleFlashMode = () => {
    setFlashMode(!flashMode);
  };

  const handleTakePicture = async () => {
    const picture: any = await camera.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(picture.uri);
    setPreviewVisible(true);
    setCapturedPicture(picture);
  };

  const handleCameraType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const handleRetakePicture = () => {
    setCapturedPicture(null);
    setPreviewVisible(false);
  };

  const CameraPreview = ({ picture, retakePicture }: any) => {
    return (
      <View style={styles.cameraPreviewContainer}>
        <ImageBackground
          source={{ uri: picture && picture.uri }}
          style={{
            flex: 1,
          }}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <IconButton
                style={styles.icon}
                color="white"
                icon="camera-retake"
                size={40}
                onPress={retakePicture}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <IconButton
                style={styles.icon}
                color="white"
                icon="check"
                size={40}
                onPress={() => {
                  // { picture } should be in global store
                  navigation.navigate('Location', { picture });
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {previewVisible ? (
        <CameraPreview picture={capturedPicture} retakePicture={handleRetakePicture} />
      ) : (
        <Camera
          style={styles.camera}
          flashMode={flashMode ? 'on' : 'off'}
          type={cameraType}
          ref={(ref) => {
            camera = ref;
          }}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <IconButton
                style={styles.icon}
                color="white"
                icon={flashMode ? 'flash' : 'flash-off'}
                size={40}
                onPress={handleFlashMode}
                disabled={!hasPermission}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <IconButton
                style={styles.button}
                icon="camera"
                size={50}
                onPress={handleTakePicture}
                disabled={!hasPermission}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <IconButton
                style={styles.icon}
                color="white"
                icon="camera-switch-outline"
                size={40}
                onPress={handleCameraType}
                disabled={!hasPermission}
              />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default UserCamera;
