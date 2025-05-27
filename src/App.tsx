import { decrement, increment } from '@/redux/features/counter/counterSlice';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import Home from '@/pages/Home/Home';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex items-center justify-center bg-red-600">
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span className="font-semibold text-8xl">{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
      <Home />
    </>
  );
}

export default App;
