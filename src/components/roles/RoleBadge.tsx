import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Shield, Users, User } from 'lucide-react';
import { RoleDisplay } from '@/lib/permissions';
import type { WorkspaceRole } from '@/types/workspace';
import { cn } from '@/lib/utils';

interface RoleBadgeProps {
  role: WorkspaceRole;
  showIcon?: boolean;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  showIcon = false,
  showTooltip = true,
  size = 'md',
  className,
}) => {
  const getRoleIcon = (role: WorkspaceRole) => {
    const iconProps = {
      className: cn(
        'flex-shrink-0',
        size === 'sm' && 'h-3 w-3',
        size === 'md' && 'h-4 w-4',
        size === 'lg' && 'h-5 w-5'
      ),
    };

    switch (role) {
      case 'admin':
        return <Shield {...iconProps} />;
      case 'supervisor':
        return <Users {...iconProps} />;
      case 'member':
        return <User {...iconProps} />;
      default:
        return null;
    }
  };

  const getBadgeClasses = () => {
    const baseClasses = cn(
      'font-medium',
      showIcon && 'flex items-center gap-1',
      size === 'sm' && 'text-xs px-2 py-0.5',
      size === 'md' && 'text-sm px-2.5 py-1',
      size === 'lg' && 'text-base px-3 py-1.5',
      className
    );

    switch (role) {
      case 'admin':
        return cn(
          baseClasses,
          'bg-red-100 text-red-800 border-red-200',
          'dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
        );
      case 'supervisor':
        return cn(
          baseClasses,
          'bg-blue-100 text-blue-800 border-blue-200',
          'dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
        );
      case 'member':
        return cn(
          baseClasses,
          'bg-green-100 text-green-800 border-green-200',
          'dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
        );
      default:
        return cn(
          baseClasses,
          'bg-gray-100 text-gray-800 border-gray-200',
          'dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
        );
    }
  };

  const badge = (
    <Badge variant="outline" className={getBadgeClasses()}>
      {showIcon && getRoleIcon(role)}
      {RoleDisplay.getRoleDisplayName(role)}
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-medium">
              {RoleDisplay.getRoleDisplayName(role)}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {RoleDisplay.getRoleDescription(role)}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoleBadge;
