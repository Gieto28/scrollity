import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {IconComponent} from '../../components';
import {useAuth, useAppSettings} from '../../context';
import {ProfileStackParams} from '../../models';
import {getProfilePostsAxios} from '../../services';
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
  const {theme} = useAppSettings();
  const {user, userId} = useAuth();

  const [posts, setPosts] = useState();

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/settings-32-dark.png')
    : require('../../assets/Images/settings-32-light.png');

  const navigation = useNavigation<SettingsNavigationProp>();

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const fetchPosts = async (option: string) => {
    try {
      const res = await getProfilePostsAxios(userId, option);
      console.log(res.data[0].posts);
      console.log(res.data[0].likes);
      setPosts(res.data);
    } catch (e: any) {
      throw new Error(e.message);
    }
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
          <ProfileName>{user!.name}</ProfileName>
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
        <ProfileOptionsButton onPress={() => fetchPosts('posts')}>
          <ProfileMediaOptionsText>Posts</ProfileMediaOptionsText>
        </ProfileOptionsButton>
        <ProfileOptionsButton onPress={() => fetchPosts('likes')}>
          <ProfileMediaOptionsText>Likes</ProfileMediaOptionsText>
        </ProfileOptionsButton>
      </ProfileMediaOptionsWrapper>
    </AppScrollView>
  );
};

export default ProfileScreen;
