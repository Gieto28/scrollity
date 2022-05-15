import styled from 'styled-components/native';

const LoginView = styled.View`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 24px;
`;

const TextInput = styled.TextInput`
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 16px;
`;

const LoginTitle = styled.Text`
  font-size: 56px;
  color: #0c5156;
  text-align: center;
  margin-bottom: 50px;
`;

export {TextInput, LoginView, LoginTitle};
