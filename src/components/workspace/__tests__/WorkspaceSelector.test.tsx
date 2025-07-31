import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import WorkspaceSelector from '../WorkspaceSelector';
import workspaceReducer from '@/redux/features/workspace/workspaceSlice';
import { authSlice } from '@/redux/api/apiSlice';

// Mock the WorkspaceContext
vi.mock('@/context/WorkspaceContext', () => ({
  useWorkspace: () => ({
    switchWorkspace: vi.fn(),
    retrySyncUser: vi.fn(),
  }),
}));

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      workspace: workspaceReducer,
      [authSlice.reducerPath]: authSlice.reducer,
    },
    preloadedState: {
      workspace: {
        currentWorkspace: null,
        currentUserWorkspace: null,
        userWorkspaces: [],
        workspaceMembers: [],
        isLoading: false,
        isSwitching: false,
        error: null,
        permissions: [],
        ...initialState,
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authSlice.middleware),
  });
};

describe('WorkspaceSelector', () => {
  it('renders loading state correctly', () => {
    const store = createMockStore({ isLoading: true });

    render(
      <Provider store={store}>
        <WorkspaceSelector />
      </Provider>
    );

    // Should show skeleton loading cards
    expect(screen.getByText('Choose your')).toBeInTheDocument();
    expect(screen.getByText('workspace')).toBeInTheDocument();
  });

  it('renders empty state when no workspaces', () => {
    const store = createMockStore({ isLoading: false, userWorkspaces: [] });

    render(
      <Provider store={store}>
        <WorkspaceSelector />
      </Provider>
    );

    expect(screen.getByText('No workspaces yet')).toBeInTheDocument();
    expect(screen.getByText('Create Your First Workspace')).toBeInTheDocument();
  });

  it('renders workspace cards when workspaces exist', () => {
    const mockWorkspaces = [
      {
        id: '1',
        userId: 'user1',
        workspaceId: 'ws1',
        role: 'admin' as const,
        joinedAt: '2024-01-01T00:00:00Z',
        isActive: true,
        workspace: {
          id: 'ws1',
          name: 'Test Workspace',
          description: 'A test workspace',
          slug: 'test-workspace',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      },
    ];

    const store = createMockStore({
      isLoading: false,
      userWorkspaces: mockWorkspaces,
    });

    render(
      <Provider store={store}>
        <WorkspaceSelector />
      </Provider>
    );

    expect(screen.getByText('Test Workspace')).toBeInTheDocument();
    expect(screen.getByText('A test workspace')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const store = createMockStore({
      isLoading: false,
      error: 'Failed to load workspaces',
    });

    render(
      <Provider store={store}>
        <WorkspaceSelector />
      </Provider>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Failed to load workspaces')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});
