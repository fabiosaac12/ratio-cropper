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
import { useMessages } from './MainStackNavigatorMessages';

export type MainStackNavigatorParams = {
  home: undefined;
  cropImage: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => {
  const messages = useMessages();
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
              fontSize: 28,
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <Image
                source={images.logo}
                style={{ width: 75, height: 75, marginRight: 12 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="cropImage"
          component={CropImageScreen}
          options={{
            title: messages.cropImageScreenTitle,
            headerLargeTitle: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
