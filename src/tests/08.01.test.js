/**
 * Exercise 08 extra 1 - Testing custom hooks
 * - Tests the useCounter hook using React Testing Library
 * - Tests that the count is incremented and decremented correctly
 * - Uses a simple component to test the useCounter hook
 */

import * as React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../hooks/useCounter";

test("exposes the count and increment/decrement functions", () => {
  let result;
  function TestComponent() {
    // create a simple component to test the useCounter hook
    result = useCounter(); // use the useCounter hook
    return null;
  }

  render(<TestComponent />); // render the component that uses the useCounter hook

  expect(result.count).toBe(0); // check the initial count

  act(() => result.increment()); // increment the count
  expect(result.count).toBe(1); // check the count after incrementing

  act(() => result.decrement()); // decrement the count
  expect(result.count).toBe(0); // check the count after decrementing
});
