import TaskItem from "./TaskItem";

const TodoContainer = () => {
  return (
    <div className=" w-full p-5 bg-accent border-primary rounded-md space-y-1.5 border-gradient-primary ">
      <div className="flex justify-between p-4">
        <span className="text-lg font-medium">Status</span>
        <span className="text-lg font-medium">Task Name</span>
        <span className="text-lg font-medium">Task Description </span>
        <span>Completion</span>
        <div className="space-x-4">
          <span>Actions</span>
        </div>
      </div>
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  );
};

export default TodoContainer;
