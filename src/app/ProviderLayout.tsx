"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
