import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';
import { teamActivity } from '@/data/dashboardData';
import { getActivityIcon } from '@/lib/dashboardUtils';

export function TeamActivity() {
  return (
    <div>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Activity
          </CardTitle>
          <CardDescription>
            Recent team updates and actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamActivity.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-full bg-gradient-to-r ${activity.user.color} p-2`}
                >
                  <span className="text-xs font-medium text-white">
                    {activity.user.initials}
                  </span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    <p className="text-sm">
                      <span className="font-medium">
                        {activity.user.name}
                      </span>{' '}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{' '}
                      <span className="font-medium">
                        {activity.target}
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
              {index < teamActivity.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
