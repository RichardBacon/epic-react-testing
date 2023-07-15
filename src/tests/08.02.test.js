/**
 * Exercise 08 extra 2 - Testing custom hooks
 * - Tests the useCounter hook using React Testing Library
 * - Tests that the count is incremented and decremented correctly
 * - Uses a component that uses the useCounter hook to test it
 * - Allows customization of the initial count and step
 */

import * as React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../hooks/useCounter";

function setup({ initialProps } = {}) {
  const result = {};
  function TestComponent() {
    // create a simple component to test the useCounter hook
    result.current = useCounter(initialProps); // use the useCounter hook
    return null;
  }
  render(<TestComponent />); // render the component that uses the useCounter hook
  return result;
}

test("exposes the count and increment/decrement functions", () => {
  const result = setup(); // render the component that uses the useCounter hook
  expect(result.current.count).toBe(0); // check the initial count

  act(() => result.current.increment()); // increment the count
  expect(result.current.count).toBe(1); // check the count after incrementing

  act(() => result.current.decrement()); // decrement the count
  expect(result.current.count).toBe(0); // check the count after decrementing
});

test("allows customization of the initial count", () => {
  const result = setup({ initialProps: { initialCount: 3 } }); // render the component that uses the useCounter hook
  expect(result.current.count).toBe(3); // check the initial count
});

test("allows customization of the step", () => {
  const result = setup({ initialProps: { step: 2 } }); // render the component that uses the useCounter hook
  expect(result.current.count).toBe(0); // check the initial count

  act(() => result.current.increment()); // increment the count
  expect(result.current.count).toBe(2); // check the count after incrementing

  act(() => result.current.decrement()); // decrement the count
  expect(result.current.count).toBe(0); // check the count after decrementing
});
