import App from '@/App';
import About from '@/pages/About/About';
import Landing from '@/pages/Landing/Landing';
import Home from '@/pages/Home/Home';

import { createBrowserRouter } from 'react-router-dom';
import Tasks from '@/pages/Tasks/Tasks';
import NotFound from '@/components/404-Notfound';
import Onboarding from '@/pages/Onboarding/Onboarding';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/onboarding',
        element: <Onboarding />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
