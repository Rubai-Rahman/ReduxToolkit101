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
        { type: 'Team', id: workspaceId },
      ],
    }),

    getTeam: builder.query<Team, string>({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: (result, error, teamId) => [{ type: 'Team', id: teamId }],
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
        { type: 'Team', id: workspaceId },
      ],
    }),

    updateTeam: builder.mutation<Team, { teamId: string } & UpdateTeamRequest>({
      query: ({ teamId, ...updates }) => ({
        url: `/teams/${teamId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'Team', id: teamId },
      ],
    }),

    deleteTeam: builder.mutation<void, string>({
      query: (teamId) => ({
        url: `/teams/${teamId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, teamId) => [
        { type: 'Team', id: teamId },
      ],
    }),

    // Team member management
    getTeamMembers: builder.query<TeamMember[], string>({
      query: (teamId) => `/teams/${teamId}/members`,
      providesTags: (result, error, teamId) => [
        { type: 'TeamMembers', id: teamId },
      ],
    }),

    addTeamMember: builder.mutation<
      TeamMember,
      { teamId: string; userId: string }
    >({
      query: ({ teamId, userId }) => ({
        url: `/teams/${teamId}/members`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
      ],
    }),

    removeTeamMember: builder.mutation<
      void,
      { teamId: string; userId: string }
    >({
      query: ({ teamId, userId }) => ({
        url: `/teams/${teamId}/members/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: 'TeamMembers', id: teamId },
      ],
    }),

    // Team statistics
    getTeamStats: builder.query<TeamStats, string>({
      query: (teamId) => `/teams/${teamId}/stats`,
      providesTags: (result, error, teamId) => [
        { type: 'TeamStats', id: teamId },
      ],
    }),

    // Team search
    searchTeams: builder.query<
      Team[],
      { workspaceId: string; query: string; limit?: number }
    >({
      query: ({ workspaceId, query, limit = 10 }) => ({
        url: `/workspaces/${workspaceId}/teams/search`,
        params: { q: query, limit },
      }),
    }),
  }),
});

export const {
  useGetWorkspaceTeamsQuery,
  useGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useRemoveTeamMemberMutation,
  useGetTeamStatsQuery,
  useSearchTeamsQuery,
} = teamApi;
