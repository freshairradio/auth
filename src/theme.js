import { theme, DarkMode } from '@chakra-ui/core'
export const freshairTheme = {
  ...theme,
  fonts: {
    heading: `"Concourse T2", sans-serif`,
    body: `"Concourse T2", sans-serif`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`
  },
  colors: {
    ...theme.colors,
    orange: {
      100: '#FFF3E7',
      200: '#FFE1C3',
      300: '#FFCF9F',
      400: '#FFAC58',
      500: '#FF8810',
      600: '#E67A0E',
      700: '#99520A',
      800: '#733D07',
      900: '#4D2905'
    },
    grey: {
      100: '#F4F4F4',
      200: '#E3E5E3',
      300: '#D3D5D3',
      400: '#B1B5B1',
      500: '#909590',
      600: '#828682',
      700: '#565956',
      800: '#414341',
      900: '#2B2D2B'
    },
    black: {
      100: '#EAEBEB',
      200: '#CCCDCD',
      300: '#ADAFAF',
      400: '#6F7274',
      500: '#313638',
      600: '#2C3132',
      700: '#1D2022',
      800: '#161819',
      900: '#0F1011'
    }
  }
}
