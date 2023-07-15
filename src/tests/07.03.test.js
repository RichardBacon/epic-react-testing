/**
 * Exercise 07 extra 3 - Testing components that use context
 * - Tests the Button component using React Testing Library
 * - Tests that the button has the correct styles for the dark theme
 * - Uses a custom wrapper component to wrap the Button component in the ThemeProvider
 * - Uses expect(...).toHaveStyle to check the button styles
 * - Uses a custom render function to wrap the Button component in the ThemeProvider
 */

import * as React from "react";
import { render, screen } from "../utils/test-utils";
import Button from "../components/Button";

test("renders with the light styles for the light theme", () => {
  render(<Button>Easy</Button>, { theme: "light" }); // render the Button component with the custom render function

  const button = screen.getByRole("button", { name: /easy/i }); // get the button element
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `); // check the button styles
});

test("renders with the dark styles for the dark theme", () => {
  render(<Button>Easy</Button>, { theme: "dark" }); // render the Button component with the custom render function

  const button = screen.getByRole("button", { name: /easy/i }); // get the button element
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `); // check the button styles
});
