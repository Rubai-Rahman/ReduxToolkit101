import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import todoReducer from './features/todo/todoSlice';
import workspaceReducer from './features/workspace/workspaceSlice';
import { authSlice } from './api/apiSlice';
import { workspaceApi } from './api/workspaceApi';
import { teamApi } from './api/teamApi';
import { taskApi } from './api/taskApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    workspace: workspaceReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      workspaceApi.middleware,
      teamApi.middleware,
      taskApi.middleware
    ),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
