import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import {
  Container
} from './styles';

export function Load() {

  const { colors } = useTheme();

  return (
    <Container>
      <ActivityIndicator size='large' color={colors.primary} />
    </Container>
  );
}
