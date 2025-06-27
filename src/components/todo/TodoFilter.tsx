import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TodoFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">High</SelectItem>
          <SelectItem value="banana">Medium</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TodoFilter;
