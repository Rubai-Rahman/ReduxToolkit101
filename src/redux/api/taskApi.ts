import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './apiSlice';
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilters,
  PaginatedResponse,
  PaginationParams,
  UserStats,
} from '@/types/workspace';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Task', 'TaskStats'],
  endpoints: (builder) => ({
    // Task CRUD operations
    getWorkspaceTasks: builder.query<
      PaginatedResponse<Task>,
      { workspaceId: string; filters?: TaskFilters } & PaginationParams
    >({
      query: ({ workspaceId, filters, ...params }) => ({
        url: `/workspaces/${workspaceId}/tasks`,
        params: { ...params, ...filters },
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: workspaceId },
      ],
    }),

    getTeamTasks: builder.query<
      PaginatedResponse<Task>,
      { teamId: string; filters?: TaskFilters } & PaginationParams
    >({
      query: ({ teamId, filters, ...params }) => ({
        url: `/teams/${teamId}/tasks`,
        params: { ...params, ...filters },
      }),
      providesTags: (result, error, { teamId }) => [
        { type: 'Task', id: teamId },
      ],
    }),

    getUserTasks: builder.query<
      PaginatedResponse<Task>,
      { userId: string; filters?: TaskFilters } & PaginationParams
    >({
      query: ({ userId, filters, ...params }) => ({
        url: `/users/${userId}/tasks`,
        params: { ...params, ...filters },
      }),
      providesTags: (result, error, { userId }) => [
        { type: 'Task', id: userId },
      ],
    }),

    getTask: builder.query<Task, string>({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (result, error, taskId) => [{ type: 'Task', id: taskId }],
    }),

    createTask: builder.mutation<
      Task,
      { workspaceId: string } & CreateTaskRequest
    >({
      query: ({ workspaceId, ...taskData }) => ({
        url: `/workspaces/${workspaceId}/tasks`,
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: workspaceId },
      ],
    }),

    updateTask: builder.mutation<Task, { taskId: string } & UpdateTaskRequest>({
      query: ({ taskId, ...updates }) => ({
        url: `/tasks/${taskId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, taskId) => [
        { type: 'Task', id: taskId },
      ],
    }),

    // Task assignment
    assignTask: builder.mutation<Task, { taskId: string; assignedTo: string }>({
      query: ({ taskId, assignedTo }) => ({
        url: `/tasks/${taskId}/assign`,
        method: 'PUT',
        body: { assignedTo },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    unassignTask: builder.mutation<Task, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}/unassign`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, taskId) => [
        { type: 'Task', id: taskId },
      ],
    }),

    // Bulk operations
    bulkUpdateTasks: builder.mutation<
      Task[],
      { taskIds: string[]; updates: Partial<UpdateTaskRequest> }
    >({
      query: ({ taskIds, updates }) => ({
        url: '/tasks/bulk-update',
        method: 'PUT',
        body: { taskIds, updates },
      }),
      invalidatesTags: ['Task'],
    }),

    bulkDeleteTasks: builder.mutation<void, string[]>({
      query: (taskIds) => ({
        url: '/tasks/bulk-delete',
        method: 'DELETE',
        body: { taskIds },
      }),
      invalidatesTags: ['Task'],
    }),

    // Task statistics
    getUserTaskStats: builder.query<UserStats, string>({
      query: (userId) => `/users/${userId}/task-stats`,
      providesTags: (result, error, userId) => [
        { type: 'TaskStats', id: userId },
      ],
    }),

    // Task search
    searchTasks: builder.query<
      PaginatedResponse<Task>,
      {
        workspaceId: string;
        query: string;
        filters?: TaskFilters;
      } & PaginationParams
    >({
      query: ({ workspaceId, query, filters, ...params }) => ({
        url: `/workspaces/${workspaceId}/tasks/search`,
        params: { q: query, ...params, ...filters },
      }),
    }),
  }),
});

export const {
  useGetWorkspaceTasksQuery,
  useGetTeamTasksQuery,
  useGetUserTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAssignTaskMutation,
  useUnassignTaskMutation,
  useBulkUpdateTasksMutation,
  useBulkDeleteTasksMutation,
  useGetUserTaskStatsQuery,
  useSearchTasksQuery,
} = taskApi;
