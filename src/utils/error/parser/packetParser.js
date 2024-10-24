import { config } from "../../../config/config.js";
import { getProtoTypeById } from "../../../handlers/index.js";
import { getProtoMessages } from "../../../init/loadProtos.js";
import { CustomError } from "../customError.js";
import { ErrorCodes } from "../errorCodes.js";

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  // 우선 Data를 Common Packet으로 Decoding 해준다.
  const commonPacketStructure = protoMessages.common.Packet;
  let commonPacket;
  try {
    commonPacket = commonPacketStructure.decode(data);
  } catch (err) {
    throw new CustomError(
      ErrorCodes.PACKET_DECODE_ERROR,
      `commonPacket 디코딩 중 오류가 발생하였습니다. : ${err.message}`,
    );
  }

  const handlerId = commonPacket.handlerId;
  const userId = commonPacket.userId;
  const clientVersion = commonPacket.version;

  // clientVersion 검증
  if (clientVersion !== config.client.clientVersion) {
    throw new CustomError(
      ErrorCodes.CLIENT_VERSION_MISMATCH,
      `클라이언트 버전이 일치하지 않습니다. : ${err.message}`,
    );
  }

  const protoTypeName = getProtoTypeById(handlerId);
  // protoTypeName 검증
  if (!protoTypeName) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `[${handlerId}] HandlerId의 프로토타입을 찾을 수 없습니다. : ${err.message}`,
    );
  }

  const [namespace, typeName] = protoTypeName.split(".");
  const payloadTypeStructure = protoMessages[namespace][typeName];

  let payload;

  // protoType에 해당하는 proto 구조로 Decodeing 해준다.
  try {
    payload = payloadTypeStructure.decode(commonPacket.payload);
  } catch (err) {
    throw new CustomError(
      ErrorCodes.PACKET_DECODE_ERROR,
      `페이로드 디코딩 중 오류가 발생했습니다. : ${err.message}`,
    );
  }

  // verify 과정은 이미 위의 decode 함수 내부에서 자체적으로 수행되지만, 우선 구현은 해놓는다.
  const errorMessage = payloadTypeStructure.verify(payload);
  if (errorMessage) {
    throw new CustomError(
      ErrorCodes.PACKET_STRUCTURE_MISMATCH,
      `페이로드 구조가 타입과 일치하지 않습니다. : ${err.message}`,
    );
  }

  // expectedFields : 페이로드에 있어야 할 필드들
  const expectedFields = Object.keys(payloadTypeStructure.fields);
  // actualFields: 페이로드에 실제로 존재하는 필드들
  const actualFields = Object.keys(payload);

  // expectedFields와 actualFields를 비교하여 누락된 Field들을 구한다.
  const missingFields = expectedFields.filter(
    (field) => !actualFields.includes(field),
  );

  // 일부 Field가 누락되었는지 검증
  if (missingFields.length > 0) {
    throw new CustomError(
      ErrorCodes.MISSING_FIELDS,
      `페이로드 중 일부 필드가 누락되었습니다. ${missingFields.join(", ")}`,
    );
  }

  return { handlerId, userId, payload };
};
