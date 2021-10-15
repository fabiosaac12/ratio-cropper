import { Theme } from '../models/Theme';

export const light: Theme = {
  name: 'light',
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
      100: '#bcefed',
      200: '#99e2e0',
      300: '#73d6d2',
      400: '#4fcac5',
      500: '#35b0ac',
      600: '#248986',
      700: '#16635f',
      800: '#033c3a',
      900: '#001715',
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
      100: '#f2c2c2',
      200: '#e39c9c',
      300: '#d77576',
      400: '#ca4f4f',
      500: '#b03535',
      600: '#8a2828',
      700: '#631c1d',
      800: '#3e0f10',
      900: '#1d0202',
    },
    success: {
      100: '#c0eec2',
      200: '#9be19c',
      300: '#75d676',
      400: '#4fca51',
      500: '#35b037',
      600: '#27892a',
      700: '#1b621d',
      800: '#0c3c0e',
      900: '#001600',
    },
    background: {
      100: '#fcfcfc',
      200: '#fafafa',
      300: '#f5f5f5',
      400: '#f0f0f0',
      500: '#ededed',
      600: '#e8e8e8',
      700: '#e3e3e3',
      800: '#dedede',
      900: '#c9c9c9',
    },
    contrast: {
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
    text: {
      primary: '#282828',
      secondary: '#424242',
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
