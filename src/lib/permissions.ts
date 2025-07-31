import type {
  WorkspaceRole,
  Permission,
  PermissionResource,
  PermissionAction,
  PermissionScope,
  RolePermissions,
} from '@/types/workspace';

/**
 * Comprehensive role-based permission matrix
 * Defines what each role can do with each resource
 */
export const ROLE_PERMISSIONS: RolePermissions = {
  member: [
    // Task permissions - members can only manage their own tasks
    { resource: 'task', action: 'read', scope: 'workspace' },
    { resource: 'task', action: 'create', scope: 'own' },
    { resource: 'task', action: 'update', scope: 'own' },

    // Team permissions - read only
    { resource: 'team', action: 'read', scope: 'workspace' },

    // User permissions - read only
    { resource: 'user', action: 'read', scope: 'workspace' },

    // Workspace permissions - read only
    { resource: 'workspace', action: 'read', scope: 'workspace' },
  ],

  supervisor: [
    // Task permissions - full task management
    { resource: 'task', action: 'read', scope: 'workspace' },
    { resource: 'task', action: 'create', scope: 'workspace' },
    { resource: 'task', action: 'update', scope: 'workspace' },
    { resource: 'task', action: 'delete', scope: 'workspace' },
    { resource: 'task', action: 'assign', scope: 'workspace' },

    // Team permissions - can manage teams
    { resource: 'team', action: 'read', scope: 'workspace' },
    { resource: 'team', action: 'create', scope: 'workspace' },
    { resource: 'team', action: 'update', scope: 'workspace' },

    // User permissions - can invite users
    { resource: 'user', action: 'read', scope: 'workspace' },
    { resource: 'user', action: 'create', scope: 'workspace' }, // Invite users

    // Workspace permissions - read only
    { resource: 'workspace', action: 'read', scope: 'workspace' },
  ],

  admin: [
    // Task permissions - full task management
    { resource: 'task', action: 'read', scope: 'workspace' },
    { resource: 'task', action: 'create', scope: 'workspace' },
    { resource: 'task', action: 'update', scope: 'workspace' },
    { resource: 'task', action: 'delete', scope: 'workspace' },
    { resource: 'task', action: 'assign', scope: 'workspace' },

    // Team permissions - full team management
    { resource: 'team', action: 'read', scope: 'workspace' },
    { resource: 'team', action: 'create', scope: 'workspace' },
    { resource: 'team', action: 'update', scope: 'workspace' },
    { resource: 'team', action: 'delete', scope: 'workspace' },

    // User permissions - full user management
    { resource: 'user', action: 'read', scope: 'workspace' },
    { resource: 'user', action: 'create', scope: 'workspace' }, // Invite users
    { resource: 'user', action: 'update', scope: 'workspace' }, // Change roles
    { resource: 'user', action: 'delete', scope: 'workspace' }, // Remove users

    // Workspace permissions - full workspace management
    { resource: 'workspace', action: 'read', scope: 'workspace' },
    { resource: 'workspace', action: 'update', scope: 'workspace' },
    { resource: 'workspace', action: 'delete', scope: 'workspace' },
  ],
};

/**
 * Permission checking utilities
 */
export class PermissionChecker {
  private permissions: Permission[];

  constructor(permissions: Permission[]) {
    this.permissions = permissions;
  }

  /**
   * Check if user has a specific permission
   */
  hasPermission(
    resource: PermissionResource,
    action: PermissionAction,
    scope?: PermissionScope
  ): boolean {
    return this.permissions.some((permission) => {
      const resourceMatch = permission.resource === resource;
      const actionMatch = permission.action === action;
      const scopeMatch = scope
        ? permission.scope === scope || permission.scope === 'workspace'
        : true;

      return resourceMatch && actionMatch && scopeMatch;
    });
  }

  /**
   * Check if user has any of the specified permissions
   */
  hasAnyPermission(
    permissionChecks: Array<{
      resource: PermissionResource;
      action: PermissionAction;
      scope?: PermissionScope;
    }>
  ): boolean {
    return permissionChecks.some((check) =>
      this.hasPermission(check.resource, check.action, check.scope)
    );
  }

  /**
   * Check if user has all of the specified permissions
   */
  hasAllPermissions(
    permissionChecks: Array<{
      resource: PermissionResource;
      action: PermissionAction;
      scope?: PermissionScope;
    }>
  ): boolean {
    return permissionChecks.every((check) =>
      this.hasPermission(check.resource, check.action, check.scope)
    );
  }

  /**
   * Get all permissions for a specific resource
   */
  getResourcePermissions(resource: PermissionResource): Permission[] {
    return this.permissions.filter(
      (permission) => permission.resource === resource
    );
  }

  /**
   * Get all permissions for a specific action
   */
  getActionPermissions(action: PermissionAction): Permission[] {
    return this.permissions.filter(
      (permission) => permission.action === action
    );
  }
}

/**
 * Role validation functions
 */
