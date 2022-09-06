import Bootstrap from './containers/bootstrap';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>
);
