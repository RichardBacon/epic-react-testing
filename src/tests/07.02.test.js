/**
 * Exercise 07 extra 2 - Testing components that use context
 * - Tests the Button component using React Testing Library
 * - Tests that the button has the correct styles for the dark theme
 * - Uses a custom wrapper component to wrap the Button component in the ThemeProvider
 * - Uses expect(...).toHaveStyle to check the button styles
 * - Uses a custom render function to wrap the Button component in the ThemeProvider
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../contexts/Theme";
import Button from "../components/Button";

function renderWithProviders(ui, { theme = "light", ...options } = {}) {
  // create a custom render function
  const Wrapper = ({ children }) => (
    // create a wrapper component
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options }); // render the ui with the wrapper
}

test("renders with the light styles for the light theme", () => {
  renderWithProviders(<Button>Easy</Button>); // render the Button component with the custom render function

  const button = screen.getByRole("button", { name: /easy/i }); // get the button element
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `); // check the button styles
});

test("renders with the dark styles for the dark theme", () => {
  renderWithProviders(<Button>Easy</Button>, {
    theme: "dark",
  }); // render the Button component with the custom render function

  const button = screen.getByRole("button", { name: /easy/i }); // get the button element
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `); // check the button styles
});
