const theme = {
  fonts: {
    fontFamily: ['sans-serif', 'Roboto'],
    fontSize: {
      xxl: '40px',
      xl: '32px',
      l: '24px',
      md: '16px',
      sm: '8px',
    },
    fontWeight: {
      xl: '800',
      l: '600',
      md: '400',
      ms: '200',
    },
    colors: {
      primary: '#e63225',
      secondary: '#24e2e5',
      light: '#fcf7fc',
      dark: '#262626',
    },
  },
  display: {
    display: 'flex',
    alignCenter: 'center',
    alignEnd: 'flex-end',
    alignStart: 'flex-start',
    directionRow: 'row',
    directionColumn: 'column',
  },
  screen: {
    padding: '16px',
    width: '70%',
  },
  input: {
    margin: '10px',
    borderRadius: '10px',
    padding: '16px',
  },
  darkButton: {
    width: '35px',
    height: '35px',
    marginTop: '10px',
    marginRight: '10px',
    marginLeft: '10px',
  },
  icon: {
    width: '40px',
    height: '40px',
    margin: '5px',
  },
  SearchButton: {
    width: '30px',
    height: '30px',
  },
  posts: {
    icons: {
      width: '25px',
      height: '21px',
      fontSize: '20px',
    },
  },
  notificationCard: {
    marginX: '15px',
    marginY: '5px',
  },
  comment: {
    fontSize: {
      name: '24px',
      description: '20px',
    },
  },
};

const lightTheme = {
  ...theme,
  key: 'light',
  bool: false,
  screen: {
    background: '#fcf7fc',
    text: '#262626',
    primaryColor: '#24e2e5',
    secondaryColor: '#e82e8e',
  },
  button: {
    border: '#262626',
    background: '#fcf7fc',
    text: '#262626',
  },
  input: {
    border: '#262626',
    background: '#fcf7fc',
    text: '#262626',
    placeholder: '#262626',
  },
  separator: {
    line: '#262626',
    text: '#262626',
  },
  nav: {
    inactiveNavOpacity: 0.8,
    inactiveNav: '#262626',
    activeNav: '#24e2e5',
    inactiveNavBackground: '#fcf7fc',
    activeNavBackground: '#e6e6e6',
    notificationNumberColor: '#fcf7fc',
    notificationCircleColor: '38, 38, 38, 0.5',
  },
  comment: {
    text: '#262626',
  },
};

const darkTheme = {
  ...theme,
  key: 'dark',
  bool: true,
  screen: {
    background: '#262626',
    text: '#fcf7fc',
    primaryColor: '#e82e8e',
    secondaryColor: '#24e2e5',
  },
  button: {
    border: '#fcf7fc',
    background: '#262626',
    text: '#fcf7fc',
  },
  input: {
    border: '#fcf7fc',
    background: '#262626',
    text: '#fcf7fc',
    placeholder: '#fcf7fc',
  },
  separator: {
    line: '#fcf7fc',
    text: '#fcf7fc',
  },
  nav: {
    inactiveNavOpacity: 0.8,
    inactiveNav: '#fcf7fc',
    activeNav: '#24e2e5',
    inactiveNavBackground: '#262626',
    activeNavBackground: '#1c1c1c',
    notificationNumberColor: '#262626',
    notificationCircleColor: '#262626',
  },
  comment: {
    text: '#fcf7fc',
  },
};

type ThemeProps = typeof lightTheme;

export {lightTheme, darkTheme};
export type {ThemeProps};

//   light: '#fcf7fc',
//   dark: '#262626',
//   red: '#e63225',
//   blue: '#24e2e5',
//   pink: '#e82e8e',
// activeNavBackground: '#1c1c1c',
// activeNavBackground: '#e6e6e6',
