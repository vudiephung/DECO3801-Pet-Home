import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import theme from '../../../../core/theme';
import { fromUser, useAppDispatch } from '../../../../store';

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 4,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const CardItem = ({ zone, navigation, clearZones }: any) => {
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    dispatch(fromUser.doChangeCurrentTab('zone'));
    navigation.navigate('Zone', { zone });
    clearZones();
  };

  return (
    <Card style={styles.card} onPress={handleOnPress}>
      <Card.Content>
        <View>
          <Paragraph style={styles.name}>{zone.locality}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardItem;
