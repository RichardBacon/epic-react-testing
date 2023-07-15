/**
 * Exercise 07 - Testing components that use context
 * - Tests the Button component using React Testing Library
 * - Tests that the button has the correct styles for the light theme
 * - Uses a custom wrapper component to wrap the Button component in the ThemeProvider
 * - Uses expect(...).toHaveStyle to check the button styles
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../contexts/Theme";
import Button from "../components/Button";

test("renders with the light styles for the light theme", () => {
  const Wrapper = ({ children }) => (
    // create a wrapper component
    <ThemeProvider initialTheme="light">{children}</ThemeProvider> // wrap the children in the ThemeProvider
  );
  render(<Button>Easy</Button>, { wrapper: Wrapper }); // render the Button component with the wrapper

  const button = screen.getByRole("button", { name: /easy/i }); // get the button element
  expect(button).toHaveStyle(` 
    background-color: white;
    color: black;
  `); // check the button styles
});
