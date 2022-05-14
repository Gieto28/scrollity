import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Text>Name: John Doe</Text>
      <TouchableOpacity>
        <Text>Edit profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
