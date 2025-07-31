import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  selectCurrentWorkspace,
  selectCurrentUserWorkspace,
  selectUserWorkspaces,
  selectWorkspaceLoading,
  selectWorkspaceError,
  selectCurrentUserRole,
  selectUserPermissions,
  clearWorkspaceData,
  setCurrentWorkspace,
  setError,
  clearError,
  restoreWorkspace,
  validateWorkspaceAccess as validateWorkspaceAccessAction,
} from '@/redux/features/workspace/workspaceSlice';
import type {
  Workspace,
  UserWorkspace,
  Permission,
  WorkspaceRole,
  PermissionResource,
  PermissionAction,
  PermissionScope,
} from '@/types/workspace';
import { useSwitchWorkspaceMutation } from '@/redux/api/apiSlice';
import { useUserSync } from '@/hooks/useUserSync';

interface WorkspaceContextValue {
  // Current workspace state
  currentWorkspace: Workspace | null;
  currentUserWorkspace: UserWorkspace | null;
  userWorkspaces: UserWorkspace[];

  // User permissions and role
  userRole: WorkspaceRole | null;
  permissions: Permission[];

  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // Sync state
  isSyncComplete: boolean;
  syncError: string | null;
  retrySyncUser: () => void;

  // Actions
  switchWorkspace: (workspaceId: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
  validateWorkspaceAccess: (workspaceId: string) => boolean;
  clearWorkspaceError: () => void;

  // Permission helpers
  hasPermission: (
    resource: PermissionResource,
    action: PermissionAction,
    scope?: PermissionScope
  ) => boolean;
  canManageUsers: boolean;
  canManageTasks: boolean;
  canInviteUsers: boolean;

  // Workspace validation
  isWorkspaceAccessible: (workspaceId: string) => boolean;
  getWorkspaceById: (workspaceId: string) => UserWorkspace | null;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

interface WorkspaceProviderProps {
  children: React.ReactNode;
}

// Constants for localStorage keys
const WORKSPACE_STORAGE_KEY = 'tasknest_current_workspace';
const WORKSPACE_EXPIRY_KEY = 'tasknest_workspace_expiry';
const WORKSPACE_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children,
}) => {
  const { isAuthenticated, logout, user } = useAuth0();
  const dispatch = useDispatch();

  // Redux selectors
  const currentWorkspace = useSelector(selectCurrentWorkspace);
  const currentUserWorkspace = useSelector(selectCurrentUserWorkspace);
  const userWorkspaces = useSelector(selectUserWorkspaces);
  const isLoading = useSelector(selectWorkspaceLoading);
  const error = useSelector(selectWorkspaceError);
  const userRole = useSelector(selectCurrentUserRole);
  const permissions = useSelector(selectUserPermissions);

  // User sync hook
  const {
    isLoading: syncLoading,
    error: syncError,
    isComplete: isSyncComplete,
    retry: retrySyncUser,
  } = useUserSync();

  // API mutations
  const [switchWorkspaceMutation] = useSwitchWorkspaceMutation();

  // Workspace persistence functions
  const saveWorkspaceToStorage = useCallback(
    (workspace: Workspace, userWorkspace: UserWorkspace) => {
      try {
        const workspaceData = {
          workspace,
          userWorkspace,
          userId: user?.sub,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          WORKSPACE_STORAGE_KEY,
          JSON.stringify(workspaceData)
        );
        localStorage.setItem(
          WORKSPACE_EXPIRY_KEY,
          (Date.now() + WORKSPACE_CACHE_DURATION).toString()
        );
      } catch (error) {
        console.warn('Failed to save workspace to localStorage:', error);
      }
    },
    [user?.sub]
  );

  const loadWorkspaceFromStorage = useCallback((): {
    workspace: Workspace;
    userWorkspace: UserWorkspace;
  } | null => {
    try {
      const expiryTime = localStorage.getItem(WORKSPACE_EXPIRY_KEY);
      if (!expiryTime || Date.now() > parseInt(expiryTime)) {
        // Clear expired data
        localStorage.removeItem(WORKSPACE_STORAGE_KEY);
        localStorage.removeItem(WORKSPACE_EXPIRY_KEY);
        return null;
      }

      const storedData = localStorage.getItem(WORKSPACE_STORAGE_KEY);
      if (!storedData) return null;

      const workspaceData = JSON.parse(storedData);

      // Validate that the stored data belongs to the current user
      if (workspaceData.userId !== user?.sub) {
        localStorage.removeItem(WORKSPACE_STORAGE_KEY);
        localStorage.removeItem(WORKSPACE_EXPIRY_KEY);
        return null;
      }

      return {
        workspace: workspaceData.workspace,
        userWorkspace: workspaceData.userWorkspace,
      };
    } catch (error) {
      console.warn('Failed to load workspace from localStorage:', error);
      return null;
    }
  }, [user?.sub]);

  const clearWorkspaceFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(WORKSPACE_STORAGE_KEY);
      localStorage.removeItem(WORKSPACE_EXPIRY_KEY);
    } catch (error) {
      console.warn('Failed to clear workspace from localStorage:', error);
    }
  }, []);

  // Clear workspace data on logout
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearWorkspaceData());
      clearWorkspaceFromStorage();
    }
  }, [isAuthenticated, dispatch, clearWorkspaceFromStorage]);

  // Restore workspace from localStorage after sync is complete
  useEffect(() => {
    if (isSyncComplete && userWorkspaces.length > 0 && !currentWorkspace) {
      const storedWorkspace = loadWorkspaceFromStorage();

      if (storedWorkspace) {
        // Validate that the user still has access to this workspace
        const hasAccess = userWorkspaces.some(
          (uw) => uw.workspaceId === storedWorkspace.workspace.id && uw.isActive
        );

        if (hasAccess) {
          dispatch(restoreWorkspace(storedWorkspace));
        } else {
          // User no longer has access, clear storage
          clearWorkspaceFromStorage();
        }
      }
    }
  }, [
    isSyncComplete,
    userWorkspaces,
    currentWorkspace,
    loadWorkspaceFromStorage,
    clearWorkspaceFromStorage,
    dispatch,
  ]);

  // Switch workspace function with persistence
  const switchWorkspace = async (workspaceId: string) => {
    try {
      // Validate workspace access before switching
      if (!validateWorkspaceAccess(workspaceId)) {
        throw new Error('Access denied to this workspace');
      }

      const result = await switchWorkspaceMutation(workspaceId).unwrap();

      // Save to localStorage for persistence
      saveWorkspaceToStorage(result.workspace, result.userWorkspace);

      // The workspace slice will be updated via the API response
    } catch (error) {
      console.error('Failed to switch workspace:', error);
      dispatch(
        setError(
          error instanceof Error ? error.message : 'Failed to switch workspace'
        )
      );
      throw error;
    }
  };

  // Refresh workspaces function
  const refreshWorkspaces = async () => {
    try {
      // Trigger user sync to refresh workspace data
      await retrySyncUser();
    } catch (error) {
      console.error('Failed to refresh workspaces:', error);
      dispatch(setError('Failed to refresh workspace data'));
    }
  };

  // Workspace validation functions
  const validateWorkspaceAccess = useCallback(
    (workspaceId: string): boolean => {
      return userWorkspaces.some(
        (uw) => uw.workspaceId === workspaceId && uw.isActive
      );
    },
    [userWorkspaces]
  );

  const isWorkspaceAccessible = useCallback(
    (workspaceId: string): boolean => {
      return validateWorkspaceAccess(workspaceId);
    },
    [validateWorkspaceAccess]
  );

  const getWorkspaceById = useCallback(
    (workspaceId: string): UserWorkspace | null => {
      return (
        userWorkspaces.find(
          (uw) => uw.workspaceId === workspaceId && uw.isActive
        ) || null
      );
    },
    [userWorkspaces]
  );

  const clearWorkspaceError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Permission helper functions
  const hasPermission = (
    resource: PermissionResource,
    action: PermissionAction,
    scope?: PermissionScope
  ): boolean => {
    return permissions.some(
      (permission) =>
        permission.resource === resource &&
        permission.action === action &&
        (scope
          ? permission.scope === scope || permission.scope === 'workspace'
          : true)
    );
  };

  const canManageUsers = userRole === 'admin';
  const canManageTasks = userRole === 'admin' || userRole === 'supervisor';
  const canInviteUsers = userRole === 'admin' || userRole === 'supervisor';

  const contextValue: WorkspaceContextValue = {
    // Current workspace state
    currentWorkspace,
    currentUserWorkspace,
    userWorkspaces,

    // User permissions and role
    userRole,
    permissions,

    // Loading and error states
    isLoading: isLoading || syncLoading,
    error,

    // Sync state
    isSyncComplete,
    syncError,
    retrySyncUser,

    // Actions
    switchWorkspace,
    refreshWorkspaces,
    validateWorkspaceAccess,
    clearWorkspaceError,

    // Permission helpers
    hasPermission,
    canManageUsers,
    canManageTasks,
    canInviteUsers,

    // Workspace validation
    isWorkspaceAccessible,
    getWorkspaceById,
  };

  return (
    <WorkspaceContext.Provider value={contextValue}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextValue => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
