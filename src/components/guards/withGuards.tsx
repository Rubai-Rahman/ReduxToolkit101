import React from 'react';
import { WorkspaceGuard } from '@/components/workspace/WorkspaceGuard';
import { RoleGuard } from './RoleGuard';
import { PermissionGuard } from './PermissionGuard';
import type {
  WorkspaceRole,
  PermissionResource,
  PermissionAction,
  PermissionScope,
} from '@/types/workspace';

interface GuardConfig {
  // Workspace requirements
  requireWorkspace?: boolean;
  workspaceId?: string;

  // Role requirements
  requireRole?: WorkspaceRole | WorkspaceRole[];
  requireMinimumRole?: WorkspaceRole;

  // Permission requirements
  requirePermission?: {
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  };

  // Multiple permission options
  requireAnyPermission?: Array<{
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  }>;

  requireAllPermissions?: Array<{
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  }>;

  // Custom validation
  customValidation?: () => boolean;
  customErrorMessage?: string;

  // Error handling
  showError?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * Higher-order component that applies multiple guards to a component
 */
export function withGuards<P extends object>(
  Component: React.ComponentType<P>,
  config: GuardConfig
) {
  const GuardedComponent: React.FC<P> = (props) => {
    const {
      requireWorkspace = true,
      workspaceId,
      requireRole,
      requireMinimumRole,
      requirePermission,
      requireAnyPermission,
      requireAllPermissions,
      customValidation,
      customErrorMessage,
      showError = true,
      redirectTo,
      fallback,
    } = config;

    let guardedComponent = <Component {...props} />;

    // Apply permission guard if needed
    if (requirePermission || requireAnyPermission || requireAllPermissions) {
      guardedComponent = (
        <PermissionGuard
          requirePermission={requirePermission!}
          requireAnyPermission={requireAnyPermission}
          requireAllPermissions={requireAllPermissions}
          showError={showError}
          redirectTo={redirectTo}
          fallback={fallback}
        >
          {guardedComponent}
        </PermissionGuard>
      );
    }

    // Apply role guard if needed
    if (requireRole || requireMinimumRole) {
      guardedComponent = (
        <RoleGuard
          requireRole={requireRole}
          requireMinimumRole={requireMinimumRole}
          showError={showError}
          redirectTo={redirectTo}
          fallback={fallback}
        >
          {guardedComponent}
        </RoleGuard>
      );
    }

    // Apply workspace guard if needed
    if (requireWorkspace || workspaceId || customValidation) {
      guardedComponent = (
        <WorkspaceGuard
          requireWorkspace={requireWorkspace}
          workspaceId={workspaceId}
          customValidation={customValidation}
          customErrorMessage={customErrorMessage}
          showError={showError}
          fallback={fallback}
        >
          {guardedComponent}
        </WorkspaceGuard>
      );
    }

    return guardedComponent;
  };

  GuardedComponent.displayName = `withGuards(${Component.displayName || Component.name})`;

  return GuardedComponent;
}

/**
 * Convenience functions for common guard combinations
 */

// Admin-only component
export function withAdminGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return withGuards(Component, {
    requireRole: 'admin',
  });
}

// Supervisor or admin component
export function withSupervisorGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return withGuards(Component, {
    requireRole: ['supervisor', 'admin'],
  });
}

// Task management component
export function withTaskManagementGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return withGuards(Component, {
    requirePermission: { resource: 'task', action: 'create' },
  });
}

// User management component
export function withUserManagementGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return withGuards(Component, {
    requirePermission: { resource: 'user', action: 'update' },
  });
}

// Workspace management component
export function withWorkspaceManagementGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return withGuards(Component, {
    requirePermission: { resource: 'workspace', action: 'update' },
  });
}

// Team management component
export function withTeamManagementGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return withGuards(Component, {
    requirePermission: { resource: 'team', action: 'create' },
  });
}

/**
 * Hook for applying guards conditionally
 */
export function useGuardCheck(config: GuardConfig): {
  canAccess: boolean;
  errorMessage?: string;
} {
  // This would implement the same logic as the guards but return boolean
  // For now, return true - this would need to be implemented based on the guard logic
  return { canAccess: true };
}

export default withGuards;
