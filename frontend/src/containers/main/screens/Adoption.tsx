import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import Button from '../../../components/Button';
import theme from '../../../core/theme';

const data = [
  {
    id: '0',
    picture: require('../../../assets/cat.jpg'),
    breed: 'Maine Coon',
    name: 'Professor Sherlock Meowington',
    description:
      'The Maine Coon is a heavily boned, muscular cat. Originally she was an outdoor cat, and later became a working breed who kept barns and homes clear of rodents. The head is large with tall ears. The profile shows a slight dip under the large eyes. The chest is broad, and the legs are thick. The coat of the Maine Coon is heavy but silky. An interesting characteristic is that the coat is shaggy and drapes longer on the stomach and behind the legs (britches) but is shorter over the shoulders.',
  },
  {
    id: '1',
    picture: require('../../../assets/dog.jpg'),
    breed: 'Border Collie',
    name: 'Penelope Petunia Peachtree',
    description:
      'Border Collies are frighteningly smart, active workaholics who must have a job that can be as simple as chasing a tennis ball or as demanding as training for something like herding, agility obedience, or freestyle. What the job is doesnt matter so much as that the Border has a job. The Border is an excellent watchdog and will alert you to the arrival of the letter carrier, a burglar, or a squirrel. Some can become nuisance barkers.',
  },
];

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
  breed: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
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
  button: { backgroundColor: theme.colors.primary },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 26,
    color: 'white',
  },
});

const CardItem = ({ item, onPress, visible }: any) => (
  <Card style={styles.card} onPress={onPress}>
    <Card.Cover source={item.picture} />
    <Card.Content>
      <View style={styles.title}>
        <Paragraph style={styles.breed}>{item.breed}</Paragraph>
        <Paragraph style={styles.name}>{item.name}</Paragraph>
      </View>
      {visible && (
        <View>
          <Paragraph style={styles.description}>{item.description}</Paragraph>
          <Button
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={() => {
              console.log('add to collection');
            }}>
            add to collection
          </Button>
          <Button
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={() => {
              console.log('contact shelter');
            }}>
            contact shelter
          </Button>
        </View>
      )}
    </Card.Content>
  </Card>
);

const Adoption = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setRefreshing(false);
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setSelectedId(null);
  };

  const renderItem = ({ item }: any) => {
    const visible = item.id === selectedId;
    return (
      <CardItem
        item={item}
        onPress={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !selectedId ? setSelectedId(item.id) : setSelectedId(null);
        }}
        visible={visible}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default Adoption;
