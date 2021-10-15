import { Theme } from '../models/Theme';

export const dark: Theme = {
  name: 'dark',
  spacing: (n = 1) => 7 * n,
  radius: (n = 1) => 10 * n,
  palette: {
    greys: {
      100: '#f0f0f0',
      200: '#e0e0e0',
      300: '#d5d5d5',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    white: '#fcfcfc',
    black: '#282828',
    primary: {
      100: '#baf1ee',
      200: '#96e6e3',
      300: '#6edad6',
      400: '#49d0ca',
      500: '#2fb6b1',
      600: '#208e8a',
      700: '#106662',
      800: '#003e3c',
      900: '#001717',
    },
    secondary: {
      100: '#bde5f1',
      200: '#99d3e4',
      300: '#74bfd7',
      400: '#4eadca',
      500: '#3594b1',
      600: '#25738a',
      700: '#155264',
      800: '#04323e',
      900: '#00121a',
    },
    danger: {
      100: '#f4c0c0',
      200: '#e79999',
      300: '#db7071',
      400: '#d04949',
      500: '#b62f2f',
      600: '#8f2424',
      700: '#661819',
      800: '#400d0e',
      900: '#1d0101',
    },
    success: {
      100: '#bef0c6',
      200: '#98e6a3',
      300: '#70da80',
      400: '#49d05c',
      500: '#2fb643',
      600: '#238e33',
      700: '#166523',
      800: '#093e13',
      900: '#001600',
    },
    background: {
      100: '#1c1c1c',
      200: '#242424',
      300: '#292929',
      400: '#2e2e2e',
      500: '#333333',
      600: '#3d3d3d',
      700: '#383838',
      800: '#3b3b3b',
      900: '#454545',
    },
    contrast: {
      100: '#fcfcfc',
      200: '#fafafa',
      300: '#f5f5f5',
      400: '#f0f0f0',
      500: '#ededed',
      600: '#e8e8e8',
      700: '#e3e3e3',
      800: '#dedede',
      900: '#d9d9d9',
    },
    text: {
      primary: '#fcfcfc',
      secondary: '#f1f1f1',
      button: '#fcfcfc',
    },
  },
  shadows: [
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
  ],
};
