import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WorkspaceCreator from '@/components/workspace/WorkspaceCreator';
import type { CreateWorkspaceResponse } from '@/types/workspace';

const WorkspaceCreation: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [createdWorkspaces, setCreatedWorkspaces] = useState<
    CreateWorkspaceResponse[]
  >([]);

  const handleWorkspaceCreated = (workspace: CreateWorkspaceResponse) => {
    setCreatedWorkspaces((prev) => [...prev, workspace]);
    console.log('Workspace created:', workspace);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Workspace Creation Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the WorkspaceCreator component in different
          variants.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Dialog Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog Variant</CardTitle>
            <CardDescription>
              Opens the workspace creator in a modal dialog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowDialog(true)}>
              Open Workspace Creator Dialog
            </Button>

            <WorkspaceCreator
              variant="dialog"
              isOpen={showDialog}
              onOpenChange={setShowDialog}
              onSuccess={handleWorkspaceCreated}
            />
          </CardContent>
        </Card>

        {/* Card Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Card Variant</CardTitle>
            <CardDescription>
              Displays the workspace creator as a standalone card.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkspaceCreator
              variant="card"
              onSuccess={handleWorkspaceCreated}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Inline Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Inline Variant</CardTitle>
            <CardDescription>
              Displays the workspace creator inline without any wrapper.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <WorkspaceCreator
                variant="inline"
                onSuccess={handleWorkspaceCreated}
                title="Quick Workspace Setup"
                description="Create a workspace quickly with minimal UI."
              />
            </div>
          </CardContent>
        </Card>

        {/* Created Workspaces */}
        {createdWorkspaces.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Created Workspaces</CardTitle>
              <CardDescription>
                Workspaces created during this demo session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {createdWorkspaces.map((workspace, index) => (
                  <div
                    key={workspace.workspace.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">
                        {workspace.workspace.name}
                      </h4>
                      {workspace.workspace.description && (
                        <p className="text-sm text-muted-foreground">
                          {workspace.workspace.description}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Role: {workspace.userWorkspace.role}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkspaceCreation;
