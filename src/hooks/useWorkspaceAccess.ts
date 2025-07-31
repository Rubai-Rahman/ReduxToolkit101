import { useCallback } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import type {
  PermissionResource,
  PermissionAction,
  PermissionScope,
  WorkspaceRole,
} from '@/types/workspace';

/**
 * Hook for workspace access control and permission checking
 */
export const useWorkspaceAccess = () => {
  const {
    currentWorkspace,
    currentUserWorkspace,
    userRole,
    hasPermission,
    canManageUsers,
    canManageTasks,
    canInviteUsers,
    isWorkspaceAccessible,
    getWorkspaceById,
    validateWorkspaceAccess,
  } = useWorkspace();

  // Check if user has specific permission
  const checkPermission = useCallback(
    (
      resource: PermissionResource,
      action: PermissionAction,
      scope?: PermissionScope
    ): boolean => {
      return hasPermission(resource, action, scope);
    },
    [hasPermission]
  );

  // Check if user can perform action on specific resource
  const canPerformAction = useCallback(
    (
      action: 'create' | 'read' | 'update' | 'delete' | 'assign',
      resource: PermissionResource
    ): boolean => {
      return checkPermission(resource, action);
    },
    [checkPermission]
  );

  // Role-based checks
  const isAdmin = userRole === 'admin';
  const isSupervisor = userRole === 'supervisor';
  const isMember = userRole === 'member';
  const isAtLeastSupervisor = isAdmin || isSupervisor;
  const isAtLeastMember = isAdmin || isSupervisor || isMember;

  // Workspace-specific checks
  const hasWorkspaceAccess = useCallback(
    (workspaceId?: string): boolean => {
      if (!workspaceId) return !!currentWorkspace;
      return isWorkspaceAccessible(workspaceId);
    },
    [currentWorkspace, isWorkspaceAccessible]
  );

  const isCurrentWorkspace = useCallback(
    (workspaceId: string): boolean => {
      return currentWorkspace?.id === workspaceId;
    },
    [currentWorkspace]
  );

  // Resource-specific permission checks
  const canCreateTask = checkPermission('task', 'create');
  const canUpdateTask = (isOwner: boolean = false) =>
    checkPermission('task', 'update', isOwner ? 'own' : 'workspace');
  const canDeleteTask = checkPermission('task', 'delete');
  const canAssignTask = checkPermission('task', 'assign');

  const canCreateTeam = checkPermission('team', 'create');
  const canUpdateTeam = checkPermission('team', 'update');
  const canDeleteTeam = checkPermission('team', 'delete');

  const canUpdateWorkspace = checkPermission('workspace', 'update');
  const canDeleteWorkspace = checkPermission('workspace', 'delete');

  // User management permissions
  const canViewUsers = checkPermission('user', 'read');
  const canInviteUser = canInviteUsers;
  const canUpdateUserRole = canManageUsers;
  const canRemoveUser = canManageUsers;

  // Validation helpers
  const requireWorkspace = useCallback((): boolean => {
    if (!currentWorkspace) {
      throw new Error('This action requires an active workspace');
    }
    return true;
  }, [currentWorkspace]);

  const requireRole = useCallback(
    (requiredRole: WorkspaceRole | WorkspaceRole[]): boolean => {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

      if (!userRole || !roles.includes(userRole)) {
        throw new Error(`This action requires ${roles.join(' or ')} role`);
      }
      return true;
    },
    [userRole]
  );

  const requirePermission = useCallback(
    (
      resource: PermissionResource,
      action: PermissionAction,
      scope?: PermissionScope
    ): boolean => {
      if (!checkPermission(resource, action, scope)) {
        throw new Error(
          `Insufficient permissions for ${action} on ${resource}`
        );
      }
      return true;
    },
    [checkPermission]
  );

  // Access control guards
  const withWorkspaceAccess = useCallback(
    <T extends any[], R>(fn: (...args: T) => R, workspaceId?: string) => {
      return (...args: T): R => {
        if (workspaceId && !hasWorkspaceAccess(workspaceId)) {
          throw new Error('Access denied to this workspace');
        }
        requireWorkspace();
        return fn(...args);
      };
    },
    [hasWorkspaceAccess, requireWorkspace]
  );

  const withPermission = useCallback(
    <T extends any[], R>(
      fn: (...args: T) => R,
      resource: PermissionResource,
      action: PermissionAction,
      scope?: PermissionScope
    ) => {
      return (...args: T): R => {
        requirePermission(resource, action, scope);
        return fn(...args);
      };
    },
    [requirePermission]
  );

  const withRole = useCallback(
    <T extends any[], R>(
      fn: (...args: T) => R,
      requiredRole: WorkspaceRole | WorkspaceRole[]
    ) => {
      return (...args: T): R => {
        requireRole(requiredRole);
        return fn(...args);
      };
    },
    [requireRole]
  );

  return {
    // Current state
    currentWorkspace,
    currentUserWorkspace,
    userRole,

    // Role checks
    isAdmin,
    isSupervisor,
    isMember,
    isAtLeastSupervisor,
    isAtLeastMember,

    // Permission checks
    checkPermission,
    canPerformAction,
    hasPermission,

    // Workspace access
    hasWorkspaceAccess,
    isCurrentWorkspace,
    validateWorkspaceAccess,
    getWorkspaceById,

    // Resource permissions
    canCreateTask,
    canUpdateTask,
    canDeleteTask,
    canAssignTask,
    canCreateTeam,
    canUpdateTeam,
    canDeleteTeam,
    canUpdateWorkspace,
    canDeleteWorkspace,

    // User management
    canViewUsers,
    canInviteUser,
    canUpdateUserRole,
    canRemoveUser,
    canManageUsers,
    canManageTasks,
    canInviteUsers,

    // Validation helpers
    requireWorkspace,
    requireRole,
    requirePermission,

    // Access control guards
    withWorkspaceAccess,
    withPermission,
    withRole,
  };
};
