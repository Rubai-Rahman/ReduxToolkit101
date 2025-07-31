import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';
import type {
  User,
  Workspace,
  UserWorkspace,
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  UserSyncResponse,
  SwitchWorkspaceResponse,
  WorkspaceRole,
} from '@/types/workspace';

type TokenFetcher = () => Promise<string | null>;
let tokenFetcher: TokenFetcher = async () => null;
export const setTokenFetcher = (fetcher: TokenFetcher) => {
  tokenFetcher = fetcher;
};

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = await tokenFetcher();
      if (token) headers.set('Authorization', `Bearer ${token}`);

      // Add workspace context to requests
      const state = api.getState() as RootState;
      const currentWorkspace = state.workspace.currentWorkspace;
      if (currentWorkspace) {
        headers.set('X-Workspace-ID', currentWorkspace.id);
      }

      return headers;
    },
  });
  return rawBaseQuery(args, api, extraOptions);
};

// Types are now imported from @/types/workspace

export const authSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User', 'Workspace', 'WorkspaceMembers'],
  endpoints: (builder) => ({
    // User sync - called after Auth0 authentication
    syncUser: builder.mutation<
      UserSyncResponse,
      { auth0Id: string; email: string; name: string; avatarUrl?: string }
    >({
      query: (userData) => ({
        url: '/auth/sync',
        method: 'POST',
        body: {
          authId: userData.auth0Id, // Map auth0Id to authId
          email: userData.email,
          name: userData.name,
          picture: userData.avatarUrl, // Map avatarUrl to picture
          emailVerified: true, // Default to true for Auth0 users
        },
      }),
      invalidatesTags: ['User', 'Workspace'],
    }),

    // Get current user profile
    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Workspace management
    getUserWorkspaces: builder.query<UserWorkspace[], void>({
      query: () => '/workspaces',
      providesTags: ['Workspace'],
    }),

    createWorkspace: builder.mutation<
      CreateWorkspaceResponse,
      CreateWorkspaceRequest
    >({
      query: (workspaceData) => ({
        url: '/workspaces',
        method: 'POST',
        body: workspaceData,
      }),
      invalidatesTags: ['Workspace'],
    }),

    switchWorkspace: builder.mutation<SwitchWorkspaceResponse, string>({
      query: (workspaceId) => ({
        url: `/workspaces/${workspaceId}/switch`,
        method: 'POST',
      }),
      invalidatesTags: ['Workspace'],
    }),

    updateWorkspace: builder.mutation<
      Workspace,
      { id: string; updates: Partial<Workspace> }
    >({
      query: ({ id, updates }) => ({
        url: `/workspaces/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Workspace'],
    }),

    deleteWorkspace: builder.mutation<void, string>({
      query: (workspaceId) => ({
        url: `/workspaces/${workspaceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workspace'],
    }),

    // Workspace member management
    getWorkspaceMembers: builder.query<UserWorkspace[], string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/members`,
      providesTags: ['WorkspaceMembers'],
    }),

    inviteUserToWorkspace: builder.mutation<
      UserWorkspace,
      { workspaceId: string; email: string; role?: WorkspaceRole }
    >({
      query: ({ workspaceId, email, role = 'member' }) => ({
        url: `/workspaces/${workspaceId}/invite`,
        method: 'POST',
        body: { email, role },
      }),
      invalidatesTags: ['WorkspaceMembers'],
    }),

    updateMemberRole: builder.mutation<
      UserWorkspace,
      {
        workspaceId: string;
        userId: string;
        role: WorkspaceRole;
      }
    >({
      query: ({ workspaceId, userId, role }) => ({
        url: `/workspaces/${workspaceId}/members/${userId}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['WorkspaceMembers'],
    }),

    removeMemberFromWorkspace: builder.mutation<
      void,
      { workspaceId: string; userId: string }
    >({
      query: ({ workspaceId, userId }) => ({
        url: `/workspaces/${workspaceId}/members/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkspaceMembers'],
    }),
  }),
});

export const {
  useSyncUserMutation,
  useGetCurrentUserQuery,
  useGetUserWorkspacesQuery,
  useCreateWorkspaceMutation,
  useSwitchWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useInviteUserToWorkspaceMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberFromWorkspaceMutation,
} = authSlice;
