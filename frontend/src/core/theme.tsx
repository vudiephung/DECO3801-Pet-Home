import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 50,
  colors: {
    ...DefaultTheme.colors,
    primary: '#917681',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export default theme;
