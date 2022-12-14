import styled from 'styled-components/native';

export const Container = styled.View`
  height: 15%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
