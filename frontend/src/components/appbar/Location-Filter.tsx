import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { getCities } from '../../services/locations';
import { fromLocations, useAppDispatch } from '../../store';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    color: 'white',
    marginVertical: 12,
  },
});

interface Selector {
  city: string;
  state: string;
}

const LocationFilter = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<string | null>(null);
  const [selectors, setSelectors] = useState<Selector[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const allCities = await getCities();
        setSelectors(allCities);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  let cities = [];
  if (state && selectors && state in selectors) {
    cities = selectors[state].map((element) => {
      return {
        label: element.city,
        value: element.city,
      };
    });
  }

  const onFilter = (city) => {
    dispatch(fromLocations.doFilter({ state, city }));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>States</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setState(value)}
        placeholder={{ label: 'Select a state...', value: null }}
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
        <Text style={styles.label}>Cities</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => onFilter(value)}
        placeholder={{
          label:
            cities.length > 0 ? 'Select a city' : 'No available city, please choose another state',
          value: null,
        }}
        items={cities}
        style={pickerSelectStyles}
      />
    </View>
  );
};

export default LocationFilter;
