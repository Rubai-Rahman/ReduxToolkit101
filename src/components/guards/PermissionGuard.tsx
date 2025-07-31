import React from 'react';
import { useWorkspaceAccess } from '@/hooks/useWorkspaceAccess';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Lock, AlertCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { createPermissionChecker } from '@/lib/permissions';
import type {
  PermissionResource,
  PermissionAction,
  PermissionScope,
} from '@/types/workspace';

interface PermissionGuardProps {
  children: React.ReactNode;

  // Permission requirements
  requirePermission: {
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  };

  // Multiple permission options (OR logic)
  requireAnyPermission?: Array<{
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  }>;

  // Multiple permission requirements (AND logic)
  requireAllPermissions?: Array<{
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  }>;

  // Fallback options
  fallback?: React.ReactNode;
  showError?: boolean;
  redirectTo?: string;

  // Error customization
  errorTitle?: string;
  errorMessage?: string;
  showHelpButton?: boolean;

  // Styling
  className?: string;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
  fallback,
  showError = true,
  redirectTo,
  errorTitle,
  errorMessage,
  showHelpButton = true,
  className,
}) => {
  const { userRole, checkPermission } = useWorkspaceAccess();

  const hasRequiredPermissions = (): boolean => {
    const checker = createPermissionChecker(userRole);

    // Check single permission requirement
    if (requirePermission) {
      const { resource, action, scope } = requirePermission;
      if (!checker.hasPermission(resource, action, scope)) {
        return false;
      }
    }

    // Check any permission requirement (OR logic)
    if (requireAnyPermission && requireAnyPermission.length > 0) {
      const hasAny = requireAnyPermission.some(({ resource, action, scope }) =>
        checker.hasPermission(resource, action, scope)
      );
      if (!hasAny) {
        return false;
      }
    }

    // Check all permissions requirement (AND logic)
    if (requireAllPermissions && requireAllPermissions.length > 0) {
      const hasAll = requireAllPermissions.every(
        ({ resource, action, scope }) =>
          checker.hasPermission(resource, action, scope)
      );
      if (!hasAll) {
        return false;
      }
    }

    return true;
  };

  const getPermissionDescription = (): string => {
    if (requirePermission) {
      const { resource, action, scope } = requirePermission;
      return `${action} ${resource}${scope ? ` (${scope})` : ''}`;
    }

    if (requireAnyPermission && requireAnyPermission.length > 0) {
      const descriptions = requireAnyPermission.map(
        ({ resource, action, scope }) =>
          `${action} ${resource}${scope ? ` (${scope})` : ''}`
      );
      return descriptions.join(' or ');
    }

    if (requireAllPermissions && requireAllPermissions.length > 0) {
      const descriptions = requireAllPermissions.map(
        ({ resource, action, scope }) =>
          `${action} ${resource}${scope ? ` (${scope})` : ''}`
      );
      return descriptions.join(' and ');
    }

    return 'appropriate permissions';
  };

  const handleRedirect = () => {
    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      window.history.back();
    }
  };

  const handleHelp = () => {
    // Navigate to help or contact page
    window.location.href = '/help/permissions';
  };

  // Check if user has required permissions
  if (hasRequiredPermissions()) {
    return <div className={className}>{children}</div>;
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  // If showError is false, render nothing
  if (!showError) {
    return null;
  }

  // Render error state
  return (
    <div className={className}>
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">
                  {errorTitle || 'Insufficient Permissions'}
                </h4>
                <AlertDescription className="mb-4">
                  {errorMessage ||
                    `This feature requires permission to ${getPermissionDescription()}. Contact your workspace administrator to request access.`}
                </AlertDescription>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRedirect}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                  </Button>

                  {showHelpButton && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleHelp}
                      className="flex items-center gap-2"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Learn More
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      (window.location.href = '/workspace/members')
                    }
                    className="flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Contact Admin
                  </Button>
                </div>
              </div>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

// Convenience components for common permission guards
export const TaskManagementGuard: React.FC<
  Omit<PermissionGuardProps, 'requirePermission'>
> = (props) => (
  <PermissionGuard
    {...props}
    requirePermission={{ resource: 'task', action: 'create' }}
  />
);

export const TaskEditGuard: React.FC<
  Omit<PermissionGuardProps, 'requirePermission'> & { isOwner?: boolean }
> = ({ isOwner, ...props }) => (
  <PermissionGuard
    {...props}
    requirePermission={{
      resource: 'task',
      action: 'update',
      scope: isOwner ? 'own' : 'workspace',
    }}
  />
);

export const TaskDeleteGuard: React.FC<
  Omit<PermissionGuardProps, 'requirePermission'>
> = (props) => (
  <PermissionGuard
    {...props}
    requirePermission={{ resource: 'task', action: 'delete' }}
  />
);

export const TeamManagementGuard: React.FC<
  Omit<PermissionGuardProps, 'requirePermission'>
> = (props) => (
  <PermissionGuard
    {...props}
    requirePermission={{ resource: 'team', action: 'create' }}
  />
);

export const UserManagementGuard: React.FC<
  Omit<PermissionGuardProps, 'requirePermission'>
> = (props) => (
  <PermissionGuard
    {...props}
    requirePermission={{ resource: 'user', action: 'update' }}
  />
);

export const WorkspaceManagementGuard: React.FC<
  Omit<PermissionGuardProps, 'requirePermission'>
> = (props) => (
  <PermissionGuard
    {...props}
    requirePermission={{ resource: 'workspace', action: 'update' }}
  />
);

export default PermissionGuard;
