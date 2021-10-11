import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import BlogItem from './BlogItem';
import { fromBlogs, useAppDispatch } from '../../../../store';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Blog = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const blogs = useSelector(fromBlogs.selectAllBlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fromBlogs.doGetBlogs());
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
    return (
      <BlogItem
        item={item}
        onPress={() => {
          // TO-DO
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default Blog;
