import UserModel from './UserModel';

interface PostModel {
  _id: number;
  category: string;
  dateCreated: string;
  description: string;
  down_votes: number;
  media_id: string;
  title: string;
  up_votes: number;
  user: UserModel;
  comments: any;
}

export default PostModel;
