import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Building2,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  useCreateWorkspaceMutation,
  useValidateWorkspaceNameQuery,
} from '@/redux/api/workspaceApi';
import { addWorkspace } from '@/redux/features/workspace/workspaceSlice';
import { validateCreateWorkspace } from '@/lib/validation';
import {
  handleWorkspaceError,
  getValidationErrors,
} from '@/lib/apiErrorHandling';
import type {
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
} from '@/types/workspace';

interface WorkspaceCreatorProps {
  // Dialog mode props
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Standalone mode props
  onSuccess?: (workspace: CreateWorkspaceResponse) => void;
  onCancel?: () => void;

  // Common props
  className?: string;
  variant?: 'dialog' | 'card' | 'inline';
  title?: string;
  description?: string;
}

interface FormData {
  name: string;
  description: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  general?: string;
}

const WorkspaceCreator: React.FC<WorkspaceCreatorProps> = ({
  isOpen = false,
  onOpenChange,
  onSuccess,
  onCancel,
  className = '',
  variant = 'dialog',
  title = 'Create New Workspace',
  description = 'Create a new workspace to organize your projects and collaborate with your team.',
}) => {
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdWorkspace, setCreatedWorkspace] =
    useState<CreateWorkspaceResponse | null>(null);

  // API hooks
  const [createWorkspace] = useCreateWorkspaceMutation();

  // Workspace name validation with debouncing
  const [nameToValidate, setNameToValidate] = useState('');
  const [validationTimeout, setValidationTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const {
    data: nameValidation,
    isLoading: isValidatingName,
    error: nameValidationError,
  } = useValidateWorkspaceNameQuery(
    { name: nameToValidate },
    { skip: !nameToValidate || nameToValidate.length < 2 }
  );

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific errors
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Handle name validation with debouncing
    if (field === 'name') {
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }

      const timeout = setTimeout(() => {
        if (value.trim().length >= 2) {
          setNameToValidate(value.trim());
        } else {
          setNameToValidate('');
        }
      }, 500);

      setValidationTimeout(timeout);
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const validation = validateCreateWorkspace({
      name: formData.name,
      description: formData.description || undefined,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    // Check name availability
    if (nameValidation && !nameValidation.available) {
      setErrors((prev) => ({
        ...prev,
        name: 'This workspace name is already taken. Please choose a different name.',
      }));
      return false;
    }

    setErrors({});
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const workspaceData: CreateWorkspaceRequest = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      };

      const result = await createWorkspace(workspaceData).unwrap();

      // Add workspace to Redux store
      dispatch(addWorkspace(result.userWorkspace));

      // Show success state
      setCreatedWorkspace(result);
      setShowSuccess(true);

      // Call success callback
      if (onSuccess) {
        onSuccess(result);
      }

      // Auto-close dialog after success
      if (variant === 'dialog' && onOpenChange) {
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to create workspace:', error);

      // Handle validation errors from server
      const validationErrors = getValidationErrors(error);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        // Handle other errors
        const errorInfo = handleWorkspaceError(error, 'Create');
        setErrors({ general: errorInfo.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    if (isSubmitting) return;

    setFormData({ name: '', description: '' });
    setErrors({});
    setShowSuccess(false);
    setCreatedWorkspace(null);
    setNameToValidate('');

    if (onOpenChange) {
      onOpenChange(false);
    }

    if (onCancel) {
      onCancel();
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }
    };
  }, [validationTimeout]);

  // Get name validation status
  const getNameValidationStatus = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return null;
    }

    if (isValidatingName) {
      return 'validating';
    }

    if (nameValidationError) {
      return 'error';
    }

    if (nameValidation) {
      return nameValidation.available ? 'available' : 'unavailable';
    }

    return null;
  };

  const nameValidationStatus = getNameValidationStatus();

  // Render success state
  const renderSuccessContent = () => (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Workspace Created!</h3>
      <p className="text-muted-foreground mb-4">
        Your workspace "{createdWorkspace?.workspace.name}" has been created
        successfully. You are now the admin of this workspace.
      </p>
      <Badge variant="outline" className="mb-4">
        Admin Role Assigned
      </Badge>
      <p className="text-sm text-muted-foreground">
        Redirecting you to your new workspace...
      </p>
    </div>
  );

  // Render form content
  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General error */}
      {errors.general && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">
            {errors.general}
          </p>
        </div>
      )}

      {/* Workspace Name */}
      <div>
        <Label htmlFor="workspace-name">
          Workspace Name <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="workspace-name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="My Awesome Team"
            required
            disabled={isSubmitting}
            className={errors.name ? 'border-red-500' : ''}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />

          {/* Name validation indicator */}
          {nameValidationStatus && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {nameValidationStatus === 'validating' && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {nameValidationStatus === 'available' && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              {nameValidationStatus === 'unavailable' && (
                <X className="h-4 w-4 text-red-600" />
              )}
              {nameValidationStatus === 'error' && (
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              )}
            </div>
          )}
        </div>

        {/* Name validation feedback */}
        {nameValidationStatus === 'available' && (
          <p className="text-sm text-green-600 mt-1">
            ✓ This name is available
          </p>
        )}
        {nameValidationStatus === 'unavailable' && (
          <p className="text-sm text-red-600 mt-1">
            This name is already taken
            {nameValidation?.suggestions &&
              nameValidation.suggestions.length > 0 && (
                <span>
                  . Try: {nameValidation.suggestions.slice(0, 2).join(', ')}
                </span>
              )}
          </p>
        )}

        {errors.name && (
          <p id="name-error" className="text-sm text-red-600 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="workspace-description">Description (Optional)</Label>
        <Textarea
          id="workspace-description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe what this workspace is for..."
          rows={3}
          disabled={isSubmitting}
          className={errors.description ? 'border-red-500' : ''}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? 'description-error' : undefined
          }
        />
        {errors.description && (
          <p id="description-error" className="text-sm text-red-600 mt-1">
            {errors.description}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-2">
        {(variant === 'dialog' || onCancel) && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]"
          disabled={
            isSubmitting ||
            !formData.name.trim() ||
            nameValidationStatus === 'unavailable' ||
            isValidatingName
          }
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Workspace
            </>
          )}
        </Button>
      </div>
    </form>
  );

  // Render based on variant
  if (variant === 'dialog') {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {showSuccess ? renderSuccessContent() : renderFormContent()}
        </DialogContent>
      </Dialog>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-[var(--primary-start)]" />
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showSuccess ? renderSuccessContent() : renderFormContent()}
        </CardContent>
      </Card>
    );
  }

  // Inline variant
  return (
    <div className={className}>
      {showSuccess ? renderSuccessContent() : renderFormContent()}
    </div>
  );
};

export default WorkspaceCreator;
