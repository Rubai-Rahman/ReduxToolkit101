import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  MessageSquare,
  Plus,
  UserPlus,
  FileText,
} from 'lucide-react';

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Completed
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge
          variant="default"
          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
        >
          In Progress
        </Badge>
      );
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return (
        <Badge variant="destructive" className="text-xs">
          High
        </Badge>
      );
    case 'medium':
      return (
        <Badge
          variant="default"
          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs"
        >
          Medium
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="secondary" className="text-xs">
          Low
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          {priority}
        </Badge>
      );
  }
};

export const getActivityIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case 'comment':
      return <MessageSquare className="h-4 w-4 text-blue-600" />;
    case 'create':
      return <Plus className="h-4 w-4 text-purple-600" />;
    case 'assign':
      return <UserPlus className="h-4 w-4 text-orange-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};
