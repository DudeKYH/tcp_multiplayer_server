import { createPingPacket } from "../../utils/notification/game.notification.js";

class User {
  constructor(id, socket, playerId, latency, x, y) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.latency = latency;
    this.lastUpdateTime = Date.now();
  }

  ping() {
    const now = Date.now();

    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;

    //console.log(`Received pong : latency ${this.latency}ms`);
    //console.log(`now : ${now} / pong : ${data.timestamp}`);
  }

  // 유저의 플레이어 위치 Update
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  // 유저의 플레이어 속도 Update
  updateVelocity(velX, velY) {
    this.velocityX = velX;
    this.velocityY = velY;
  }

  // latency를 기반으로 데드 레커닝 기술을하여 미래의 플레리어 위치 계산
  calculatePosition(latency) {
    const timeDiff = latency / 1000;
    const speed = 3;
    const distance = speed * timeDiff;

    return {
      x: this.x + this.velocityX * distance,
      y: this.y + this.velocityY * distance,
    };
  }

  printUserInfo() {
    return `[${this.id}] => pos: (${this.x}, ${this.y}) , latency: ${this.latency}`;
  }
}

export default User;
