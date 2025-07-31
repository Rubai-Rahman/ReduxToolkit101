import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ClipboardPenLine, Trash2, Calendar, Tag } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { EditTodoDialog } from './EditTodoDialog';
import {
  toggleTodo,
  deleteTodo,
  type Todo,
} from '@/redux/features/todo/todoSlice';

interface TaskItemProps {
  todo: Todo;
}

const TaskItem = ({ todo }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    setDeleteOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && !todo.isCompleted;
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 shadow-sm rounded-2xl transition-all ${
        todo.isCompleted ? 'opacity-60 bg-muted/50' : 'bg-background'
      }`}
    >
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={handleToggle}
        className="flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium truncate ${
                todo.isCompleted ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {todo.title}
            </h3>
            <p
              className={`text-sm mt-1 line-clamp-2 ${
                todo.isCompleted
                  ? 'line-through text-muted-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {todo.description}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant={getPriorityColor(todo.priority)}
              className="text-xs"
            >
              {todo.priority.toUpperCase()}
            </Badge>

            {todo.dueDate && (
              <Badge
                variant={isOverdue(todo.dueDate) ? 'destructive' : 'outline'}
                className="text-xs flex items-center gap-1"
              >
                <Calendar className="h-3 w-3" />
                {formatDate(todo.dueDate)}
              </Badge>
            )}

            {todo.category && (
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1"
              >
                <Tag className="h-3 w-3" />
                {todo.category}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditOpen(true)}
          className="h-8 w-8 p-0"
        >
          <ClipboardPenLine className="h-4 w-4 text-primary" />
        </Button>

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Task</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{todo.title}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <EditTodoDialog todo={todo} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
};

export default TaskItem;
