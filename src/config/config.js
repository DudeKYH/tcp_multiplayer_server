import { CLIENT_VERSION, HOST, PORT } from "../constants/env.js";

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    clientVersion: CLIENT_VERSION,
  },
};
