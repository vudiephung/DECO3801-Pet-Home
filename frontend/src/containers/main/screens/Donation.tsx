import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, List, Snackbar } from 'react-native-paper';

import { fromUser, useAppDispatch } from '../../../store';
import theme from '../../../core/theme';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import CustomDialog from '../../../components/CustomDialog';

// Data
const shelters = [
  { id: 0, shelter: 'Animal Emergency Centre Woolloongabba' },
  { id: 1, shelter: 'Australian Pet Welfare Foundation' },
];

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shelterContainer: {
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  avatar: {
    margin: 8,
  },
  donateButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
    width: '55%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
    color: 'white',
  },
});

const Donation = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedShelter, setSelectedShelter] = useState<String | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<String | null>(null);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState<boolean>(false);

  useEffect(() => {
    // Fetch shelters
    setSelectedShelter(shelters[0].shelter);
  }, []);

  const onHandleExpanded = () => {
    setExpanded(!expanded);
  };

  const onHandleAmount = (amount: String) => () => {
    if (amount === selectedAmount) {
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
    }
  };

  const onHandleDonate = () => {
    if (selectedAmount === null) {
      setVisibleSnackbar(true);
    } else {
      setVisibleDialog(true);
    }
  };

  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    dispatch(fromUser.doChangeCurrentTab('donation'));
  });

  return (
    <ImageBackground
      source={require('../../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Header>Donate to animals in need</Header>
        </View>
        <List.Section title="Select a shelter">
          <List.Accordion
            style={styles.shelterContainer}
            left={() => <List.Icon icon="home-search" />}
            title={selectedShelter}
            expanded={expanded}
            onPress={onHandleExpanded}>
            {shelters.map((item) => (
              <List.Item
                key={item.id}
                left={() => <List.Icon icon="home" />}
                title={item.shelter}
                onPress={() => {
                  setSelectedShelter(item.shelter);
                  onHandleExpanded();
                }}
              />
            ))}
          </List.Accordion>
        </List.Section>
        {expanded ? (
          <View />
        ) : (
          <View>
            <List.Section title="Choose an amount">
              <View style={styles.row}>
                <TouchableOpacity onPress={onHandleAmount('5$')}>
                  <Avatar.Text
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          selectedAmount === '5$' ? theme.colors.active : theme.colors.primary,
                      },
                    ]}
                    label="5$"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandleAmount('10$')}>
                  <Avatar.Text
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          selectedAmount === '10$' ? theme.colors.active : theme.colors.primary,
                      },
                    ]}
                    label="10$"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandleAmount('20$')}>
                  <Avatar.Text
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          selectedAmount === '20$' ? theme.colors.active : theme.colors.primary,
                      },
                    ]}
                    label="20$"
                  />
                </TouchableOpacity>
              </View>
            </List.Section>
            <Button
              style={styles.donateButton}
              labelStyle={styles.buttonText}
              onPress={onHandleDonate}>
              Donate
            </Button>
            <CustomDialog visible={visibleDialog} close={() => setVisibleDialog(!visibleDialog)} />
          </View>
        )}
      </ScrollView>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        action={{
          label: 'OK',
        }}
        duration={Snackbar.DURATION_MEDIUM}>
        Please choose an amount to donate
      </Snackbar>
    </ImageBackground>
  );
};

export default Donation;
