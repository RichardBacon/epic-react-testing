import { rest } from "msw";

const delay = process.env.NODE_ENV === "test" ? 0 : 1500; // no delay in test environment

const handlers = [
  // define the handlers
  rest.post(
    // define a POST request handler for the login endpoint
    "https://auth-provider.example.com/api/login",
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(
          ctx.delay(delay), // delay the response
          ctx.status(400), // set the status code to 400
          ctx.json({ message: "password required" }) // set the response body
        );
      }
      if (!req.body.username) {
        return res(
          ctx.delay(delay), // delay the response
          ctx.status(400), // set the status code to 400
          ctx.json({ message: "username required" }) // set the response body
        );
      }
      return res(ctx.delay(delay), ctx.json({ username: req.body.username })); // delay the response and set the response body
    }
  ),
];

export { handlers };
