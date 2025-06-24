import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  console.log(user);

  const roles = user?.['https://tnest.com'] || [];

  if (
    allowedRoles.length &&
    !roles.some((role: string) => allowedRoles.includes(role))
  ) {
    return <p className="text-center mt-8 text-destructive">Access Denied</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
