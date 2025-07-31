import React from 'react';
import { useWorkspaceAccess } from '@/hooks/useWorkspaceAccess';
import { createPermissionChecker, RoleValidator } from '@/lib/permissions';
import type {
  WorkspaceRole,
  PermissionResource,
  PermissionAction,
  PermissionScope,
} from '@/types/workspace';

interface PermissionRendererProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;

  // Permission-based rendering
  requirePermission?: {
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  };

  // Role-based rendering
  requireRole?: WorkspaceRole | WorkspaceRole[];
  requireMinimumRole?: WorkspaceRole;

  // Custom validation
  customCheck?: () => boolean;

  // Render mode
  mode?: 'hide' | 'disable' | 'replace';
  className?: string;
}

/**
 * Component that conditionally renders children based on permissions or roles
 */
export const PermissionRenderer: React.FC<PermissionRendererProps> = ({
  children,
  fallback = null,
  requirePermission,
  requireRole,
  requireMinimumRole,
  customCheck,
  mode = 'hide',
  className,
}) => {
  const { userRole, permissions } = useWorkspaceAccess();

  const shouldRender = (): boolean => {
    // Check permission requirement
    if (requirePermission) {
      const checker = createPermissionChecker(userRole);
      const { resource, action, scope } = requirePermission;
      if (!checker.hasPermission(resource, action, scope)) {
        return false;
      }
    }

    // Check role requirement
    if (requireRole) {
      if (!RoleValidator.hasRole(userRole, requireRole)) {
        return false;
      }
    }

    // Check minimum role requirement
    if (requireMinimumRole) {
      if (!RoleValidator.hasMinimumRole(userRole, requireMinimumRole)) {
        return false;
      }
    }

    // Check custom validation
    if (customCheck && !customCheck()) {
      return false;
    }

    return true;
  };

  const hasAccess = shouldRender();

  if (!hasAccess) {
    if (mode === 'hide') {
      return fallback ? <>{fallback}</> : null;
    }

    if (mode === 'disable') {
      return (
        <div
          className={className}
          style={{ opacity: 0.5, pointerEvents: 'none' }}
        >
          {children}
        </div>
      );
    }

    if (mode === 'replace') {
      return fallback ? <>{fallback}</> : null;
    }
  }

  return <div className={className}>{children}</div>;
};

/**
 * Convenience components for common permission checks
 */

// Role-based components
export const AdminOnly: React.FC<
  Omit<PermissionRendererProps, 'requireRole'>
> = (props) => <PermissionRenderer {...props} requireRole="admin" />;

export const SupervisorOrAdmin: React.FC<
  Omit<PermissionRendererProps, 'requireRole'>
> = (props) => (
  <PermissionRenderer {...props} requireRole={['supervisor', 'admin']} />
);

export const MemberOrAbove: React.FC<
  Omit<PermissionRendererProps, 'requireRole'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requireRole={['member', 'supervisor', 'admin']}
  />
);

// Permission-based components
export const CanCreateTask: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'task', action: 'create' }}
  />
);

export const CanUpdateTask: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'> & { isOwner?: boolean }
> = ({ isOwner, ...props }) => (
  <PermissionRenderer
    {...props}
    requirePermission={{
      resource: 'task',
      action: 'update',
      scope: isOwner ? 'own' : 'workspace',
    }}
  />
);

export const CanDeleteTask: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'task', action: 'delete' }}
  />
);

export const CanAssignTask: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'task', action: 'assign' }}
  />
);

export const CanCreateTeam: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'team', action: 'create' }}
  />
);

export const CanUpdateTeam: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'team', action: 'update' }}
  />
);

export const CanDeleteTeam: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'team', action: 'delete' }}
  />
);

export const CanInviteUser: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'user', action: 'create' }}
  />
);

export const CanUpdateUserRole: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'user', action: 'update' }}
  />
);

export const CanRemoveUser: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'user', action: 'delete' }}
  />
);

export const CanUpdateWorkspace: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'workspace', action: 'update' }}
  />
);

export const CanDeleteWorkspace: React.FC<
  Omit<PermissionRendererProps, 'requirePermission'>
> = (props) => (
  <PermissionRenderer
    {...props}
    requirePermission={{ resource: 'workspace', action: 'delete' }}
  />
);

export default PermissionRenderer;
