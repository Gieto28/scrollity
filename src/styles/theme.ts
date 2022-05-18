const theme = {
  fonts: {
    fontFamily: ['sans-serif', 'Roboto'],
    fontSize: {
      xxl: '56px',
      xl: '40px',
      lg: '32px',
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
    },
  },
  display: {
    display: 'flex',
    alignSelfCenter: 'center',
    alignSelfEnd: 'flex-end',
    alignSelfStart: 'flex-start',
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
};

const lightTheme = {
  ...theme,
  screen: {
    background: '#fcf7fc',
    text: '#262626',
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
  },
  separator: {
    line: '#262626',
    text: '#262626',
  },
};

const darkTheme = {
  ...theme,
  screen: {
    background: '#262626',
    text: '#fcf7fc',
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
  },
  separator: {
    line: '#fcf7fc',
    text: '#fcf7fc',
  },
};

export {lightTheme, darkTheme};

//   light: '#fcf7fc',
//   dark: '#262626',
//   red: '#e63225',
//   blue: '#24e2e5',
//   pink: '#e82e8e',
