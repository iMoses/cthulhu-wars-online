import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '@src/components/containers/default-layout';
import RootRoute from '@src/components/routes/root';

export default createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'root',
        element: <RootRoute />,
      },
    ],
  },
]);
