/**
 * Exercise 08 - Testing custom hooks
 * - Tests the useCounter hook using React Testing Library
 * - Tests that the count is incremented and decremented correctly
 * - Uses the react-hooks-testing-library renderHook function to test the hook
 */

import { renderHook, act } from "@testing-library/react";
import useCounter from "../hooks/useCounter";

test("exposes the count and increment/decrement functions", () => {
  const { result } = renderHook(useCounter); // render the hook
  expect(result.current.count).toBe(0); // check the initial count

  act(() => result.current.increment()); // increment the count
  expect(result.current.count).toBe(1); // check the count after incrementing

  act(() => result.current.decrement()); // decrement the count
  expect(result.current.count).toBe(0); // check the count after decrementing
});

test("allows customization of the initial count", () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 },
  }); // render the hook
  expect(result.current.count).toBe(3); // check the initial count
});

test("allows customization of the step", () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } }); // render the hook
  expect(result.current.count).toBe(0); // check the initial count

  act(() => result.current.increment()); // increment the count
  expect(result.current.count).toBe(2); // check the count after incrementing

  act(() => result.current.decrement()); // decrement the count
  expect(result.current.count).toBe(0); // check the count after decrementing
});

test("the step can be changed", () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 3 },
  }); // render the hook
  expect(result.current.count).toBe(0); // check the initial count

  act(() => result.current.increment()); // increment the count
  expect(result.current.count).toBe(3); // check the count after incrementing

  rerender({ step: 2 }); // change the step
  act(() => result.current.decrement()); // decrement the count
  expect(result.current.count).toBe(1); // check the count after decrementing
});
