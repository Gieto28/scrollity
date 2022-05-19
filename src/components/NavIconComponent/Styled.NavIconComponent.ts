import {ImageProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface IconProps extends ImageProps {
  theme: ThemeProps;
  focused: boolean;
}

const NavIcon = styled.Image<IconProps>`
  opacity: ${props => (props.focused ? 1 : 0.5)};
`;

export {NavIcon};
