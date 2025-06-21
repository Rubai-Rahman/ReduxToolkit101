import TodoContainer from '@/components/todo/TodoContainer';
import TodoFilter from '@/components/todo/TodoFilter';
import { TodoForm } from '@/components/todo/TodoForm';
import Container from '@/components/ui/Container';

const Home = () => {
  return (
    <Container>
      <h1 className="text-4xl font-semibold flex justify-center">
        My TaskList
      </h1>
      <div className="flex justify-between">
        <TodoForm />
        <TodoFilter />
      </div>
      <TodoContainer />
    </Container>
  );
};

export default Home;
