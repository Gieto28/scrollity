import React, {useState} from 'react';
import {
  PostBody,
  PostDescription,
  PostFooter,
  PostFullWidth,
  PostMedia,
  PostTitle,
  PostValuesWrapper,
  PostValues,
  PostWrapper,
  PostHeader,
  PostUpVoteIcon,
  PostDownVoteIcon,
  PostMessageIcon,
  PostButtonIcon,
  PostHeaderTop,
  PostHeaderTopText,
  PostDescriptionWrapper,
  PostMediaWrapper,
} from './Styled.PostComponent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dimensions, Image, ImageSourcePropType, Text} from 'react-native';
import {useAppSettings} from '../../context';
import {HomeStackParams, PostModel} from '../../models';
import {PUBLIC_POST_PATH_SERVER, URL} from '../../utils/env';

interface Props {
  title: string;
  timeStamp: string;
  category: string;
  media_id: string;
  description: string;
  upVotes: string;
  downVotes: string;
  postId: string;
  commentsAmount?: any;
  postObject: PostModel;
  IconToCommentsScreen?: boolean;
}

/**
 *
 * @param title title of the post set by the user when creating the post
 * @param timeStamp time when the post was created
 * @param category category set by the user when creating the post
 * @param media_id image source that the user defined
 * @param description description of the post set by the user when creating the post
 * @param upVotes number of up votes the post has
 * @param downVotes number of down votes the post has
 * @param postId postId, self explanatory, it's id is unique to that specific post
 * @param commentsAmount number of comments the specific post has at the time of rendering
 * @param IconToCommentsScreen boolean which either renders the comments icon to redirects to comments page (true) or if it's false it won't render the comments icon. In HomeScreen it's set to true but in the CommentsScreen it's missing, therefore it's false and doesn't load it
 * @param postObject - whole object being passed down
 * @returns
 */
const PostComponent: React.FC<Props> = ({
  title,
  timeStamp,
  category,
  media_id,
  description,
  upVotes,
  downVotes,
  postId,
  commentsAmount,
  postObject,
  IconToCommentsScreen,
}) => {
  const {theme} = useAppSettings();
  const [mediaHeight, setMediaHeight] = useState<number>();
  const [deviceWidth, setDeviceWidth] = useState<number>(
    Dimensions.get('window').width,
  );

  const upVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');

  const downVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-dark.png')
    : require('../../assets/Images/arrow-24-downvote-light.png');

  const commentsIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/comments-24-dark.png')
    : require('../../assets/Images/comments-24-light.png');

  const handleUpVote = (postId: string) => {
    console.log('Upvote Button widh id:', postId);
  };
  const handleDownVote = (postId: string) => {
    console.log('DownVote Button with id:', postId);
  };

  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();

  const handleCommentsScreen = (postObject: any) => {
    console.log('Redirect post to CommentsScreen with object:', postObject);

    navigation.navigate('CommentsScreen', {
      postObject,
    });
  };

  const getFolderName = () => {
    if (media_id)
      if (media_id.split('.')[2].toString() === 'image') {
        return 'images';
      } else if (media_id.split('.')[2].toString() === 'video') {
        return 'videos';
      }
  };

  const path: string = `${URL}${PUBLIC_POST_PATH_SERVER}/${getFolderName()}/${media_id}`;

  //calculating height according to device width
  if (media_id)
    Image.getSize(path, (width, height) => {
      const calc: number = width / deviceWidth;
      setMediaHeight(height / calc);
    });

  console.log(path);

  return (
    <PostFullWidth>
      <PostWrapper>
        <PostHeader>
          <PostHeaderTop>
            <PostHeaderTopText>
              {category} ● {timeStamp}
            </PostHeaderTopText>
          </PostHeaderTop>
          <PostTitle>{title}</PostTitle>
        </PostHeader>
        <PostBody>
          {media_id && (
            <PostMediaWrapper
              style={{
                height: mediaHeight ? mediaHeight : 280,
                width: deviceWidth,
              }}>
              <PostMedia
                source={
                  mediaHeight
                    ? {
                        uri: path,
                      }
                    : require('../../assets/Images/loading-media.gif')
                }
                style={{
                  height: mediaHeight ? mediaHeight : 280,
                  width: deviceWidth,
                }}
                resizeMode="stretch"
                accessibilityLabel={title}
              />
            </PostMediaWrapper>
          )}
          {description ? (
            <PostDescriptionWrapper>
              <PostDescription>{description}</PostDescription>
            </PostDescriptionWrapper>
          ) : (
            <Text></Text>
          )}
        </PostBody>
        <PostFooter>
          <PostValuesWrapper>
            <PostValues>{upVotes}</PostValues>
            <PostButtonIcon onPress={() => handleUpVote(postId)}>
              <PostUpVoteIcon
                source={upVoteIcon}
                accessibilityLabel="Up vote Icon"
              />
            </PostButtonIcon>
            <PostValues>{downVotes}</PostValues>
            <PostButtonIcon onPress={() => handleDownVote(postId)}>
              <PostDownVoteIcon
                source={downVoteIcon}
                accessibilityLabel="Down vote Icon"
              />
            </PostButtonIcon>
          </PostValuesWrapper>
          <PostValuesWrapper>
            {IconToCommentsScreen && (
              <>
                <PostButtonIcon
                  onPress={() => handleCommentsScreen(postObject)}>
                  <PostMessageIcon
                    source={commentsIcon}
                    accessibilityLabel="Comments Icon, redirects to IconToCommentsScreen screen"
                  />
                </PostButtonIcon>
                <PostValues>{commentsAmount?.length}</PostValues>
              </>
            )}
          </PostValuesWrapper>
        </PostFooter>
      </PostWrapper>
    </PostFullWidth>
  );
};

export default PostComponent;
