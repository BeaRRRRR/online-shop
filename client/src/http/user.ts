import { Product } from '../types/product';
import { emptySplitApi } from './api';

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<Product[], string>({
      query: (id: string) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'User' }],
     }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
