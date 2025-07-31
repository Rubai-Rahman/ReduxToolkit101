import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RoleDisplay, RoleValidator } from '@/lib/permissions';
import { RoleBadge } from './RoleBadge';
import type { WorkspaceRole } from '@/types/workspace';

interface RoleSelectorProps {
  value: WorkspaceRole;
  onValueChange: (role: WorkspaceRole) => void;
  currentUserRole: WorkspaceRole | null;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  showDescriptions?: boolean;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onValueChange,
  currentUserRole,
  disabled = false,
  placeholder = 'Select a role',
  className,
  showDescriptions = true,
}) => {
  const assignableRoles = RoleValidator.getAssignableRoles(currentUserRole);

  if (assignableRoles.length === 0) {
    return (
      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
        <RoleBadge role={value} showIcon />
        <span className="text-sm text-muted-foreground">
          (Cannot change role)
        </span>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {value && <RoleBadge role={value} showIcon />}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {assignableRoles.map((role) => (
          <SelectItem key={role} value={role}>
            <div className="flex items-start gap-3 py-1">
              <RoleBadge role={role} showIcon size="sm" showTooltip={false} />
              {showDescriptions && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {RoleDisplay.getRoleDisplayName(role)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {RoleDisplay.getRoleDescription(role)}
                  </p>
                </div>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;
