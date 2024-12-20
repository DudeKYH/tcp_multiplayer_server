import { saveUserPos } from "../db/user/user.db.js";
import { getDefaultGame } from "../session/game.session.js";
import { removeUser } from "../session/user.session.js";

export const onEnd = (socket) => () => {
  console.log(`클라이언트 연결이 종료되었습니다.`);

  // userSessions에서 user 삭제
  const endUser = removeUser(socket);

  // DB에 마지막 위치 저장
  saveUserPos(endUser.id, endUser.x, endUser.y);

  // gameSession에서 user 삭제
  const game = getDefaultGame();
  game.removeUser(endUser.id);
};
