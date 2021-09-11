import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Button from '../../../../components/Button';
import theme from '../../../../core/theme';
import { fromPets, useAppDispatch } from '../../../../store';
import PetTable from './PetTableInfo';

const data = [
  {
    id: '0',
    likes: 10,
    age: 1,
    picture: require('../../../../assets/cat.jpg'),
    breed: 'Maine Coon',
    name: 'Professor Sherlock Meowington',
    description:
      'The Maine Coon is a heavily boned, muscular cat. Originally she was an outdoor cat, and later became a working breed who kept barns and homes clear of rodents. The head is large with tall ears. The profile shows a slight dip under the large eyes. The chest is broad, and the legs are thick. The coat of the Maine Coon is heavy but silky. An interesting characteristic is that the coat is shaggy and drapes longer on the stomach and behind the legs (britches) but is shorter over the shoulders.',
  },
  {
    id: '1',
    likes: 20,
    age: 2,
    picture: require('../../../../assets/dog.jpg'),
    breed: 'Border Collie',
    name: 'Penelope Petunia Peachtree',
    description:
      'Border Collies are frighteningly smart, active workaholics who must have a job that can be as simple as chasing a tennis ball or as demanding as training for something like herding, agility obedience, or freestyle. What the job is doesnt matter so much as that the Border has a job. The Border is an excellent watchdog and will alert you to the arrival of the letter carrier, a burglar, or a squirrel. Some can become nuisance barkers.',
  },
  {
    id: '2',
    likes: 15,
    age: 3,
    picture: require('../../../../assets/dog.jpg'),
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
  heartIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  likesNumber: {
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
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
  },
  breed: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: 'bold',
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
  addButton: {
    backgroundColor: theme.colors.primary,
    width: '30%',
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 26,
    color: 'white',
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    color: 'white',
  },
  cardButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const CardItem = ({ item, onPress, visible }: any) => {
  // const token = useSelector(fromUser.selectToken);

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={item.picture} />
      {/* testing get image API */}
      {/* <Card.Cover
        source={{
          uri: 'http://10.0.2.2:5000/image/key',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
      /> */}
      <Card.Content>
        <View style={styles.title}>
          <Paragraph style={styles.breed}>{item.breed}</Paragraph>
          <Paragraph style={styles.name}>{item.name}</Paragraph>
        </View>
        {!!visible && (
          <View>
            <PetTable />
            <Paragraph style={styles.description}>{item.description}</Paragraph>
            <View style={styles.cardButtons}>
              <Button
                style={styles.editButton}
                labelStyle={styles.buttonText}
                onPress={() => {
                  console.log('edit');
                }}>
                Edit
              </Button>
              <Button
                style={styles.deleteButton}
                labelStyle={styles.buttonText}
                onPress={() => {
                  console.log('delete');
                }}>
                Delete
              </Button>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const AdoptionShelter = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // Test allPets selector, still need GET APIs for further integration and testing
  const pets = useSelector(fromPets.selectAllPets);
  console.log(pets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fromPets.doGetOwnedPets());
      } catch (e) {
        console.log(e);
      }
    })();
    setRefreshing(false);
  }, []);

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
          if (!selectedId) setSelectedId(item.id);
          else setSelectedId(null);
        }}
        visible={visible}
      />
    );
  };

  const handleAddPet = () => {
    navigation.navigate('AddPet');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button style={styles.addButton} labelStyle={styles.addButtonText} onPress={handleAddPet}>
        +
      </Button>
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

export default AdoptionShelter;
