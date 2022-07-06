import {ImageSourcePropType} from 'react-native';
import CommentModel from '../Form/FormCommentModel';
import PostModel from '../Models/PostModel';
import UserModel from '../Models/UserModel';

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
  _id: number;
  title: string;
  media_id: string;
  dateCreated: string;
  description: string;
  up_votes: number;
  down_votes: number;
  user: UserModel;
  comments: string;
  category: string;
}

export default CommentScreenModel;
