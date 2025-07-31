import type {
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  CreateTeamRequest,
  UpdateTeamRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
  InviteUserRequest,
  UpdateMemberRoleRequest,
  WorkspaceRole,
  TaskStatus,
  TaskPriority,
} from '@/types/workspace';

// Validation error type
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Workspace name validation (alphanumeric, spaces, hyphens, underscores)
const WORKSPACE_NAME_REGEX = /^[a-zA-Z0-9\s\-_]+$/;

// Team name validation (alphanumeric, spaces, hyphens, underscores)
const TEAM_NAME_REGEX = /^[a-zA-Z0-9\s\-_]+$/;

// Common validation helpers
const validateRequired = (
  value: string | undefined,
  fieldName: string
): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

const validateLength = (
  value: string,
  fieldName: string,
  min: number,
  max: number
): string | null => {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters long`;
  }
  if (value.length > max) {
    return `${fieldName} must be no more than ${max} characters long`;
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

const validatePattern = (
  value: string,
  pattern: RegExp,
  fieldName: string,
  message: string
): string | null => {
  if (!pattern.test(value)) {
    return `${fieldName} ${message}`;
  }
  return null;
};

// Workspace validation
export const validateCreateWorkspace = (
  data: CreateWorkspaceRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate name
  const nameRequired = validateRequired(data.name, 'Workspace name');
  if (nameRequired) {
    errors.name = nameRequired;
  } else {
    const nameLength = validateLength(
      data.name.trim(),
      'Workspace name',
      2,
      50
    );
    if (nameLength) {
      errors.name = nameLength;
    } else {
      const namePattern = validatePattern(
        data.name.trim(),
        WORKSPACE_NAME_REGEX,
        'Workspace name',
        'can only contain letters, numbers, spaces, hyphens, and underscores'
      );
      if (namePattern) {
        errors.name = namePattern;
      }
    }
  }

  // Validate description (optional)
  if (data.description && data.description.trim().length > 0) {
    const descLength = validateLength(
      data.description.trim(),
      'Description',
      0,
      500
    );
    if (descLength) {
      errors.description = descLength;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateUpdateWorkspace = (
  data: UpdateWorkspaceRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate name (if provided)
  if (data.name !== undefined) {
    const nameRequired = validateRequired(data.name, 'Workspace name');
    if (nameRequired) {
      errors.name = nameRequired;
    } else {
      const nameLength = validateLength(
        data.name.trim(),
        'Workspace name',
        2,
        50
      );
      if (nameLength) {
        errors.name = nameLength;
      } else {
        const namePattern = validatePattern(
          data.name.trim(),
          WORKSPACE_NAME_REGEX,
          'Workspace name',
          'can only contain letters, numbers, spaces, hyphens, and underscores'
        );
        if (namePattern) {
          errors.name = namePattern;
        }
      }
    }
  }

  // Validate description (if provided)
  if (data.description !== undefined && data.description.trim().length > 0) {
    const descLength = validateLength(
      data.description.trim(),
      'Description',
      0,
      500
    );
    if (descLength) {
      errors.description = descLength;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Team validation
export const validateCreateTeam = (
  data: CreateTeamRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate name
  const nameRequired = validateRequired(data.name, 'Team name');
  if (nameRequired) {
    errors.name = nameRequired;
  } else {
    const nameLength = validateLength(data.name.trim(), 'Team name', 2, 50);
    if (nameLength) {
      errors.name = nameLength;
    } else {
      const namePattern = validatePattern(
        data.name.trim(),
        TEAM_NAME_REGEX,
        'Team name',
        'can only contain letters, numbers, spaces, hyphens, and underscores'
      );
      if (namePattern) {
        errors.name = namePattern;
      }
    }
  }

  // Validate description (optional)
  if (data.description && data.description.trim().length > 0) {
    const descLength = validateLength(
      data.description.trim(),
      'Description',
      0,
      500
    );
    if (descLength) {
      errors.description = descLength;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateUpdateTeam = (
  data: UpdateTeamRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate name (if provided)
  if (data.name !== undefined) {
    const nameRequired = validateRequired(data.name, 'Team name');
    if (nameRequired) {
      errors.name = nameRequired;
    } else {
      const nameLength = validateLength(data.name.trim(), 'Team name', 2, 50);
      if (nameLength) {
        errors.name = nameLength;
      } else {
        const namePattern = validatePattern(
          data.name.trim(),
          TEAM_NAME_REGEX,
          'Team name',
          'can only contain letters, numbers, spaces, hyphens, and underscores'
        );
        if (namePattern) {
          errors.name = namePattern;
        }
      }
    }
  }

  // Validate description (if provided)
  if (data.description !== undefined && data.description.trim().length > 0) {
    const descLength = validateLength(
      data.description.trim(),
      'Description',
      0,
      500
    );
    if (descLength) {
      errors.description = descLength;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Task validation
export const validateCreateTask = (
  data: CreateTaskRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate title
  const titleRequired = validateRequired(data.title, 'Task title');
  if (titleRequired) {
    errors.title = titleRequired;
  } else {
    const titleLength = validateLength(data.title.trim(), 'Task title', 2, 200);
    if (titleLength) {
      errors.title = titleLength;
    }
  }

  // Validate description
  const descRequired = validateRequired(data.description, 'Task description');
  if (descRequired) {
    errors.description = descRequired;
  } else {
    const descLength = validateLength(
      data.description.trim(),
      'Task description',
      5,
      2000
    );
    if (descLength) {
      errors.description = descLength;
    }
  }

  // Validate priority
  if (!['low', 'medium', 'high', 'urgent'].includes(data.priority)) {
    errors.priority = 'Please select a valid priority level';
  }

  // Validate due date (if provided)
  if (data.dueDate) {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Please enter a valid due date';
    } else if (dueDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateUpdateTask = (
  data: UpdateTaskRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate title (if provided)
  if (data.title !== undefined) {
    const titleRequired = validateRequired(data.title, 'Task title');
    if (titleRequired) {
      errors.title = titleRequired;
    } else {
      const titleLength = validateLength(
        data.title.trim(),
        'Task title',
        2,
        200
      );
      if (titleLength) {
        errors.title = titleLength;
      }
    }
  }

  // Validate description (if provided)
  if (data.description !== undefined) {
    const descRequired = validateRequired(data.description, 'Task description');
    if (descRequired) {
      errors.description = descRequired;
    } else {
      const descLength = validateLength(
        data.description.trim(),
        'Task description',
        5,
        2000
      );
      if (descLength) {
        errors.description = descLength;
      }
    }
  }

  // Validate status (if provided)
  if (
    data.status !== undefined &&
    !['todo', 'in_progress', 'review', 'completed'].includes(data.status)
  ) {
    errors.status = 'Please select a valid status';
  }

  // Validate priority (if provided)
  if (
    data.priority !== undefined &&
    !['low', 'medium', 'high', 'urgent'].includes(data.priority)
  ) {
    errors.priority = 'Please select a valid priority level';
  }

  // Validate due date (if provided)
  if (data.dueDate !== undefined && data.dueDate) {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Please enter a valid due date';
    } else if (dueDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// User invitation validation
export const validateInviteUser = (
  data: InviteUserRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate email
  const emailRequired = validateRequired(data.email, 'Email');
  if (emailRequired) {
    errors.email = emailRequired;
  } else {
    const emailValid = validateEmail(data.email.trim());
    if (emailValid) {
      errors.email = emailValid;
    }
  }

  // Validate role (if provided)
  if (data.role && !['member', 'supervisor', 'admin'].includes(data.role)) {
    errors.role = 'Please select a valid role';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Member role update validation
export const validateUpdateMemberRole = (
  data: UpdateMemberRoleRequest
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate role
  if (!['member', 'supervisor', 'admin'].includes(data.role)) {
    errors.role = 'Please select a valid role';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Generic form validation helper
export const validateForm = <T>(
  data: T,
  validator: (data: T) => ValidationResult
): ValidationResult => {
  return validator(data);
};

// Sanitization helpers
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const sanitizeWorkspaceName = (name: string): string => {
  return sanitizeString(name).replace(/[^a-zA-Z0-9\s\-_]/g, '');
};

export const sanitizeTeamName = (name: string): string => {
  return sanitizeString(name).replace(/[^a-zA-Z0-9\s\-_]/g, '');
};

// Validation constants
export const VALIDATION_LIMITS = {
  WORKSPACE_NAME: { MIN: 2, MAX: 50 },
  WORKSPACE_DESCRIPTION: { MIN: 0, MAX: 500 },
  TEAM_NAME: { MIN: 2, MAX: 50 },
  TEAM_DESCRIPTION: { MIN: 0, MAX: 500 },
  TASK_TITLE: { MIN: 2, MAX: 200 },
  TASK_DESCRIPTION: { MIN: 5, MAX: 2000 },
} as const;
