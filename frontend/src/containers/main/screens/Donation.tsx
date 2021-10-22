import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Colors, Divider, List, ProgressBar, Snackbar } from 'react-native-paper';

import { fromUser, useAppDispatch } from '../../../store';
import theme from '../../../core/theme';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import CustomDialog from '../../../components/CustomDialog';

// Data
const shelters = [
  { id: 0, shelter: 'Animal Emergency Centre Woolloongabba', progress: 0.7 },
  { id: 1, shelter: 'Australian Pet Welfare Foundation', progress: 0.3 },
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
    backgroundColor: 'white',
  },
  title: {
    color: Colors.black,
  },
  progress: {
    padding: 16,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  avatar: {
    margin: 10,
  },
  label: {
    fontSize: 22,
  },
  donateButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.button,
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
  const [selectedShelterProgress, setSelectedShelterProgress] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<String | null>(null);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState<boolean>(false);

  useEffect(() => {
    // Fetch shelters
    setSelectedShelter(shelters[0].shelter);
    setSelectedShelterProgress(shelters[0].progress);
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

  const onSubmitDonate = () => {
    console.log(selectedShelter);
    console.log(selectedAmount);
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
            titleStyle={styles.title}
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
                  setSelectedShelterProgress(item.progress);
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
            <List.Section title="Donation progress">
              <View
                style={[
                  styles.progress,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                  },
                ]}>
                <Avatar.Icon icon="currency-usd" size={36} />
                <View style={{ alignSelf: 'center' }}>
                  <ProgressBar
                    progress={selectedShelterProgress}
                    visible
                    color={theme.colors.active}
                    style={{
                      backgroundColor: theme.colors.primary,
                      width: Dimensions.get('window').width - 100,
                    }}
                  />
                </View>
                <Avatar.Icon icon="bone" size={36} />
              </View>
            </List.Section>
            <Divider />
            <List.Section title="Choose an amount">
              <View style={styles.row}>
                <TouchableOpacity onPress={onHandleAmount('5$')}>
                  <Avatar.Text
                    color="white"
                    labelStyle={styles.label}
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          selectedAmount === '5$' ? theme.colors.active : theme.colors.secondary,
                      },
                    ]}
                    label="5$"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandleAmount('10$')}>
                  <Avatar.Text
                    color="white"
                    labelStyle={styles.label}
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          selectedAmount === '10$' ? theme.colors.active : theme.colors.secondary,
                      },
                    ]}
                    label="10$"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandleAmount('20$')}>
                  <Avatar.Text
                    color="white"
                    labelStyle={styles.label}
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          selectedAmount === '20$' ? theme.colors.active : theme.colors.secondary,
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
            <CustomDialog
              visible={visibleDialog}
              close={() => setVisibleDialog(!visibleDialog)}
              onSubmitDonate={() => {
                onSubmitDonate();
                setVisibleDialog(!visibleDialog);
              }}
            />
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
