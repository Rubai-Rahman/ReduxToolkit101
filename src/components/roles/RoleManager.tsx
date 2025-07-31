import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useUpdateMemberRoleMutation } from '@/redux/api/apiSlice';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Users,
  Settings,
  AlertTriangle,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { RoleValidator, RoleDisplay } from '@/lib/permissions';
import { AdminOnly } from '@/components/permissions/PermissionRenderer';
import type { WorkspaceRole, UserWorkspace } from '@/types/workspace';

interface RoleManagerProps {
  member: UserWorkspace;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleChanged?: (member: UserWorkspace, newRole: WorkspaceRole) => void;
}

export const RoleManager: React.FC<RoleManagerProps> = ({
  member,
  isOpen,
  onOpenChange,
  onRoleChanged,
}) => {
  const { currentWorkspace, userRole } = useWorkspace();
  const [updateMemberRole, { isLoading, error }] =
    useUpdateMemberRoleMutation();

  const [selectedRole, setSelectedRole] = useState<WorkspaceRole>(member.role);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const assignableRoles = RoleValidator.getAssignableRoles(userRole);
  const canAssignRole = RoleValidator.canAssignRole(userRole, selectedRole);

  const handleRoleChange = (newRole: WorkspaceRole) => {
    setSelectedRole(newRole);

    // Show confirmation for role changes that affect permissions significantly
    if (
      newRole !== member.role &&
      (newRole === 'admin' || member.role === 'admin')
    ) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmRoleChange = async () => {
    if (!currentWorkspace || !canAssignRole) return;

    try {
      await updateMemberRole({
        workspaceId: currentWorkspace.id,
        userId: member.userId,
        role: selectedRole,
      }).unwrap();

      // Call success callback
      if (onRoleChanged) {
        onRoleChanged({ ...member, role: selectedRole }, selectedRole);
      }

      // Close dialogs
      setShowConfirmation(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update member role:', error);
    }
  };

  const handleCancel = () => {
    setSelectedRole(member.role);
    setShowConfirmation(false);
    onOpenChange(false);
  };

  const getRoleChangeImpact = (
    fromRole: WorkspaceRole,
    toRole: WorkspaceRole
  ) => {
    const fromLevel = RoleValidator.getRoleLevel(fromRole);
    const toLevel = RoleValidator.getRoleLevel(toRole);

    if (toLevel > fromLevel) {
      return {
        type: 'promotion' as const,
        message: `This will grant ${member.user?.name} additional permissions.`,
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      };
    } else if (toLevel < fromLevel) {
      return {
        type: 'demotion' as const,
        message: `This will remove some permissions from ${member.user?.name}.`,
        icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
      };
    }

    return null;
  };

  const roleChangeImpact = getRoleChangeImpact(member.role, selectedRole);

  return (
    <>
      <Dialog open={isOpen && !showConfirmation} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Manage Role
            </DialogTitle>
            <DialogDescription>
              Change the role for {member.user?.name} in{' '}
              {currentWorkspace?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Current Role Display */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Current Role</p>
                <p className="text-sm text-muted-foreground">
                  {RoleDisplay.getRoleDescription(member.role)}
                </p>
              </div>
              <Badge variant={RoleDisplay.getRoleBadgeVariant(member.role)}>
                {RoleDisplay.getRoleDisplayName(member.role)}
              </Badge>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">New Role</label>
              <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {assignableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={RoleDisplay.getRoleBadgeVariant(role)}
                          className="text-xs"
                        >
                          {RoleDisplay.getRoleDisplayName(role)}
                        </Badge>
                        <span className="text-sm">
                          {RoleDisplay.getRoleDescription(role)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Change Impact */}
            {roleChangeImpact && (
              <Alert>
                <div className="flex items-center gap-2">
                  {roleChangeImpact.icon}
                  <AlertDescription>
                    {roleChangeImpact.message}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to update role. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (
                  selectedRole !== member.role &&
                  (selectedRole === 'admin' || member.role === 'admin')
                ) {
                  setShowConfirmation(true);
                } else {
                  handleConfirmRoleChange();
                }
              }}
              disabled={
                selectedRole === member.role || !canAssignRole || isLoading
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Role'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Confirm Role Change
            </DialogTitle>
            <DialogDescription>
              This action will significantly change {member.user?.name}'s
              permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="text-center flex-1">
                <Badge variant={RoleDisplay.getRoleBadgeVariant(member.role)}>
                  {RoleDisplay.getRoleDisplayName(member.role)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Current</p>
              </div>
              <div className="px-4">→</div>
              <div className="text-center flex-1">
                <Badge variant={RoleDisplay.getRoleBadgeVariant(selectedRole)}>
                  {RoleDisplay.getRoleDisplayName(selectedRole)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">New</p>
              </div>
            </div>

            {selectedRole === 'admin' && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Administrator access</strong> grants full control over
                  this workspace, including the ability to manage all users and
                  settings.
                </AlertDescription>
              </Alert>
            )}

            {member.role === 'admin' && selectedRole !== 'admin' && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Removing administrator access</strong> will revoke all
                  administrative privileges. This action cannot be undone by the
                  user.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRoleChange}
              disabled={isLoading}
              variant={
                selectedRole === 'admin' || member.role === 'admin'
                  ? 'destructive'
                  : 'default'
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Confirm Change'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoleManager;
