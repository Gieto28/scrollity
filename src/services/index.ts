//AUTH
import api from './auth/api';
import signUpAxios from './auth/signUpAxios';
import signInAxios from './auth/signInAxios';
import updateProfileAxios from './auth/updateProfileAxios';
//POSTS
import createPostAxios from './post/createPostAxios';
import getAllPosts from './post/getAllPostsAxios';
import getPost from './post/getPostAxios';
import handleVoteAxios from './post/handleVoteAxios';
//COMMENTS
//PROFILE
import getProfileAxios from './profile/getProfileAxios';
//FILE
import uploadFileAxios from './file/uploadFileAxios';

export {
  //AUTH
  api,
  signUpAxios,
  signInAxios,
  getProfileAxios,
  updateProfileAxios,
  //POSTS
  handleVoteAxios,
  createPostAxios,
  getAllPosts,
  getPost,
  //FILE
  uploadFileAxios,
};
