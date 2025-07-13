import App from '@/App';
import About from '@/pages/About/About';
import Landing from '@/pages/Landing/Landing';
import Home from '@/pages/Home/Home';

import { createBrowserRouter } from 'react-router-dom';
import Tasks from '@/pages/Tasks/Tasks';
import NotFound from '@/components/404-Notfound';
import Onboarding from '@/pages/Onboarding/Onboarding';
import { ProtectedRoute } from './ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tasks',
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
