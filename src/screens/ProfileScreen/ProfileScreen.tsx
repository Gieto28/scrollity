import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text>Name: John Doe</Text>
      <TouchableOpacity>
        <Text>Edit profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
