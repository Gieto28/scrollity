import {ButtonProps, ImageProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface IconProps extends ImageProps {
  theme: any;
}

interface BtnProps extends ButtonProps {
  theme: any;
}

interface IconViewProps extends ViewProps {
  theme: any;
}

const IconView = styled.View<IconViewProps>`
  display: flex;
  align-items: ${props => props.theme.display.alignEnd};
`;

const IconButton = styled.TouchableOpacity<BtnProps>`
  max-width: ${props => props.theme.darkButton.width};
  max-height: ${props => props.theme.darkButton.height};
  margin-top: ${props => props.theme.darkButton.marginTop};
  margin-right: ${props => props.theme.darkButton.marginRight};
`;

const LightDarkIcon = styled.Image<IconProps>`
  max-width: ${props => props.theme.darkButton.width};
  max-height: ${props => props.theme.darkButton.height};
  display: ${props => props.theme.display.display};
`;

export {LightDarkIcon, IconButton, IconView};
