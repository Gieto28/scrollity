import {TextProps, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

interface CategoryTextProps extends TextProps {
  theme: ThemeProps;
}

const CategoryButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.theme.button.background};
  border: 1px solid ${props => props.theme.button.border};
`;

const CategoryText = styled.Text<CategoryTextProps>`
  color: ${props => props.theme.button.text};
`;

export {CategoryButton, CategoryText};
