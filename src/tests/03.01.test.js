/**
 * Exercise 03 extra 1 - Avoiding implementation details
 * - Tests the Counter component in an implementation free way
 * - Uses userEvent instead of fireEvent
 * - Fires all the events rather than just the click event
 * - A more realistic simulation of user interaction
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";

test("counter increments and decrements when the buttons are clicked", async () => {
  render(<Counter />); // render the component
  const increment = screen.getByRole("button", { name: /increment/i }); // get the buttons
  const decrement = screen.getByRole("button", { name: /decrement/i }); // get the buttons
  const message = screen.getByText(/current count/i); // get the message

  expect(message).toHaveTextContent("Current count: 0"); // check the initial message

  await userEvent.click(increment); // click the increment button and wait for the events to fire
  expect(message).toHaveTextContent("Current count: 1"); // check the message

  await userEvent.click(decrement); // click the decrement button and wait for the events to fire
  expect(message).toHaveTextContent("Current count: 0"); // check the message
});
