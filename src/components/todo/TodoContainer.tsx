import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectFilteredTodos } from '@/redux/features/todo/todoSlice';
import { CheckCircle2, Clock } from 'lucide-react';

const TodoContainer = () => {
  const filteredTodos = useSelector(selectFilteredTodos);

  if (filteredTodos.length === 0) {
    return (
      <div className="w-full p-8 bg-accent border-primary rounded-md border-gradient-primary">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted-foreground">
              No tasks found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first task to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Group todos by completion status for better organization
  const completedTodos = filteredTodos.filter((todo) => todo.isCompleted);
  const pendingTodos = filteredTodos.filter((todo) => !todo.isCompleted);

  return (
    <div className="w-full space-y-6">
      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium">
              Pending Tasks ({pendingTodos.length})
            </h3>
          </div>
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <TaskItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">
              Completed Tasks ({completedTodos.length})
            </h3>
          </div>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TaskItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoContainer;
