import authReducer from "@/redux/features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { privateApi } from "./services/privateApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [privateApi.reducerPath]: privateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(privateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
