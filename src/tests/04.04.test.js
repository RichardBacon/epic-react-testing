/**
 * Exercise 04 extra 3 - Testing a form with React Testing Library
 * - Tests the Login component using React Testing Library
 * - Uses Jest's mock functions to test the form
 * - Uses test-data-bot to build the form data and generate random data
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import Login from "../components/Login";

const buildLoginForm = build({
  // create a builder function using test-data-bot
  fields: {
    username: fake((f) => f.internet.userName()), // generate random data
    password: fake((f) => f.internet.password()), // generate random data
  },
});

test("submitting the form calls onSubmit with username and password", async () => {
  const handleSubmit = jest.fn(); // create a mock function

  render(<Login onSubmit={handleSubmit} />); // render the component

  const { username, password } = buildLoginForm(); // use the builder function to create the form data

  await userEvent.type(screen.getByLabelText(/username/i), username); // type the username
  await userEvent.type(screen.getByLabelText(/password/i), password); // type the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  expect(handleSubmit).toHaveBeenCalledWith({
    // check the mock function was called with the correct data
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1); // check the mock function was called once
});
