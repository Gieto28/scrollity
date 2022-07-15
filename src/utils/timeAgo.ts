import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: function (number, withoutSuffix) {
      return withoutSuffix ? 'now' : 'a few seconds';
    },
    m: '1 m',
    mm: '%dm',
    h: '1 h',
    hh: '%dh',
    d: '1 d',
    dd: '%dd',
    M: '1 mth',
    MM: '%dm',
    y: '1 y',
    yy: '%dy',
  },
});

export const timeAgo = (date: string) => {
  return moment(date).fromNow();
};
