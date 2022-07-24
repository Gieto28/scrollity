import React, {useEffect, useState} from 'react';
import {
  CommentComponent,
  InputTextComponent,
  PostComponent,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CommentsView,
  ScreenWrapper,
  ScrollComments,
  SendMessageView,
  ViewComments,
} from './Styled.CommentsScreen';
import {ImageSourcePropType, RefreshControl} from 'react-native';
import {useForm} from 'react-hook-form';
import IconComponent from '../../components/IconComponent/IconComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useApp, useAuth} from '../../context';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  CommentModel,
  FormCommentModel,
  FormControllerName,
  HomeStackParams,
  SchemaComment,
} from '../../models';
import {createCommentAxios, getAllCommentsAxios} from '../../services';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';

type Props = NativeStackScreenProps<HomeStackParams, 'CommentsScreen'>;

/**
 * @param route this "route" is responsible for giving me the optional parameter when navigating to another screen. if I decide in the navigation that I need to navigate to another  screen and pass in an object, I use route.params."name of object" to access it and use it in that screen
 * @returns A screen with the post and it's comments
 */
const CommentsScreen: React.FC<Props> = ({route}) => {
  const {theme} = useApp();
  const {user} = useAuth();
  const post = route.params.postObject;
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentModel[]>([]);

  const sendCommentIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/sent-24-dark.png')
    : require('../../assets/Images/sent-24-light.png');
  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const loadComments = async () => {
    try {
      setLoading(true);
      const res: {data: CommentModel[]} = await getAllCommentsAxios(post._id);
      setComments(res.data);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {control, handleSubmit, reset} = useForm<FormCommentModel>({
    resolver: yupResolver(SchemaComment),
  });

  const sendComment = async (data: FormCommentModel) => {
    try {
      await createCommentAxios(user?._id, post._id, data.comment);
    } catch (e: any) {
      throw new Error(e.message);
    }
    loadComments();
    reset();
  };

  const onRefresh = async () => {
    loadComments();
  };

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const renderComments = () => {
    return comments.length > 0 ? (
      <ViewComments>
        {comments.map((comment: CommentModel, i: number) => (
          <CommentComponent commentObj={comment} key={i} />
        ))}
      </ViewComments>
    ) : (
      <NoContentView>
        <NoContentText>Oops! No comments found.</NoContentText>
        <NoContentText>
          Be the first one to say something about it!
        </NoContentText>
      </NoContentView>
    );
  };

  return (
    <ScreenWrapper>
      <ScrollComments
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[theme.screen.secondaryColor]}
            tintColor={theme.screen.secondaryColor}
            progressViewOffset={480}
          />
        }>
        <CommentsView>
          <IconComponent
            image={leftArrowIcon}
            altText={'Go back to previous screen'}
            onPress={handleGoBack}
          />
          <PostComponent postObject={post} />
          <ScrollComments>{loading ? null : renderComments()}</ScrollComments>
        </CommentsView>
      </ScrollComments>
      <SendMessageView>
        <InputTextComponent
          onPress={handleSubmit(sendComment)}
          onSubmitEditing={handleSubmit(sendComment)}
          placeholder={'Your comment..'}
          controllerName={FormControllerName.COMMENT}
          control={control}
          icon={sendCommentIcon}
        />
      </SendMessageView>
    </ScreenWrapper>
  );
};

export default CommentsScreen;
