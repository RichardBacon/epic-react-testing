/**
 * Exercise 01 extra 1 - Simple test with ReactDOM and dispatchEvent
 * - Tests the Counter component using ReactDOM and dispatchEvent
 * - A precursor to using React Testing Library
 */

import * as React from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import Counter from "../components/Counter";

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
global.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  document.body.innerHTML = ""; // clear the document body
});

test("counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div"); // create a div to hold the component
  document.body.append(div); // append the div to the document body

  const root = createRoot(div); // create a root for the component
  act(() => root.render(<Counter />)); // render the component

  const [decrement, increment] = div.querySelectorAll("button"); // get the buttons
  const message = div.firstChild.querySelector("div"); // get the message

  expect(message.textContent).toBe("Current count: 0"); // check the initial message

  const incrementClickEvent = new MouseEvent("click", {
    // create a click event
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  act(() => increment.dispatchEvent(incrementClickEvent)); // dispatch the event
  expect(message.textContent).toBe("Current count: 1"); // check the message

  const decrementClickEvent = new MouseEvent("click", {
    // create a click event
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  act(() => decrement.dispatchEvent(decrementClickEvent)); // dispatch the event
  expect(message.textContent).toBe("Current count: 0"); // check the message
});
