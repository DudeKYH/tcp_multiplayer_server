import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from "../../constants/handlerIds.js";
import { getDefaultGame } from "../../session/game.session.js";
import { addUser } from "../../session/user.session.js";
import { createResponse } from "../../utils/response/createResponse.js";

// 초기화 관련 Handler 함수
const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId, playerId, latency } = payload;

  console.log(
    `InitialHandler => deviceId: ${deviceId}, playerId: ${playerId}, latency: ${latency}`,
  );

  // 게임에 접속한 유저를 userSession에 추가해준다.
  const user = addUser(socket, deviceId, playerId);

  // 그리고 game에 자동으로 참가시켜준다.
  const defaultGame = getDefaultGame();
  defaultGame.addUser(user);

  // initial Event에 대한 응답 패킷을 만들어준다.
  // data : 우선 playerId만 보내주도록 한다.
  const initialResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId },
  );

  socket.write(initialResponse);
};

export default initialHandler;
