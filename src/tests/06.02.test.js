/**
 * Exercise 06 extras 1 - Mocking the useCurrentPosition hook
 * - Tests the Location component using React Testing Library
 * - Tests that the alert is displayed when the location is not available
 * - Uses jest.fn() to mock the Geolocation API getCurrentPosition method
 * - Uses waitForElementToBeRemoved to wait for the loading spinner to disappear
 * - Uses act to wait for the component to update
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";
import Location from "../components/Location";

beforeAll(() => {
  // mock the Geolocation API getCurrentPosition method
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(), // mock the getCurrentPosition method
  };
});

function deferred() {
  // create a deferred promise
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    // create a promise
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject }; // return the promise and resolve and reject functions
}

test("displays error message when geolocation is not supported", async () => {
  const fakeError = new Error( // create a fake error object
    "Geolocation is not supported or permission denied"
  );
  const { promise, reject } = deferred(); // create a deferred promise

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      // call the errorCallback function with the fake error object
      promise.catch(() => errorCallback(fakeError));
    }
  );

  render(<Location />); // render the component

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument(); // check the loading indicator is displayed

  await act(async () => {
    reject(); // reject the promise
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument(); // check the loading indicator is not displayed
  expect(screen.getByRole("alert")).toHaveTextContent(fakeError.message); // check the error message is displayed
});
