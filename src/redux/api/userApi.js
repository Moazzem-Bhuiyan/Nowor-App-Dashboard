import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllusers: builder.query({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => ({ url: `/teachers/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "user", id }],
    }),
    blockUnblockUser: builder.mutation({
      query: (data) => ({
        url: `/users/change-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllusersQuery,
  useBlockUnblockUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useAddcompanyMutation,
} = UserApi;
