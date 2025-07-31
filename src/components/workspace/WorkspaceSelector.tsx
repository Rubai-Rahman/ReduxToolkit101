import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Users,
  ArrowRight,
  Building2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  selectUserWorkspaces,
  selectWorkspaceLoading,
  selectWorkspaceSwitching,
  selectWorkspaceError,
} from '@/redux/features/workspace/workspaceSlice';
import { useCreateWorkspaceMutation } from '@/redux/api/apiSlice';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { UserWorkspace, CreateWorkspaceRequest } from '@/types/workspace';

// --- SUB-COMPONENTS ---

interface WorkspaceCardProps {
  userWorkspace: UserWorkspace;
  onSelect: (workspaceId: string) => void;
  isLoading?: boolean;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  userWorkspace,
  onSelect,
  isLoading = false,
}) => {
  const { workspace } = userWorkspace;

  if (!workspace) return null;

  return (
    <Card
      className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl cursor-pointer group"
      onClick={() => !isLoading && onSelect(workspace.id)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-xl flex items-center justify-center group-hover:from-[var(--primary-start)] group-hover:to-[var(--primary-end)] transition-all duration-300">
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-[var(--primary-start)]" />
            ) : (
              <Building2 className="h-6 w-6 text-[var(--primary-start)] group-hover:text-white transition-colors duration-300" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs capitalize">
              {userWorkspace.role}
            </Badge>
          </div>
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
          <div className="text-sm text-muted-foreground">
            Joined {new Date(userWorkspace.joinedAt).toLocaleDateString()}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--primary-start)] transition-colors duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

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

const WorkspaceCardSkeleton: React.FC = () => (
  <Card className="border border-border/50 shadow-xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl">
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-4 h-4" />
      </div>
    </CardContent>
  </Card>
);

const EmptyWorkspaceState: React.FC<{ onCreateWorkspace: () => void }> = ({
  onCreateWorkspace,
}) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-full flex items-center justify-center mb-6">
      <Building2 className="h-12 w-12 text-[var(--primary-start)]" />
    </div>
    <h3 className="text-2xl font-semibold mb-2">No workspaces yet</h3>
    <p className="text-muted-foreground mb-6 max-w-md">
      You haven't joined any workspaces yet. Create your first workspace to get
      started with organizing your tasks and collaborating with your team.
    </p>
    <Button
      onClick={onCreateWorkspace}
      className="bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]"
    >
      <Plus className="h-4 w-4 mr-2" />
      Create Your First Workspace
    </Button>
  </div>
);

const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({
  error,
  onRetry,
}) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-2xl font-semibold mb-2">Something went wrong</h3>
    <p className="text-muted-foreground mb-6 max-w-md">
      {error || 'Failed to load workspaces. Please try again.'}
    </p>
    <Button onClick={onRetry} variant="outline">
      Try Again
    </Button>
  </div>
);

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateWorkspace: (data: CreateWorkspaceRequest) => void;
}

const CreateWorkspaceDialog: React.FC<CreateWorkspaceDialogProps> = ({
  isOpen,
  onOpenChange,
  onCreateWorkspace,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createWorkspace, { isLoading: isCreating }] =
    useCreateWorkspaceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createWorkspace({
        name: name.trim(),
        description: description.trim() || undefined,
      }).unwrap();
      onCreateWorkspace({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      setName('');
      setDescription('');
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              disabled={isCreating}
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
              disabled={isCreating}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]"
              disabled={isCreating || !name.trim()}
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Workspace'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- MAIN COMPONENT ---

export default function WorkspaceSelector() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [switchingWorkspaceId, setSwitchingWorkspaceId] = useState<
    string | null
  >(null);

  // Redux selectors
  const userWorkspaces = useSelector(selectUserWorkspaces);
  const isLoading = useSelector(selectWorkspaceLoading);
  const isSwitching = useSelector(selectWorkspaceSwitching);
  const error = useSelector(selectWorkspaceError);

  // Workspace context
  const { switchWorkspace, retrySyncUser } = useWorkspace();

  const handleSelectWorkspace = async (workspaceId: string) => {
    try {
      setSwitchingWorkspaceId(workspaceId);
      await switchWorkspace(workspaceId);
      // Navigation will be handled by the workspace context/routing logic
    } catch (error) {
      console.error('Failed to switch workspace:', error);
    } finally {
      setSwitchingWorkspaceId(null);
    }
  };

  const handleCreateWorkspace = (data: CreateWorkspaceRequest) => {
    // Workspace creation is handled in the dialog component
    // The new workspace will appear in the list automatically via Redux
  };

  const handleRetry = () => {
    retrySyncUser();
  };

  // Show error state if there's an error
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden mt-10">
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
            <ErrorState error={error} onRetry={handleRetry} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden mt-10">
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
          {/* Loading state */}
          {isLoading && (
            <>
              <WorkspaceCardSkeleton />
              <WorkspaceCardSkeleton />
              <WorkspaceCardSkeleton />
            </>
          )}

          {/* Empty state */}
          {!isLoading && userWorkspaces.length === 0 && (
            <EmptyWorkspaceState
              onCreateWorkspace={() => setIsCreateDialogOpen(true)}
            />
          )}

          {/* Workspace cards */}
          {!isLoading && userWorkspaces.length > 0 && (
            <>
              {userWorkspaces.map((userWorkspace) => (
                <WorkspaceCard
                  key={userWorkspace.id}
                  userWorkspace={userWorkspace}
                  onSelect={handleSelectWorkspace}
                  isLoading={switchingWorkspaceId === userWorkspace.workspaceId}
                />
              ))}

              {/* Create workspace trigger */}
              <CreateWorkspaceTrigger
                onClick={() => setIsCreateDialogOpen(true)}
              />
            </>
          )}
        </div>

        {/* Create workspace dialog */}
        <CreateWorkspaceDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateWorkspace={handleCreateWorkspace}
        />
      </main>
    </div>
  );
}
