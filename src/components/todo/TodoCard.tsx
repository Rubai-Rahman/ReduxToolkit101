import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

const TodoCard = () => {
  return (
    <Card className="flex items-center justify-between p-4 shadow-sm rounded-2xl bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <Checkbox />
        <span className="text-lg font-medium">Finish Redux Slice</span>
      </div>
      <Badge variant="destructive">Due: Tomorrow</Badge>
    </Card>
  );
};

export default TodoCard;
