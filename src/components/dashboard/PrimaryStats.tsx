import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { stats } from '@/data/dashboardData';

export function PrimaryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tasks
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalTasks}
                  </p>
                </div>
                <div className="rounded-full bg-chart-1/20 p-3">
                  <Target className="h-6 w-6 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.completedTasks}
                  </p>
                </div>
                <div className="rounded-full bg-chart-2/20 p-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.inProgress}
                  </p>
                </div>
                <div className="rounded-full bg-chart-3/20 p-3">
                  <Clock className="h-6 w-6 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.overdue}
                  </p>
                </div>
                <div className="rounded-full bg-chart-4/20 p-3">
                  <AlertTriangle className="h-6 w-6 text-chart-4" />
                </div>
              </div>
            </CardContent>
          </Card>
    </div>
  );
}
