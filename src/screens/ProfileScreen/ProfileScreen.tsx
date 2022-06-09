import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {IconComponent} from '../../components';
import {useApp} from '../../context/App';
import {useAuth} from '../../context/Auth';
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

/**
 *
 * @returns the profile screen
 */
const ProfileScreen = () => {
  const {signOut} = useAuth();
  const {theme} = useApp();

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const handleSignOut = () => {
    signOut();
  };

  const handleSettings = () => {
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
          <ProfileName>Meu Nome</ProfileName>
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
