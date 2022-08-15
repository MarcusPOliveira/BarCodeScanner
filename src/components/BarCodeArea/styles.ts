import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex: 0.5;
  align-items: center;
  justify-content: space-around;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  opacity: 0.4;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const CopyArea = styled.TouchableOpacity`
  width: 80%;
  height: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  margin-top: 20px;
`;

export const Code = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 30px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ClearButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.alert};
  align-items: center;
  justify-content: center;
`;
