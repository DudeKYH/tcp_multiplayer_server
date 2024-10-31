import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from "../../constants/handlerIds.js";
import {
  createUser,
  findUserByDeviceId,
  updateUserLogin,
} from "../../db/user/user.db.js";
import { getDefaultGame } from "../../session/game.session.js";
import { addUser } from "../../session/user.session.js";
import { createResponse } from "../../utils/response/createResponse.js";

// 초기화 관련 Handler 함수
const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId, playerId, latency } = payload;

  // USER_DB로부터 user 데이터를 가져온다
  let userData = await findUserByDeviceId(deviceId);

  if (!userData) {
    // 만약 DB에 user 정보가 없다면 create 해준다.
    await createUser(deviceId);
    userData = await findUserByDeviceId(deviceId);
  } else {
    // 있다면 last_login 값을 update 해준다.
    await updateUserLogin(userData.id);
  }

  // 게임에 접속한 유저를 userSession에 추가해준다.
  // user의 id로 현재 deviceId를 사용하고 있다.
  const user = addUser(
    socket,
    userData.deviceId,
    playerId,
    latency,
    userData.x,
    userData.y,
  );

  // 그리고 game에 자동으로 참가시켜준다.
  const defaultGame = getDefaultGame();
  defaultGame.addUser(user);

  // initial Event에 대한 응답 패킷을 만들어준다.
  // data : 우선 playerId만 보내주도록 한다.
  const initialResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId, x: userData.x, y: userData.y },
  );

  socket.write(initialResponse);
};

export default initialHandler;
