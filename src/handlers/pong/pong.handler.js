import { getProtoMessages } from "../../init/loadProtos.js";
import { getUserBySocket } from "../../session/user.session.js";

const pongHandler = ({ socket, packet }) => {
  const protoMessages = getProtoMessages();

  const pongStructure = protoMessages.common.Ping;
  const pongPayload = pongStructure.decode(packet);

  const user = getUserBySocket(socket);
  if (!user) {
    throw new CustomError(
      ErrorCodes.USER_NOT_FOUND,
      `유저를 찾을 수 없습니다.`,
    );
  }

  // PingPong을 기준으로 유저의 레이턴시를 업데이트한다.
  user.handlePong(pongPayload);
};

export default pongHandler;
