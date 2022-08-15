import React from 'react';

import {
  Container,
  CodeLabel
} from './styles';

type Props = {
  code: string;
}

export function CodeCard({ code }: Props) {
  return (
    <Container>
      <CodeLabel> {code} </CodeLabel>
    </Container>
  );
}
