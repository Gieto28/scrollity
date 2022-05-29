import React from 'react';
import {
  CommentComponent,
  InputTextComponent,
  PostComponent,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../navigation/AppStack/HomeScreenStack';
import {
  CommentsView,
  ScrollComments,
  SendMessageView,
  ViewComments,
} from './Styled.CommentsScreen';
import {ScrollView, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {leftArrowIcon, sendCommentIcon} from '../../assets/imagesIndex';
import IconComponent from '../../components/IconComponent/IconComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<HomeStackParams, 'CommentsScreen'>;

const CommentsScreen: React.FC<Props> = ({route}) => {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      comment: '',
    },
  });

  // Functions

  const sendComment = (data: {}) => {
    console.log('sending message...');
    console.log(data);
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
          timeStamp={object.timeStamp}
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
    </ScrollView>
  );
};

export default CommentsScreen;
