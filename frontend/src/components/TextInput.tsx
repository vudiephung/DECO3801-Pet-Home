import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

import theme from '../core/theme';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
});

const TextInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
  </View>
);

export default memo(TextInput);
