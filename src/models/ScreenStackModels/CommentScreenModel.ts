import CommentModel from '../Models/CommentModel';
import UserModel from '../Models/UserModel';

interface CommentScreenModel {
  _id: number;
  title: string;
  media_id: string;
  dateCreated: string;
  description: string;
  up_votes: number;
  down_votes: number;
  user: UserModel;
  comments: CommentModel[];
  category: string;
}

export default CommentScreenModel;