export const RoleValidator = {
  /**
   * Check if a role is valid
   */
  isValidRole(role: string): role is WorkspaceRole {
    return ['member', 'supervisor', 'admin'].includes(role);
  },

  /**
   * Check if user has required role
   */
  hasRole(
    userRole: WorkspaceRole | null,
    requiredRole: WorkspaceRole | WorkspaceRole[]
  ): boolean {
    if (!userRole) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  },

  /**
   * Check if user has at least the specified role level
   */
  hasMinimumRole(
    userRole: WorkspaceRole | null,
    minimumRole: WorkspaceRole
  ): boolean {
    if (!userRole) return false;

    const roleHierarchy: Record<WorkspaceRole, number> = {
      member: 1,
      supervisor: 2,
      admin: 3,
    };

    return roleHierarchy[userRole] >= roleHierarchy[minimumRole];
  },

  /**
   * Get role hierarchy level
   */
  getRoleLevel(role: WorkspaceRole): number {
    const roleHierarchy: Record<WorkspaceRole, number> = {
      member: 1,
      supervisor: 2,
      admin: 3,
    };

    return roleHierarchy[role];
  },

  /**
   * Check if role can be assigned by current user
   */
  canAssignRole(
    currentUserRole: WorkspaceRole | null,
    targetRole: WorkspaceRole
  ): boolean {
    if (!currentUserRole) return false;

    // Only admins can assign roles
    if (currentUserRole !== 'admin') return false;

    // Admins can assign any role
    return true;
  },

  /**
   * Get assignable roles for current user
   */
  getAssignableRoles(currentUserRole: WorkspaceRole | null): WorkspaceRole[] {
    if (!currentUserRole) return [];

    switch (currentUserRole) {
      case 'admin':
        return ['member', 'supervisor', 'admin'];
      case 'supervisor':
        return []; // Supervisors cannot assign roles
      case 'member':
        return []; // Members cannot assign roles
      default:
        return [];
    }
  },
};

/**
 * Permission-based component rendering utilities
 */
export const PermissionRenderer = {
  /**
   * Render component based on permission
   */
  renderWithPermission<T>(
    component: T,
    checker: PermissionChecker,
    resource: PermissionResource,
    action: PermissionAction,
    scope?: PermissionScope,
    fallback?: T
  ): T | null {
    if (checker.hasPermission(resource, action, scope)) {
      return component;
    }
    return fallback || null;
  },

  /**
   * Render component based on role
   */
  renderWithRole<T>(
    component: T,
    userRole: WorkspaceRole | null,
    requiredRole: WorkspaceRole | WorkspaceRole[],
    fallback?: T
  ): T | null {
    if (RoleValidator.hasRole(userRole, requiredRole)) {
      return component;
    }
    return fallback || null;
  },

  /**
   * Render component based on minimum role level
   */
  renderWithMinimumRole<T>(
    component: T,
    userRole: WorkspaceRole | null,
    minimumRole: WorkspaceRole,
    fallback?: T
  ): T | null {
    if (RoleValidator.hasMinimumRole(userRole, minimumRole)) {
      return component;
    }
    return fallback || null;
  },
};

/**
 * Get permissions for a specific role
 */
export function getPermissionsForRole(role: WorkspaceRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Create a permission checker instance
 */
export function createPermissionChecker(
  role: WorkspaceRole | null
): PermissionChecker {
  const permissions = role ? getPermissionsForRole(role) : [];
  return new PermissionChecker(permissions);
}

/**
 * Permission constants for common checks
 */
export const PERMISSION_CHECKS = {
  // Task permissions
  CREATE_TASK: { resource: 'task' as const, action: 'create' as const },
  UPDATE_TASK: { resource: 'task' as const, action: 'update' as const },
  DELETE_TASK: { resource: 'task' as const, action: 'delete' as const },
  ASSIGN_TASK: { resource: 'task' as const, action: 'assign' as const },

  // Team permissions
  CREATE_TEAM: { resource: 'team' as const, action: 'create' as const },
  UPDATE_TEAM: { resource: 'team' as const, action: 'update' as const },
  DELETE_TEAM: { resource: 'team' as const, action: 'delete' as const },

  // User permissions
  INVITE_USER: { resource: 'user' as const, action: 'create' as const },
  UPDATE_USER_ROLE: { resource: 'user' as const, action: 'update' as const },
  REMOVE_USER: { resource: 'user' as const, action: 'delete' as const },

  // Workspace permissions
  UPDATE_WORKSPACE: {
    resource: 'workspace' as const,
    action: 'update' as const,
  },
  DELETE_WORKSPACE: {
    resource: 'workspace' as const,
    action: 'delete' as const,
  },
} as const;

/**
 * Role display utilities
 */
export const RoleDisplay = {
  /**
   * Get display name for role
   */
  getRoleDisplayName(role: WorkspaceRole): string {
    const displayNames: Record<WorkspaceRole, string> = {
      member: 'Member',
      supervisor: 'Supervisor',
      admin: 'Administrator',
    };

    return displayNames[role];
  },

  /**
   * Get role description
   */
  getRoleDescription(role: WorkspaceRole): string {
    const descriptions: Record<WorkspaceRole, string> = {
      member: 'Can view workspace content and manage their own tasks',
      supervisor: 'Can manage tasks, teams, and invite new members',
      admin: 'Full access to workspace management and user administration',
    };

    return descriptions[role];
  },

  /**
   * Get role color for UI
   */
  getRoleColor(role: WorkspaceRole): string {
    const colors: Record<WorkspaceRole, string> = {
      member: 'green',
      supervisor: 'blue',
      admin: 'red',
    };

    return colors[role];
  },

  /**
   * Get role badge variant
   */
  getRoleBadgeVariant(
    role: WorkspaceRole
  ): 'default' | 'secondary' | 'destructive' | 'outline' {
    const variants: Record<
      WorkspaceRole,
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      member: 'default',
      supervisor: 'secondary',
      admin: 'destructive',
    };

    return variants[role];
  },
};
