import {CommentScreenModel} from '..';

type HomeStackParams = {
  HomeScreen: () => JSX.Element;
  CommentsScreen: {
    postObject: CommentScreenModel;
  };
  CreatePostScreen: undefined;
};

export default HomeStackParams;
