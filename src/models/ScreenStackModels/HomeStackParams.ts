import {PostModel} from '..';

type HomeStackParams = {
  HomeScreen: () => JSX.Element;
  CommentsScreen: {
    postObject: PostModel;
  };
  CreatePostScreen: undefined;
};

export default HomeStackParams;
