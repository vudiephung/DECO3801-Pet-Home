import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, DataTable, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Button from '../../../../components/Button';
import theme from '../../../../core/theme';
import { baseURL } from '../../../../services/config';
import { fromPets, fromUser, useAppDispatch } from '../../../../store';

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
};

const AdoptionUser = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const pets: any[] = useSelector(fromPets.selectAllPets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fromPets.doGetPets());
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

  return (
    <SafeAreaView style={styles.container}>
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

export default AdoptionUser;
