import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FolderOpen, Calendar } from 'lucide-react';
import { projects } from '@/data/dashboardData';

export function ProjectsOverview() {
  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FolderOpen className="h-5 w-5 text-primary" />
          Active Projects
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Overview of your current projects and their progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`rounded-xl stat-card p-6 border`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <Badge
                      variant={
                        project.status === 'on-track' ? 'secondary' : 'destructive'
                      }
                      className="mt-2"
                    >
                      {project.status === 'on-track' ? 'On Track' : 'At Risk'}
                    </Badge>
                  </div>
                  <div
                    className={`rounded-full bg-gradient-to-r from-primary-start to-primary-end p-2`}
                  >
                    <FolderOpen className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tasks</p>
                    <p className="font-medium text-foreground">
                      {project.completedTasks}/{project.totalTasks}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Members</p>
                    <p className="font-medium text-foreground">
                      {project.members}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Due {project.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
