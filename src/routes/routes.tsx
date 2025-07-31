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
          <ProtectedRoute requireWorkspace={false}>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute requireWorkspace={true}>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about',
        element: (
          <ProtectedRoute requireWorkspace={true}>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tasks',
        element: (
          <ProtectedRoute requireWorkspace={true}>
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
