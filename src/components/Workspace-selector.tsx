'use client';

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
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
import { Plus, Users, ArrowRight, Building2 } from 'lucide-react';

// --- MOCK DATA & TYPES ---
// In a real app, this would come from an API and types would be shared.
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

interface Workspace {
  id: string;
  name: string;
  description: string;
  slug: string;
  members: { id: string; user: { name: string } }[];
}

// --- SUB-COMPONENTS ---

interface WorkspaceCardProps {
  workspace: Workspace;
  onSelect: (workspace: Workspace) => void;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  workspace,
  onSelect,
}) => (
  <Card
    className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl cursor-pointer group"
    onClick={() => onSelect(workspace)}
  >
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-xl flex items-center justify-center group-hover:from-[var(--primary-start)] group-hover:to-[var(--primary-end)] transition-all duration-300">
          <Building2 className="h-6 w-6 text-[var(--primary-start)] group-hover:text-white transition-colors duration-300" />
        </div>
        <Badge variant="secondary" className="text-xs">
          <Users className="h-3 w-3 mr-1" />
          {workspace.members.length}
        </Badge>
      </div>
      <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--primary-start)] group-hover:to-[var(--primary-end)] group-hover:bg-clip-text transition-all duration-300">
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
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--secondary-start)] to-[var(--secondary-end)] text-white text-xs font-semibold flex items-center justify-center border-2 border-background"
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
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--primary-start)] transition-colors duration-300" />
      </div>
    </CardContent>
  </Card>
);

const CreateWorkspaceTrigger: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <Card
    onClick={onClick}
    className="border-2 border-dashed border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl cursor-pointer group hover:border-[var(--primary-start)]/30"
  >
    <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--primary-start)] group-hover:to-[var(--primary-end)] transition-all duration-300">
        <Plus className="h-6 w-6 text-[var(--primary-start)] group-hover:text-white" />
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--primary-start)] group-hover:to-[var(--primary-end)] group-hover:bg-clip-text transition-all duration-300">
        Create New Workspace
      </h3>
      <p className="text-sm text-muted-foreground">
        Start a new workspace for your team
      </p>
    </CardContent>
  </Card>
);

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isCreating: boolean;
  onCreateWorkspace: (name: string, description: string) => void;
}

const CreateWorkspaceDialog: React.FC<CreateWorkspaceDialogProps> = ({
  isOpen,
  onOpenChange,
  isCreating,
  onCreateWorkspace,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateWorkspace(name, description);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <CreateWorkspaceTrigger onClick={() => onOpenChange(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects and collaborate
            with your team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Workspace Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Team"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this workspace is for..."
              rows={3}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]"
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Workspace'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- MAIN COMPONENT ---

export default function WorkspaceSelector() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkspace = (name: string, description: string) => {
    if (!name.trim()) return;

    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      const newWorkspace: Workspace = {
        id: Date.now().toString(),
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        members: [{ id: 'self', user: { name: user?.name || 'You' } }],
      };
      setWorkspaces((prev) => [...prev, newWorkspace]);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
      navigate(`/workspace/${newWorkspace.slug}`);
    }, 800);
  };

  const handleSelectWorkspace = (workspace: Workspace) => {
    navigate(`/workspace/${workspace.slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden">
      {/* Background Effects using CSS variables */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--primary-start)]/10 to-[var(--secondary-start)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--accent-glow-start)]/10 to-[var(--accent-glow-end)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="container mx-auto px-4 py-12 z-10 relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose your{' '}
            <span className="bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] bg-clip-text text-transparent">
              workspace
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Select a workspace to continue or create a new one to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onSelect={handleSelectWorkspace}
            />
          ))}

          <CreateWorkspaceDialog
            isOpen={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            isCreating={isCreating}
            onCreateWorkspace={handleCreateWorkspace}
          />
        </div>
      </main>
    </div>
  );
}
