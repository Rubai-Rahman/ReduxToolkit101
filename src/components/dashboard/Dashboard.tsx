import { DashboardHeader } from './DashboardHeader';
import { PrimaryStats } from './PrimaryStats';
import { SecondaryStats } from './SecondaryStats';
import { RecentTasks } from './RecentTasks';
import { TeamActivity } from './TeamActivity';
import { ProjectsOverview } from './ProjectsOverview';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background/15 p-4 md:p-6 lg:p-8 shadow-2xl">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardHeader />
        <PrimaryStats />
        <SecondaryStats />
        <div className="grid gap-8 lg:grid-cols-3">
          <RecentTasks />
          <TeamActivity />
        </div>
        <ProjectsOverview />
      </div>
    </div>
  );
}
