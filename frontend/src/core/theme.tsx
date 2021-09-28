import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 50,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F4E4BA',
    secondary: '#b0995a',
    error: '#e24536',
    button: '#F4E4BA',
    active: '#97e8e1',
  },
};

export default theme;
