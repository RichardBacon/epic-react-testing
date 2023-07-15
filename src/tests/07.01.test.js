/**
 * Exercise 07 extra 1 - Testing components that use context
 * - Tests the Button component using React Testing Library
 * - Tests that the button has the correct styles for the dark theme
 * - Uses a custom wrapper component to wrap the Button component in the ThemeProvider
 * - Uses expect(...).toHaveStyle to check the button styles
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../contexts/Theme";
import Button from "../components/Button";

test("renders with the dark styles for the dark theme", () => {
  const Wrapper = ({ children }) => (
    // create a wrapper component
    <ThemeProvider initialTheme="dark">{children}</ThemeProvider> // wrap the children in the ThemeProvider
  );
  render(<Button>Easy</Button>, { wrapper: Wrapper }); // render the Button component with the wrapper

  const button = screen.getByRole("button", { name: /easy/i }); // get the button element
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `); // check the button styles
});
