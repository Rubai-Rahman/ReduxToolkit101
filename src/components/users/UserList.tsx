import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import {
  useGetWorkspaceMembersQuery,
  useRemoveMemberFromWorkspaceMutation,
} from '@/redux/api/apiSlice';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Users,
  MoreHorizontal,
  Settings,
  UserMinus,
  Mail,
  Calendar,
  AlertTriangle,
  Loader2,
  Search,
} from 'lucide-react';
import { RoleBadge } from '@/components/roles/RoleBadge';
import { RoleManager } from '@/components/roles/RoleManager';
import {
  AdminOnly,
  CanUpdateUserRole,
  CanRemoveUser,
} from '@/components/permissions/PermissionRenderer';
import { Input } from '@/components/ui/input';
import type { UserWorkspace } from '@/types/workspace';

interface UserListProps {
  className?: string;
  showInviteButton?: boolean;
  onInviteUser?: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  className,
  showInviteButton = true,
  onInviteUser,
}) => {
  const { currentWorkspace } = useWorkspace();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<UserWorkspace | null>(
    null
  );
  const [showRoleManager, setShowRoleManager] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<UserWorkspace | null>(
    null
  );

  const {
    data: members = [],
    isLoading,
    error,
    refetch,
  } = useGetWorkspaceMembersQuery(currentWorkspace?.id || '', {
    skip: !currentWorkspace?.id,
  });

  const [removeMember, { isLoading: isRemoving }] =
    useRemoveMemberFromWorkspaceMutation();

  // Filter members based on search term
  const filteredMembers = members.filter(
    (member) =>
      member.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (member: UserWorkspace) => {
    setSelectedMember(member);
    setShowRoleManager(true);
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove || !currentWorkspace) return;

    try {
      await removeMember({
        workspaceId: currentWorkspace.id,
        userId: memberToRemove.userId,
      }).unwrap();

      setMemberToRemove(null);
      refetch();
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Failed to load workspace members
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Workspace Members
              </CardTitle>
              <CardDescription>
                Manage members and their roles in {currentWorkspace?.name}
              </CardDescription>
            </div>
            {showInviteButton && (
              <AdminOnly>
                <Button onClick={onInviteUser}>
                  <Mail className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </AdminOnly>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="ml-2">
              {filteredMembers.length} member
              {filteredMembers.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Members Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm
                          ? 'No members found matching your search.'
                          : 'No members found.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.user?.avatarUrl} />
                            <AvatarFallback>
                              {getInitials(member.user?.name || '')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.user?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.user?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={member.role} showIcon />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatJoinDate(member.joinedAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <CanUpdateUserRole>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(member)}
                                className="flex items-center gap-2"
                              >
                                <Settings className="h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                            </CanUpdateUserRole>

                            <CanRemoveUser>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setMemberToRemove(member)}
                                className="flex items-center gap-2 text-red-600"
                              >
                                <UserMinus className="h-4 w-4" />
                                Remove Member
                              </DropdownMenuItem>
                            </CanRemoveUser>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Manager Dialog */}
      {selectedMember && (
        <RoleManager
          member={selectedMember}
          isOpen={showRoleManager}
          onOpenChange={setShowRoleManager}
          onRoleChanged={(updatedMember) => {
            refetch();
            setSelectedMember(null);
          }}
        />
      )}

      {/* Remove Member Confirmation */}
      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={() => setMemberToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Remove Member
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{' '}
              <strong>{memberToRemove?.user?.name}</strong> from this workspace?
              This action cannot be undone and they will lose access to all
              workspace content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              disabled={isRemoving}
              className="bg-red-600 hover:bg-red-700"
            >
              {isRemoving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                'Remove Member'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserList;
