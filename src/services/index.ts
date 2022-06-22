import api from './auth/api';
//AUTH
import signUpAxios from './auth/signUpAxios';
import signInAxios from './auth/signInAxios';
import updateProfileAxios from './auth/updateProfileAxios';
//POSTS
import createPostAxios from './post/createPostAxios';
import getAllPosts from './post/getAllPostsAxios';
//COMMENTS
//PROFILE
import getProfileAxios from './profile/getProfileAxios';
//FILE
import uploadFileAxios from './file/uploadFileAxios';

export {
  api,
  //AUTH
  signUpAxios,
  signInAxios,
  getProfileAxios,
  updateProfileAxios,
  //POSTS
  createPostAxios,
  getAllPosts,
  //FILE
  uploadFileAxios,
};
