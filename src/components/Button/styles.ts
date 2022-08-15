import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 80%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
