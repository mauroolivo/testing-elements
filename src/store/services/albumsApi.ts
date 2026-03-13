import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Album = {
  userId: number;
  id: number;
  title: string;
};

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  tagTypes: ['Albums'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    fetchFn: (...args) => {
      if (!globalThis.fetch) {
        throw new Error('fetch is not available in this environment');
      }

      return globalThis.fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], void>({
      query: () => '/albums',
      providesTags: (result) =>
        result
          ? [
              { type: 'Albums' as const, id: 'LIST' },
              ...result.map((a) => ({ type: 'Albums' as const, id: a.id })),
            ]
          : [{ type: 'Albums' as const, id: 'LIST' }],
    }),
    addAlbum: builder.mutation<Album, Partial<Album>>({
      query: (body) => ({ url: '/albums', method: 'POST', body }),
      invalidatesTags: [{ type: 'Albums', id: 'LIST' }],
    }),
  }),
});

export const { useGetAlbumsQuery } = albumsApi;
export const { useAddAlbumMutation } = albumsApi;
