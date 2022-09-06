import { styled } from '@linaria/react';

export function InteractiveMap(props: object) {
  return <Container {...props} />;
}

const Container = styled.div`
  min-width: 1000px;
  max-height: 75vh;
  margin-bottom: 24px;
  aspect-ratio: 25 / 11;
  outline: 1px solid #fff;
  background-color: rgba(0, 0, 0, 0.5);
`;
