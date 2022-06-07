import {ImageSourcePropType} from 'react-native';

interface PostModel {
  title: string;
  source: ImageSourcePropType;
  description: string;
  upVotes: number;
  downVotes: number;
  postId: string;
  commentsAmount: number;
  timestamp: string;
  category: string;
}

export default PostModel;
