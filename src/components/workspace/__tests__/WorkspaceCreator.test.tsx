import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import WorkspaceCreator from '../WorkspaceCreator';
import { workspaceApi } from '@/redux/api/workspaceApi';
import workspaceSlice from '@/redux/features/workspace/workspaceSlice';

// Mock the API
const mockCreateWorkspace = vi.fn();
const mockValidateWorkspaceName = vi.fn();

vi.mock('@/redux/api/workspaceApi', () => ({
  workspaceApi: {
    endpoints: {
      createWorkspace: {
        initiate: () => ({ unwrap: mockCreateWorkspace }),
      },
      validateWorkspaceName: {
        initiate: () => ({ unwrap: mockValidateWorkspaceName }),
      },
    },
  },
  useCreateWorkspaceMutation: () => [mockCreateWorkspace, { isLoading: false }],
  useValidateWorkspaceNameQuery: () => ({
    data: { available: true },
    isLoading: false,
    error: null,
  }),
}));

// Mock the error handling
vi.mock('@/lib/apiErrorHandling', () => ({
  handleWorkspaceError: vi.fn(() => ({
    title: 'Error',
    message: 'Something went wrong',
    type: 'error',
  })),
  getValidationErrors: vi.fn(() => ({})),
}));

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      workspace: workspaceSlice,
      [workspaceApi.reducerPath]: workspaceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(workspaceApi.middleware),
  });
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe('WorkspaceCreator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Dialog Variant', () => {
    it('renders dialog when open', () => {
      renderWithProvider(
        <WorkspaceCreator
          variant="dialog"
          isOpen={true}
          onOpenChange={vi.fn()}
        />
      );

      expect(screen.getByText('Create New Workspace')).toBeInTheDocument();
      expect(screen.getByLabelText(/workspace name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    it('does not render dialog when closed', () => {
      renderWithProvider(
        <WorkspaceCreator
          variant="dialog"
          isOpen={false}
          onOpenChange={vi.fn()}
        />
      );

      expect(
        screen.queryByText('Create New Workspace')
      ).not.toBeInTheDocument();
    });
  });

  describe('Card Variant', () => {
    it('renders card variant correctly', () => {
      renderWithProvider(<WorkspaceCreator variant="card" />);

      expect(screen.getByText('Create New Workspace')).toBeInTheDocument();
      expect(screen.getByLabelText(/workspace name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('shows required field validation', async () => {
      renderWithProvider(<WorkspaceCreator variant="card" />);

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/workspace name is required/i)
        ).toBeInTheDocument();
      });
    });

    it('validates workspace name length', async () => {
      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      fireEvent.change(nameInput, { target: { value: 'A' } });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/must be at least 2 characters/i)
        ).toBeInTheDocument();
      });
    });

    it('validates workspace name pattern', async () => {
      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      fireEvent.change(nameInput, { target: { value: 'Invalid@Name!' } });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/can only contain letters, numbers/i)
        ).toBeInTheDocument();
      });
    });

    it('validates description length', async () => {
      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      fireEvent.change(nameInput, { target: { value: 'Valid Name' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'A'.repeat(501) },
      });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/must be no more than 500 characters/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Name Uniqueness Checking', () => {
    it('shows available status for unique names', async () => {
      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      fireEvent.change(nameInput, { target: { value: 'Unique Name' } });

      await waitFor(() => {
        expect(screen.getByText(/this name is available/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const mockOnSuccess = vi.fn();
      const mockResult = {
        workspace: { id: '1', name: 'Test Workspace', slug: 'test-workspace' },
        userWorkspace: {
          id: '1',
          userId: '1',
          workspaceId: '1',
          role: 'admin' as const,
        },
      };

      mockCreateWorkspace.mockResolvedValue(mockResult);

      renderWithProvider(
        <WorkspaceCreator variant="card" onSuccess={mockOnSuccess} />
      );

      const nameInput = screen.getByLabelText(/workspace name/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      fireEvent.change(nameInput, { target: { value: 'Test Workspace' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'Test description' },
      });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateWorkspace).toHaveBeenCalledWith({
          name: 'Test Workspace',
          description: 'Test description',
        });
        expect(mockOnSuccess).toHaveBeenCalledWith(mockResult);
      });
    });

    it('shows success state after creation', async () => {
      const mockResult = {
        workspace: { id: '1', name: 'Test Workspace', slug: 'test-workspace' },
        userWorkspace: {
          id: '1',
          userId: '1',
          workspaceId: '1',
          role: 'admin' as const,
        },
      };

      mockCreateWorkspace.mockResolvedValue(mockResult);

      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Workspace' } });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Workspace Created!')).toBeInTheDocument();
        expect(screen.getByText(/admin role assigned/i)).toBeInTheDocument();
      });
    });

    it('disables submit button when name is unavailable', () => {
      vi.mocked(
        require('@/redux/api/workspaceApi').useValidateWorkspaceNameQuery
      ).mockReturnValue({
        data: { available: false },
        isLoading: false,
        error: null,
      });

      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      fireEvent.change(nameInput, { target: { value: 'Taken Name' } });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Error Handling', () => {
    it('displays error message on creation failure', async () => {
      mockCreateWorkspace.mockRejectedValue(new Error('Creation failed'));

      renderWithProvider(<WorkspaceCreator variant="card" />);

      const nameInput = screen.getByLabelText(/workspace name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Workspace' } });

      const submitButton = screen.getByRole('button', {
        name: /create workspace/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });
    });
  });

  describe('Custom Props', () => {
    it('uses custom title and description', () => {
      renderWithProvider(
        <WorkspaceCreator
          variant="card"
          title="Custom Title"
          description="Custom description"
        />
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom description')).toBeInTheDocument();
    });

    it('calls onCancel when cancel button is clicked', () => {
      const mockOnCancel = vi.fn();

      renderWithProvider(
        <WorkspaceCreator variant="card" onCancel={mockOnCancel} />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});
