import React from 'react';
import { useWorkspaceAccess } from '@/hooks/useWorkspaceAccess';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { RoleDisplay } from '@/lib/permissions';
import type { WorkspaceRole } from '@/types/workspace';

interface RoleGuardProps {
  children: React.ReactNode;

  // Role requirements
  requireRole?: WorkspaceRole | WorkspaceRole[];
  requireMinimumRole?: WorkspaceRole;

  // Fallback options
  fallback?: React.ReactNode;
  showError?: boolean;
  redirectTo?: string;

  // Error customization
  errorTitle?: string;
  errorMessage?: string;

  // Styling
  className?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requireRole,
  requireMinimumRole,
  fallback,
  showError = true,
  redirectTo,
  errorTitle,
  errorMessage,
  className,
}) => {
  const { userRole, isAdmin, isSupervisor, isMember } = useWorkspaceAccess();

  const hasRequiredRole = (): boolean => {
    // Check specific role requirement
    if (requireRole) {
      const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
      if (!userRole || !roles.includes(userRole)) {
        return false;
      }
    }

    // Check minimum role requirement
    if (requireMinimumRole) {
      const roleHierarchy: Record<WorkspaceRole, number> = {
        member: 1,
        supervisor: 2,
        admin: 3,
      };

      if (
        !userRole ||
        roleHierarchy[userRole] < roleHierarchy[requireMinimumRole]
      ) {
        return false;
      }
    }

    return true;
  };

  const getRequiredRoleNames = (): string => {
    if (requireRole) {
      const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
      return roles
        .map((role) => RoleDisplay.getRoleDisplayName(role))
        .join(' or ');
    }

    if (requireMinimumRole) {
      return `${RoleDisplay.getRoleDisplayName(requireMinimumRole)} or higher`;
    }

    return 'appropriate role';
  };

  const handleRedirect = () => {
    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      window.history.back();
    }
  };

  // Check if user has required role
  if (hasRequiredRole()) {
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
              <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">
                  {errorTitle || 'Access Denied'}
                </h4>
                <AlertDescription className="mb-4">
                  {errorMessage ||
                    `This feature requires ${getRequiredRoleNames()} permissions. Your current role is ${
                      userRole
                        ? RoleDisplay.getRoleDisplayName(userRole)
                        : 'unknown'
                    }.`}
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

                  {userRole === 'member' &&
                    (requireRole?.includes('admin') ||
                      requireMinimumRole === 'admin') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          (window.location.href = '/workspace/settings')
                        }
                        className="flex items-center gap-2"
                      >
                        <AlertCircle className="h-4 w-4" />
                        Contact Admin
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

// Convenience components for common role guards
export const AdminGuard: React.FC<Omit<RoleGuardProps, 'requireRole'>> = (
  props
) => <RoleGuard {...props} requireRole="admin" />;

export const SupervisorGuard: React.FC<Omit<RoleGuardProps, 'requireRole'>> = (
  props
) => <RoleGuard {...props} requireRole={['supervisor', 'admin']} />;

export const MemberGuard: React.FC<Omit<RoleGuardProps, 'requireRole'>> = (
  props
) => <RoleGuard {...props} requireRole={['member', 'supervisor', 'admin']} />;

export const MinimumSupervisorGuard: React.FC<
  Omit<RoleGuardProps, 'requireMinimumRole'>
> = (props) => <RoleGuard {...props} requireMinimumRole="supervisor" />;

export const MinimumAdminGuard: React.FC<
  Omit<RoleGuardProps, 'requireMinimumRole'>
> = (props) => <RoleGuard {...props} requireMinimumRole="admin" />;

export default RoleGuard;
