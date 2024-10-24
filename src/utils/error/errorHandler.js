import { ErrorCodes } from "./errorCodes.js";

export const handlerError = (socket, error) => {
  let responseCode;
  let message;
  console.error(error);

  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`에러 코드: ${error.code}, 메세지: ${error.message}`);
  } else {
    responseCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.error(`소켓 에러: ${error.message}`);
  }

  // 해당 에러를 클라이언트에게 응답으로 알려준다.
  const errorResponse = Buffer.from(message);
  socket.write(errorResponse);
};
