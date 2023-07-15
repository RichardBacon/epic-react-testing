/**
 * Exercise 03 - Avoiding implementation details
 * - Tests the Counter component in an implementation free way
 */

import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter";

test("counter increments and decrements when the buttons are clicked", () => {
  render(<Counter />); // render the component
  const increment = screen.getByRole("button", { name: /increment/i }); // get the buttons
  const decrement = screen.getByRole("button", { name: /decrement/i }); // get the buttons
  const message = screen.getByText(/current count/i); // get the message

  expect(message).toHaveTextContent("Current count: 0"); // check the initial message

  fireEvent.click(increment); // click the increment button
  expect(message).toHaveTextContent("Current count: 1"); // check the message

  fireEvent.click(decrement); // click the decrement button
  expect(message).toHaveTextContent("Current count: 0"); // check the message
});
