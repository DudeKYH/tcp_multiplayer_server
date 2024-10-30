import { getDefaultGame } from "../../session/game.session.js";
import { removeUser } from "../../session/user.session.js";
import { ErrorCodes } from "./errorCodes.js";

export const handlerError = (socket, error) => {
  let responseCode;
  let message;

  if (error.code) {
    if (error.code !== ErrorCodes.SOCKET_ERROR) {
      responseCode = error.code;
      message = error.message;
      console.error(`에러 코드: ${error.code}, 메세지: ${error.message}`);

      // 해당 에러를 클라이언트에게 응답으로 알려준다.
      const errorResponse = Buffer.from(message);
      socket.write(errorResponse);
    } else {
      // 현재 소켓 에러인 경우는 "ECONNRESET"(클라이언트쪽에서의 연결 종료)이므로 user를 지워준다.
      // ECONNRESET error가 발생한 후, 바로 onEnd도 호출된다.
      console.error(`소켓 에러: ${error.message}`);

      // userSessions에서 user 삭제
      const errorUser = removeUser(socket);

      // gameSession에서 user 삭제
      const game = getDefaultGame();
      game.removeUser(errorUser.id);
    }
  } else {
    console.error(`Unknown Error: ${error}`);
  }
};
