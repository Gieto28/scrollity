import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface LineProps extends ViewProps {
  theme: any;
}

interface LabelProps extends TextProps {
  theme: any;
}

const ParentView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View<LineProps>`
  flex: 1;
  background-color: ${props => props.theme.separator.line};
  height: 1px;
  padding: 0 16px;
`;

const Label = styled.Text<LabelProps>`
  color: ${props => props.theme.separator.line};
  text-align: center;
  padding: 0 10px;
  margin: 10px;
`;

export {Line, Label, ParentView};
