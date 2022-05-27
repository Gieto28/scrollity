import React from 'react';
import {InputTextComponent, PostComponent} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../navigation/AppStack/HomeScreenStack';
import {
  CommentsView,
  ScrollComments,
  SendMessageView,
  ViewComments,
} from './Styled.CommentsScreen';
import {Text} from 'react-native';
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

  return (
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
          <Text>hello</Text>
        </ViewComments>
      </ScrollComments>
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
    </CommentsView>
  );
};

export default CommentsScreen;
