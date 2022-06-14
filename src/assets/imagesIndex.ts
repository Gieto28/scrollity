import {useAppSettings} from '../context';

const {theme} = useAppSettings();

const sendCommentIcon = theme.bool
  ? require('./Images/sent-24-dark.png')
  : require('./Images/sent-24-light.png');

const leftArrowIcon = theme.bool
  ? require('./Images/arrow-left-dark-24.png')
  : require('./Images/arrow-left-light-24.png');

const lightDarkIcon = theme.bool
  ? require('./Images/moon-30.png')
  : require('./Images/sun-50.png');

const notificationIcon = theme.bool
  ? require('./Images/notifications-24-dark.png')
  : require('./Images/notifications-24-light.png');

const homeIcon = theme.bool
  ? require('./Images/infinity-30-dark.png')
  : require('./Images/infinity-30-light.png');

const profileIcon = theme.bool
  ? require('./Images/person-24-dark.png')
  : require('./Images/person-24-light.png');

const searchIcon = theme.bool
  ? require('./Images/search-24-dark.png')
  : require('./Images/search-24-light.png');

const upVoteIcon = theme.bool
  ? require('./Images/arrow-24-upvote-dark.png')
  : require('./Images/arrow-24-upvote-light.png');

const downVoteIcon = theme.bool
  ? require('./Images/arrow-24-downvote-dark.png')
  : require('./Images/arrow-24-downvote-light.png');

const commentsIcon = theme.bool
  ? require('./Images/comments-24-dark.png')
  : require('./Images/comments-24-light.png');

export {
  sendCommentIcon,
  leftArrowIcon,
  lightDarkIcon,
  notificationIcon,
  homeIcon,
  profileIcon,
  searchIcon,
  upVoteIcon,
  downVoteIcon,
  commentsIcon,
};
