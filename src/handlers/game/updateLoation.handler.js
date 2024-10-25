import { getGame, getUniqueGame } from "../../session/game.session.js";

const updateLocationHandler = ({ socket, userId, payload }) => {
  const { x, y } = payload;

  const game = getUniqueGame();
};
