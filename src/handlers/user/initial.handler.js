import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from "../../constants/handlerIds.js";
import { createResponse } from "../../utils/error/response/createResponse.js";

// 초기화 관련 Handler 함수
const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId, playerId, latency } = payload;

  console.log(
    `InitialHandler => deviceId: ${deviceId}, playerId: ${playerId}, latency: ${latency}`,
  );

  const initialResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { test: 1 },
    deviceId,
  );

  socket.write(initialResponse);
};

export default initialHandler;
