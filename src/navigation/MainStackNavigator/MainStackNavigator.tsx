import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CropImageScreen } from '../../screens/CropImageScreen';
import { HomeScreen } from '../../screens/HomeScreen';

export type MainStackNavigatorParamas = {
  home: undefined;
  cropImage: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParamas>();

export const MainStackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="cropImage" component={CropImageScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
