/**
 * Exercise 08 - Testing custom hooks
 * - Tests the useCounter hook using React Testing Library
 * - Tests that the count is incremented and decremented correctly
 * - Uses a component that uses the useCounter hook to test it
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCounter from "../hooks/useCounter";

function UseCounterHookExample() {
  // create a component that uses the useCounter hook
  const { count, increment, decrement } = useCounter(); // use the useCounter hook
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

test("exposes the count and increment/decrement functions", async () => {
  render(<UseCounterHookExample />); // render the component that uses the useCounter hook

  const increment = screen.getByRole("button", { name: /increment/i }); // get the increment button
  const decrement = screen.getByRole("button", { name: /decrement/i }); // get the decrement button
  const message = screen.getByText(/current count/i); // get the message element

  expect(message).toHaveTextContent("Current count: 0"); // check the initial count

  await userEvent.click(increment); // click the increment button
  expect(message).toHaveTextContent("Current count: 1"); // check the count after incrementing

  await userEvent.click(decrement); // click the decrement button
  expect(message).toHaveTextContent("Current count: 0"); // check the count after decrementing
});
