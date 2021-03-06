import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface LineProps extends ViewProps {
  theme: ThemeProps;
}

interface LabelProps extends TextProps {
  theme: ThemeProps;
}

const ParentView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;

const Line = styled.View<LineProps>`
  flex: 1;
  background-color: ${props => props.theme.separator.line};
  height: 1px;
`;

const Label = styled.Text<LabelProps>`
  color: ${props => props.theme.separator.line};
  text-align: center;
  padding: 0 12px;
  margin: 10px;
`;

export {Line, Label, ParentView};
