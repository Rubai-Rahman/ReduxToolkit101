import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowRight,
  Building2,
  Users,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import WorkspaceSelector from '@/components/workspace/WorkspaceSelector';
import WorkspaceCreator from '@/components/workspace/WorkspaceCreator';
import type { CreateWorkspaceResponse } from '@/types/workspace';

// --- SUB-COMPONENTS ---

const WelcomeHeader: React.FC<{ userName?: string }> = ({ userName }) => (
  <div className="text-center mb-8">
    <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-start)]/20 to-[var(--primary-end)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <Building2 className="h-10 w-10 text-[var(--primary-start)]" />
    </div>
    <h1 className="text-4xl font-bold text-foreground mb-4">
      Welcome{userName ? `, ${userName}` : ''}!
    </h1>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
      Let's get you set up with a workspace to start organizing your tasks and
      collaborating with your team.
    </p>
  </div>
);

const LoadingState: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden">
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--primary-start)]/10 to-[var(--secondary-start)]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--accent-glow-start)]/10 to-[var(--accent-glow-end)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <main className="container mx-auto px-4 py-12 z-10 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
          <Skeleton className="w-64 h-10 mx-auto mb-4" />
          <Skeleton className="w-96 h-6 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </div>
    </main>
  </div>
);

const ErrorState: React.FC<{
  error: string;
  onRetry: () => void;
}> = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden flex items-center justify-center">
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--primary-start)]/10 to-[var(--secondary-start)]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--accent-glow-start)]/10 to-[var(--accent-glow-end)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <Card className="max-w-md mx-auto z-10 relative">
      <CardContent className="text-center p-8">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-6">
          {error ||
            'Failed to load your workspace information. Please try again.'}
        </p>
        <Button onClick={onRetry} className="w-full">
          Try Again
        </Button>
      </CardContent>
    </Card>
  </div>
);

