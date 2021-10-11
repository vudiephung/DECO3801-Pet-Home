import React from 'react';
import { StyleSheet, View, Linking, Share } from 'react-native';
import { Card, Paragraph, Text, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../../../core/theme';
import { fromBlogs, fromUser, useAppDispatch } from '../../../../store';
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

const BlogItem = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const token = useSelector(fromUser.selectToken);

  const handleLikeBlog = () => {
    dispatch(fromBlogs.doReactBlog(item));
  };

  const handleShareBlog = () => {
    Share.share({
      url: item.url,
      title: item.title,
    });
  };

  const image = () => {
    return {
      uri: `${baseURL}/image/${item.image}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  return (
    <Card style={styles.card} onPress={() => Linking.openURL(item.url)}>
      <Card.Cover source={image()} />
      <Card.Content>
        <View style={styles.title}>
          <Title>{item.title}</Title>
        </View>
        <View>
          <Paragraph>{item.snippet}</Paragraph>
        </View>
        <View style={styles.likeShare}>
          <View style={styles.likes}>
            {!item.liked ? (
              <MaterialCommunityIcons
                name="heart-outline"
                color={theme.colors.error}
                size={40}
                onPress={handleLikeBlog}
              />
            ) : (
              <MaterialCommunityIcons
                name="heart"
                color={theme.colors.error}
                size={40}
                onPress={handleLikeBlog}
              />
            )}
            <Text style={styles.likeCounter}>{item.likeCount}</Text>
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

export default BlogItem;
