"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";

function ThemeAwareToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      richColors
      position="top-center"
      theme={theme as "light" | "dark" | "system"}
    />
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <ThemeAwareToaster />
    </NextThemesProvider>
  );
}
