import { config } from "../../config/config.js";
import { createUpdateLocationPacket } from "../../utils/notification/game.notification.js";
import IntervalManager from "../managers/interval.manager.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = config.game.state.wating;

    this.intervalManager = new IntervalManager();

    // 게임 모니터링을 intervalManager에 등록해준다.
    this.intervalManager.addGameMonitor(
      id,
      this.printGameInfo.bind(this),
      1000,
    );
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

  // 게임에 참가 중인 모든 유저의 latency 중 가장 느린 유저의 latency를 반환한다.
  getMaxLatency() {
    let maxLatency = 0;

    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });

    return maxLatency;
  }

  // 게임에 참가 중인 모든 유저의 위치를 latency 후 위치로 계산하고 반환한다.
  getAllLocation() {
    const maxLatency = this.getMaxLatency();

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

  // 게임 모니터링
  // - 접속 중인 모든 클라이언트의 정보를 일정 시간 마다 출력해준다.
  printGameInfo() {
    console.log(`---------- [${this.id}] Game Monitor ----------`);
    this.users.forEach((user, index) => {
      // user.printUserInfo()
      // - user의 deviceId, x, y, latency를 출력해준다.
      console.log(`[${index}] Player : ${user.printUserInfo()}`);
    });
    console.log(`--------------------------------------`);
  }
}

export default Game;
