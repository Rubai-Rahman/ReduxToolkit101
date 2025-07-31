// Export all guard components
export { default as WorkspaceGuard } from '@/components/workspace/WorkspaceGuard';
export {
  AdminGuard as WorkspaceAdminGuard,
  SupervisorGuard as WorkspaceSupervisorGuard,
  MemberGuard as WorkspaceMemberGuard,
  TaskManagementGuard as WorkspaceTaskManagementGuard,
  UserManagementGuard as WorkspaceUserManagementGuard,
  WorkspaceManagementGuard as WorkspaceSettingsGuard,
} from '@/components/workspace/WorkspaceGuard';

export { default as RoleGuard } from './RoleGuard';
export {
  AdminGuard,
  SupervisorGuard,
  MemberGuard,
  MinimumSupervisorGuard,
  MinimumAdminGuard,
} from './RoleGuard';

export { default as PermissionGuard } from './PermissionGuard';
export {
  TaskManagementGuard,
  TaskEditGuard,
  TaskDeleteGuard,
  TeamManagementGuard,
  UserManagementGuard,
  WorkspaceManagementGuard,
} from './PermissionGuard';

// Re-export permission renderer components
export { default as PermissionRenderer } from '@/components/permissions/PermissionRenderer';
export {
  AdminOnly,
  SupervisorOrAdmin,
  MemberOrAbove,
  CanCreateTask,
  CanUpdateTask,
  CanDeleteTask,
  CanAssignTask,
  CanCreateTeam,
  CanUpdateTeam,
  CanDeleteTeam,
  CanInviteUser,
  CanUpdateUserRole,
  CanRemoveUser,
  CanUpdateWorkspace,
  CanDeleteWorkspace,
} from '@/components/permissions/PermissionRenderer';
