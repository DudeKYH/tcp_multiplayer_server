import { HANDLER_IDS } from "../constants/handlerIds.js";
import { CustomError } from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import initialHandler from "./user/initial.handler.js";

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: "initial.InitialPacket",
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `[${handlerId}] HandlerID의 핸들러를 찾을 수 없습니다: `,
    );
  }

  return handlers[handlerId].handler;
};

export const getProtoTypeById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `[${handlerId}] HandlerID의 프로토타입을 찾을 수 없습니다: `,
    );
  }

  return handlers[handlerId].protoType;
};
