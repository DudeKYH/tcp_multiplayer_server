import { getDefaultGame } from "../../session/game.session.js";
import { CustomError } from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";

const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y, velX, velY } = payload;

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
    // 유저의 속도를 패킷에 담긴 vleX, velY 위치로 Update 시켜준다.
    user.updateVelocity(velX, velY);

    // 게임에 접속 중인 모든 유저의 위치 정보를 클라이언트에게 알려준다.
    const updateLocationPacket = game.getAllLocation();

    socket.write(updateLocationPacket);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default updateLocationHandler;
