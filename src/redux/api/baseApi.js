import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // access token expire hole
  if (result?.error?.status === 401) {
    // refresh token diye new access token nibe
    const refreshResult = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const refreshData = await refreshResult.json();

    // refresh success hole previous request abar hit korbe
    if (refreshData?.success) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh fail hole logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "user",
    "admins",
    "notification",
    "company",
    "workers",
    "eventType",
  ],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
