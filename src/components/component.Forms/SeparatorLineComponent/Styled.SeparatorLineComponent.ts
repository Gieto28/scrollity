import styled from 'styled-components/native';

const ParentView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View`
  flex: 1;
  background-color: black;
  height: 1px;
  max-width: 39%;
`;

const Label = styled.Text`
  text-align: center;
  padding: 0 10px;
  margin: 10px;
`;

export {Line, Label, ParentView};
