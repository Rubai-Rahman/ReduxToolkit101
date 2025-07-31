import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useSyncUserMutation } from '@/redux/api/apiSlice';
import {
  setUserWorkspaces,
  setCurrentWorkspace,
  setLoading,
  setError,
  clearError,
} from '@/redux/features/workspace/workspaceSlice';

interface UseUserSyncReturn {
  isLoading: boolean;
  error: string | null;
  isComplete: boolean;
  retry: () => void;
}

export const useUserSync = (): UseUserSyncReturn => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const dispatch = useDispatch();
  const [syncUser, { isLoading: syncLoading, error: syncError }] =
    useSyncUserMutation();

  const [isComplete, setIsComplete] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const performSync = async () => {
    if (!user || !isAuthenticated) return;

    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      setLocalError(null);

      // Prepare user data for sync
      const userData = {
        auth0Id: user.sub!,
        email: user.email!,
        name: user.name || user.email!,
        avatarUrl: user.picture,
      };

      // Call sync API
      const result = await syncUser(userData).unwrap();

      // Update Redux state with sync results
      dispatch(setUserWorkspaces(result.workspaces));

      // If user has a default workspace, set it as current
      if (result.defaultWorkspace) {
        dispatch(
          setCurrentWorkspace({
            workspace: result.defaultWorkspace.workspace,
            userWorkspace: result.defaultWorkspace.userWorkspace,
          })
        );
      }

      setIsComplete(true);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || 'Failed to sync user data';
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const retry = () => {
    setIsComplete(false);
    performSync();
  };

  // Auto-sync when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && !isComplete && !syncLoading) {
      performSync();
    }
  }, [isAuthenticated, user, isComplete, syncLoading]);

  const isLoading = authLoading || syncLoading;
  const error = localError || (syncError as any)?.data?.message || null;

  return {
    isLoading,
    error,
    isComplete,
    retry,
  };
};
