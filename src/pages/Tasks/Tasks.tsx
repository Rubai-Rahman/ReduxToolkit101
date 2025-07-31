import { useSelector } from 'react-redux';
import TodoContainer from '@/components/todo/TodoContainer';
import TodoFilter from '@/components/todo/TodoFilter';
import { TodoForm } from '@/components/todo/TodoForm';
import { selectTodoStats } from '@/redux/features/todo/todoSlice';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function Tasks() {
  const stats = useSelector(selectTodoStats);

  return (
    <div className="min-h-screen bg-background/15 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              My Tasks
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your daily tasks
            </p>
          </div>
          <TodoForm />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">{stats.highPriority}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-card rounded-lg p-6 border">
          <TodoFilter />
        </div>

        {/* Tasks Container */}
        <div className="bg-card rounded-lg p-6 border">
          <TodoContainer />
        </div>
      </div>
    </div>
  );
}
