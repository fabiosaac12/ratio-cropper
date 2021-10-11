import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CropImageScreen } from '../../screens/CropImageScreen';
import { HomeScreen } from '../../screens/HomeScreen';

export type MainStackNavigatorParams = {
  home: undefined;
  cropImage: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => (
  <NavigationContainer ref={navigationContainerRef}>
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="cropImage" component={CropImageScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
