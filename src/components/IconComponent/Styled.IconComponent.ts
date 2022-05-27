import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface BtnProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const IconButton = styled.TouchableOpacity<BtnProps>`
  max-width: ${props => props.theme.icon.maxWidth};
  max-height: ${props => props.theme.icon.maxHeight};
  margin: ${props => props.theme.icon.margin};
`;

const Icon = styled.Image``;

export {IconButton, Icon};
