'use client';

import { createContext, useContext } from "react";
import { Theme } from "@naturacosmeticos/natds-themes";
import buildTheme from "./buildTheme"; // Assuming buildTheme is in the same directory or adjust path

// Define the shape of the context value
interface ThemeContextValue {
  theme: Theme;
  // Add functions to change theme if needed, e.g., setTheme, setMode, setBrand
}

// Create the context with a default value.
// It's crucial to provide a sensible default theme here.
// We use the default export of buildTheme to get the default theme (e.g., natura/light).
const defaultTheme = buildTheme(); // Or specify brand/mode: buildTheme('natura', 'light')
const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
});

// Custom hook to use the theme context easily
export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // This error means you are trying to use the context outside of its provider
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

// Export the Provider component separately if preferred, or handle it in ThemeProvider.tsx
export const ThemeContextProvider = ThemeContext.Provider;

// Export the context itself if needed elsewhere, though the hook is usually sufficient
// export default ThemeContext;
