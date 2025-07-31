import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './apiSlice';
import type {
  Team,
  TeamMember,
  CreateTeamRequest,
  UpdateTeamRequest,
  TeamStats,
  PaginatedResponse,
  PaginationParams,
} from '@/types/workspace';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Team', 'TeamMembers', 'TeamStats'],
  endpoints: (builder) => ({
    // Team CRUD operations
    getWorkspaceTeams: builder.query<Team[], string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/teams`,
      providesTags: (result, error, workspaceId) => [
        { type: 'Team', id: `workspace-${workspaceId}` },
      ],
    }),

    getTeam: builder.query<Team, { workspaceId: string; teamId: string }>({
      query: ({ workspaceId, teamId }) =>
        `/workspaces/${workspaceId}/teams/${teamId}`,
      providesTags: (result, error, { teamId }) => [
        { type: 'Team', id: teamId },
      ],
    }),

    createTeam: builder.mutation<
      Team,
      { workspaceId: string } & CreateTeamRequest
    >({
      query: ({ workspaceId, ...teamData }) => ({
        url: `/workspaces/${workspaceId}/teams`,
        method: 'POST',
        body: teamData,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Team', id: `workspace-${workspaceId}` },
      ],
    }),

    updateTeam: builder.mutation<
      Team,
      { workspaceId: string; teamId: string } & UpdateTeamRequest
    >({
      query: ({ workspaceId, teamId, ...updates }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { teamId, workspaceId }) => [
        { type: 'Team', id: teamId },
        { type: 'Team', id: `workspace-${workspaceId}` },
      ],
    }),

    deleteTeam: builder.mutation<void, { workspaceId: string; teamId: string }>(
      {
        query: ({ workspaceId, teamId }) => ({
          url: `/workspaces/${workspaceId}/teams/${teamId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, { teamId, workspaceId }) => [
          { type: 'Team', id: teamId },
          { type: 'Team', id: `workspace-${workspaceId}` },
          { type: 'TeamMembers', id: teamId },
        ],
      }
    ),

    // Team member management
    getTeamMembers: builder.query<
      TeamMember[],
      { workspaceId: string; teamId: string }
    >({
      query: ({ workspaceId, teamId }) =>
        `/workspaces/${workspaceId}/teams/${teamId}/members`,
      providesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
      ],
    }),

    addTeamMember: builder.mutation<
      TeamMember,
      { workspaceId: string; teamId: string; userId: string }
    >({
      query: ({ workspaceId, teamId, userId }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}/members`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
        { type: 'TeamStats', id: teamId },
      ],
    }),

    removeTeamMember: builder.mutation<
      void,
      { workspaceId: string; teamId: string; userId: string }
    >({
      query: ({ workspaceId, teamId, userId }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}/members/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
        { type: 'TeamStats', id: teamId },
      ],
    }),

    // Bulk member operations
    addMultipleTeamMembers: builder.mutation<
      TeamMember[],
      { workspaceId: string; teamId: string; userIds: string[] }
    >({
      query: ({ workspaceId, teamId, userIds }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}/members/bulk`,
        method: 'POST',
        body: { userIds },
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
        { type: 'TeamStats', id: teamId },
      ],
    }),

    removeMultipleTeamMembers: builder.mutation<
      void,
      { workspaceId: string; teamId: string; userIds: string[] }
    >({
      query: ({ workspaceId, teamId, userIds }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}/members/bulk`,
        method: 'DELETE',
        body: { userIds },
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
        { type: 'TeamStats', id: teamId },
      ],
    }),

    // Team statistics
    getTeamStats: builder.query<
      TeamStats,
      { workspaceId: string; teamId: string }
    >({
      query: ({ workspaceId, teamId }) =>
        `/workspaces/${workspaceId}/teams/${teamId}/stats`,
      providesTags: (result, error, { teamId }) => [
        { type: 'TeamStats', id: teamId },
      ],
    }),

    // Team search and filtering
    searchTeams: builder.query<
      Team[],
      { workspaceId: string; query: string; limit?: number }
    >({
      query: ({ workspaceId, query, limit = 10 }) => ({
        url: `/workspaces/${workspaceId}/teams/search`,
        params: { q: query, limit },
      }),
    }),

    // Get teams for a specific user
    getUserTeams: builder.query<
      Team[],
      { workspaceId: string; userId: string }
    >({
      query: ({ workspaceId, userId }) =>
        `/workspaces/${workspaceId}/users/${userId}/teams`,
      providesTags: (result, error, { workspaceId, userId }) => [
        { type: 'Team', id: `user-${userId}-workspace-${workspaceId}` },
      ],
    }),

    // Team member availability
    getAvailableMembers: builder.query<
      TeamMember[],
      { workspaceId: string; teamId: string }
    >({
      query: ({ workspaceId, teamId }) =>
        `/workspaces/${workspaceId}/teams/${teamId}/available-members`,
    }),

    // Team templates (for quick team creation)
    getTeamTemplates: builder.query<
      {
        id: string;
        name: string;
        description: string;
        memberRoles: string[];
      }[],
      string
    >({
      query: (workspaceId) => `/workspaces/${workspaceId}/team-templates`,
    }),

    createTeamFromTemplate: builder.mutation<
      Team,
      {
        workspaceId: string;
        templateId: string;
        teamName: string;
        memberIds: string[];
      }
    >({
      query: ({ workspaceId, templateId, teamName, memberIds }) => ({
        url: `/workspaces/${workspaceId}/teams/from-template`,
        method: 'POST',
        body: { templateId, teamName, memberIds },
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Team', id: `workspace-${workspaceId}` },
      ],
    }),

    // Team activity and history
    getTeamActivity: builder.query<
      PaginatedResponse<any>,
      { workspaceId: string; teamId: string } & PaginationParams
    >({
      query: ({ workspaceId, teamId, ...params }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}/activity`,
        params,
      }),
    }),

    // Team permissions and roles
    getTeamPermissions: builder.query<
      Record<string, string[]>,
      { workspaceId: string; teamId: string }
    >({
      query: ({ workspaceId, teamId }) =>
        `/workspaces/${workspaceId}/teams/${teamId}/permissions`,
    }),

    updateTeamPermissions: builder.mutation<
      Record<string, string[]>,
      {
        workspaceId: string;
        teamId: string;
        permissions: Record<string, string[]>;
      }
    >({
      query: ({ workspaceId, teamId, permissions }) => ({
        url: `/workspaces/${workspaceId}/teams/${teamId}/permissions`,
        method: 'PUT',
        body: permissions,
      }),
    }),
  }),
});

export const {
  // Team CRUD
  useGetWorkspaceTeamsQuery,
  useGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,

  // Team members
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useRemoveTeamMemberMutation,
  useAddMultipleTeamMembersMutation,
  useRemoveMultipleTeamMembersMutation,

  // Team statistics
  useGetTeamStatsQuery,

  // Search and filtering
  useSearchTeamsQuery,
  useGetUserTeamsQuery,
  useGetAvailableMembersQuery,

  // Templates
  useGetTeamTemplatesQuery,
  useCreateTeamFromTemplateMutation,

  // Activity
  useGetTeamActivityQuery,

  // Permissions
  useGetTeamPermissionsQuery,
  useUpdateTeamPermissionsMutation,
} = teamApi;
