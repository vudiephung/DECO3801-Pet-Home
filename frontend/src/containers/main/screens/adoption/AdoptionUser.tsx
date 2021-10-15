import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import CardItem from './CardItem';
import { fromPets, useAppDispatch } from '../../../../store';
import theme from '../../../../core/theme';

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttons: {
    marginTop: 10,
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginVertical: 10,
    marginBottom: 3,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
});

const AdoptionUser = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [shelter, setShelter] = useState<{
    username: string;
    contactNumber: string;
    email: string;
    _id: string;
  } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const pets = useSelector(fromPets.selectAllPets);
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
          if (!selectedId) {
            setSelectedId(item._id);
            setShelter(item.shelter);
          } else setSelectedId(null);
        }}
        visible={visible}
        openModal={() => setOpenModal(true)}
      />
    );
  };

  const closeModal = () => {
    setOpenModal(false);
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
      <Modal isVisible={openModal} onBackdropPress={closeModal} onBackButtonPress={closeModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Name:</Text>
          <Text style={styles.modalText}>{shelter ? shelter.username : null}</Text>
          <Text style={styles.modalHeader}>Phone:</Text>
          <Text style={styles.modalText}>{shelter ? shelter.contactNumber : null}</Text>
          <Text style={styles.modalHeader}>Email:</Text>
          <Text style={styles.modalText}>{shelter ? shelter.email : null}</Text>
          <View style={styles.buttons}>
            <MaterialCommunityIcons
              name="phone"
              color={theme.colors.secondary}
              size={30}
              onPress={() => Linking.openURL(`tel:${shelter ? shelter.contactNumber : null}`)}
            />
            <MaterialCommunityIcons
              name="email"
              color={theme.colors.secondary}
              size={30}
              onPress={() => Linking.openURL(`mailto:${shelter ? shelter.email : null}`)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdoptionUser;
