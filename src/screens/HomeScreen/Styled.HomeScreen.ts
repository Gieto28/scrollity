import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

const HomeLabel = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
`;

const LabelWrapper = styled.View<PropsView>`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 5px 0;
  border-bottom-color: ${props => props.theme.separator.line};
  align-items: center;
  justify-content: center;
`;

const CategoryScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})`
  flex-grow: 1;
`;

const CategoryView = styled.View<PropsView>`
  flex: 1;
  color: ${props => props.theme.screen.text};
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 5px 10px;
  margin: 2px 10px 2px 10px;
`;

const CategoryText = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
  font-weight: ${props => props.theme.fonts.fontWeight.l};
`;

export {
  CategoryScroll,
  CategoryView,
  CategoryButton,
  CategoryText,
  HomeLabel,
  LabelWrapper,
};
