/**
 * Exercise 04 extra 1 - Testing a form with React Testing Library
 * - Tests the Login component using React Testing Library
 * - Uses Jest's mock functions to test the form
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";

test("submitting the form calls onSubmit with username and password", async () => {
  const handleSubmit = jest.fn(); // create a mock function

  render(<Login onSubmit={handleSubmit} />); // render the component

  const username = "chucknorris";
  const password = "i need no password";

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
