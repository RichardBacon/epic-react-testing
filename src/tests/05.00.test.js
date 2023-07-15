/**
 * Exercise 05 - Mocking HTTP requests with MSW
 * - Tests the LoginSubmission component using React Testing Library and MSW
 * - Uses MSW to mock the HTTP request
 * - Uses waitForElementToBeRemoved to wait for the loading spinner to disappear
 */

import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import { rest } from "msw";
import { setupServer } from "msw/node";
import LoginSubmission from "../components/LoginSubmission";

const buildLoginForm = build({
  // create a builder function using test-data-bot
  fields: {
    username: fake((f) => f.internet.userName()), // generate random data
    password: fake((f) => f.internet.password()), // generate random data
  },
});

const server = setupServer(
  // create a mock server
  rest.post(
    // create a mock response for the POST request
    "https://auth-provider.example.com/api/login",
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({ message: "password required" })); // return a 400 error if the password is missing
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({ message: "username required" })); // return a 400 error if the username is missing
      }
      return res(ctx.json({ username: req.body.username })); // return the username if the request is valid
    }
  )
);

beforeAll(() => server.listen()); // start the mock server
afterAll(() => server.close()); // stop the mock server

test(`logging in displays the user's username`, async () => {
  render(<LoginSubmission />); // render the component
  const { username, password } = buildLoginForm(); // use the builder function to create the form data

  await userEvent.type(screen.getByLabelText(/username/i), username); // type the username
  await userEvent.type(screen.getByLabelText(/password/i), password); // type the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)); // wait for the loading indicator to disappear

  expect(screen.getByText(username)).toBeInTheDocument(); // check the username is displayed
});
