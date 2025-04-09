// src/tss.ts
import { createTss } from "tss-react";
import { useThemeContext } from "./ThemeContext"; // Import the custom hook

// This function now gets the theme from our React Context
function useTssContext() {
  const { theme } = useThemeContext(); // Use the hook to get the current theme
  return { theme }; // Return in the format tss expects
}

// Create the tss instance using our context hook
export const { tss } = createTss({
  useContext: useTssContext,
});

// Optional base export (usually defined per-component)
// export const useStyles = tss.create({});
