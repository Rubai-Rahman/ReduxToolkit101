import React from 'react';
import { useWorkspaceAccess } from '@/hooks/useWorkspaceAccess';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Shield, Users, Settings } from 'lucide-react';
import type {
  WorkspaceRole,
  PermissionResource,
  PermissionAction,
  PermissionScope,
} from '@/types/workspace';

interface WorkspaceGuardProps {
  children: React.ReactNode;

  // Workspace requirements
  requireWorkspace?: boolean;
  workspaceId?: string;

  // Role requirements
  requireRole?: WorkspaceRole | WorkspaceRole[];

  // Permission requirements
  requirePermission?: {
    resource: PermissionResource;
    action: PermissionAction;
    scope?: PermissionScope;
  };

  // Custom validation
  customValidation?: () => boolean;
  customErrorMessage?: string;

  // Fallback components
  fallback?: React.ReactNode;
  showError?: boolean;

  // Styling
  className?: string;
}

const WorkspaceGuard: React.FC<WorkspaceGuardProps> = ({
  children,
  requireWorkspace = true,
  workspaceId,
  requireRole,
  requirePermission,
  customValidation,
  customErrorMessage,
  fallback,
  showError = true,
  className,
}) => {
  const {
    currentWorkspace,
    userRole,
    hasWorkspaceAccess,
    checkPermission,
    isAdmin,
    isSupervisor,
    isMember,
  } = useWorkspaceAccess();

  // Validation logic
  const validateAccess = (): {
    isValid: boolean;
    errorMessage: string;
    errorType: string;
  } => {
    // Check workspace requirement
    if (requireWorkspace && !currentWorkspace) {
      return {
        isValid: false,
        errorMessage: 'You need to select a workspace to access this feature.',
        errorType: 'no-workspace',
      };
    }

    // Check specific workspace access
    if (workspaceId && !hasWorkspaceAccess(workspaceId)) {
      return {
        isValid: false,
        errorMessage: 'You do not have access to this workspace.',
        errorType: 'workspace-access',
      };
    }

    // Check role requirements
    if (requireRole) {
      const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
      if (!userRole || !roles.includes(userRole)) {
        const roleNames = roles.map((role) => {
          switch (role) {
            case 'admin':
              return 'Administrator';
            case 'supervisor':
              return 'Supervisor';
            case 'member':
              return 'Member';
            default:
              return role;
          }
        });

        return {
          isValid: false,
          errorMessage: `This feature requires ${roleNames.join(' or ')} permissions.`,
          errorType: 'insufficient-role',
        };
      }
    }

    // Check permission requirements
    if (requirePermission) {
      const { resource, action, scope } = requirePermission;
      if (!checkPermission(resource, action, scope)) {
        return {
          isValid: false,
          errorMessage: `You don't have permission to ${action} ${resource}${scope ? ` (${scope})` : ''}.`,
          errorType: 'insufficient-permission',
        };
      }
    }

    // Check custom validation
    if (customValidation && !customValidation()) {
      return {
        isValid: false,
        errorMessage:
          customErrorMessage || 'Access denied due to custom validation.',
        errorType: 'custom-validation',
      };
    }

    return { isValid: true, errorMessage: '', errorType: '' };
  };

  const { isValid, errorMessage, errorType } = validateAccess();

  // If validation passes, render children
  if (isValid) {
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
  const getErrorIcon = () => {
    switch (errorType) {
      case 'no-workspace':
        return <Settings className="h-4 w-4" />;
      case 'workspace-access':
        return <Shield className="h-4 w-4" />;
      case 'insufficient-role':
      case 'insufficient-permission':
        return <Users className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getErrorTitle = () => {
    switch (errorType) {
      case 'no-workspace':
        return 'Workspace Required';
      case 'workspace-access':
        return 'Access Denied';
      case 'insufficient-role':
        return 'Insufficient Role';
      case 'insufficient-permission':
        return 'Insufficient Permissions';
      default:
        return 'Access Denied';
    }
  };

  const getActionButton = () => {
    switch (errorType) {
      case 'no-workspace':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = '/onboarding')}
            className="mt-2"
          >
            Select Workspace
          </Button>
        );
      case 'workspace-access':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = '/')}
            className="mt-2"
          >
            Go to Dashboard
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <Alert variant="destructive" className="max-w-md mx-auto">
        <div className="flex items-center gap-2">
          {getErrorIcon()}
          <div className="flex-1">
            <h4 className="font-semibold">{getErrorTitle()}</h4>
            <AlertDescription className="mt-1">{errorMessage}</AlertDescription>
            {getActionButton()}
          </div>
        </div>
      </Alert>
    </div>
  );
};

// Convenience components for common use cases
export const AdminGuard: React.FC<Omit<WorkspaceGuardProps, 'requireRole'>> = (
  props
) => <WorkspaceGuard {...props} requireRole="admin" />;

export const SupervisorGuard: React.FC<
  Omit<WorkspaceGuardProps, 'requireRole'>
> = (props) => (
  <WorkspaceGuard {...props} requireRole={['supervisor', 'admin']} />
);

export const MemberGuard: React.FC<Omit<WorkspaceGuardProps, 'requireRole'>> = (
  props
) => (
  <WorkspaceGuard {...props} requireRole={['member', 'supervisor', 'admin']} />
);

export const TaskManagementGuard: React.FC<
  Omit<WorkspaceGuardProps, 'requirePermission'>
> = (props) => (
  <WorkspaceGuard
    {...props}
    requirePermission={{ resource: 'task', action: 'create' }}
  />
);

export const UserManagementGuard: React.FC<
  Omit<WorkspaceGuardProps, 'requirePermission'>
> = (props) => (
  <WorkspaceGuard
    {...props}
    requirePermission={{ resource: 'user', action: 'update' }}
  />
);

export const WorkspaceManagementGuard: React.FC<
  Omit<WorkspaceGuardProps, 'requirePermission'>
> = (props) => (
  <WorkspaceGuard
    {...props}
    requirePermission={{ resource: 'workspace', action: 'update' }}
  />
);

export default WorkspaceGuard;
