import React from 'react';
import {
  GoBackComponent,
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
import {Text} from 'react-native';
import {useForm} from 'react-hook-form';

type Props = NativeStackScreenProps<HomeStackParams, 'CommentsScreen'>;

const CommentsScreen: React.FC<Props> = ({route}) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      comment: '',
    },
  });

  // Functions

  const onSubmit = (data: {}) => {
    console.log('sending message...');
    console.log(data);
  };

  const object = route.params.postObject;

  console.log(object);

  return (
    <CommentsView>
      <GoBackComponent />
      <PostComponent
        title={object.title}
        source={object.source}
        description={object.description}
        upVotes={object.upVotes}
        downVotes={object.downVotes}
        postId={object.postId}
        commentsAmount={object.commentsAmount}
        comments={false}
        postObject={object}
      />
      <ScrollComments>
        <ViewComments>
          <Text>hello</Text>
        </ViewComments>
      </ScrollComments>
      <SendMessageView>
        <InputTextComponent
          placeholder={'Your comment..'}
          value={''}
          controllerName={'comment'}
          control={control}
        />
      </SendMessageView>
    </CommentsView>
  );
};

export default CommentsScreen;
