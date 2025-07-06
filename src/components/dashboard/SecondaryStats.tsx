import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Users,
  FolderOpen,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { stats } from '@/data/dashboardData';

export function SecondaryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="stat-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-chart-5/20 p-2">
              <Users className="h-4 w-4 text-chart-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-xl font-semibold text-foreground">{stats.teamMembers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-chart-1/20 p-2">
              <FolderOpen className="h-4 w-4 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Active Projects
              </p>
              <p className="text-xl font-semibold text-foreground">
                {stats.activeProjects}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-chart-2/20 p-2">
              <TrendingUp className="h-4 w-4 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Productivity</p>
              <p className="text-xl font-semibold text-foreground">{stats.productivity}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-chart-3/20 p-2">
              <Zap className="h-4 w-4 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <p className="text-xl font-semibold text-foreground">{stats.streak}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
