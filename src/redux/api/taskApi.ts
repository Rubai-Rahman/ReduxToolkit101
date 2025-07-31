import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './apiSlice';
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilters,
  TaskStatus,
  TaskPriority,
  PaginatedResponse,
  PaginationParams,
} from '@/types/workspace';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Task', 'TaskStats', 'TaskComments', 'TaskAttachments'],
  endpoints: (builder) => ({
    // Task CRUD operations
    getWorkspaceTasks: builder.query<
      PaginatedResponse<Task>,
      { workspaceId: string; filters?: TaskFilters } & PaginationParams
    >({
      query: ({ workspaceId, filters, ...params }) => ({
        url: `/workspaces/${workspaceId}/tasks`,
        params: { ...filters, ...params },
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: `workspace-${workspaceId}` },
      ],
    }),

    getTask: builder.query<Task, { workspaceId: string; taskId: string }>({
      query: ({ workspaceId, taskId }) =>
        `/workspaces/${workspaceId}/tasks/${taskId}`,
      providesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
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
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    updateTask: builder.mutation<
      Task,
      { workspaceId: string; taskId: string } & UpdateTaskRequest
    >({
      query: ({ workspaceId, taskId, ...updates }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { taskId, workspaceId }) => [
        { type: 'Task', id: taskId },
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    deleteTask: builder.mutation<void, { workspaceId: string; taskId: string }>(
      {
        query: ({ workspaceId, taskId }) => ({
          url: `/workspaces/${workspaceId}/tasks/${taskId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, { taskId, workspaceId }) => [
          { type: 'Task', id: taskId },
          { type: 'Task', id: `workspace-${workspaceId}` },
          'TaskStats',
        ],
      }
    ),

    // Task assignment
    assignTask: builder.mutation<
      Task,
      { workspaceId: string; taskId: string; assignedTo: string }
    >({
      query: ({ workspaceId, taskId, assignedTo }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/assign`,
        method: 'PUT',
        body: { assignedTo },
      }),
      invalidatesTags: (result, error, { taskId, workspaceId }) => [
        { type: 'Task', id: taskId },
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    unassignTask: builder.mutation<
      Task,
      { workspaceId: string; taskId: string }
    >({
      query: ({ workspaceId, taskId }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/unassign`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, { taskId, workspaceId }) => [
        { type: 'Task', id: taskId },
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    // Bulk operations
    bulkUpdateTasks: builder.mutation<
      Task[],
      {
        workspaceId: string;
        taskIds: string[];
        updates: Partial<UpdateTaskRequest>;
      }
    >({
      query: ({ workspaceId, taskIds, updates }) => ({
        url: `/workspaces/${workspaceId}/tasks/bulk-update`,
        method: 'PUT',
        body: { taskIds, updates },
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    bulkDeleteTasks: builder.mutation<
      void,
      { workspaceId: string; taskIds: string[] }
    >({
      query: ({ workspaceId, taskIds }) => ({
        url: `/workspaces/${workspaceId}/tasks/bulk-delete`,
        method: 'DELETE',
        body: { taskIds },
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    // Task status transitions
    updateTaskStatus: builder.mutation<
      Task,
      { workspaceId: string; taskId: string; status: TaskStatus }
    >({
      query: ({ workspaceId, taskId, status }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId, workspaceId }) => [
        { type: 'Task', id: taskId },
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    // Task filtering and search
    searchTasks: builder.query<
      Task[],
      {
        workspaceId: string;
        query: string;
        filters?: TaskFilters;
        limit?: number;
      }
    >({
      query: ({ workspaceId, query, filters, limit = 20 }) => ({
        url: `/workspaces/${workspaceId}/tasks/search`,
        params: { q: query, ...filters, limit },
      }),
    }),

    getTasksByAssignee: builder.query<
      Task[],
      { workspaceId: string; userId: string; status?: TaskStatus[] }
    >({
      query: ({ workspaceId, userId, status }) => ({
        url: `/workspaces/${workspaceId}/tasks/by-assignee/${userId}`,
        params: status ? { status: status.join(',') } : {},
      }),
      providesTags: (result, error, { workspaceId, userId }) => [
        { type: 'Task', id: `assignee-${userId}-workspace-${workspaceId}` },
      ],
    }),

    getTasksByTeam: builder.query<
      Task[],
      { workspaceId: string; teamId: string; status?: TaskStatus[] }
    >({
      query: ({ workspaceId, teamId, status }) => ({
        url: `/workspaces/${workspaceId}/tasks/by-team/${teamId}`,
        params: status ? { status: status.join(',') } : {},
      }),
      providesTags: (result, error, { workspaceId, teamId }) => [
        { type: 'Task', id: `team-${teamId}-workspace-${workspaceId}` },
      ],
    }),

    getOverdueTasks: builder.query<
      Task[],
      { workspaceId: string; assignedTo?: string }
    >({
      query: ({ workspaceId, assignedTo }) => ({
        url: `/workspaces/${workspaceId}/tasks/overdue`,
        params: assignedTo ? { assignedTo } : {},
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: `overdue-workspace-${workspaceId}` },
      ],
    }),

    // Task statistics
    getTaskStats: builder.query<
      {
        total: number;
        byStatus: Record<TaskStatus, number>;
        byPriority: Record<TaskPriority, number>;
        byAssignee: Record<string, number>;
        overdue: number;
        completedThisWeek: number;
        completedThisMonth: number;
      },
      { workspaceId: string; teamId?: string; assignedTo?: string }
    >({
      query: ({ workspaceId, teamId, assignedTo }) => ({
        url: `/workspaces/${workspaceId}/tasks/stats`,
        params: { teamId, assignedTo },
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: 'TaskStats', id: workspaceId },
      ],
    }),

    // Task templates
    getTaskTemplates: builder.query<
      {
        id: string;
        name: string;
        description: string;
        priority: TaskPriority;
        estimatedHours?: number;
      }[],
      string
    >({
      query: (workspaceId) => `/workspaces/${workspaceId}/task-templates`,
    }),

    createTaskFromTemplate: builder.mutation<
      Task,
      {
        workspaceId: string;
        templateId: string;
        title: string;
        assignedTo?: string;
        teamId?: string;
        dueDate?: string;
      }
    >({
      query: ({ workspaceId, templateId, ...taskData }) => ({
        url: `/workspaces/${workspaceId}/tasks/from-template`,
        method: 'POST',
        body: { templateId, ...taskData },
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: 'Task', id: `workspace-${workspaceId}` },
        'TaskStats',
      ],
    }),

    // Task dependencies
    getTaskDependencies: builder.query<
      { dependencies: Task[]; dependents: Task[] },
      { workspaceId: string; taskId: string }
    >({
      query: ({ workspaceId, taskId }) =>
        `/workspaces/${workspaceId}/tasks/${taskId}/dependencies`,
    }),

    addTaskDependency: builder.mutation<
      void,
      { workspaceId: string; taskId: string; dependsOnTaskId: string }
    >({
      query: ({ workspaceId, taskId, dependsOnTaskId }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/dependencies`,
        method: 'POST',
        body: { dependsOnTaskId },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    removeTaskDependency: builder.mutation<
      void,
      { workspaceId: string; taskId: string; dependsOnTaskId: string }
    >({
      query: ({ workspaceId, taskId, dependsOnTaskId }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/dependencies/${dependsOnTaskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    // Task time tracking
    startTaskTimer: builder.mutation<
      { startTime: string },
      { workspaceId: string; taskId: string }
    >({
      query: ({ workspaceId, taskId }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/timer/start`,
        method: 'POST',
      }),
    }),

    stopTaskTimer: builder.mutation<
      { endTime: string; duration: number },
      { workspaceId: string; taskId: string }
    >({
      query: ({ workspaceId, taskId }) => ({
        url: `/workspaces/${workspaceId}/tasks/${taskId}/timer/stop`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    getTaskTimeEntries: builder.query<
      {
        id: string;
        startTime: string;
        endTime?: string;
        duration?: number;
        description?: string;
      }[],
      { workspaceId: string; taskId: string }
    >({
      query: ({ workspaceId, taskId }) =>
        `/workspaces/${workspaceId}/tasks/${taskId}/time-entries`,
    }),
  }),
});

export const {
  // Task CRUD
  useGetWorkspaceTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,

  // Task assignment
  useAssignTaskMutation,
  useUnassignTaskMutation,

  // Bulk operations
  useBulkUpdateTasksMutation,
  useBulkDeleteTasksMutation,

  // Status updates
  useUpdateTaskStatusMutation,

  // Search and filtering
  useSearchTasksQuery,
  useGetTasksByAssigneeQuery,
  useGetTasksByTeamQuery,
  useGetOverdueTasksQuery,

  // Statistics
  useGetTaskStatsQuery,

  // Templates
  useGetTaskTemplatesQuery,
  useCreateTaskFromTemplateMutation,

  // Dependencies
  useGetTaskDependenciesQuery,
  useAddTaskDependencyMutation,
  useRemoveTaskDependencyMutation,

  // Time tracking
  useStartTaskTimerMutation,
  useStopTaskTimerMutation,
  useGetTaskTimeEntriesQuery,
} = taskApi;
