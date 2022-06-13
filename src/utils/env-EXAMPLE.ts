const X_API_KEY = 'abcdefgh-1234-1234-1234-abcde123456';

/**
 * Port being using in the url.
 *
 * If back-end port is in another number then changing this number will fix the problem and everything will continue to be working without changing the url directly
 */
const PORT = '3003'; //example

/**
 * IP being used in the back-end (in my case its the scrollity-api which you can download on my github: {@link https://github.com/Gieto28/scrollity-api})
 *
 * Change this IP to your own IP if you're testing out this application in your system, everything should work fine
 */
const IP = 'xxx.xxx.x.xxx';

/**
 * Base url.
 *
 * In React Native the base url needs to be either the domain name or the ip address. Localhost did not work at the time of witting this doc.
 *
 * if you want to alter this URL please do so in the respective constant PORT and IP in the file env.ts inside the utils folder
 */
const URL = `http://${IP}:${PORT}`;

/**
 * Path to login
 *
 * Use this path to login with a profile using the email and the password
 */
const PATH_LOGIN = '/auth/login';

/**
 * Path to register
 *
 * Use this path to register a profile using the name, email, password, password confirmation
 */
const PATH_REGISTER = '/auth/register';

/**
 * Path to update profile:
 * **NEEDS THE PROFILE ID AT THE END**
 *
 * example:
 *
 * if the profile id which is being edited is **32** then...
 *
 * `PATH_UPDATE_PROFILE${id}` = /auth/profile/update/32
 */
const PATH_UPDATE_PROFILE = '/auth/profile/update/';

/**
 * Path to get a specific profile:
 * **NEEDS THE PROFILE ID AT THE END**
 *
 * example:
 *
 * if the profile **id** you want to get is **32** then...
 *
 * `PATH_PROFILE${id}` = /auth/profile/32
 */
const PATH_PROFILE = '/auth/profile/';

/**
 * Path to get all profiles
 *
 * Use this path to obtain information about all profiles in db
 */
const PATH_ALL_PROFILES = '/auth/profiles';

export {
  X_API_KEY,
  PORT,
  URL,
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_UPDATE_PROFILE,
  PATH_PROFILE,
  PATH_ALL_PROFILES,
};
