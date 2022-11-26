import { createBrowserRouter } from 'react-router-dom';
import { TabletopLayout } from '@src/components/containers/tabletop-layout';
import { RootRoute } from '@src/components/routes/root';

export default createBrowserRouter([
  {
    path: '/',
    element: <TabletopLayout />,
    children: [
      {
        path: 'root',
        element: <RootRoute />,
      },
    ],
  },
]);
