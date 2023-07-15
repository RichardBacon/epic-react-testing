/**
 * Exercise 06 - Mocking the Geolocation API
 * - Tests the Location component using React Testing Library
 * - Tests that the loading indicator is displayed while the location is being fetched
 * - Tests that the latitude and longitude are displayed when the location is fetched
 * - Uses jest.fn() to mock the Geolocation API getCurrentPosition method
 * - Uses waitForElementToBeRemoved to wait for the loading spinner to disappear
 * - Uses act to wait for the component to update
 */

import * as React from "react";
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

test("displays the users current location", async () => {
  const fakePosition = {
    // create a fake position object
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };
  const { promise, resolve } = deferred(); // create a deferred promise

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (callback) => {
      // call the callback function with the fake position object
      promise.then(() => callback(fakePosition));
    }
  );

  render(<Location />); // render the component

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument(); // check the loading indicator is displayed

  await act(async () => {
    resolve(); // resolve the promise
    await promise; // wait for the promise to resolve
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument(); // check the loading indicator is not displayed
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    // check the latitude is displayed
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    // check the longitude is displayed
    `Longitude: ${fakePosition.coords.longitude}`
  );
});
