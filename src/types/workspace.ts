// Core entity types
export interface User {
  id: string;
  auth0Id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserWorkspace {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  joinedAt: string;
  isActive: boolean;
  user?: User;
  workspace?: Workspace;
}

export interface Team {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  members?: TeamMember[];
  memberCount?: number;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  joinedAt: string;
  user?: User;
  team?: Team;
}

export interface Task {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  createdBy: string;
  teamId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  assignee?: User;
  creator?: User;
  team?: Team;
}

// Enum types
export type WorkspaceRole = 'member' | 'supervisor' | 'admin';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// Permission system types
export interface Permission {
  resource: PermissionResource;
  action: PermissionAction;
  scope: PermissionScope;
}

export type PermissionResource = 'task' | 'team' | 'user' | 'workspace';
export type PermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'assign';
export type PermissionScope = 'own' | 'team' | 'workspace';

// Role-based permission mapping
export interface RolePermissions {
  member: Permission[];
  supervisor: Permission[];
  admin: Permission[];
}

// API request/response types
export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  assignedTo?: string;
  teamId?: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  teamId?: string;
  dueDate?: string;
}

export interface InviteUserRequest {
  email: string;
  role?: WorkspaceRole;
}

export interface UpdateMemberRoleRequest {
  role: WorkspaceRole;
}

// API response types
export interface UserSyncResponse {
  user: User;
  workspaces: UserWorkspace[];
  defaultWorkspace?: {
    workspace: Workspace;
    userWorkspace: UserWorkspace;
  };
}

export interface CreateWorkspaceResponse {
  workspace: Workspace;
  userWorkspace: UserWorkspace;
}

export interface SwitchWorkspaceResponse {
  workspace: Workspace;
  userWorkspace: UserWorkspace;
}

// Filter and pagination types
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignedTo?: string[];
  teamId?: string[];
  search?: string;
  dueDate?: {
    from?: string;
    to?: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Workspace statistics types
export interface WorkspaceStats {
  totalMembers: number;
  totalTeams: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  tasksByPriority: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  tasksByStatus: {
    todo: number;
    in_progress: number;
    review: number;
    completed: number;
  };
}

export interface TeamStats {
  memberCount: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

export interface UserStats {
  assignedTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  teamsCount: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Form types
export interface WorkspaceFormData {
  name: string;
  description: string;
}

export interface TeamFormData {
  name: string;
  description: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  assignedTo: string;
  teamId: string;
  dueDate: string;
}

export interface InviteUserFormData {
  email: string;
  role: WorkspaceRole;
}

// UI state types
export interface WorkspaceUIState {
  selectedWorkspace: string | null;
  isCreatingWorkspace: boolean;
  isEditingWorkspace: boolean;
  workspaceToDelete: string | null;
}

export interface TeamUIState {
  selectedTeam: string | null;
  isCreatingTeam: boolean;
  isEditingTeam: boolean;
  teamToDelete: string | null;
  showMemberManagement: boolean;
}

export interface TaskUIState {
  selectedTask: string | null;
  isCreatingTask: boolean;
  isEditingTask: boolean;
  taskToDelete: string | null;
  filters: TaskFilters;
  viewMode: 'list' | 'board' | 'calendar';
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  workspaceId?: string;
  relatedEntity?: {
    type: 'task' | 'team' | 'user' | 'workspace';
    id: string;
    name: string;
  };
}

// Audit log types
export interface AuditLog {
  id: string;
  workspaceId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  timestamp: string;
  user?: User;
}

// Invitation types
export interface Invitation {
  id: string;
  workspaceId: string;
  email: string;
  role: WorkspaceRole;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  token: string;
  expiresAt: string;
  createdAt: string;
  workspace?: Workspace;
  inviter?: User;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// Type guards
export const isWorkspaceRole = (role: string): role is WorkspaceRole => {
  return ['member', 'supervisor', 'admin'].includes(role);
};

export const isTaskStatus = (status: string): status is TaskStatus => {
  return ['todo', 'in_progress', 'review', 'completed'].includes(status);
};

export const isTaskPriority = (priority: string): priority is TaskPriority => {
  return ['low', 'medium', 'high', 'urgent'].includes(priority);
};

export const isPermissionResource = (
  resource: string
): resource is PermissionResource => {
  return ['task', 'team', 'user', 'workspace'].includes(resource);
};

export const isPermissionAction = (
  action: string
): action is PermissionAction => {
  return ['create', 'read', 'update', 'delete', 'assign'].includes(action);
};

export const isPermissionScope = (scope: string): scope is PermissionScope => {
  return ['own', 'team', 'workspace'].includes(scope);
};
