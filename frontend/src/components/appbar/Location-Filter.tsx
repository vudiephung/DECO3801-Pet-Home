import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import theme from '../../core/theme';

const styles = StyleSheet.create({
  column: { flexDirection: 'column', justifyContent: 'center' },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const LocationFilter = () => {
  const [distance, setDistance] = useState(10);
  const [top, setTop] = useState(10);

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text>Distance: {distance}</Text>
      </View>
      <View style={styles.row}>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={10}
          maximumValue={100}
          step={10}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor={theme.colors.active}
          onValueChange={(value) => setDistance(value)}
        />
      </View>
      <View style={styles.row}>
        <Text>Top: {top}</Text>
      </View>
      <View style={styles.row}>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={10}
          maximumValue={30}
          step={10}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor={theme.colors.active}
          onValueChange={(value) => setTop(value)}
        />
      </View>
    </View>
  );
};

export default LocationFilter;
