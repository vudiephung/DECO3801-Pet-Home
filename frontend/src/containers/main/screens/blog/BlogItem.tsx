import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
// @ts-ignore
import { SliderBox } from 'react-native-image-slider-box';

import theme from '../../../../core/theme';
import { fromUser, useAppDispatch } from '../../../../store';
import { baseURL } from '../../../../services/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  likeShare: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  likes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // textAlign: 'left',
    marginLeft: 20,
    marginRight: 0,
  },
  likeCounter: {
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 5,
    flexDirection: 'row',
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 20,
  },
  share: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
  },
});

const CardItem = ({ item, navigation, isFavPetScreen }: any) => {
  const dispatch = useAppDispatch();
  const token = useSelector(fromUser.selectToken);

  const handleLikeBlog = () => {
    // TO-DO
  };

  const handleShareBlog = () => {
    // TO-DO
  };

  const images = item.images.map((image: string) => {
    return {
      uri: `${baseURL}/image/${image}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  return (
    <Card style={styles.card}>
      <SliderBox images={images} />
      <Card.Content>
        <View style={styles.title}>
          <Title>Blog Title</Title>
        </View>
        <View style={styles.likeShare}>
          <View style={styles.likes}>
            <MaterialCommunityIcons
              name="heart-outline"
              color={theme.colors.error}
              size={40}
              onPress={handleLikeBlog}
            />
            <Text style={styles.likeCounter}>10</Text>
          </View>
          <MaterialCommunityIcons
            style={styles.share}
            name="export-variant"
            color={theme.colors.active}
            size={40}
            onPress={handleShareBlog}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardItem;
