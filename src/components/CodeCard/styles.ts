import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 90%;
  height: 66px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  elevation: 2;
`;

export const CodeLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 25px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
