import {TextProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsTouchable extends TouchableOpacityProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

const CreatePostWrapper = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  min-height: 100%;
  color: ${props => props.theme.screen.text};
`;

const CreateHeader = styled.View<PropsView>``;

const LabelWrapper = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  justify-content: ${props => props.theme.display.alignCenter};
`;

const Label = styled.Text<PropsText>`
  margin: 8px 0;
  font-size: ${props => props.theme.fonts.fontSize.xl};
  color: ${props => props.theme.screen.text};
`;

const CreateBody = styled.View<PropsView>`
  padding: 16px;
`;

const SelectWrapper = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  align-items: ${props => props.theme.display.alignCenter};
  justify-content: space-between;
  padding: 0 12px;
  margin: 16px 0;
  min-width: 100%;
`;

const SelectMediaWrapper = styled.TouchableOpacity<PropsTouchable>`
  background-color: grey;
  border: 1px solid ${props => props.theme.button.border};
  border-radius: 10px;
  background-color: ${props => props.theme.screen.background};
`;

const SelectMediaText = styled.Text<PropsText>`
  font-size: 20px;
  padding: 10px 28px;
  color: ${props => props.theme.screen.text};
`;

export {
  CreatePostWrapper,
  CreateHeader,
  LabelWrapper,
  Label,
  CreateBody,
  SelectWrapper,
  SelectMediaWrapper,
  SelectMediaText,
};
