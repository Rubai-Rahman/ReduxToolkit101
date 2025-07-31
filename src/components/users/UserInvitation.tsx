import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useInviteUserToWorkspaceMutation } from '@/redux/api/apiSlice';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Mail,
  UserPlus,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { RoleSelector } from '@/components/roles/RoleSelector';
import { validateInviteUser } from '@/lib/validation';
import type { WorkspaceRole } from '@/types/workspace';

interface UserInvitationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUserInvited?: (email: string, role: WorkspaceRole) => void;
}

export const UserInvitation: React.FC<UserInvitationProps> = ({
  isOpen,
  onOpenChange,
  onUserInvited,
}) => {
  const { currentWorkspace, userRole } = useWorkspace();
  const [inviteUser, { isLoading, error }] = useInviteUserToWorkspaceMutation();

  const [formData, setFormData] = useState({
    email: '',
    role: 'member' as WorkspaceRole,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const validation = validateInviteUser(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !currentWorkspace) return;

    try {
      await inviteUser({
        workspaceId: currentWorkspace.id,
        email: formData.email.trim(),
        role: formData.role,
      }).unwrap();

      // Show success state
      setShowSuccess(true);

      // Call success callback
      if (onUserInvited) {
        onUserInvited(formData.email, formData.role);
      }

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to invite user:', error);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', role: 'member' });
    setFormErrors({});
    setShowSuccess(false);
    onOpenChange(false);
  };

  const renderSuccessContent = () => (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Invitation Sent!</h3>
      <p className="text-muted-foreground mb-4">
        An invitation has been sent to <strong>{formData.email}</strong> to join{' '}
        <strong>{currentWorkspace?.name}</strong> as a{' '}
        <strong>{formData.role}</strong>.
      </p>
      <p className="text-sm text-muted-foreground">
        They will receive an email with instructions to join the workspace.
      </p>
    </div>
  );

  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General error */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {(error as any)?.data?.message ||
              'Failed to send invitation. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="colleague@company.com"
          required
          disabled={isLoading}
          className={formErrors.email ? 'border-red-500' : ''}
        />
        {formErrors.email && (
          <p className="text-sm text-red-600">{formErrors.email}</p>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <Label htmlFor="role">
          Role <span className="text-red-500">*</span>
        </Label>
        <RoleSelector
          value={formData.role}
          onValueChange={(role) => handleInputChange('role', role)}
          currentUserRole={userRole}
          disabled={isLoading}
          placeholder="Select a role"
        />
        {formErrors.role && (
          <p className="text-sm text-red-600">{formErrors.role}</p>
        )}
      </div>

      {/* Info about invitation */}
      <Alert>
        <Mail className="h-4 w-4" />
        <AlertDescription>
          The user will receive an email invitation to join this workspace. They
          can accept the invitation to gain access with the selected role.
        </AlertDescription>
      </Alert>
    </form>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite User
          </DialogTitle>
          <DialogDescription>
            Invite a new member to join {currentWorkspace?.name}
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? renderSuccessContent() : renderFormContent()}

        {!showSuccess && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !formData.email.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserInvitation;
