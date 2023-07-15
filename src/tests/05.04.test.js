/**
 * Exercise 05 extra 4 - Mocking HTTP requests with MSW
 * - Tests the LoginSubmission component using React Testing Library and MSW
 * - Tests that an unknown server error displays the error message
 * - Uses MSW to mock the HTTP request
 * - Uses handlers from utils/server-handlers to mock the HTTP request
 * - Uses waitForElementToBeRemoved to wait for the loading spinner to disappear
 */

import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "../utils/server-handlers";
import LoginSubmission from "../components/LoginSubmission";

const server = setupServer(...handlers); // create a mock server using the handlers from utils/server-handlers

beforeAll(() => server.listen()); // start the mock server
afterAll(() => server.close()); // stop the mock server
afterEach(() => server.resetHandlers()); // reset the mock server

test("unknown server error displays the error message", async () => {
  const testErrorMessage = "Oh no, something bad happened"; // create a test error message
  server.use(
    // use the MSW rest handler to mock the HTTP request
    rest.post(
      // mock a POST request
      "https://auth-provider.example.com/api/login",
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: testErrorMessage })); // return a 500 error with the test error message
      }
    )
  );

  render(<LoginSubmission />); // render the component

  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)); // wait for the loading indicator to disappear

  expect(screen.getByRole("alert")).toHaveTextContent(testErrorMessage); // check the error message is displayed
});
