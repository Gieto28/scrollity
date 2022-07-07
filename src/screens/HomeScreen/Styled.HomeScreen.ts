import {
  Animated,
  Dimensions,
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

interface ButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const HomeScreenWrapper = styled.View<PropsView>`
  min-height: 100%;
  background-color: ${props => props.theme.screen.primaryColor};
`;

const HomeContentView = styled.View<PropsView>`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.screen.primaryColor};
`;

const HomeLabel = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
`;

const LabelWrapper = styled.View<PropsView>`
  display: flex;
  margin-top: 90px;
  padding: 5px 0 10px 0;
  align-items: center;
  justify-content: center;
`;

// goal failed
const SearchView = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.primaryColor};
  margin: 0 15px 24px 15px;
  flex: 1;
`;

// goal failed
const HorizontalScrollWrapper = styled.View<PropsView>`
  position: relative;
`;

const CategoryScroll = styled.ScrollView`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const CategoryView = styled.View<PropsView>`
  position: absolute;
  max-width: 100%;
  min-height: 45px;
  border-width: 1px;
  border-bottom-color: ${props => props.theme.button.border};
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const min = 0;
const max = 100;

const scrollY = new Animated.Value(min);
const diffClamp = Animated.diffClamp(scrollY, min, max);
const translateY = diffClamp.interpolate({
  inputRange: [min, max],
  outputRange: [min, -max],
});

const styledHeaderAnimation = {
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

const PostWrapper = styled.View<ViewProps>`
  margin: 0 0 24px 0;
`;

const LoadingWrapper = styled.View<ViewProps>`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconsWrapper = styled.View<PropsView>`
  position: absolute;
  bottom: 30px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100px;
  width: 60px;
`;

const ToTopIconView = styled.View<PropsView>`
  width: 50px;
  position: relative;
  left: 1.5px;
`;

const CreatePostIcon = styled.View<PropsView>`
  width: 50px;
  position: relative;
  left: 2.5px;
`;

const minIconsWrapper = 0;
const maxIconsWrapper = 80;

const scrollYIconsWrapper = new Animated.Value(min);

const diffClampIconsWrapper = Animated.diffClamp(
  scrollYIconsWrapper,
  minIconsWrapper,
  maxIconsWrapper,
);

const translateXIconsWrapper = diffClampIconsWrapper.interpolate({
  inputRange: [minIconsWrapper, maxIconsWrapper],
  outputRange: [minIconsWrapper, maxIconsWrapper],
});

const styledIConsWrapperAnimation = {
  transform: [
    {
      translateX: translateXIconsWrapper,
    },
  ],
  elevation: 100,
  zIndex: 100,
};

export {
  CreatePostIcon,
  ToTopIconView,
  HorizontalScrollWrapper,
  CategoryScroll,
  HomeScreenWrapper,
  HomeContentView,
  CategoryView,
  PostWrapper,
  LoadingWrapper,
  scrollY,
  scrollYIconsWrapper,
  styledHeaderAnimation,
  CategoryButton,
  CategoryText,
  HomeLabel,
  LabelWrapper,
  SearchView,
  IconsWrapper,
  styledIConsWrapperAnimation,
};
