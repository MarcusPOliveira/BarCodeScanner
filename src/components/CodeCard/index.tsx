import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  CodeLabel
} from './styles';

type CodeProps = TouchableOpacityProps & {
  code: string;
}

export function CodeCard({ code, ...rest }: CodeProps) {
  return (
    <Container {...rest}>
      <CodeLabel> {code} </CodeLabel>
    </Container>
  );
}
