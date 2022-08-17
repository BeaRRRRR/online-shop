import { Product } from '../types/product';
import { emptySplitApi } from './api';

export const productApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: `product`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Products', _id } as const)),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
     }),
    buyProductById: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `product/${id}/buy`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }, { type: 'User' }],
    })
  }),
});

export const { useGetAllProductsQuery, useBuyProductByIdMutation } = productApi;
