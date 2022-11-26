import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@src/components/error-boundary';
import router from '@src/components/router';
import './main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet
        defaultTitle="Cthulhu Wars Online"
        titleTemplate="%s | Cthulhu Wars Online"
      />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);

if (process.env.NODE_ENV !== 'production') {
  import('@src/library/dev-helpers');
}
