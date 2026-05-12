import { baseApi } from "./baseApi";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
      providesTags: ["admins"],
    }),
    // upload admin image --
    uploadAdminImage: builder.mutation({
      query: (data) => ({
        url: "/admin/profile/avatar",
        method: "POST",
        body: data,
      }),
    }),
    // update admin info --
    updateAdminInfo: builder.mutation({
      query: (data) => ({
        url: "/admin/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admins"],
    }),
    // change Admin Password
    changeAdminPass: builder.mutation({
      query: (data) => ({
        url: "/admin/profile/password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAdminQuery,
  useUploadAdminImageMutation,
  useUpdateAdminInfoMutation,
  useChangeAdminPassMutation,
} = AdminApi;
