import { baseApi } from "./baseApi";

const EventType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventType: builder.query({
      query: () => ({
        url: "/admin/eventType",
        method: "GET",
      }),
      providesTags: ["eventType"],
    }),
    addEventType: builder.mutation({
      query: (data) => ({
        url: "/admin/eventType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["eventType"],
    }),
    deleteEventType: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/eventType/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["eventType"],
    }),
    updateEventType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/eventType/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["eventType"],
    }),
  }),
});

export const {
  useGetAllEventTypeQuery,
  useAddEventTypeMutation,
  useDeleteEventTypeMutation,
  useUpdateEventTypeMutation,
} = EventType;
