import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import SignIn from './src/containers/auth/SignIn';
import SignUp from './src/containers/auth/SignUp';
import Main from './src/containers/main/Main';
import store from './src/store';

const Stack = createStackNavigator();

const App = () => {
  const isAuthenticated = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Signin">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
