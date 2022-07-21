const X_API_KEY = 'b459e351-e1e6-412d-b59b-653cc5eec642';
/**
 * Port being using in the url.
 *
 * If back-end port is in another number then changing this number will fix the problem and everything will continue to be working without changing the url directly
 */
const PORT = '3003';

/**
 * IP being used in the back-end (in my case its the scrollity-api which you can download on my github: {@link https://github.com/Gieto28/scrollity-api})
 *
 * Change this IP to your own IP if you're testing out this application in your system, everything should work fine
 */

//ETIC
// const IP = '192.168.3.243';

// PROSIDE
const IP = '192.168.0.172';
// HOME
// const IP = '192.168.1.230';

/**
 * Base url.
 *
 * In React Native the base url needs to be either the domain name or the ip address. Localhost did not work at the time of witting this doc.
 *
 * if you want to alter this URL please do so in the respective constant PORT and IP in the file env.ts inside the utils folder
 */
const URL = `http://${IP}:${PORT}`;

/**
 *  PATH FOR THE LOCAL FOLDER WHERE MEDIA FOR THE POSTS ARE KEPT
 */
const PUBLIC_POST_PATH_SERVER = '/public/posts';

/**
 *  PATH FOR THE LOCAL FOLDER WHERE MEDIA FOR THE POSTS ARE KEPT
 */
const PUBLIC_PROFILE_PATH_SERVER = '/public/profile';

//  ----------------------------------------------------------------
//  ---------------------------AUTH---------------------------------
//  ----------------------------------------------------------------

/**
 * Path to login
 *
 * Use this path to login with a profile using the email and the password
 */
const AUTH_LOGIN = '/auth/login';

/**
 * Path to register
 *
 * Use this path to register a profile using the name, email, password, password confirmation
 */
const AUTH_REGISTER = '/auth/register';

//  ----------------------------------------------------------------
//  ---------------------------POST---------------------------------
//  ----------------------------------------------------------------
/**
 * Path to create a new post
 *
 */
const POST_CREATE = '/post/create';

/**
 * Path to retrieve posts in database, you'll also need to specify the category
 *
 * example:
 *
 * const path = `${POST_GET_ALL}${category}`;
 *
 */
const POST_GET_ALL = '/post/all/';

/**
 * Path to retrieve one single post in database, you'll also need to specify the id
 *
 * example:
 *
 * const path = `${POST_GET}${id}`;
 *
 */
const POST_GET = '/post/';

/**
 * path to update or upvote/downvote a post
 *
 * example:
 *
 */
const POST_VOTE = '/post/vote';

/**
 * path to get if current user has votes in any of the posts
 *
 * example: `${POST_CHECK_USER_VOTES}${post_id}/${user_id}`
 *
 */
const POST_CHECK_USER_VOTES = '/post/checkVote/';

/**
 * path to find posts by searching
 *
 * example: example: `${POST_GET_BY_TITLE}${title}`
 */
const POST_GET_BY_TITLE = '/post/search/';

//  ----------------------------------------------------------------
//  ---------------------------COMMENT------------------------------
//  ----------------------------------------------------------------

/**
 * Path to create a new comment
 */
const COMMENT_CREATE = '/comment/create';

/**
 * Path to retrieve one single comment in database, you'll also need to specify the id
 *
 * example:
 *
 * const path = `${COMMENT_GET}${id}`;
 *
 */
const COMMENT_GET = '/comment/';

/**
 * Path to retrieve all comments
 *
 * example: `${COMMENT_GET_ALL}${post_id}`
 *
 */
const COMMENT_GET_ALL = '/comment/all/';

/**
 * path to update or upvote/downvote a comment
 *
 */
const COMMENT_VOTE = '/comment/vote';

/**
 * path to get if current user has votes in any of the posts
 *
 * Example: `${COMMENT_CHECK_USER_VOTES}${comment_id}/${user_id}`
 *
 */
const COMMENT_CHECK_USER_VOTES = '/comment/checkVote/';
//  ----------------------------------------------------------------
//  ---------------------------PROFILE------------------------------
//  ----------------------------------------------------------------

/**
 * Path to update profile:
 *
 */
const PROFILE_UPDATE = '/profile/update';

/**
 * Path to get a specific profile:
 * **NEEDS THE PROFILE ID AT THE END**
 *
 * example: `${PROFILE_GET}${id}`
 *
 */
const PROFILE_GET = '/profile/';

/**
 * PAth to get user posts the option is either posts or likes
 *
 * example: `${PROFILE_GET_POSTS}${user_id}${option}`
 */
const PROFILE_GET_POSTS = '/profile/posts/';

//  ----------------------------------------------------------------
//  -----------------------------FILE-------------------------------
//  ----------------------------------------------------------------

/**
 * Endpoint used to upload files to the server
 */
const FILE_UPLOAD = '/file/upload';

//  ----------------------------------------------------------------
//  ------------------------NOTIFICATIONS---------------------------
//  ----------------------------------------------------------------

/**
 * endpoint used to get the 3 highest voted posts from that user
 *
 * example: `${NOTIFICATIONS_HIGHEST_VOTED}${user_id}$`
 */
const NOTIFICATIONS_HIGHEST_VOTED = '/notifications/highestVoted/';

export {
  X_API_KEY,
  PORT,
  URL,
  PUBLIC_POST_PATH_SERVER,
  PUBLIC_PROFILE_PATH_SERVER,
  //AUTH
  AUTH_LOGIN,
  AUTH_REGISTER,
  //profile
  PROFILE_GET,
  PROFILE_UPDATE,
  PROFILE_GET_POSTS,
  //POST
  POST_CREATE,
  POST_GET_BY_TITLE,
  POST_GET_ALL,
  POST_VOTE,
  POST_GET,
  POST_CHECK_USER_VOTES,
  //FILE
  FILE_UPLOAD,
  // COMMENT
  COMMENT_CREATE,
  COMMENT_GET_ALL,
  COMMENT_VOTE,
  COMMENT_CHECK_USER_VOTES,
  COMMENT_GET,
  //NOTIFICATIONS
  NOTIFICATIONS_HIGHEST_VOTED,
};
