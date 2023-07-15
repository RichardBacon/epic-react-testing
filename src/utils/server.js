import { setupWorker } from "msw";
import { handlers } from "./server-handlers";

const server = setupWorker(...handlers); // create the server

server.start({
  quiet: true,
  serviceWorker: {
    url: "/mockServiceWorker.js",
  },
}); // start the server
