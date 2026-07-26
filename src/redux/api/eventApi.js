import { baseApi } from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query({
      query: ({ page, limit, searchTerm }) => ({ url: `/admin/events?page=${page}&limit=${limit}&searchTerm=${searchTerm}`, method: "GET" }),
      providesTags: ["event"],
    }),
    getEventById: build.query({
      query: ({ id }) => ({ url: `/events/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "event", id }],
    }),
    updateEvent: build.mutation({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} = eventApi;