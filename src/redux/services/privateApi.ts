// redux/services/privateApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks/baseQueryWithReauth";

export const privateApi = createApi({
  reducerPath: "privateApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/user/profile",
    }),
  }),
});

export const { useGetProfileQuery } = privateApi;
