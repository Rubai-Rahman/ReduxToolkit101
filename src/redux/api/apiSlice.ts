import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

type TokenFetcher = () => Promise<string | null>;
let tokenFetcher: TokenFetcher = async () => null;
export const setTokenFetcher = (fetcher: TokenFetcher) => {
  tokenFetcher = fetcher;
};

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = await tokenFetcher();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      console.log('token', token);
      return headers;
    },
  });
  return rawBaseQuery(args, api, extraOptions);
};

export const authSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    syncUser: builder.mutation({
      query: (userData) => ({
        url: '/users/sync',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useSyncUserMutation } = authSlice;
