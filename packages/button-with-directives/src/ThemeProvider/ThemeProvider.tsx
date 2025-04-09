'use client';

import React, { JSX, useMemo } from "react";
import { Theme } from "@naturacosmeticos/natds-themes";
import { ThemeContextProvider } from "./ThemeContext"; // Import from new context file
// Remove JSS imports: import { JssProvider, ThemeProvider as Provider } from "react-jss";

// Props might change slightly - cssPrefix is removed as it's JSS specific
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: Theme; // Still accepting the theme object directly
  // Add brand/mode props here if you want ThemeProvider to build the theme
}

const ThemeProvider = ({
  children,
  theme, // Receive the pre-built theme object
}: ThemeProviderProps): JSX.Element => {
  // The value provided to the context.
  // useMemo prevents recalculating the context value on every render
  // unless the theme prop actually changes.
  const contextValue = useMemo(
    () => ({
      theme,
      // Add theme switching functions here if implemented in ThemeContext.tsx
    }),
    [theme],
  );

  // Provide the theme to children using the new context provider
  return (
    <ThemeContextProvider value={contextValue}>{children}</ThemeContextProvider>
  );
};

export default ThemeProvider;

// Optional: If you want ThemeProvider to handle building the theme:
/*
import buildTheme, { Brand, ThemeMode } from './buildTheme';

export interface ThemeProviderPropsWithBrand {
  children: React.ReactNode;
  brand?: Brand;
  mode?: ThemeMode;
}

const ThemeProviderWithBrand = ({
  children,
  brand = 'natura', // Default brand
  mode = 'light',  // Default mode
}: ThemeProviderPropsWithBrand): JSX.Element => {
  const theme = useMemo(() => buildTheme(brand, mode), [brand, mode]);

  const contextValue = useMemo(() => ({
    theme,
  }), [theme]);

  return (
    <ThemeContextProvider value={contextValue}>
      {children}
    </ThemeContextProvider>
  );
};

// You would export ThemeProviderWithBrand instead in this case
*/
