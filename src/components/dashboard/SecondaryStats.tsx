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
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-2">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-xl font-semibold">{stats.teamMembers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-indigo-100 p-2">
              <FolderOpen className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Active Projects
              </p>
              <p className="text-xl font-semibold">
                {stats.activeProjects}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Productivity</p>
              <p className="text-xl font-semibold">{stats.productivity}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2">
              <Zap className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <p className="text-xl font-semibold">{stats.streak}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
