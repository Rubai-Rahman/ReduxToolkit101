import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // In a real application, you would fetch user roles and check them here.
  // For now, we'll just pass through if no roles are specified.
  const Component = withAuthenticationRequired(() => <>{children}</>, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return <Component />;
};
