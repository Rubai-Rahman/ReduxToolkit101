import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import type {
  User,
  Workspace,
  UserWorkspace,
  Permission,
  WorkspaceRole,
  PermissionResource,
  PermissionAction,
  PermissionScope,
} from '@/types/workspace';

export interface WorkspaceState {
  // Current workspace context
  currentWorkspace: Workspace | null;
  currentUserWorkspace: UserWorkspace | null;

  // User's workspaces
  userWorkspaces: UserWorkspace[];

  // Workspace members (for current workspace)
  workspaceMembers: UserWorkspace[];

  // Loading states
  isLoading: boolean;
  isSwitching: boolean;

  // Error handling
  error: string | null;

  // Permissions for current user in current workspace
  permissions: Permission[];
}

const initialState: WorkspaceState = {
  currentWorkspace: null,
  currentUserWorkspace: null,
  userWorkspaces: [],
  workspaceMembers: [],
  isLoading: false,
  isSwitching: false,
  error: null,
  permissions: [],
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    // Set user's workspaces after sync
    setUserWorkspaces: (state, action: PayloadAction<UserWorkspace[]>) => {
      state.userWorkspaces = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Set current active workspace
    setCurrentWorkspace: (
      state,
      action: PayloadAction<{
        workspace: Workspace;
        userWorkspace: UserWorkspace;
      }>
    ) => {
      const { workspace, userWorkspace } = action.payload;
      state.currentWorkspace = workspace;
      state.currentUserWorkspace = userWorkspace;
      state.isSwitching = false;
      state.error = null;

      // Update permissions based on role
      state.permissions = getPermissionsForRole(userWorkspace.role);
    },

    // Switch workspace
    switchWorkspace: (state, action: PayloadAction<string>) => {
      state.isSwitching = true;
      state.error = null;
    },

    // Add new workspace (after creation)
    addWorkspace: (state, action: PayloadAction<UserWorkspace>) => {
      state.userWorkspaces.push(action.payload);
    },

    // Update workspace details
    updateWorkspace: (state, action: PayloadAction<Partial<Workspace>>) => {
      if (state.currentWorkspace) {
        Object.assign(state.currentWorkspace, action.payload);
      }

      // Update in userWorkspaces array
      const userWorkspaceIndex = state.userWorkspaces.findIndex(
        (uw) => uw.workspaceId === state.currentWorkspace?.id
      );
      if (
        userWorkspaceIndex !== -1 &&
        state.userWorkspaces[userWorkspaceIndex].workspace
      ) {
        Object.assign(
          state.userWorkspaces[userWorkspaceIndex].workspace!,
          action.payload
        );
      }
    },

    // Set workspace members
    setWorkspaceMembers: (state, action: PayloadAction<UserWorkspace[]>) => {
      state.workspaceMembers = action.payload;
    },

    // Add workspace member
    addWorkspaceMember: (state, action: PayloadAction<UserWorkspace>) => {
      state.workspaceMembers.push(action.payload);
    },

    // Update member role
    updateMemberRole: (
      state,
      action: PayloadAction<{
        userId: string;
        role: WorkspaceRole;
      }>
    ) => {
      const { userId, role } = action.payload;
      const member = state.workspaceMembers.find((m) => m.userId === userId);
      if (member) {
        member.role = role;
      }
    },

    // Remove workspace member
    removeMember: (state, action: PayloadAction<string>) => {
      state.workspaceMembers = state.workspaceMembers.filter(
        (member) => member.userId !== action.payload
      );
    },

    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setSwitching: (state, action: PayloadAction<boolean>) => {
      state.isSwitching = action.payload;
    },

    // Error handling
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSwitching = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Clear workspace data (on logout)
    clearWorkspaceData: (state) => {
      return initialState;
    },
  },
});

// Helper function to get permissions based on role
function getPermissionsForRole(role: WorkspaceRole): Permission[] {
  const basePermissions: Permission[] = [
    { resource: 'task', action: 'read', scope: 'workspace' },
    { resource: 'team', action: 'read', scope: 'workspace' },
    { resource: 'user', action: 'read', scope: 'workspace' },
  ];

  const memberPermissions: Permission[] = [
    ...basePermissions,
    { resource: 'task', action: 'update', scope: 'own' },
  ];

  const supervisorPermissions: Permission[] = [
    ...memberPermissions,
    { resource: 'task', action: 'create', scope: 'workspace' },
    { resource: 'task', action: 'update', scope: 'workspace' },
    { resource: 'task', action: 'delete', scope: 'workspace' },
    { resource: 'task', action: 'assign', scope: 'workspace' },
    { resource: 'team', action: 'create', scope: 'workspace' },
    { resource: 'team', action: 'update', scope: 'workspace' },
    { resource: 'user', action: 'create', scope: 'workspace' }, // Can invite users
  ];

  const adminPermissions: Permission[] = [
    ...supervisorPermissions,
    { resource: 'team', action: 'delete', scope: 'workspace' },
    { resource: 'user', action: 'update', scope: 'workspace' }, // Can change roles
    { resource: 'user', action: 'delete', scope: 'workspace' }, // Can remove users
    { resource: 'workspace', action: 'update', scope: 'workspace' },
    { resource: 'workspace', action: 'delete', scope: 'workspace' },
  ];

  switch (role) {
    case 'member':
      return memberPermissions;
    case 'supervisor':
      return supervisorPermissions;
    case 'admin':
      return adminPermissions;
    default:
      return basePermissions;
  }
}

// Action creators
export const {
  setUserWorkspaces,
  setCurrentWorkspace,
  switchWorkspace,
  addWorkspace,
  updateWorkspace,
  setWorkspaceMembers,
  addWorkspaceMember,
  updateMemberRole,
  removeMember,
  setLoading,
  setSwitching,
  setError,
  clearError,
  clearWorkspaceData,
} = workspaceSlice.actions;

// Selectors
export const selectCurrentWorkspace = (state: RootState) =>
  state.workspace.currentWorkspace;
export const selectCurrentUserWorkspace = (state: RootState) =>
  state.workspace.currentUserWorkspace;
export const selectUserWorkspaces = (state: RootState) =>
  state.workspace.userWorkspaces;
export const selectWorkspaceMembers = (state: RootState) =>
  state.workspace.workspaceMembers;
export const selectWorkspaceLoading = (state: RootState) =>
  state.workspace.isLoading;
export const selectWorkspaceSwitching = (state: RootState) =>
  state.workspace.isSwitching;
export const selectWorkspaceError = (state: RootState) => state.workspace.error;
export const selectCurrentUserRole = (state: RootState): WorkspaceRole | null =>
  state.workspace.currentUserWorkspace?.role || null;
export const selectUserPermissions = (state: RootState) =>
  state.workspace.permissions;

// Permission checking selectors
export const selectHasPermission = (
  state: RootState,
  resource: PermissionResource,
  action: PermissionAction,
  scope?: PermissionScope
) => {
  const permissions = selectUserPermissions(state);
  return permissions.some(
    (permission) =>
      permission.resource === resource &&
      permission.action === action &&
      (scope
        ? permission.scope === scope || permission.scope === 'workspace'
        : true)
  );
};

export const selectCanManageUsers = (state: RootState) => {
  const role = selectCurrentUserRole(state);
  return role === 'admin';
};

export const selectCanManageTasks = (state: RootState) => {
  const role = selectCurrentUserRole(state);
  return role === 'admin' || role === 'supervisor';
};

export const selectCanInviteUsers = (state: RootState) => {
  const role = selectCurrentUserRole(state);
  return role === 'admin' || role === 'supervisor';
};

export default workspaceSlice.reducer;
