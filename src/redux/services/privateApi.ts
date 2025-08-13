// redux/services/privateApi.ts
import { TaskData } from "@/model/task";
import { UserProfile } from "@/model/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks/baseQueryWithReauth";

export const privateApi = createApi({
  reducerPath: "privateApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/user",
    }),
    getAllTask: builder.query<TaskData, void>({
      query: () => "/task/get-tasks",
    }),
  }),
});

export const { useGetProfileQuery, useGetAllTaskQuery } = privateApi;
