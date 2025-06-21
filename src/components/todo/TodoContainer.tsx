import { Checkbox } from '../ui/checkbox';
import TodoCard from './TodoCard';

const TodoContainer = () => {
  return (
    <div className=" w-full p-5 bg-accent border-primary rounded-md space-y-1.5 border-gradient-primary ">
      <div className="flex justify-between p-4">
        <Checkbox />
        <span className="text-lg font-medium">Task Name</span>
        <span className="text-lg font-medium">Task Description </span>
        <span>Badge</span>
        <div className="space-x-4">
          <span>Edit</span>
          <span>Delete</span>
        </div>
      </div>
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
    </div>
  );
};

export default TodoContainer;
