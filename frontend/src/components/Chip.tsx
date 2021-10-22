import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip as PaperChip } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperChip>;

const styles = StyleSheet.create({
  chip: {
    margin: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const Chip = ({ style, textStyle, selectedColor, children, ...props }: Props) => (
  <PaperChip
    style={[styles.chip, style]}
    textStyle={styles.text}
    selectedColor={selectedColor}
    {...props}>
    {children}
  </PaperChip>
);

export default Chip;
