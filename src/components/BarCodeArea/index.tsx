import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Button } from '../Button';
import {
  Container,
  Title,
  Subtitle,
  CopyArea,
  Code,
  ClearButton,
} from './styles';

type Props = {
  code: string;
  onCopyArea: () => void;
  onClear: () => void;
  onAddCode: () => void;
  isLoading: boolean;
}

export function BarCodeArea({ code, onClear, onAddCode, onCopyArea, isLoading }: Props) {

  const { colors } = useTheme();

  return (
    <Container>
      <Title>Seu código de barras:</Title>
      <Subtitle>Toque para copiar</Subtitle>
      <CopyArea onPress={onCopyArea}>
        <Code> {code} </Code>
      </CopyArea>
      <Button
        title="Adicionar à lista"
        onPress={onAddCode}
        isLoading={isLoading}
      />
      <ClearButton onPress={onClear}>
        <Feather name="x" size={24} color={colors.white} />
      </ClearButton>
    </Container>
  );
}
