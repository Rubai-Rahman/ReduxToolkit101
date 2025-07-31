import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  UserPlus,
  Settings,
  Shield,
  Mail,
  Activity,
} from 'lucide-react';
import { UserList } from '@/components/users/UserList';
import { UserInvitation } from '@/components/users/UserInvitation';
import { AdminOnly } from '@/components/permissions/PermissionRenderer';
import { UserManagementGuard } from '@/components/guards';

const UserManagement: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('members');

  const handleUserInvited = (email: string, role: string) => {
    console.log(`User ${email} invited with role ${role}`);
    // Optionally refresh the member list or show a success message
  };

  return (
    <UserManagementGuard>
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage members, roles, and permissions for{' '}
              {currentWorkspace?.name}
            </p>
          </div>

          <AdminOnly>
            <Button onClick={() => setShowInviteDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </AdminOnly>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <AdminOnly>
              <TabsTrigger
                value="invitations"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Invitations
              </TabsTrigger>
            </AdminOnly>
            <AdminOnly>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Roles & Permissions
              </TabsTrigger>
            </AdminOnly>
            <AdminOnly>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity Log
              </TabsTrigger>
            </AdminOnly>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <UserList
              showInviteButton={false}
              onInviteUser={() => setShowInviteDialog(true)}
            />
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invitations" className="space-y-4">
            <AdminOnly>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Pending Invitations
                  </CardTitle>
                  <CardDescription>
                    Manage pending invitations to your workspace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No pending invitations</p>
                    <p className="text-sm">
                      Invited users will appear here until they accept
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AdminOnly>
          </TabsContent>

          {/* Roles & Permissions Tab */}
          <TabsContent value="roles" className="space-y-4">
            <AdminOnly>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Member Role */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Shield className="h-5 w-5" />
                      Member
                    </CardTitle>
                    <CardDescription>Basic workspace access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• View workspace content</li>
                      <li>• Manage own tasks</li>
                      <li>• View team information</li>
                      <li>• Comment on tasks</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Supervisor Role */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Shield className="h-5 w-5" />
                      Supervisor
                    </CardTitle>
                    <CardDescription>Team and task management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• All member permissions</li>
                      <li>• Manage all tasks</li>
                      <li>• Create and manage teams</li>
                      <li>• Invite new members</li>
                      <li>• Assign tasks to others</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Admin Role */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <Shield className="h-5 w-5" />
                      Administrator
                    </CardTitle>
                    <CardDescription>Full workspace control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• All supervisor permissions</li>
                      <li>• Manage user roles</li>
                      <li>• Remove members</li>
                      <li>• Workspace settings</li>
                      <li>• Delete workspace</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AdminOnly>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-4">
            <AdminOnly>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    User Activity Log
                  </CardTitle>
                  <CardDescription>
                    Track user actions and role changes in your workspace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No activity to show</p>
                    <p className="text-sm">
                      User actions and role changes will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AdminOnly>
          </TabsContent>
        </Tabs>

        {/* User Invitation Dialog */}
        <UserInvitation
          isOpen={showInviteDialog}
          onOpenChange={setShowInviteDialog}
          onUserInvited={handleUserInvited}
        />
      </div>
    </UserManagementGuard>
  );
};

export default UserManagement;
