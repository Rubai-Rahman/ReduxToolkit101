import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { ApiError, ValidationError } from '@/types/workspace';

// Type guards for different error types
export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const isApiError = (error: unknown): error is { data: ApiError } => {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === 'object' &&
    error.data != null &&
    'message' in error.data
  );
};

export const isValidationError = (
  error: unknown
): error is { data: { errors: ValidationError[] } } => {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === 'object' &&
    error.data != null &&
    'errors' in error.data &&
    Array.isArray((error.data as any).errors)
  );
};

// Error message extraction
export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.data.message;
  }

  if (isFetchBaseQueryError(error)) {
    if (error.status === 'FETCH_ERROR') {
      return 'Network error. Please check your connection and try again.';
    }

    if (error.status === 'PARSING_ERROR') {
      return 'Server response error. Please try again.';
    }

    if (error.status === 'TIMEOUT_ERROR') {
      return 'Request timeout. Please try again.';
    }

    if (typeof error.status === 'number') {
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'Authentication required. Please log in again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 409:
          return 'Conflict. The resource already exists or is in use.';
        case 422:
          return 'Validation error. Please check your input.';
        case 429:
          return 'Too many requests. Please wait and try again.';
        case 500:
          return 'Server error. Please try again later.';
        case 502:
          return 'Service temporarily unavailable. Please try again later.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return `Server error (${error.status}). Please try again.`;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};

// Validation error extraction
export const getValidationErrors = (error: unknown): Record<string, string> => {
  if (isValidationError(error)) {
    const validationErrors: Record<string, string> = {};
    error.data.errors.forEach((err) => {
      validationErrors[err.field] = err.message;
    });
    return validationErrors;
  }

  return {};
};

// Error classification
export const getErrorType = (
  error: unknown
): 'network' | 'auth' | 'permission' | 'validation' | 'server' | 'unknown' => {
  if (isFetchBaseQueryError(error)) {
    if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
      return 'network';
    }

    if (typeof error.status === 'number') {
      if (error.status === 401) return 'auth';
      if (error.status === 403) return 'permission';
      if (error.status === 422) return 'validation';
      if (error.status >= 500) return 'server';
    }
  }

  return 'unknown';
};

// Retry logic helper
export const shouldRetry = (
  error: unknown,
  attempt: number,
  maxAttempts: number = 3
): boolean => {
  if (attempt >= maxAttempts) return false;

  const errorType = getErrorType(error);

  // Retry network errors and server errors
  if (errorType === 'network' || errorType === 'server') {
    return true;
  }

  // Don't retry auth, permission, or validation errors
  if (
    errorType === 'auth' ||
    errorType === 'permission' ||
    errorType === 'validation'
  ) {
    return false;
  }

  return false;
};

// Exponential backoff delay calculation
export const getRetryDelay = (
  attempt: number,
  baseDelay: number = 1000
): number => {
  return Math.min(baseDelay * Math.pow(2, attempt), 10000); // Max 10 seconds
};

// Error notification helper
export const getErrorNotification = (error: unknown, context?: string) => {
  const message = getErrorMessage(error);
  const type = getErrorType(error);

  let title = 'Error';
  switch (type) {
    case 'network':
      title = 'Connection Error';
      break;
    case 'auth':
      title = 'Authentication Error';
      break;
    case 'permission':
      title = 'Permission Denied';
      break;
    case 'validation':
      title = 'Validation Error';
      break;
    case 'server':
      title = 'Server Error';
      break;
  }

  if (context) {
    title = `${title} - ${context}`;
  }

  return {
    title,
    message,
    type: type === 'validation' ? 'warning' : 'error',
    duration: type === 'network' || type === 'server' ? 5000 : 4000,
  };
};

// Workspace-specific error handling
export const handleWorkspaceError = (error: unknown, operation: string) => {
  const errorType = getErrorType(error);
  const message = getErrorMessage(error);

  // Log error for debugging
  console.error(`Workspace ${operation} error:`, error);

  // Handle specific workspace errors
  if (isFetchBaseQueryError(error) && typeof error.status === 'number') {
    switch (error.status) {
      case 403:
        return {
          title: 'Access Denied',
          message: `You don't have permission to ${operation.toLowerCase()} this workspace.`,
          type: 'error' as const,
        };
      case 404:
        return {
          title: 'Workspace Not Found',
          message: "The workspace you're trying to access no longer exists.",
          type: 'error' as const,
        };
      case 409:
        return {
          title: 'Workspace Conflict',
          message: 'A workspace with this name already exists.',
          type: 'warning' as const,
        };
    }
  }

  return getErrorNotification(error, `Workspace ${operation}`);
};

// Team-specific error handling
export const handleTeamError = (error: unknown, operation: string) => {
  const errorType = getErrorType(error);

  console.error(`Team ${operation} error:`, error);

  if (isFetchBaseQueryError(error) && typeof error.status === 'number') {
    switch (error.status) {
      case 403:
        return {
          title: 'Access Denied',
          message: `You don't have permission to ${operation.toLowerCase()} teams.`,
          type: 'error' as const,
        };
      case 404:
        return {
          title: 'Team Not Found',
          message: "The team you're trying to access no longer exists.",
          type: 'error' as const,
        };
    }
  }

  return getErrorNotification(error, `Team ${operation}`);
};

// Task-specific error handling
export const handleTaskError = (error: unknown, operation: string) => {
  console.error(`Task ${operation} error:`, error);

  if (isFetchBaseQueryError(error) && typeof error.status === 'number') {
    switch (error.status) {
      case 403:
        return {
          title: 'Access Denied',
          message: `You don't have permission to ${operation.toLowerCase()} this task.`,
          type: 'error' as const,
        };
      case 404:
        return {
          title: 'Task Not Found',
          message: "The task you're trying to access no longer exists.",
          type: 'error' as const,
        };
      case 409:
        return {
          title: 'Task Conflict',
          message: 'This task cannot be modified due to its current state.',
          type: 'warning' as const,
        };
    }
  }

  return getErrorNotification(error, `Task ${operation}`);
};

// Generic API error handler hook
export const useApiErrorHandler = () => {
  const handleError = (error: unknown, context?: string) => {
    const notification = getErrorNotification(error, context);

    // Here you would typically dispatch to a notification system
    // For now, we'll just log it
    console.error('API Error:', notification);

    return notification;
  };

  return { handleError };
};
