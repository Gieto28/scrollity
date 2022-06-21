import api from './auth/api';
//AUTH
import signUpAxios from './auth/signUpAxios';
import signInAxios from './auth/signInAxios';
import getProfileAxios from './auth/getProfileAxios';
import updateProfileAxios from './auth/updateProfileAxios';
//POSTS
import createPostAxios from './post/createPostAxios';
import getAllPosts from './post/getAllPostsAxios';
//COMMENTS

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
};
