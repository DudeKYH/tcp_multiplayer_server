class User {
  constructor(id, socket, playerId, latency) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.latency = latency;
    this.lastUpdateTime = Date.now();
  }

  // 유저의 플레이어 위치 Update
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  updateVelocity(vecX, vecY) {
    this.velocityX = vecX;
    this.velocityY = vecY;
  }

  // latency를 기반으로 데드레커닝을 활용하여 미래의 플레리어 위치 계산
  calculatePosition(latency) {
    const timeDiff = latency / 1000;
    const speed = 3;
    const distance = speed * timeDiff;

    return {
      x: this.x + this.velocityX * distance,
      y: this.y + this.velocityY * distance,
    };
  }
}

export default User;
