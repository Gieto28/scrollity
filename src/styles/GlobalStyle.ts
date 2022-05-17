import styled from 'styled-components/native';

const theme = {
  light: '#fcf7fc',
  dark: '#262626',
  red: '#e63225',
  blue: '#24e2e5',
  pink: '#e82e8e',
};

// make obj here and export theme
const GlobalView = styled.View`
  background-color: #fcf7fc;
  color: #2c2c2c;
`;

const GlobalSafeAreaView = styled.SafeAreaView``;

const AuthScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
})`
  flex-grow: 1;
`;

const AuthView = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 0 24px;
`;

const ScreenView = styled.View`
  background-color: #e5e5e5;
  color: #2c2c2c;
  padding: 16px;
`;

const StyledView = styled.View`
  background-color: #e5e5e5;
`;

const StyledText = styled.Text`
  color: #2c2c2c;
`;

export {
  theme,
  StyledView,
  StyledText,
  GlobalView,
  ScreenView,
  AuthScrollView,
  AuthView,
};
