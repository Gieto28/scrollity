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

export {HomeLabel, LabelWrapper};