const OnboardingSteps: React.FC<{
  currentStep: number;
  totalSteps: number;
}> = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center mb-8">
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              index + 1 <= currentStep
                ? 'bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {index + 1 <= currentStep ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              index + 1
            )}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-8 h-0.5 transition-colors ${
                index + 1 < currentStep
                  ? 'bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]'
                  : 'bg-muted'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const WorkspaceCreationFlow: React.FC<{
  onWorkspaceCreated: (workspace: CreateWorkspaceResponse) => void;
  onBack: () => void;
}> = ({ onWorkspaceCreated, onBack }) => (
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-foreground mb-4">
        Create Your First Workspace
      </h2>
      <p className="text-lg text-muted-foreground">
        A workspace is where you and your team will organize projects, assign
        tasks, and collaborate.
      </p>
    </div>

    <WorkspaceCreator
      variant="card"
      onSuccess={onWorkspaceCreated}
      onCancel={onBack}
      title="Workspace Details"
      description="Give your workspace a name and description to help your team understand its purpose."
    />
  </div>
);

const WorkspaceSelectionFlow: React.FC<{
  onWorkspaceSelected: () => void;
  onCreateNew: () => void;
}> = ({ onWorkspaceSelected, onCreateNew }) => (
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-foreground mb-4">
        Choose Your Workspace
      </h2>
      <p className="text-lg text-muted-foreground">
        Select an existing workspace or create a new one to get started.
      </p>
    </div>

    <WorkspaceSelector />
  </div>
);

const CompletionState: React.FC<{
  workspaceName: string;
  onContinue: () => void;
}> = ({ workspaceName, onContinue }) => (
  <div className="max-w-2xl mx-auto text-center">
    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
    </div>
    <h2 className="text-3xl font-bold text-foreground mb-4">You're All Set!</h2>
    <p className="text-lg text-muted-foreground mb-6">
      Welcome to <strong>{workspaceName}</strong>. You can now start creating
      tasks, inviting team members, and organizing your projects.
    </p>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Card className="text-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Invite Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Collaborate with your team by inviting members to your workspace.
          </p>
        </CardContent>
      </Card>

      <Card className="text-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Create Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Organize your work by creating teams and assigning tasks.
          </p>
        </CardContent>
      </Card>
    </div>

    <Button
      onClick={onContinue}
      size="lg"
      className="bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]"
    >
      Continue to Dashboard
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  </div>
);

// --- MAIN COMPONENT ---

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const {
    userWorkspaces,
    currentWorkspace,
    isLoading,
    error,
    isSyncComplete,
    syncError,
    retrySyncUser,
    switchWorkspace,
  } = useWorkspace();

  const [onboardingStep, setOnboardingStep] = useState<
    'loading' | 'selection' | 'creation' | 'completion'
  >('loading');
  const [createdWorkspace, setCreatedWorkspace] =
    useState<CreateWorkspaceResponse | null>(null);

  // Determine onboarding flow based on user's workspace count
  useEffect(() => {
    if (!isSyncComplete || isLoading) {
      setOnboardingStep('loading');
      return;
    }

    if (syncError || error) {
      return; // Error state will be handled in render
    }

    // If user already has a current workspace, redirect to main app
    if (currentWorkspace) {
      navigate('/home', { replace: true });
      return;
    }

    // If user has workspaces but no current workspace selected
    if (userWorkspaces.length > 0) {
      setOnboardingStep('selection');
    } else {
      // No workspaces, show creation flow
      setOnboardingStep('creation');
    }
  }, [
    isSyncComplete,
    isLoading,
    syncError,
    error,
    currentWorkspace,
    userWorkspaces.length,
    navigate,
  ]);

  // Handle workspace creation
  const handleWorkspaceCreated = async (workspace: CreateWorkspaceResponse) => {
    setCreatedWorkspace(workspace);

    try {
      // Switch to the newly created workspace
      await switchWorkspace(workspace.workspace.id);
      setOnboardingStep('completion');
    } catch (error) {
      console.error('Failed to switch to new workspace:', error);
      // Still show completion, but user might need to manually select
      setOnboardingStep('completion');
    }
  };

  // Handle workspace selection (from existing workspaces)
  const handleWorkspaceSelected = () => {
    // Navigation will be handled by the workspace context
    // Once a workspace is selected, the useEffect will redirect to /home
  };

  // Handle navigation to main app
  const handleContinueToApp = () => {
    navigate('/home', { replace: true });
  };

  // Handle retry for sync errors
  const handleRetry = () => {
    retrySyncUser();
  };

  // Handle going back from creation to selection (if user has workspaces)
  const handleBackToSelection = () => {
    if (userWorkspaces.length > 0) {
      setOnboardingStep('selection');
    }
  };

  // Handle creating new workspace from selection view
  const handleCreateNewFromSelection = () => {
    setOnboardingStep('creation');
  };

  // Show error state
  if ((syncError || error) && !isLoading) {
    return (
      <ErrorState
        error={syncError || error || 'An unexpected error occurred'}
        onRetry={handleRetry}
      />
    );
  }

  // Show loading state
  if (onboardingStep === 'loading') {
    return <LoadingState />;
  }

  // Main onboarding flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--primary-start)]/10 to-[var(--secondary-start)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--accent-glow-start)]/10 to-[var(--accent-glow-end)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="container mx-auto px-4 py-12 z-10 relative">
        {/* Welcome Header */}
        <WelcomeHeader userName={user?.name} />

        {/* Progress Steps */}
        <OnboardingSteps
          currentStep={
            onboardingStep === 'selection' || onboardingStep === 'creation'
              ? 1
              : onboardingStep === 'completion'
                ? 2
                : 1
          }
          totalSteps={2}
        />

        {/* Onboarding Content */}
        {onboardingStep === 'selection' && (
          <WorkspaceSelectionFlow
            onWorkspaceSelected={handleWorkspaceSelected}
            onCreateNew={handleCreateNewFromSelection}
          />
        )}

        {onboardingStep === 'creation' && (
          <WorkspaceCreationFlow
            onWorkspaceCreated={handleWorkspaceCreated}
            onBack={handleBackToSelection}
          />
        )}

        {onboardingStep === 'completion' && (
          <CompletionState
            workspaceName={
              createdWorkspace?.workspace.name ||
              currentWorkspace?.name ||
              'your workspace'
            }
            onContinue={handleContinueToApp}
          />
        )}
      </main>
    </div>
  );
};

export default Onboarding;
