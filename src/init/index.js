import { addGame, getGameSessions } from "../session/game.session.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
  try {
    // 모든 proto 파일들을 로딩한다.
    await loadProtos();

    //
    addGame();

    console.log(getGameSessions());
  } catch (err) {
    console.error(err);

    // process.exit(code) : 수동으로 프로세스 종료시키는 함수
    // code
    // - 0 : default Code  (성공적인 종료)
    // - 1 ~ 255 : error Code
    process.exit(1);
  }
};

export default initServer;
