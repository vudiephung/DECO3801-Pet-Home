import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import theme from '../../../../core/theme';

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 4,
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  likes: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
    marginRight: 5,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
  breed: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 16,
  },
  description: {
    flex: 1,
    textAlign: 'justify',
    fontFamily: theme.fonts.regular.fontFamily,
    paddingTop: 8,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    width: '47%',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    width: '47%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 26,
    color: 'white',
  },
  cardButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCell: {
    justifyContent: 'center',
  },
});

const CardItem = ({ item, navigation }: any) => {
  const handleOnPress = () => {
    navigation.navigate('Zone', { rank: item.rank });
  };

  return (
    <Card style={styles.card} onPress={handleOnPress}>
      <Card.Content>
        <View style={styles.title}>
          <Paragraph style={styles.breed}>{item.rank}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardItem;
