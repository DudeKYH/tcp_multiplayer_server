import { config } from "../../config/config.js";
import { PACKET_TYPE } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProtos.js";

export const makeNotification = (message, type) => {
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
  );

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUint8(type);

  return Buffer.concat([packetLength, packetType, message]);
};

export const createUpdateLocationPacket = (users) => {
  const protoMessages = getProtoMessages();

  const updateLocationStructure = protoMessages.gameNotification.UpdateLocation;

  const payload = { users };
  const message = updateLocationStructure.create(payload);

  const updateLocationPacket = updateLocationStructure.encode(message).finish();
  return makeNotification(updateLocationPacket, PACKET_TYPE.LOCATION);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();

  const pingStructure = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = pingStructure.create(payload);

  const pingPacket = pingStructure.encode(message).finish();

  return makeNotification(pingPacket, PACKET_TYPE.PING);
};
