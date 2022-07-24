import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageSourcePropType, RefreshControl} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IconComponent, PostComponent} from '../../components';
import {useAuth, useApp} from '../../context';
import {PostModel, ProfileStackParams} from '../../models';
import {getProfilePostsAxios, uploadFileAxios} from '../../services';
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
  ImageButton,
} from './Styled.ProfileScreen';
import {v4 as uuid} from 'uuid';
import updateProfileImageAxios from '../../services/profile/updateProfileImageAxios';
import {PUBLIC_PROFILE_PATH_SERVER, URL} from '../../../env';

type SettingsNavigationProp = StackNavigationProp<
  ProfileStackParams,
  'SettingsScreen'
>;

/**
 *
 * @returns the profile screen
 */
const ProfileScreen = () => {
  const {theme} = useApp();
  const {user} = useAuth();
  const {t} = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('posts');
  const [mediaUri, setMediaUri] = useState<string | undefined>(undefined);
  const [mediaType, setMediaType] = useState<string | undefined>(undefined);

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
      const user_id = await AsyncStorage.getItem('userId');
      const res = await getProfilePostsAxios(user_id, option);
      option === 'posts' && setPosts(res[0].posts);
      option === 'likes' && setPosts(res);
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
        return t('posts');

      case 'likes':
        return t('likes');
    }
  };

  const handleMediaState = async (): Promise<void> => {
    setMediaUri(undefined);
    setMediaType(undefined);

    const res: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'mixed',
      maxWidth: 400,
      videoQuality: 'low',
    });

    const media = res.assets![0];

    setMediaUri(media.uri);
    setMediaType(media.type);

    const uniqueId: string = uuid();
    const user_id: string | null = await AsyncStorage.getItem('userId');

    const fileType = mediaType?.split('/')[0];
    const media_id = mediaUri
      ? `profile.${user_id}.${fileType}.${uniqueId}.${mediaUri
          .split('.')
          .pop()}`
      : null;

    console.log(mediaType, media_id, mediaUri);

    if (mediaType && media_id && mediaUri) {
      try {
        await uploadFileAxios(mediaUri, media_id, mediaType);
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    try {
      await updateProfileImageAxios(user_id, media_id);
    } catch (e: any) {
      throw new Error(e.message);
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
        <NoContentText>
          {t('no')} {renderPhrase()} {t('found')}
        </NoContentText>
        <NoContentText>{t('noProfilePostsText')}</NoContentText>
      </NoContentView>
    );
  };

  const media_id = user!.picture;

  const path: string = `${URL}${PUBLIC_PROFILE_PATH_SERVER}/images/${media_id}`;

  console.log('path for profile image', path);

  console.log(user);

  const ChosenImage = mediaUri ? mediaUri : path;

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <ProfilePictureWrapper>
          <ImageButton onPress={handleMediaState}>
            <ProfilePicture
              resizeMode="stretch"
              source={
                user!.picture
                  ? {uri: ChosenImage}
                  : require('../../assets/Images/profile-Placeholder.png')
              }
            />
          </ImageButton>
        </ProfilePictureWrapper>
        <ProfileNameWrapper>
          <ProfileName>{user!.name}</ProfileName>
        </ProfileNameWrapper>
      </ProfileHeader>
      <ProfileInfoWrapper>
        <ProfileInfoAccAge>
          {t('created')}: {timeAgo(user!.dateCreated)}
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
          <ProfileMediaOptionsText>{t('posts')}</ProfileMediaOptionsText>
        </ProfileOptionsButton>
        <ProfileOptionsButton
          style={{
            backgroundColor:
              filter === 'likes'
                ? theme.screen.primaryColor
                : theme.screen.background,
          }}
          onPress={() => loadPosts('likes')}>
          <ProfileMediaOptionsText>{t('likes')}</ProfileMediaOptionsText>
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
