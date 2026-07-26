import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllusers: builder.query({
      query: ({page,limit,searchTerm}) => ({
        url: `/admin/users?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: ({id}) => ({ url: `/admin/users/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "user", id }],
    }),
    blockUnblockUser: builder.mutation({
      query: ({id,body}) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: body,
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
