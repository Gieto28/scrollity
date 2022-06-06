import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
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

const CreateBody = styled.View<PropsView>``;

const DropDownStyles = {
  height: '30px',
  width: '30px',
};

export {CreatePostWrapper, CreateHeader, CreateBody};
