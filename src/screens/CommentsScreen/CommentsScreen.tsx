import React from 'react';
import {
  CommentComponent,
  InputTextComponent,
  PostComponent,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CommentsView,
  ScrollComments,
  SendMessageView,
  ViewComments,
} from './Styled.CommentsScreen';
import {ImageSourcePropType, ScrollView, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import IconComponent from '../../components/IconComponent/IconComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppSettings} from '../../context';
import {yupResolver} from '@hookform/resolvers/yup';
import {CommentModel, HomeStackParams, SchemaComment} from '../../models';

type Props = NativeStackScreenProps<HomeStackParams, 'CommentsScreen'>;

/**
 * @param route this "route" is responsible for giving me the optional parameter when navigating to another screen. if I decide in the navigation that I need to navigate to another  screen and pass in an object, I use route.params."name of object" to access it and use it in that screen
 * @returns A screen with the post and it's comments
 */
const CommentsScreen: React.FC<Props> = ({route}) => {
  const {theme} = useAppSettings();

  const sendCommentIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/sent-24-dark.png')
    : require('../../assets/Images/sent-24-light.png');
  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const {control, handleSubmit, reset} = useForm<CommentModel>({
    resolver: yupResolver(SchemaComment),
  });

  // Functions

  const sendComment: SubmitHandler<CommentModel> = (data: CommentModel) => {
    console.log('sending comment...');
    console.log('comment', data.comment);
    reset();
  };

  const object = route.params.postObject;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const fakeComment = {
    name: 'Matateu ',
    image: undefined,
    commentId: '0101010-comment-id-0101010',
    commenterId: '123456-123456',
    comment:
      'This was such a cool post, thanks for contributing to the community with your funny images and content. I hope to see more of this type of posts on my feed again!',
    timeStamp: '1d ago',
    upVotes: 5,
    downVotes: 19,
  };

  return (
    <View>
      <ScrollView>
        <CommentsView>
          <IconComponent
            image={leftArrowIcon}
            altText={'Go back to previous screen'}
            onPress={handleGoBack}
          />
          <PostComponent
            title={object.title}
            source={object.source}
            description={object.description}
            upVotes={object.upVotes}
            downVotes={object.downVotes}
            postId={object.postId}
            commentsAmount={object.commentsAmount}
            timeStamp={object.timestamp}
            category={object.category}
            postObject={object}
          />
          <ScrollComments>
            <ViewComments>
              {/* map goes here */}
              <CommentComponent
                name={fakeComment.name}
                image={fakeComment.image}
                commentId={fakeComment.commentId}
                commenterId={fakeComment.commenterId}
                comment={fakeComment.comment}
                timeStamp={fakeComment.timeStamp}
                upVotes={fakeComment.upVotes}
                downVotes={fakeComment.downVotes}
              />
            </ViewComments>
          </ScrollComments>
        </CommentsView>
      </ScrollView>
      <SendMessageView>
        <InputTextComponent
          onPress={handleSubmit(sendComment)}
          onSubmitEditing={handleSubmit(sendComment)}
          placeholder={'Your comment..'}
          value={''}
          controllerName={'comment'}
          control={control}
          icon={sendCommentIcon}
        />
      </SendMessageView>
    </View>
  );
};

export default CommentsScreen;
