import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ListWrapper = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const ClearButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.alert};
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  position: absolute;
  bottom: 13px;
`;
