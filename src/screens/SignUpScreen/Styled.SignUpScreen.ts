import {ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

const IconWrapper = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 24px 0 24px;
`;

export {IconWrapper};
