/**
 * Exercise 06 extras 1 - Mocking the useCurrentPosition hook
 * - Tests the Location component using React Testing Library
 * - Tests that the loading indicator is displayed while the location is being fetched
 * - Tests that the latitude and longitude are displayed when the location is fetched
 * - Uses a mock implementation of the useCurrentPosition hook
 * - Uses waitForElementToBeRemoved to wait for the loading spinner to disappear
 * - Uses act to wait for the component to update
 */

import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import { useCurrentPosition } from "react-use-geolocation";
import Location from "../components/Location";

jest.mock("react-use-geolocation"); // mock the useCurrentPosition hook

test("displays the users current location", async () => {
  const fakePosition = {
    // create a fake position object
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  let setReturnValue;
  function useMockCurrentPosition() {
    // mock implementation of the useCurrentPosition hook
    const state = React.useState([]); // create a state variable
    setReturnValue = state[1]; // set the setReturnValue function to the second item in the state array
    return state[0]; // return the first item in the state array
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition); // mock the useCurrentPosition hook

  render(<Location />); // render the component
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument(); // check the loading indicator is displayed

  act(() => {
    setReturnValue([fakePosition]); // set the return value of the useCurrentPosition hook
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
