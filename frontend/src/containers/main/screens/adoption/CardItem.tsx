import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, DataTable, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
// @ts-ignore
import { SliderBox } from 'react-native-image-slider-box';

import Button from '../../../../components/Button';
import theme from '../../../../core/theme';
import { fromPets, fromUser, useAppDispatch } from '../../../../store';
import { baseURL } from '../../../../services/config';

function createData(field: string, value: string) {
  return { field, value };
}

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
  deleteFavButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.error,
    width: '55%',
  },
  addFavButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
    width: '55%',
  },
  disabledButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#cccccc',
    width: '55%',
    color: '#666666',
  },
});

const CardItem = ({ item, onPress, visible, navigation, isFavPetScreen }: any) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const token = useSelector(fromUser.selectToken);
  const tableRows = [createData('Type', item.type), createData('Age', item.age)];
  const isShelter = useSelector(fromUser.selectIsShelter);
  const favPetIds = useSelector(fromUser.selectFavPetIds);

  const handleDelete = () => {
    dispatch(fromPets.doDeletePet(item._id));
  };

  const handleAddFavoritePet = () => {
    dispatch(fromUser.doAddFavoritePet(item._id));
  };

  const handleDeleteFavPet = () => {
    dispatch(fromUser.doDeleteFavoritePet(item._id));
  };

  const renderButtons = (itemId: string) => {
    if (isFavPetScreen) {
      return (
        <Button
          style={styles.deleteFavButton}
          labelStyle={styles.buttonText}
          onPress={handleDeleteFavPet}>
          Delete from Favorite
        </Button>
      );
    }

    if (favPetIds && favPetIds.includes(itemId)) {
      return (
        <Button
          disabled
          style={styles.disabledButton}
          labelStyle={styles.buttonText}
          onPress={handleAddFavoritePet}>
          Added to Favorite
        </Button>
      );
    }

    if (isShelter) {
      return (
        <View style={styles.cardButtons}>
          <Button
            style={styles.editButton}
            labelStyle={styles.buttonText}
            onPress={() => {
              navigation.navigate('EditPet', { pet: item });
            }}>
            Edit
          </Button>
          <Button style={styles.deleteButton} labelStyle={styles.buttonText} onPress={handleDelete}>
            Delete
          </Button>
        </View>
      );
    }
    return (
      <Button
        style={styles.addFavButton}
        labelStyle={styles.buttonText}
        onPress={handleAddFavoritePet}>
        Add to Favorite
      </Button>
    );
  };

  const images = item.images.map((image: string) => {
    return {
      uri: `${baseURL}/image/${image}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const handleOnPress = (index: number) => {
    setSelectedImage(index);
    onPress();
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      {visible ? (
        <SliderBox
          onCurrentImagePressed={(index: number) => handleOnPress(index)}
          images={images}
        />
      ) : (
        <Card.Cover source={images[selectedImage]} />
      )}
      <Card.Content>
        <View style={styles.title}>
          <Paragraph style={styles.name}>{item.name}</Paragraph>
          <Paragraph style={styles.breed}>{item.breed}</Paragraph>
        </View>
        {!!visible && (
          <View>
            <DataTable>
              {tableRows.map((row) => (
                <DataTable.Row key={row.field}>
                  <DataTable.Cell style={styles.rowCell}>{row.field}</DataTable.Cell>
                  <DataTable.Cell style={styles.rowCell}>{row.value}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            {item.description.map((paragraph: string, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Paragraph style={styles.description} key={index}>
                {paragraph}
              </Paragraph>
            ))}
            {renderButtons(item._id)}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default CardItem;
