import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Building2,
  ChevronDown,
  Check,
  Plus,
  Settings,
  Users,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceSwitcherProps {
  className?: string;
  showCreateOption?: boolean;
  showManageOption?: boolean;
  onCreateWorkspace?: () => void;
  onManageWorkspace?: () => void;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  className,
  showCreateOption = true,
  showManageOption = true,
  onCreateWorkspace,
  onManageWorkspace,
}) => {
  const {
    currentWorkspace,
    currentUserWorkspace,
    userWorkspaces,
    isLoading,
    error,
    switchWorkspace,
    canManageUsers,
  } = useWorkspace();

  const [isSwitching, setIsSwitching] = useState<string | null>(null);

  const handleWorkspaceSwitch = async (workspaceId: string) => {
    if (workspaceId === currentWorkspace?.id) return;

    try {
      setIsSwitching(workspaceId);
      await switchWorkspace(workspaceId);
    } catch (error) {
      console.error('Failed to switch workspace:', error);
    } finally {
      setIsSwitching(null);
    }
  };

  const handleCreateWorkspace = () => {
    if (onCreateWorkspace) {
      onCreateWorkspace();
    } else {
      // Default behavior - navigate to onboarding
      window.location.href = '/onboarding';
    }
  };

  const handleManageWorkspace = () => {
    if (onManageWorkspace) {
      onManageWorkspace();
    } else {
      // Default behavior - navigate to workspace settings
      window.location.href = `/workspace/${currentWorkspace?.id}/settings`;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="w-32 h-4 mb-1" />
          <Skeleton className="w-20 h-3" />
        </div>
        <Skeleton className="w-4 h-4" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={cn('flex items-center gap-2 text-red-600', className)}>
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">Failed to load workspaces</span>
      </div>
    );
  }

  // No workspace selected
  if (!currentWorkspace) {
    return (
      <Button
        variant="outline"
        onClick={handleCreateWorkspace}
        className={cn('justify-start gap-2', className)}
      >
        <Building2 className="w-4 h-4" />
        Select Workspace
        <ChevronDown className="w-4 h-4 ml-auto" />
      </Button>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'supervisor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'member':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start gap-2 min-w-[200px] max-w-[300px]',
            className
          )}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-[var(--primary-start)]" />
          </div>
          <div className="flex-1 text-left overflow-hidden">
            <div className="font-medium truncate">{currentWorkspace.name}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {currentUserWorkspace?.role}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[300px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Workspaces</span>
          <Badge
            variant="outline"
            className={cn(
              'text-xs',
              getRoleBadgeColor(currentUserWorkspace?.role || '')
            )}
          >
            {currentUserWorkspace?.role}
          </Badge>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Current workspace */}
        <div className="px-2 py-1">
          <div className="text-xs text-muted-foreground mb-2">
            Current Workspace
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
            <div className="w-6 h-6 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded flex items-center justify-center">
              <Building2 className="w-3 h-3 text-[var(--primary-start)]" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{currentWorkspace.name}</div>
              {currentWorkspace.description && (
                <div className="text-xs text-muted-foreground truncate">
                  {currentWorkspace.description}
                </div>
              )}
            </div>
            <Check className="w-4 h-4 text-green-600" />
          </div>
        </div>

        {/* Other workspaces */}
        {userWorkspaces.filter((uw) => uw.workspaceId !== currentWorkspace.id)
          .length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1">
              <div className="text-xs text-muted-foreground mb-2">
                Switch to
              </div>
              {userWorkspaces
                .filter((uw) => uw.workspaceId !== currentWorkspace.id)
                .map((userWorkspace) => (
                  <DropdownMenuItem
                    key={userWorkspace.id}
                    onClick={() =>
                      handleWorkspaceSwitch(userWorkspace.workspaceId)
                    }
                    className="flex items-center gap-2 p-2 cursor-pointer"
                    disabled={isSwitching === userWorkspace.workspaceId}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded flex items-center justify-center">
                      {isSwitching === userWorkspace.workspaceId ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Building2 className="w-3 h-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {userWorkspace.workspace?.name}
                      </div>
                      {userWorkspace.workspace?.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {userWorkspace.workspace.description}
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        getRoleBadgeColor(userWorkspace.role)
                      )}
                    >
                      {userWorkspace.role}
                    </Badge>
                  </DropdownMenuItem>
                ))}
            </div>
          </>
        )}

        {/* Actions */}
        <DropdownMenuSeparator />

        {showCreateOption && (
          <DropdownMenuItem onClick={handleCreateWorkspace} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Workspace
          </DropdownMenuItem>
        )}

        {showManageOption && canManageUsers && (
          <DropdownMenuItem onClick={handleManageWorkspace} className="gap-2">
            <Settings className="w-4 h-4" />
            Manage Workspace
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() =>
            (window.location.href = `/workspace/${currentWorkspace.id}/members`)
          }
          className="gap-2"
        >
          <Users className="w-4 h-4" />
          View Members (
          {userWorkspaces.find((uw) => uw.workspaceId === currentWorkspace.id)
            ?.workspace
            ? '...'
            : '0'}
          )
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
