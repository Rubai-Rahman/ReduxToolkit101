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
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">
                Total Tasks
              </p>
              <p className="text-3xl font-bold text-blue-900">
                {stats.totalTasks}
              </p>
            </div>
            <div className="rounded-full bg-blue-200 p-3">
              <Target className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">
                Completed
              </p>
              <p className="text-3xl font-bold text-green-900">
                {stats.completedTasks}
              </p>
            </div>
            <div className="rounded-full bg-green-200 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">
                In Progress
              </p>
              <p className="text-3xl font-bold text-orange-900">
                {stats.inProgress}
              </p>
            </div>
            <div className="rounded-full bg-orange-200 p-3">
              <Clock className="h-6 w-6 text-orange-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Overdue</p>
              <p className="text-3xl font-bold text-red-900">
                {stats.overdue}
              </p>
            </div>
            <div className="rounded-full bg-red-200 p-3">
              <AlertTriangle className="h-6 w-6 text-red-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
