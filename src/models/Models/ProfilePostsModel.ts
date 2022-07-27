import PostModel from './PostModel';

interface ProfilePostModel {
  _id: number;
  posts: PostModel[];
}

export default ProfilePostModel;
