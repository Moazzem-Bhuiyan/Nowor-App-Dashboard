import { baseApi } from "./baseApi";

const interestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterests: builder.query({
      query: () => ({
        url: "/admin/interest",
        method: "GET",
      }),
      providesTags: ["interest"],
    }),
    addInterest: builder.mutation({
      query: (data) => ({
        url: "/admin/interest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["interest"],
    }),
    deleteInterest: builder.mutation({
      query: (id) => ({
        url: `/admin/interest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["interest"],
    }),
    updateInterest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/interest/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["interest"],
    }),
  }),
});

export const {
  useGetAllInterestsQuery,
  useAddInterestMutation,
  useDeleteInterestMutation,
  useUpdateInterestMutation,
} = interestApi;
