/**
 * Exercise 04 - Testing a form with React Testing Library
 * - Tests the Login component using React Testing Library
 * - Creates a mock onSubmit function to test the form
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";

test("submitting the form calls onSubmit with username and password", async () => {
  let submittedData;
  const handleSubmit = (data) => (submittedData = data); // store the submitted data

  render(<Login onSubmit={handleSubmit} />); // render the component

  const username = "chucknorris";
  const password = "i need no password";

  await userEvent.type(screen.getByLabelText(/username/i), username); // type the username
  await userEvent.type(screen.getByLabelText(/password/i), password); // type the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i })); // click the submit button

  expect(submittedData).toEqual({
    // check the submitted data
    username,
    password,
  });
});
