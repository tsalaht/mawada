import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Type from './Type';
import RegisterScreen from './RegisterScreen';
import Login from './Login';

import { View } from 'react-native';

const Stack = createNativeStackNavigator<any>();

const AuthPages: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
              headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
              headerShown: false,
        }}
      />
      <Stack.Screen
        name="Type"
        component={Type}
        options={{
              headerShown: false,
        }}
      />
      <Stack.Screen
        name="recoveryPassword"
        component={Login}
        options={{
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthPages;
