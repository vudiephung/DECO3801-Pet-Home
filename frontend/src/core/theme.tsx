import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 50,
  colors: {
    ...DefaultTheme.colors,
    primary: '#edd8b4',
    secondary: '#e6bc75',
    error: '#e24536',
    button: '#e6bc75',
    active: '#97e8e1',
  },
};

export default theme;
