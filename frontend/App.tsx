import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import CustomAppbar from './src/components/CustomAppbar';
import SignIn from './src/containers/auth/SignIn';
import SignUp from './src/containers/auth/SignUp';
import Main from './src/containers/main/Main';
import AddPet from './src/containers/add-pet/AddPet';
import PickImages from './src/containers/add-pet/PickImages';
import store from './src/store';
import theme from './src/core/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main" screenOptions={{ header: CustomAppbar }}>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="AddPet" component={AddPet} options={{ headerShown: false }} />
            <Stack.Screen
              name="PickImages"
              component={PickImages}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
