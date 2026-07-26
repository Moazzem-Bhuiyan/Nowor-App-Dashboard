import { baseApi } from "./baseApi";

const LegalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    updatePrivacy : builder.mutation({
      query: (data) => ({
        url: "/admin/privacy-policy",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),

    getTerms: builder.query({
      query: () => ({
        url: "/terms-and-condition",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),
    updateTerms : builder.mutation({
      query: (data) => ({
        url: "/admin/terms-and-condition",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),
    getlegalAbout : builder.query({
      query: () => ({
        url: "/about-us",
        method: "GET",
      }),
      providesTags: ["legalAbout"],
    }),
    updatelegalAbout : builder.mutation({
      query: (data) => ({
        url: "/admin/about-us",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["legalAbout"],
    })
  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation, useGetTermsQuery, useUpdateTermsMutation, useGetlegalAboutQuery, useUpdatelegalAboutMutation } = LegalApi;