export const onData = (socket) => async (data) => {
  console.log(data);

  // 수신한 데이를 socket의 buffer에 추가해준다.
  socket.buffer = Buffer.concat(socket.buffer, data);
};
