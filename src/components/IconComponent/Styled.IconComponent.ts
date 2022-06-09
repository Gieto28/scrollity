import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface BtnProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const IconButton = styled.TouchableOpacity<BtnProps>`
  min-width: ${props => props.theme.icon.width};
  min-height: ${props => props.theme.icon.height};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.icon.margin};
  max-width: ${props => props.theme.icon.width};
  max-height: ${props => props.theme.icon.height};
`;

const Icon = styled.Image`
  height: 100%;
`;

export {IconButton, Icon};
