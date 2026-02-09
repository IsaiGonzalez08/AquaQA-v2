"use client";

import { Provider } from "react-redux";
import { store } from "shared/store/store";
import { ThemeProvider } from "shared/contexts/ThemeContext";
import { ToastProvider } from "@/components/toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}
