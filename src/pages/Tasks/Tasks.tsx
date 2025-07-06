import TodoContainer from '@/components/todo/TodoContainer';
import TodoFilter from '@/components/todo/TodoFilter';
import { TodoForm } from '@/components/todo/TodoForm';

export default function Tasks() {
  return (
    <div className="min-h-screen bg-background/15 p-4 md:p-6 lg:p-8 shadow-2xl">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          My Tasks
        </h1>
        <TodoForm />
        <TodoFilter />
        <TodoContainer />
      </div>
    </div>
  );
}
