import { config } from "../config/config.js";
import { PACKET_TYPE } from "../constants/header.js";
import { handlerError } from "../utils/error/errorHandler.js";

export const onData = (socket) => async (data) => {
  // 수신한 데이터를 socket의 buffer에 추가해준다.
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength =
    config.packet.totalLength + config.packet.typeLength;

  // 수신한 데이터들을 패킷 단위로 마샬링(Marshalling)해준다.
  while (socket.buffer.length >= totalHeaderLength) {
    // 패킷의 길이 : Offset [0] 부터 4 바이트
    const length = socket.buffer.readUInt32BE(0);
    // 패킷의 타입 : Offset [4] 부터 1 바이트
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    // 아직 전체 패킷이 수신되지 않았으므로, 다음을 기약한다.
    if (socket.buffer.length < length) {
      break;
    }

    // 실제 패킷(Payload)은 헤더 뒤에 위치해있다.
    const packet = socket.buffer.slice(totalHeaderLength, length);
    // 이제 socket.buffer에서 마샬링한 패킷을 잘라준다.
    socket.buffer = socket.buffer.slice(length);

    try {
      console.log(`packet: ${packet}`);
      console.log(`packetType: ${packetType}`);
    } catch (err) {
      handlerError(socket, err);
    }
  }
};
