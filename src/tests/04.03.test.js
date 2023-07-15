/**
 * Exercise 04 extra 3 - Testing a form with React Testing Library
 * - Tests the Login component using React Testing Library
 * - Uses Jest's mock functions to test the form
 * - Uses a builder function to create the form data
 * - Uses faker to generate random data
 * - Allows the builder function to be overridden
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import Login from "../components/Login";

function buildLoginForm(overrides) {
  // create a builder function
  return {
    username: faker.internet.userName(), // use faker to generate random data
    password: faker.internet.password(), // use faker to generate random data
    ...overrides, // allow the values to be overridden
  };
}

test("submitting the form calls onSubmit with username and password", async () => {
  const handleSubmit = jest.fn(); // create a mock function

  render(<Login onSubmit={handleSubmit} />); // render the component

  const { username, password } = buildLoginForm({
    // use the builder function to create the form data with overrides
    username: "chuck norris",
    password: "i don't need one",
  });

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
