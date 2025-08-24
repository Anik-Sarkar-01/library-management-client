import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-server-six-amber.vercel.app/api' }),
    tagTypes: ['Books', 'Borrows'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: ['Books']
        }),
        getBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Books']
        }),
        updateBook: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Books']
        }),
        addBook: builder.mutation({
            query: (body) => ({
                url: '/books',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Books']
        }),
        borrowBook: builder.mutation({
            query: (body) => ({
                url: `/borrow`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Books', 'Borrows']
        }),
        getBorrowSummary: builder.query({
            query: () => '/borrow',
            providesTags: ['Borrows']
        }),
    }),
})

export const { useGetBooksQuery, useGetBookQuery, useUpdateBookMutation, useAddBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowSummaryQuery } = baseApi;