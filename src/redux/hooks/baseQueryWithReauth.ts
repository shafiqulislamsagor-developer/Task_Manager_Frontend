import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import Cookies from "js-cookie";
import { logout, setToken } from "../features/authSlice";
import type { RootState } from "../store";

interface RefreshResponse {
  accessToken: string;
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken || Cookies.get("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            credentials: "include",
          },
          api,
          extraOptions
        );

        if (refreshResult.error) {
          api.dispatch(logout());
          return refreshResult;
        }

        const data = refreshResult.data as RefreshResponse;
        if (data?.accessToken) {
          Cookies.set("accessToken", data.accessToken, {
            expires: 0.0104,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          api.dispatch(setToken(data.accessToken));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
