import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FolderOpen, Calendar, Clock, FileText } from 'lucide-react';
import { recentTasks } from '@/data/dashboardData';
import { getStatusBadge, getPriorityBadge } from '@/lib/dashboardUtils';

export function RecentTasks() {
  return (
    <div className="lg:col-span-2">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Tasks
          </CardTitle>
          <CardDescription>
            Your latest task updates and progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium leading-none">{task.title}</h4>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FolderOpen className="h-3 w-3" />
                      {task.project}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.timeSpent}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} className="flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {task.progress}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(task.status)}
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={task.assignee.avatar || '/placeholder.svg'}
                      alt={task.assignee.name}
                    />
                    <AvatarFallback className="text-xs">
                      {task.assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
