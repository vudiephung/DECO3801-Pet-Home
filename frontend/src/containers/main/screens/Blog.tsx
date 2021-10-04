import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

import { fromUser, useAppDispatch } from '../../../store';

const Blog = () => {
  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    dispatch(fromUser.doChangeCurrentTab('blog'));
  });

  return (
    <View>
      <Text>Blog</Text>
    </View>
  );
};

export default Blog;
