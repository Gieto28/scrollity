import UserModel from './UserModel';

interface PostModel {
  _id: string;
  category: string;
  dateCreated: string;
  description: string;
  down_votes: string;
  media: string;
  title: string;
  up_votes: string;
  user: UserModel;
  comments: any;
  mediaHeight: number;
}

export default PostModel;
