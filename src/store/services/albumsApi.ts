import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Album = {
  userId: number;
  id: number;
  title: string;
};

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
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
    }),
  }),
});

export const { useGetAlbumsQuery } = albumsApi;
