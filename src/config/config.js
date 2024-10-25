import { CLIENT_VERSION, HOST, PORT } from "../constants/env.js";
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
};
