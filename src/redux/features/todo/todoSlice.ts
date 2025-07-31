import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
}

export type TodoFilter = 'all' | 'completed' | 'pending';
export type PriorityFilter = 'all' | 'high' | 'medium' | 'low';

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  priorityFilter: PriorityFilter;
  searchQuery: string;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  priorityFilter: 'all',
  searchQuery: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<
        Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>
      >
    ) => {
      const newTodo: Todo = {
        ...action.payload,
        id: crypto.randomUUID(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        todo.updatedAt = new Date().toISOString();
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<Omit<Todo, 'id' | 'createdAt'>>;
      }>
    ) => {
      const { id, updates } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        Object.assign(todo, updates, { updatedAt: new Date().toISOString() });
      }
    },

    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },

    setPriorityFilter: (state, action: PayloadAction<PriorityFilter>) => {
      state.priorityFilter = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    },

    reorderTodos: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.todos.splice(fromIndex, 1);
      state.todos.splice(toIndex, 0, removed);
    },
  },
});

// Action creators
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  setPriorityFilter,
  setSearchQuery,
  clearCompleted,
  reorderTodos,
} = todoSlice.actions;

// Selectors
export const selectAllTodos = (state: RootState) => state.todos.todos;
export const selectTodoFilter = (state: RootState) => state.todos.filter;
export const selectPriorityFilter = (state: RootState) =>
  state.todos.priorityFilter;
export const selectSearchQuery = (state: RootState) => state.todos.searchQuery;

export const selectFilteredTodos = (state: RootState) => {
  const todos = selectAllTodos(state);
  const filter = selectTodoFilter(state);
  const priorityFilter = selectPriorityFilter(state);
  const searchQuery = selectSearchQuery(state);

  let filteredTodos = todos;

  // Filter by completion status
  if (filter === 'completed') {
    filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
  } else if (filter === 'pending') {
    filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
  }

  // Filter by priority
  if (priorityFilter !== 'all') {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.priority === priorityFilter
    );
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredTodos = filteredTodos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query) ||
        todo.category?.toLowerCase().includes(query)
    );
  }

  return filteredTodos;
};

export const selectTodoStats = (state: RootState) => {
  const todos = selectAllTodos(state);
  return {
    total: todos.length,
    completed: todos.filter((todo) => todo.isCompleted).length,
    pending: todos.filter((todo) => !todo.isCompleted).length,
    highPriority: todos.filter(
      (todo) => todo.priority === 'high' && !todo.isCompleted
    ).length,
  };
};

export default todoSlice.reducer;
