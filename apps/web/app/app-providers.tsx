"use client";

import type React from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@meetzen/ui/src/providers/theme-provider";

export const AppProviders = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};
