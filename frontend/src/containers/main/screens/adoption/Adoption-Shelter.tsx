import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, DataTable, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Button from '../../../../components/Button';
import theme from '../../../../core/theme';
import { fromPets, fromUser, useAppDispatch } from '../../../../store';
import { baseURL } from '../../../../services/config';

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
  rowCell: {
    justifyContent: 'center',
  },
});

function createData(field: string, value: string) {
  return { field, value };
}

const CardItem = ({ item, onPress, visible }: any) => {
  const token = useSelector(fromUser.selectToken);
  const tableRows = [createData('Type', item.type), createData('Age', item.age)];
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover
        source={{
          uri: `${baseURL}/image/${item.images[0]}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
      />
      <Card.Content>
        <View style={styles.title}>
          <Paragraph style={styles.breed}>{item.breed}</Paragraph>
          <Paragraph style={styles.name}>{item.name}</Paragraph>
        </View>
        {!!visible && (
          <View>
            <DataTable>
              {tableRows.map((row) => (
                <DataTable.Row>
                  <DataTable.Cell style={styles.rowCell}>{row.field}</DataTable.Cell>
                  <DataTable.Cell style={styles.rowCell}>{row.value}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
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
  const pets: any[] = useSelector(fromPets.selectAllPets);
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
    const visible = item._id === selectedId;
    return (
      <CardItem
        item={item}
        onPress={() => {
          if (!selectedId) setSelectedId(item._id);
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
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default AdoptionShelter;
