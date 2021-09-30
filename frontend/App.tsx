import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import CustomAppbar from './src/components/appbar';
import CustomAppbarCamera from './src/components/CustomAppbarCamera';
import UserCamera from './src/containers/main/screens/location/UserCamera';
import SignIn from './src/containers/auth/SignIn';
import SignUp from './src/containers/auth/SignUp';
import MainDrawerNavigator from './src/containers/main/MainDrawerNavigator';
import store from './src/store';
import theme from './src/core/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{ header: CustomAppbar }}>
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="MainDrawerNavigator" component={MainDrawerNavigator} />
              <Stack.Screen
                name="Camera"
                component={UserCamera}
                options={{
                  headerTransparent: true,
                  header: CustomAppbarCamera,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
