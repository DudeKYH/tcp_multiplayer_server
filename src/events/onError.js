import { removeUser } from "../session/user.session.js";
import { CustomError } from "../utils/error/customError.js";
import { handlerError } from "../utils/error/errorHandler.js";

export const onError = (socket) => (err) => {
  console.log(`소켓 에러 : ${err.messgae}`);
  handlerError(socket, new CustomError(500, `소켓 오류: ${err.message}`));

  const errorUser = removeUser(socket);
  const game = getDefaultGame();
  game.removeUser(errorUser.id);
};
