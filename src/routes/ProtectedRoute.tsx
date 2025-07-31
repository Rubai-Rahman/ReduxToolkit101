import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWorkspace?: boolean;
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/30">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[var(--primary-start)]" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const WorkspaceRedirectHandler: React.FC<{
  children: React.ReactNode;
  requireWorkspace?: boolean;
}> = ({ children, requireWorkspace = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentWorkspace,
    userWorkspaces,
    isLoading,
    isSyncComplete,
    syncError,
    error,
  } = useWorkspace();

  useEffect(() => {
    // Don't redirect if we're still loading or syncing
    if (!isSyncComplete || isLoading) {
      return;
    }

    // Don't redirect if there are errors (let the error be handled by the component)
    if (syncError || error) {
      return;
    }

    // If we're already on the onboarding page, don't redirect
    if (location.pathname === '/onboarding') {
      return;
    }

    // If workspace is required but user has no current workspace
    if (requireWorkspace && !currentWorkspace) {
      // If user has workspaces but none selected, or no workspaces at all, go to onboarding
      navigate('/onboarding', { replace: true });
      return;
    }

    // If we're on a route that doesn't require workspace but user has no workspace,
    // and they have no workspaces at all, redirect to onboarding
    if (!requireWorkspace && userWorkspaces.length === 0) {
      navigate('/onboarding', { replace: true });
      return;
    }
  }, [
    currentWorkspace,
    userWorkspaces.length,
    isLoading,
    isSyncComplete,
    syncError,
    error,
    requireWorkspace,
    location.pathname,
    navigate,
  ]);

  // Show loading while syncing
  if (!isSyncComplete || isLoading) {
    return <LoadingSpinner />;
  }

  // If workspace is required but not available, show loading
  // (the useEffect will handle the redirect)
  if (
    requireWorkspace &&
    !currentWorkspace &&
    location.pathname !== '/onboarding'
  ) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireWorkspace = true,
}) => {
  const Component = withAuthenticationRequired(
    () => (
      <WorkspaceRedirectHandler requireWorkspace={requireWorkspace}>
        {children}
      </WorkspaceRedirectHandler>
    ),
    {
      onRedirecting: () => <LoadingSpinner />,
    }
  );

  return <Component />;
};
