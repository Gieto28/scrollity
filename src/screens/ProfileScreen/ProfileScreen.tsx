import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {IconComponent} from '../../components';
import {useAuth, useAppSettings, useApp} from '../../context';
import {ProfileStackParams} from '../../models';
import {AppScrollView} from '../../styles/GlobalStyle';
import {
  ProfileHeader,
  ProfileInfoAccAge,
  ProfileInfoWrapper,
  ProfileMediaOptionsText,
  ProfileMediaOptionsWrapper,
  ProfileName,
  ProfileNameWrapper,
  ProfileOptionsButton,
  ProfilePicture,
  ProfilePictureWrapper,
} from './Styled.ProfileScreen';

type SettingsNavigationProp = StackNavigationProp<
  ProfileStackParams,
  'SettingsScreen'
>;

/**
 *
 * @returns the profile screen
 */
const ProfileScreen = () => {
  const {signOut} = useAuth();
  const {theme} = useAppSettings();
  const {user} = useApp();
  console.log('user', user);

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/settings-32-dark.png')
    : require('../../assets/Images/settings-32-light.png');

  const handleSignOut = () => {
    signOut();
  };

  const navigation = useNavigation<SettingsNavigationProp>();

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
    console.log('settings button is working');
  };

  const handleShowPosts = () => {
    console.log('show posts button is working');
  };

  const handleShowLikes = () => {
    console.log('show likes button is working');
  };

  return (
    <AppScrollView>
      <ProfileHeader>
        <ProfilePictureWrapper>
          <ProfilePicture
            resizeMode="contain"
            source={require('../../assets/Images/profile-Placeholder.png')}
          />
        </ProfilePictureWrapper>
        <ProfileNameWrapper>
          <ProfileName>{user.profile.name}</ProfileName>
        </ProfileNameWrapper>
      </ProfileHeader>
      <ProfileInfoWrapper>
        <ProfileInfoAccAge>Age: 200 days</ProfileInfoAccAge>
        <IconComponent
          image={lightDarkIcon}
          onPress={handleSettings}
          altText="Click this button to go to the settings page"
        />
      </ProfileInfoWrapper>
      <ProfileMediaOptionsWrapper>
        <ProfileOptionsButton onPress={handleShowPosts}>
          <ProfileMediaOptionsText>Posts</ProfileMediaOptionsText>
        </ProfileOptionsButton>
        <ProfileOptionsButton onPress={handleShowLikes}>
          <ProfileMediaOptionsText>Likes</ProfileMediaOptionsText>
        </ProfileOptionsButton>
      </ProfileMediaOptionsWrapper>
    </AppScrollView>
  );
};

export default ProfileScreen;
