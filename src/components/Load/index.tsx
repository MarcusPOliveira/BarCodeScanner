import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import {
  Container
} from './styles';

type Props = ActivityIndicatorProps & {}

export function Load({ ...rest }: Props) {

  const { colors } = useTheme();

  return (
    <Container>
      <ActivityIndicator size='large' color={colors.primary} {...rest} />
    </Container>
  );
}
