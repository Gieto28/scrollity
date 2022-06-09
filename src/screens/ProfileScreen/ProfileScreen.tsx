import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAuth} from '../../context/Auth';

const ProfileScreen = () => {
  const {signOut} = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text>Name: John Doe</Text>
      <TouchableOpacity>
        <Text>Edit profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Touch here to sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
