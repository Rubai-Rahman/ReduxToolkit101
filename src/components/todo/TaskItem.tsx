
import { ClipboardPenLine, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const TaskItem = () => {
  return (
    <div className="flex justify-between items-center gap-x-3 gap-4 p-4 shadow-sm rounded-2xl">
      <Checkbox />
      <span className="">Task Name</span>
      <span className="">Task Description </span>
      <Badge variant="destructive">Due: Tomorrow</Badge>
      <div className="space-x-4">
        <Button variant="ghost">
          <ClipboardPenLine className="text-primary" />
        </Button>
        <Button variant="ghost">
          <Trash2 className="text-destructive" />
        </Button>
      </div>
    </div>
  );
};
  

export default TaskItem;
