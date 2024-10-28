import { config } from "../../config/config.js";
import { PACKET_TYPE } from "../../constants/header.js";
import { getProtoTypeById } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtos.js";

export const createResponse = (handlerId, responseCode, data = null) => {
  const protoMessages = getProtoMessages();

  const responseStructure = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  const buffer = responseStructure.encode(responsePayload).finish();

  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    buffer.length + config.packet.totalLength + config.packet.typeLength,
  );

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(PACKET_TYPE.NORMAL);

  return Buffer.concat([packetLength, packetType, buffer]);
};
