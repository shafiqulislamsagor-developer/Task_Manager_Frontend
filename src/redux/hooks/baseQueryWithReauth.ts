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
  credentials: "include", // refreshToken cookie পাঠানোর জন্য
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
        // Refresh token call
        const refreshResult = await baseQuery(
          "/auth/refresh-token",
          api,
          extraOptions
        );
        const data = refreshResult.data as RefreshResponse | undefined;

        if (data?.accessToken) {
          // Cookies + Redux update
          Cookies.set("accessToken", data.accessToken, {
            expires: 0.0104, // 15 min
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          api.dispatch(setToken(data.accessToken));
          // Re-run original query
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
