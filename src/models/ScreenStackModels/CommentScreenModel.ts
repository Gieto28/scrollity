import {ImageSourcePropType} from 'react-native';

/**
 * Post model for the Posts - pretty straight forward interface
 *
 * Contains:
 *
 * **title** - string
 *
 * **source** - ImageSourcePropType
 *
 * **description** - string
 *
 * **upVotes** - number
 *
 * **downVotes** - number
 *
 * **postId** - string
 *
 * **commentsAmount** - number
 *
 * **timestamp** - timestamp
 *
 * **category** - string
 *
 */
interface CommentScreenModel {
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

export default CommentScreenModel;
