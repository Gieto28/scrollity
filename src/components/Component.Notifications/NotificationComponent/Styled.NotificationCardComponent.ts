import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../../styles/theme';

interface CardViewProps extends ViewProps {
  theme: ThemeProps;
}

interface CardTextProps extends TextProps {
  theme: ThemeProps;
}

const CardView = styled.View<CardViewProps>`
  min-height: 35px;
  background-color: #c5c5c5;
  margin: 5px 0px;
  padding: 5px 10px;
`;
const CardTitle = styled.Text<CardTextProps>`
  margin-top: 5px;
  color: #2c2c2c;
  font-weight: 700;
`;

const CardMessage = styled.Text<CardTextProps>`
  margin-bottom: 5px;
  color: #2c2c2c;
`;

export {CardView, CardTitle, CardMessage};
