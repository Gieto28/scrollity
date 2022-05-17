import styled from 'styled-components/native';

const LightDarkButton = styled.TouchableOpacity`
  width: 50px;
`;
const LightDarkText = styled.Text<{theme: any}>`
  color: ${({theme}) => theme.color};
  /* color: ${props => props.theme.color} */
`;

export {LightDarkButton, LightDarkText};
