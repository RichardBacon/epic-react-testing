import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider } from "../contexts/Theme";

function render(ui, { theme = "light", ...options } = {}) {
  // create a wrapper component
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider> // wrap the children in the ThemeProvider
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options }); // render the ui with the wrapper
}

export * from "@testing-library/react"; // re-export everything

export { render }; // only export the custom render method
