import moment from 'moment';

export const timeAgo = (date: string) => {
  return moment(date).fromNow();
};
