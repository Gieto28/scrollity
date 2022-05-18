import {ImageProps} from 'react-native';
import styled from 'styled-components/native';

interface IconProps extends ImageProps {
  theme: any;
}

const LightDarkIcon = styled.Image<IconProps>`
  max-width: ${props => props.theme.darkButton.width};
  max-height: ${props => props.theme.darkButton.height};
  display: ${props => props.theme.display.display};
  align-self: ${props => props.theme.display.alignSelfEnd};
  margin-top: ${props => props.theme.darkButton.marginTop};
  margin-right: ${props => props.theme.darkButton.marginRight};
`;

export {LightDarkIcon};
