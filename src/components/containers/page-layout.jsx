import { styled } from '@linaria/react';
import { Helmet } from 'react-helmet';
import { ErrorBoundary } from '@src/components/error-boundary';

export function PageLayout({ title, ...props }) {
  return (
    <ErrorBoundary extraInfo={{ pageTitle: title }}>
      {title && <Helmet title={title} />}
      <Container {...props} />
    </ErrorBoundary>
  );
}

const Container = styled.div`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
`;
