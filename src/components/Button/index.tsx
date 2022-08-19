import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Load } from '../Load';
import {
  Container,
  Title
} from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isLoading: boolean;
}

export function Button({ title, isLoading, ...rest }: Props) {

  const { colors } = useTheme();

  return (
    <Container {...rest}>
      {
        isLoading
          ? <Load color={colors.white} />
          : <Title>{title}</Title>
      }

    </Container>
  );
}
