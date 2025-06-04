"use client";

import type React from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@meetzen/ui/src/providers/theme-provider";
import { Toaster } from "@meetzen/ui/src/components/sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const AppProviders = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
};
