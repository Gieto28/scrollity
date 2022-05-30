import {
  Animated,
  ScrollViewProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsScrollView extends ScrollViewProps {
  theme: ThemeProps;
}

interface ButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const HomeScreenWrapper = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  position: relative;
`;

const HomeLabel = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
`;

const LabelWrapper = styled.View<PropsView>`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  margin-top: 50px;
  padding: 5px 0;
  border-bottom-color: ${props => props.theme.separator.line};
  align-items: center;
  justify-content: center;
`;

const SearchView = styled.View<PropsView>`
  padding: 0 15px;
  flex: 1;
`;

const CategoryView = styled.View<PropsView>`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  min-height: 50px;
  border-width: 1px;
  border-bottom-color: ${props => props.theme.button.border};
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
  flex-direction: row;
  justify-content: space-between;
`;

const min = 0;
const max = 50;

const scrollY = new Animated.Value(min);
const diffClamp = Animated.diffClamp(scrollY, min, max);
const translateY = diffClamp.interpolate({
  inputRange: [min, max],
  outputRange: [min, -max],
});

const styledAnimation = {
  transform: [
    {
      translateY: translateY,
    },
  ],
  elevation: 100,
  zIndex: 100,
};

const CategoryButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.theme.screen.background};
  /* min-height: 45px; */
  padding: 8px 8px;
  margin: 2px 10px 2px 10px;
`;

const CategoryText = styled.Text<PropsText>`
  /* min-height: 45px; */
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
  font-weight: ${props => props.theme.fonts.fontWeight.l};
`;

export {
  HomeScreenWrapper,
  CategoryView,
  scrollY,
  styledAnimation,
  CategoryButton,
  CategoryText,
  HomeLabel,
  LabelWrapper,
  SearchView,
};
