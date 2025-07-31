import React, { createContext, useContext, useEffect } from 'react';
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

  // Permission helpers
  hasPermission: (
    resource: PermissionResource,
    action: PermissionAction,
    scope?: PermissionScope
  ) => boolean;
  canManageUsers: boolean;
  canManageTasks: boolean;
  canInviteUsers: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

interface WorkspaceProviderProps {
  children: React.ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children,
}) => {
  const { isAuthenticated, logout } = useAuth0();
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

  // Clear workspace data on logout
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearWorkspaceData());
    }
  }, [isAuthenticated, dispatch]);

  // Switch workspace function
  const switchWorkspace = async (workspaceId: string) => {
    try {
      const result = await switchWorkspaceMutation(workspaceId).unwrap();
      // The workspace slice will be updated via the API response
    } catch (error) {
      console.error('Failed to switch workspace:', error);
      throw error;
    }
  };

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

    // Permission helpers
    hasPermission,
    canManageUsers,
    canManageTasks,
    canInviteUsers,
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
