import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './apiSlice';
import type {
  Workspace,
  UserWorkspace,
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  UpdateWorkspaceRequest,
  SwitchWorkspaceResponse,
  WorkspaceStats,
  InviteUserRequest,
  UpdateMemberRoleRequest,
  Invitation,
  AuditLog,
  PaginatedResponse,
  PaginationParams,
} from '@/types/workspace';

export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'Workspace',
    'WorkspaceMembers',
    'WorkspaceStats',
    'Invitations',
    'AuditLogs',
  ],
  endpoints: (builder) => ({
    // Workspace CRUD operations
    getUserWorkspaces: builder.query<UserWorkspace[], void>({
      query: () => '/workspaces',
      providesTags: ['Workspace'],
    }),

    getWorkspace: builder.query<Workspace, string>({
      query: (workspaceId) => `/workspaces/${workspaceId}`,
      providesTags: (result, error, workspaceId) => [
        { type: 'Workspace', id: workspaceId },
      ],
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

    updateWorkspace: builder.mutation<
      Workspace,
      { id: string; updates: UpdateWorkspaceRequest }
    >({
      query: ({ id, updates }) => ({
        url: `/workspaces/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Workspace', id },
        'Workspace',
      ],
    }),

    deleteWorkspace: builder.mutation<void, string>({
      query: (workspaceId) => ({
        url: `/workspaces/${workspaceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workspace'],
    }),

    switchWorkspace: builder.mutation<SwitchWorkspaceResponse, string>({
      query: (workspaceId) => ({
        url: `/workspaces/${workspaceId}/switch`,
        method: 'POST',
      }),
      invalidatesTags: ['Workspace', 'WorkspaceMembers', 'WorkspaceStats'],
    }),

    // Workspace member management
    getWorkspaceMembers: builder.query<UserWorkspace[], string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/members`,
      providesTags: (result, error, workspaceId) => [
        { type: 'WorkspaceMembers', id: workspaceId },
      ],
    }),

    inviteUserToWorkspace: builder.mutation<
      UserWorkspace,
      { workspaceId: string } & InviteUserRequest
    >({
      query: ({ workspaceId, ...inviteData }) => ({
        url: `/workspaces/${workspaceId}/invite`,
        method: 'POST',
        body: inviteData,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'WorkspaceMembers', id: workspaceId },
        'Invitations',
      ],
    }),

    updateMemberRole: builder.mutation<
      UserWorkspace,
      { workspaceId: string; userId: string } & UpdateMemberRoleRequest
    >({
      query: ({ workspaceId, userId, ...roleData }) => ({
        url: `/workspaces/${workspaceId}/members/${userId}/role`,
        method: 'PUT',
        body: roleData,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'WorkspaceMembers', id: workspaceId },
        'AuditLogs',
      ],
    }),

    removeMemberFromWorkspace: builder.mutation<
      void,
      { workspaceId: string; userId: string }
    >({
      query: ({ workspaceId, userId }) => ({
        url: `/workspaces/${workspaceId}/members/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'WorkspaceMembers', id: workspaceId },
        'AuditLogs',
      ],
    }),

    // Workspace statistics
    getWorkspaceStats: builder.query<WorkspaceStats, string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/stats`,
      providesTags: (result, error, workspaceId) => [
        { type: 'WorkspaceStats', id: workspaceId },
      ],
    }),

    // Invitation management
    getWorkspaceInvitations: builder.query<Invitation[], string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/invitations`,
      providesTags: (result, error, workspaceId) => [
        { type: 'Invitations', id: workspaceId },
      ],
    }),

    resendInvitation: builder.mutation<
      Invitation,
      { workspaceId: string; invitationId: string }
    >({
      query: ({ workspaceId, invitationId }) => ({
        url: `/workspaces/${workspaceId}/invitations/${invitationId}/resend`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Invitations', id: workspaceId },
      ],
    }),

    cancelInvitation: builder.mutation<
      void,
      { workspaceId: string; invitationId: string }
    >({
      query: ({ workspaceId, invitationId }) => ({
        url: `/workspaces/${workspaceId}/invitations/${invitationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Invitations', id: workspaceId },
      ],
    }),

    // Accept invitation (public endpoint)
    acceptInvitation: builder.mutation<
      { workspace: Workspace; userWorkspace: UserWorkspace },
      string
    >({
      query: (token) => ({
        url: `/invitations/${token}/accept`,
        method: 'POST',
      }),
      invalidatesTags: ['Workspace'],
    }),

    // Audit logs
    getWorkspaceAuditLogs: builder.query<
      PaginatedResponse<AuditLog>,
      { workspaceId: string } & PaginationParams
    >({
      query: ({ workspaceId, ...params }) => ({
        url: `/workspaces/${workspaceId}/audit-logs`,
        params,
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: 'AuditLogs', id: workspaceId },
      ],
    }),

    // Workspace validation
    validateWorkspaceName: builder.query<
      { available: boolean; suggestions?: string[] },
      { name: string; excludeId?: string }
    >({
      query: ({ name, excludeId }) => ({
        url: '/workspaces/validate-name',
        params: { name, excludeId },
      }),
    }),

    validateWorkspaceSlug: builder.query<
      { available: boolean; suggestions?: string[] },
      { slug: string; excludeId?: string }
    >({
      query: ({ slug, excludeId }) => ({
        url: '/workspaces/validate-slug',
        params: { slug, excludeId },
      }),
    }),

    // Workspace search and discovery
    searchWorkspaces: builder.query<
      UserWorkspace[],
      { query: string; limit?: number }
    >({
      query: ({ query, limit = 10 }) => ({
        url: '/workspaces/search',
        params: { q: query, limit },
      }),
    }),

    // Workspace export/import
    exportWorkspaceData: builder.mutation<
      { downloadUrl: string },
      { workspaceId: string; includeMembers?: boolean; includeTasks?: boolean }
    >({
      query: ({ workspaceId, ...options }) => ({
        url: `/workspaces/${workspaceId}/export`,
        method: 'POST',
        body: options,
      }),
    }),

    // Workspace settings
    getWorkspaceSettings: builder.query<Record<string, any>, string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/settings`,
    }),

    updateWorkspaceSettings: builder.mutation<
      Record<string, any>,
      { workspaceId: string; settings: Record<string, any> }
    >({
      query: ({ workspaceId, settings }) => ({
        url: `/workspaces/${workspaceId}/settings`,
        method: 'PUT',
        body: settings,
      }),
    }),
  }),
});

export const {
  // Workspace CRUD
  useGetUserWorkspacesQuery,
  useGetWorkspaceQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useSwitchWorkspaceMutation,

  // Member management
  useGetWorkspaceMembersQuery,
  useInviteUserToWorkspaceMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberFromWorkspaceMutation,

  // Statistics
  useGetWorkspaceStatsQuery,

  // Invitations
  useGetWorkspaceInvitationsQuery,
  useResendInvitationMutation,
  useCancelInvitationMutation,
  useAcceptInvitationMutation,

  // Audit logs
  useGetWorkspaceAuditLogsQuery,

  // Validation
  useValidateWorkspaceNameQuery,
  useValidateWorkspaceSlugQuery,

  // Search
  useSearchWorkspacesQuery,

  // Export
  useExportWorkspaceDataMutation,

  // Settings
  useGetWorkspaceSettingsQuery,
  useUpdateWorkspaceSettingsMutation,
} = workspaceApi;
