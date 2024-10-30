import { config } from "../../config/config.js";
import { createUpdateLocationPacket } from "../../utils/notification/game.notification.js";
import IntervalManager from "../managers/interval.manager.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = config.game.state.wating;

    this.intervalManager = new IntervalManager();
  }

  // Game에 User가 참가
  addUser(user) {
    if (this.users.length >= config.game.maxPlayer) {
      throw new Error("게임 인원이 가득 차 참가하실 수 없습니다.");
    }

    this.users.push(user);
    this.intervalManager.addPlayer(user.id, user.ping.bind(user), 1000);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.intervalManager.removePlayer(userId);
  }

  startGame() {
    this.state = config.game.state.playing;
  }

  getMaxLatency() {
    let maxLatency = 0;

    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });

    return maxLatency;
  }

  getAllLocation() {
    const maxLatency = this.getMaxLatency();

    //console.log(`Max Latency: ${maxLatency}`);

    const locationData = this.users.map((user) => {
      const { x, y } = user.calculatePosition(maxLatency);
      return {
        id: user.id,
        playerId: user.playerId,
        x,
        y,
        velX: user.velocityX,
        velY: user.velocityY,
      };
    });

    return createUpdateLocationPacket(locationData);
  }
}

export default Game;
