import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CropImageScreen } from '../../screens/CropImageScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { useTheme } from '../../providers/Theme';
import { Image } from 'react-native';
import { images } from '../../assets';

export type MainStackNavigatorParams = {
  home: undefined;
  cropImage: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.palette.background[100],
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.palette.background[100] },
          headerTitleStyle: {
            fontSize: 21,
          },
          headerTintColor: theme.palette.primary[500],
          headerLargeTitle: true,
          orientation: 'portrait_up',
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'Ratio Cropper',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <Image
                source={images.logo}
                style={{ width: 80, height: 80, marginRight: 15 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="cropImage"
          component={CropImageScreen}
          options={{ title: 'Crop Image', headerLargeTitle: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
