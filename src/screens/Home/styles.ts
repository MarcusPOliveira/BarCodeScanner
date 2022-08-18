import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScannerContent = styled.View`
  width: 100%;
  height: 90%;
`;

export const ModalContent = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 70px;
  align-items: flex-end;
`;
