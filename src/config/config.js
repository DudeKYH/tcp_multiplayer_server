import {
  CLIENT_VERSION,
  HOST,
  PORT,
  USER_DB_HOST,
  USER_DB_NAME,
  USER_DB_PASSWORD,
  USER_DB_PORT,
  USER_DB_USER,
} from "../constants/env.js";
import { MAX_PLAYERS, PLAYING, WAITING } from "../constants/game.js";
import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    clientVersion: CLIENT_VERSION,
  },
  packet: {
    totalLength: TOTAL_LENGTH,
    typeLength: PACKET_TYPE_LENGTH,
  },
  game: {
    maxPlayer: MAX_PLAYERS,
    state: {
      wating: WAITING,
      playing: PLAYING,
    },
  },
  databases: {
    USER_DB: {
      name: USER_DB_NAME,
      user: USER_DB_USER,
      password: USER_DB_PASSWORD,
      host: USER_DB_HOST,
      port: USER_DB_PORT,
    },
  },
};
