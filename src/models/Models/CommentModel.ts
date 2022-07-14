import UserModel from './UserModel';

interface CommentModel {
  _id: number;
  comment: string;
  dateCreated: string;
  down_votes: string;
  up_votes: string;
  user: UserModel;
}

export default CommentModel;
