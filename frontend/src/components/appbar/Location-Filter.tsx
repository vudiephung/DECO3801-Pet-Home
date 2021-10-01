import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import theme from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
  },
  label: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    color: theme.colors.secondary,
    marginVertical: 12,
  },
});

const LocationFilter = () => {
  const [state, setState] = useState<string | null>(null);
  console.log(state);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>States</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setState(value)}
        placeholder={{ label: 'Select a type of pet...', value: null }}
        items={[
          { label: 'New South Wales', value: 'NSW' },
          { label: 'Queensland', value: 'QLD' },
          { label: 'South Australia', value: 'SA' },
          { label: 'Tasmania', value: 'TAS' },
          { label: 'Victoria', value: 'VIC' },
          { label: 'Western Australia', value: 'WA' },
          { label: 'Northen Territory', value: 'NT' },
        ]}
        style={pickerSelectStyles}
      />
      <View>
        <Text style={styles.label}>City</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: 'Select a type of pet...', value: null }}
        items={[
          { label: 'Gold Coast', value: 'dog' },
          { label: 'Sunshine Coast', value: 'cat' },
          { label: 'Brisbane', value: 'hamster' },
        ]}
        style={pickerSelectStyles}
      />
    </View>
  );
};

export default LocationFilter;
