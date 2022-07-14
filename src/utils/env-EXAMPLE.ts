const X_API_KEY = 'xxxxxxxx-xxxx-xxxxx-xxxxxxxx';

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
const IP = 'xxx.x.xxx.xxx';

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

/**
 * Path to update profile:
 *
 * example:
 *
 * `AUTH_UPDATE_PROFILE` = /auth/update
 */
const PROFILE_UPDATE = '/auth/update';

/**
 * Path to get all profiles
 *
 * Use this path to obtain information about all profiles in db
 */
const AUTH_ALL_PROFILES = '/auth/profiles';

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
 * const path = `${PATH_GET_ALL_POSTS}${category}`;
 *
 */
const POST_GET_ALL = '/post/all/';

//  ----------------------------------------------------------------
//  ---------------------------COMMENT------------------------------
//  ----------------------------------------------------------------
//  ----------------------------------------------------------------
//  ---------------------------PROFILE------------------------------
//  ----------------------------------------------------------------

/**
 * Path to get a specific profile:
 * **NEEDS THE PROFILE ID AT THE END**
 *
 * example:
 *
 */
const PROFILE_GET = '/auth/profile';

//  ----------------------------------------------------------------
//  -----------------------------FILE-------------------------------
//  ----------------------------------------------------------------

/**
 * Endpoint used to upload files to the server
 */
const FILE_UPLOAD = '/file/upload';

export {
  X_API_KEY,
  PORT,
  URL,
  PUBLIC_POST_PATH_SERVER,
  PUBLIC_PROFILE_PATH_SERVER,
  //AUTH
  AUTH_LOGIN,
  AUTH_REGISTER,
  PROFILE_UPDATE,
  PROFILE_GET,
  AUTH_ALL_PROFILES,
  //POST
  POST_CREATE,
  POST_GET_ALL,
  //FILE
  FILE_UPLOAD,
};
