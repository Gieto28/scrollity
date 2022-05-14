import styled from 'styled-components/native';

const CardView = styled.View`
  min-height: 35px;
  background-color: #c5c5c5;
  margin: 5px 0px;
  padding: 5px 10px;
`;
const CardTitle = styled.Text`
  margin-top: 5px;
  color: #2c2c2c;
  font-weight: 700;
`;

const CardMessage = styled.Text`
  margin-bottom: 5px;
  color: #2c2c2c;
`;

export {CardView, CardTitle, CardMessage};
