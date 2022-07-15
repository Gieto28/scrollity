import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ImageSourcePropType, RefreshControl} from 'react-native';
import {IconComponent, PostComponent} from '../../components';
import {useAuth, useAppSettings} from '../../context';
import {PostModel, ProfileStackParams} from '../../models';
import {getProfilePostsAxios} from '../../services';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';
import {timeAgo} from '../../utils/timeAgo';
import {
  ProfileHeader,
  ProfileInfoAccAge,
  ProfileInfoWrapper,
  ProfileMediaOptionsText,
  ProfileFilter,
  ProfileName,
  ProfileNameWrapper,
  ProfileOptionsButton,
  ProfilePicture,
  ProfilePictureWrapper,
  ProfilePostsWrapper,
  ProfileScroll,
  ProfileWrapper,
  RenderPosts,
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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('posts');

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/settings-32-dark.png')
    : require('../../assets/Images/settings-32-light.png');

  const navigation = useNavigation<SettingsNavigationProp>();

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const loadPosts = async (option: string) => {
    setFilter(option);

    try {
      setLoading(true);
      const res = await getProfilePostsAxios(userId, option);
      option === 'posts' && setPosts(res.data[0].posts);
      option === 'likes' && setPosts(res.data[1]);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts('posts');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = async () => {
    loadPosts('posts');
  };

  const renderPhrase = () => {
    switch (filter) {
      case 'posts':
        return 'posts';

      case 'likes':
        return 'likes';
    }
  };

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post: PostModel) => (
        <ProfilePostsWrapper key={post._id}>
          <PostComponent IconToCommentsScreen={true} postObject={post} />
        </ProfilePostsWrapper>
      ))
    ) : (
      <NoContentView>
        <NoContentText>No {renderPhrase()} found...</NoContentText>
        <NoContentText>Go to Home screen and add some!</NoContentText>
      </NoContentView>
    );
  };

  return (
    <ProfileWrapper>
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
        <ProfileInfoAccAge>
          Created: {timeAgo(user!.dateCreated)}
        </ProfileInfoAccAge>
        <IconComponent
          image={lightDarkIcon}
          onPress={handleSettings}
          altText="Click this button to go to the settings page"
        />
      </ProfileInfoWrapper>
      <ProfileFilter>
        <ProfileOptionsButton
          style={{
            backgroundColor:
              filter === 'posts'
                ? theme.screen.primaryColor
                : theme.screen.background,
          }}
          onPress={() => loadPosts('posts')}>
          <ProfileMediaOptionsText>Posts</ProfileMediaOptionsText>
        </ProfileOptionsButton>
        <ProfileOptionsButton
          style={{
            backgroundColor:
              filter === 'likes'
                ? theme.screen.primaryColor
                : theme.screen.background,
          }}
          onPress={() => loadPosts('likes')}>
          <ProfileMediaOptionsText>Likes</ProfileMediaOptionsText>
        </ProfileOptionsButton>
      </ProfileFilter>
      <ProfileScroll
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[theme.screen.secondaryColor]}
            tintColor={theme.screen.secondaryColor}
            progressViewOffset={0}
          />
        }>
        <RenderPosts>{!loading && renderPosts()}</RenderPosts>
      </ProfileScroll>
    </ProfileWrapper>
  );
};

export default ProfileScreen;
