'use client';

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, ArrowRight, Building2, CheckCircle } from 'lucide-react';

// 🧪 MOCK DATA
const mockWorkspaces = [
  {
    id: '1',
    name: 'Marketing Team',
    description: 'Collaborate on campaigns',
    slug: 'marketing-team',
    members: [
      { id: 'u1', user: { name: 'Alice' } },
      { id: 'u2', user: { name: 'Bob' } },
      { id: 'u3', user: { name: 'Charlie' } },
    ],
  },
  {
    id: '2',
    name: 'Dev Team',
    description: 'Frontend and Backend synergy',
    slug: 'dev-team',
    members: [
      { id: 'u4', user: { name: 'David' } },
      { id: 'u5', user: { name: 'Eva' } },
    ],
  },
];

export default function WorkspaceSelector() {
  const { user, logout } = useAuth0();

  // 👉 local mocks instead of RTK Query
  const [workspaces, setWorkspaces] = useState(mockWorkspaces);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setIsCreating(true);
    setTimeout(() => {
      const newWorkspace = {
        id: Date.now().toString(),
        name: workspaceName,
        description: workspaceDescription,
        slug: workspaceName.toLowerCase().replace(/\s+/g, '-'),
        members: [
          {
            id: 'self',
            user: {
              name: user?.name || 'You',
            },
          },
        ],
      };
      setWorkspaces((prev) => [...prev, newWorkspace]);
      setIsCreateDialogOpen(false);
      setWorkspaceName('');
      setWorkspaceDescription('');
      setIsCreating(false);
      window.location.href = `/workspace/${newWorkspace.slug}`;
    }, 800);
  };

  const handleSelectWorkspace = (workspace) => {
    window.location.href = `/workspace/${workspace.slug}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#ff6b6b]/10 to-[#4ecdc4]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#a8e6cf]/10 to-[#ffd93d]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b6b] via-[var(--color-primary-start)] to-[var(--color-primary-end)] rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6b6b] via-[var(--color-primary-start)] to-[var(--color-primary-end)] bg-clip-text text-transparent">
              taskNest
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {user?.picture && (
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-12 z-10 relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose your{' '}
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[var(--color-primary-end)] bg-clip-text text-transparent">
              workspace
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Select a workspace to continue or create a new one to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl cursor-pointer group"
              onClick={() => handleSelectWorkspace(workspace)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b6b]/20 to-[var(--color-primary-end)]/20 rounded-xl flex items-center justify-center group-hover:from-[#ff6b6b] group-hover:to-[var(--color-primary-start)] transition-all duration-300">
                    <Building2 className="h-6 w-6 text-[#ff6b6b] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {workspace.members.length}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#ff6b6b] group-hover:to-[var(--color-primary-start)] group-hover:bg-clip-text transition-all duration-300">
                  {workspace.name}
                </CardTitle>
                {workspace.description && (
                  <CardDescription className="text-sm">
                    {workspace.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {workspace.members.slice(0, 3).map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ecdc4] to-[#6ee7d7] text-white text-xs font-semibold flex items-center justify-center border-2 border-background"
                      >
                        {member.user.name[0].toUpperCase()}
                      </div>
                    ))}
                    {workspace.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground text-xs font-semibold flex items-center justify-center border-2 border-background">
                        +{workspace.members.length - 3}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#ff6b6b] transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Workspace */}
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Card className="border-2 border-dashed border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl cursor-pointer group hover:border-[#ff6b6b]/30">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b6b]/20 to-[var(--color-primary-end)]/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#ff6b6b] group-hover:to-[var(--color-primary-start)] transition-all duration-300">
                    <Plus className="h-6 w-6 text-[#ff6b6b] group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#ff6b6b] group-hover:to-[var(--color-primary-start)] group-hover:bg-clip-text transition-all duration-300">
                    Create New Workspace
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start a new workspace for your team
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
                <DialogDescription>
                  Create a new workspace to organize your projects and
                  collaborate with your team.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateWorkspace} className="space-y-4">
                <div>
                  <Label htmlFor="name">Workspace Name</Label>
                  <Input
                    id="name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="My Awesome Team"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={workspaceDescription}
                    onChange={(e) => setWorkspaceDescription(e.target.value)}
                    placeholder="Describe what this workspace is for..."
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ff6b6b] to-[var(--color-primary-start)]"
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Workspace'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
