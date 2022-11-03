import { createBrowserRouter } from 'react-router-dom';
import RootRoute from '@src/components/routes/root.jsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
  },
]);
