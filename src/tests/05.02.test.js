/**
 * Exercise 05 extra 2 - Mocking HTTP requests with MSW
 * - Tests the LoginSubmission component using React Testing Library and MSW
 * - Tests that omitting the password results in an error
 * - Tests that omitting the username results in an error
 * - Tests that omitting both the username and password results in an error
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
import { build, fake } from "@jackfranklin/test-data-bot";
import { setupServer } from "msw/node";
import { handlers } from "../utils/server-handlers";
import LoginSubmission from "../components/LoginSubmission";

const buildLoginForm = build({
  // create a builder function using test-data-bot
  fields: {
    username: fake((f) => f.internet.userName()), // generate random data
    password: fake((f) => f.internet.password()), // generate random data
  },
});

const server = setupServer(...handlers); // create a mock server using the handlers from utils/server-handlers

beforeAll(() => server.listen()); // start the mock server
afterAll(() => server.close()); // stop the mock server

test("omitting the password results in an error", async () => {
  render(<LoginSubmission />); // render the component
  const { username } = buildLoginForm(); // use the builder function to create the form data

  await userEvent.type(screen.getByLabelText(/username/i), username); // type the username
  // omit the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)); // wait for the loading indicator to disappear

  expect(screen.getByRole("alert")).toHaveTextContent("password required"); // check the error message is displayed
});

test("omitting the username results in an error", async () => {
  render(<LoginSubmission />); // render the component
  const { password } = buildLoginForm(); // use the builder function to create the form data

  // omit the username
  await userEvent.type(screen.getByLabelText(/password/i), password); // type the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)); // wait for the loading indicator to disappear

  expect(screen.getByRole("alert")).toHaveTextContent("username required"); // check the error message is displayed
});

test("omitting the username and password results in an error", async () => {
  render(<LoginSubmission />); // render the component

  // omit the username and password
  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)); // wait for the loading indicator to disappear

  expect(screen.getByRole("alert")).toHaveTextContent("password required"); // check the error message is displayed
});
