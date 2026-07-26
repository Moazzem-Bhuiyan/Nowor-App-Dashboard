import { baseApi } from './baseApi';

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatsData: builder.query({
      query: () => ({
        url: `/admin/dashboard/stats`,
        method: 'GET',
      }),
    }),
    getuserActivity : builder.query({
      query: ({currentYear}) => ({
        url: `/admin/dashboard/user-activity?year=${currentYear}`,
        method: 'GET',
      }),
    }),
    getEarningActivity : builder.query({
      query: ({currentYear}) => ({
        url: `/admin/dashboard/earnings?year=${currentYear}`,
        method: 'GET',
      }),
    })
  }),
});

export const { useGetDashboardStatsDataQuery, useGetuserActivityQuery, useGetEarningActivityQuery } = dashBoardApi;
