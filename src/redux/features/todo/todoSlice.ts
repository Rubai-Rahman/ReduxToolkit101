import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TTodo = {
  title: string;
  description: string;
  isCompleted: boolean;
};
type TinitialState = {
  todos: TTodo[];
};
const initialState: TinitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
  },
});

export default todoSlice.reducer;
