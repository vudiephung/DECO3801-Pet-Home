// import { useFocusEffect } from '@react-navigation/native';
// import React from 'react';
// import { View, Text } from 'react-native';

// import { fromUser, useAppDispatch } from '../../../store';

// const Blog = () => {
//   const dispatch = useAppDispatch();
//   useFocusEffect(() => {
//     dispatch(fromUser.doChangeCurrentTab('blog'));
//   });

//   return (
//     <View>
//       <Text>Blog</Text>
//     </View>
//   );
// };

// export default Blog;

import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import BlogItem from './BlogItem';
import { fromPets, useAppDispatch } from '../../../../store';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Blog = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
      <BlogItem
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

export default Blog;
