import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (build) => ({
    getUsers: build.query<any, void>({
      query: () => '/users',
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
