import UserModel from './UserModel';

interface PostModel {
  _id: number;
  title: string;
  media_id: string;
  category: string;
  dateCreated: string;
  description: string;
  up_votes: number;
  down_votes: number;
  user: UserModel;
  comments: any;
}

export default PostModel;
