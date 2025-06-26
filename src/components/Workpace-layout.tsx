'use client';

import type React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  CheckCircle,
  Home,
  Inbox,
  Users,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronDown,
  Building2,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { useSelector } from 'react-redux';
// import type { RootState } from '../store/store';
// import { useGetMyTasksQuery } from '../store/api/taskApi';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const { user, logout } = useAuth0();
  const currentWorkspace = useSelector(
    (state: RootState) => state.workspace.currentWorkspace
  );
  const { data: myTasks = [] } = useGetMyTasksQuery();

  const unreadTasksCount = myTasks.filter(
    (task) => task.status === 'todo' && task.assigneeId === user?.sub
  ).length;

  const navigation = [
    {
      title: 'Overview',
      items: [
        {
          title: 'Home',
          url: `/workspace/${currentWorkspace?.slug}`,
          icon: Home,
        },
        {
          title: 'Inbox',
          url: `/workspace/${currentWorkspace?.slug}/inbox`,
          icon: Inbox,
          badge: unreadTasksCount,
        },
        {
          title: 'My Tasks',
          url: `/workspace/${currentWorkspace?.slug}/my-tasks`,
          icon: CheckCircle,
        },
      ],
    },
    {
      title: 'Workspace',
      items: [
        {
          title: 'Projects',
          url: `/workspace/${currentWorkspace?.slug}/projects`,
          icon: BarChart3,
        },
        {
          title: 'Team',
          url: `/workspace/${currentWorkspace?.slug}/team`,
          icon: Users,
        },
        {
          title: 'Calendar',
          url: `/workspace/${currentWorkspace?.slug}/calendar`,
          icon: Calendar,
        },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r border-border/50">
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-2 py-1">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b6b] via-[var(--color-primary-start)] to-[var(--color-primary-end)] rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto"
                    >
                      <div className="text-left min-w-0 flex-1">
                        <div className="font-semibold text-sm truncate">
                          {currentWorkspace?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Workspace
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    <DropdownMenuItem
                      onClick={() =>
                        (window.location.href = '/workspace-selector')
                      }
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Switch Workspace
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Workspace Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Workspace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search */}
            <div className="px-2 py-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks, projects..."
                  className="pl-8 h-8 bg-muted/50 border-border/50"
                />
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {navigation.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url} className="flex items-center">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.badge && item.badge > 0 && (
                              <Badge
                                variant="secondary"
                                className="ml-auto h-5 px-1.5 text-xs bg-gradient-to-r from-[#ff6b6b] to-[var(--color-primary-start)] text-white"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <div className="flex items-center space-x-2">
                        {user?.picture ? (
                          <img
                            src={user.picture || '/placeholder.svg'}
                            alt={user.name}
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-br from-[#4ecdc4] to-[#6ee7d7] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 text-left min-w-0">
                          <div className="text-sm font-medium truncate">
                            {user?.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="end" className="w-64">
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button className="bg-gradient-to-r from-[#ff6b6b] to-[var(--color-primary-start)] hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)]">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
