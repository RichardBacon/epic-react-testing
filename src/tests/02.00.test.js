/**
 * Exercise 02 - Simple test with React Testing Library
 * - Tests the Counter component using React Testing Library
 * - Removes the boilerplate that RTL provides
 */

import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter";

test("counter increments and decrements when the buttons are clicked", () => {
  const { container } = render(<Counter />); // render the component
  const [decrement, increment] = container.querySelectorAll("button"); // get the buttons
  const message = container.firstChild.querySelector("div"); // get the message

  expect(message.textContent).toBe("Current count: 0"); // check the initial message

  fireEvent.click(increment); // click the increment button
  expect(message.textContent).toBe("Current count: 1"); // check the message

  fireEvent.click(decrement); // click the decrement button
  expect(message.textContent).toBe("Current count: 0"); // check the message
});
