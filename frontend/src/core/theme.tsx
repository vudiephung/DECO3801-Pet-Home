import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 50,
  colors: {
    ...DefaultTheme.colors,
    primary: '#e8d297',
    secondary: '#cfb15d',
    error: '#e24536',
    button: '#e8d297',
    active: '#97e8e1',
  },
};

export default theme;
