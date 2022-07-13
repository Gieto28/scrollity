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
import {ImageSourcePropType} from 'react-native';
import {useForm} from 'react-hook-form';
import IconComponent from '../../components/IconComponent/IconComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppSettings, useAuth} from '../../context';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  FormCommentModel,
  FormControllerName,
  HomeStackParams,
  SchemaComment,
  SuccessResponse,
} from '../../models';
import {createCommentAxios, getAllCommentsAxios} from '../../services';

type Props = NativeStackScreenProps<HomeStackParams, 'CommentsScreen'>;

/**
 * @param route this "route" is responsible for giving me the optional parameter when navigating to another screen. if I decide in the navigation that I need to navigate to another  screen and pass in an object, I use route.params."name of object" to access it and use it in that screen
 * @returns A screen with the post and it's comments
 */
const CommentsScreen: React.FC<Props> = ({route}) => {
  const {theme} = useAppSettings();
  const {user} = useAuth();
  const post = route.params.postObject;
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any>();

  const sendCommentIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/sent-24-dark.png')
    : require('../../assets/Images/sent-24-light.png');
  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const loadComments = async () => {
    try {
      setLoading(true);
      const res = await getAllCommentsAxios(post._id);
      console.log(res.data);
      setComments(res.data);
      // setComments(res);
    } catch (e: any) {
      console.log('error while getting posts');
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
      const commentCreationResponse: SuccessResponse = await createCommentAxios(
        user?._id,
        post._id,
        data.comment,
      );
      console.log(commentCreationResponse);
    } catch (e: any) {
      throw new Error(e.message);
    }
    reset();
  };

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  // const renderComments = () => {
  //   return comments.map((comment) => (
  //     <CommentComponent commentObj={comment}
  //   ))
  // }

  return (
    <ScreenWrapper>
      <ScrollComments>
        <CommentsView>
          <IconComponent
            image={leftArrowIcon}
            altText={'Go back to previous screen'}
            onPress={handleGoBack}
          />
          <PostComponent postObject={post} />
          {loading ? (
            <ScrollComments />
          ) : (
            <ScrollComments>
              <ViewComments>
                {/* {comments &&
                  comments.map((comment: any) => {
                    <CommentComponent commentObj={comment} />;
                  })} */}
              </ViewComments>
            </ScrollComments>
          )}
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
