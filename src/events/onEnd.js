import { getDefaultGame } from "../session/game.session.js";
import { gameSessions, userSessions } from "../session/session.js";
import { removeUser } from "../session/user.session.js";

export const onEnd = (socket) => () => {
  console.log(`클라이언트 연결이 종료되었습니다.`);

  // userSessions에서 user 삭제
  const endUser = removeUser(socket);

  console.log(endUser);

  // gameSession에서 user 삭제
  const game = getDefaultGame();
  game.removeUser(endUser.id);

  console.log(userSessions);
  console.log(gameSessions);
};
