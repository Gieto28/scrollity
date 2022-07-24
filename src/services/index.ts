//AUTH
import api from './auth/api';
import signUpAxios from './auth/signUpAxios';
import signInAxios from './auth/signInAxios';
//POSTS
import createPostAxios from './post/createPostAxios';
import getAllPostsAxios from './post/getAllPostsAxios';
import getPostAxios from './post/getPostAxios';
import handleVoteAxios from './post/handleVoteAxios';
import getUserVoteAxios from './post/getUserVoteAxios';
//PROFILE
import getProfileAxios from './profile/getProfileAxios';
import updateProfileAxios from './profile/updateProfileAxios';
import getProfilePostsAxios from './profile/getProfilePostsAxios';
//FILE
import uploadFileAxios from './file/uploadFileAxios';
// COMMENTS
import createCommentAxios from './comment/createCommentAxios';
import getAllCommentsAxios from './comment/getAllCommentsAxios';
import getUserVoteCommentsAxios from './comment/getUserVoteCommentsAxios';
import handleVoteCommentAxios from './comment/handleVoteCommentAxios';
import getCommentAxios from './comment/getCommentAxios';
// NOTIFICATIONS
import getUserNotifications from './notifications/getUserNotifications';
import updateNotification from './notifications/updateNotification';

export {
  //AUTH
  api,
  signUpAxios,
  signInAxios,
  //profile
  getProfilePostsAxios,
  getProfileAxios,
  updateProfileAxios,
  //POSTS
  handleVoteAxios,
  createPostAxios,
  getAllPostsAxios,
  getUserVoteAxios,
  getPostAxios,
  //FILE
  uploadFileAxios,
  //COMMENTS
  createCommentAxios,
  getAllCommentsAxios,
  getUserVoteCommentsAxios,
  handleVoteCommentAxios,
  getCommentAxios,
  // NOTIFICATIONS
  getUserNotifications,
  updateNotification,
};
