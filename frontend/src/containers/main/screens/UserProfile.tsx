import React, { Fragment } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { fromUser } from '../../../store';
import theme from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 230,
    height: 230,
    borderRadius: 360,
    marginBottom: 10,
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  field: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontStyle: 'italic',
    color: theme.colors.secondary,
  },
  content: {
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 5,
  },
});

interface Field {
  label: string;
  content: string | undefined;
}

const InfoField = ({ label, content }: Field) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const UserProfile = () => {
  const isShelter = useSelector(fromUser.selectIsShelter);
  const user = useSelector(fromUser.selectUser);

  const randomUserAvatar = 'https://source.unsplash.com/800x600/?portrait,face';
  const randomShelterAvatar = 'https://source.unsplash.com/800x600/?store,pet';

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={{ uri: isShelter ? randomShelterAvatar : randomUserAvatar }}
        />
        <Text style={styles.username}>{user?.username}</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 60 }}>
        <InfoField label="Email" content={user?.email} />
        {isShelter && <InfoField label="Address" content={user?.address} />}
        {isShelter && <InfoField label="Contact" content={user?.contactNumber} />}
      </View>
    </View>
  );
};

export default UserProfile;
