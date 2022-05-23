import {TextProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface CardViewProps extends ViewProps {
  theme: ThemeProps;
}

interface CardTextProps extends TextProps {
  theme: ThemeProps;
}

interface CardButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const CardView = styled.View<CardViewProps>`
  margin: 5px ${props => props.theme.notificationCard.marginX};
  min-height: 35px;
  border: 1px solid ${props => props.theme.button.border};
  background-color: ${props => props.theme.button.background};
  padding: 5px 10px;
`;

const CardButton = styled.TouchableOpacity<CardButtonProps>``;

const CardTitle = styled.Text<CardTextProps>`
  margin-top: 5px;
  color: ${props => props.theme.button.text};
  font-weight: 700;
`;

const CardMessage = styled.Text<CardTextProps>`
  margin-bottom: 5px;
  color: ${props => props.theme.button.text};
`;

export {CardView, CardTitle, CardMessage, CardButton};
