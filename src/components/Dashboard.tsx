'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Plus, Calendar, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="h-full bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your taskNest workspace
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tasks', value: 24, color: 'text-foreground' },
            { label: 'Completed', value: 18, color: 'text-green-600' },
            { label: 'In Progress', value: 4, color: 'text-blue-600' },
            { label: 'Overdue', value: 2, color: 'text-red-600' },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Recent Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Tasks</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      completed: true,
                      title: 'Complete project proposal',
                      due: 'Today',
                    },
                    {
                      completed: false,
                      title: 'Review team feedback',
                      due: 'Tomorrow',
                    },
                    {
                      completed: false,
                      title: 'Update documentation',
                      due: 'Friday',
                    },
                  ].map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-muted"
                    >
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-border rounded-full" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {task.due}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Project Review</span>
                    <span className="text-destructive">Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Meeting</span>
                    <span className="text-orange-600">Tomorrow</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sprint Planning</span>
                    <span className="text-muted-foreground">Friday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Team Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-medium">Sarah</span> completed "Design
                    mockups"
                  </p>
                  <p>
                    <span className="font-medium">Mike</span> added comment to
                    "API Integration"
                  </p>
                  <p>
                    <span className="font-medium">Alex</span> created "Bug
                    fixes" task
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
