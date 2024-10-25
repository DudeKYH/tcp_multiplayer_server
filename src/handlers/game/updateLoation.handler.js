import { getGame, getDefaultGame } from "../../session/game.session.js";
import { CustomError } from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";

const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    const game = getDefaultGame();
    if (!game) {
      throw new CustomError(
        ErrorCodes.GAME_NOT_FOUND,
        `게임을 찾을 수 없습니다.`,
      );
    }

    const user = game.getUser(userId);
    if (!user) {
      throw new CustomError(
        ErrorCodes.USER_NOT_FOUND,
        `유저를 찾을 수 없습니다.`,
      );
    }

    // 유저의 위치를 패킷에 담긴 x, y 위치로 Update 시켜준다.
    user.updatePosition(x, y);

    console.log(`[${user.playerId}] Player Pos => { x: ${x}, y: ${y}}`);

    const updateLocationPacket = game.getAllLocation();

    socket.write(updateLocationPacket);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default updateLocationHandler;
