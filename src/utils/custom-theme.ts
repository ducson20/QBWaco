/* eslint-disable */

import { extendTheme } from 'native-base';
// const LinearGradient = require('expo-linear-gradient').LinearGradient;

export const theme = extendTheme({
  colors: {
    primary: {
      600: '#4050b7',
    },
    secondary: {
      600: '#ff3e81',
    },
    danger: {
      600: '#f64043',
    },
    tertiary: {
      600: '#75c33d',
    },
    blue: {
      600: '#aed7e8',
    },
    red: {
      600: '#ff0000',
    },
    yellow: {
      600: '#ffc107',
    },
    amber: {
      600: '#ffa400',
    },
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      200: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      300: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      400: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic',
      },
      500: {
        normal: 'Roboto-Medium',
      },
      600: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic',
      },
      700: {
        normal: 'Roboto-Bold',
      },
      800: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic',
      },
      900: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
  },
  config: {
    initialColorMode: 'dark',
  },
  space: {
    'space-2': '29px',
  },
  components: {
    Button: {
      baseStyle: {},
      defaultProps: {
        size: 'sm',
        colorScheme: 'indigo',
        variant: 'solid',
      },
    },
  },
});

export const config = {
  // dependencies: {
  //   'linear-gradient': LinearGradient,
  // },
};
