import Game from "../classes/models/game.class.js";
import { gameSessions } from "./session.js";

let gameId = 0;

// unique한 gameId를 가져오는 함수 (호출할때마다 gameId를 1씩 증가시켜 unique하게 한다.)
export const getUniqueGameId = () => {
  return gameId++;
};

// 새로운 게임을 생성하고 gameSessions에서 추가해주는 함수
export const addGame = () => {
  const gameId = getUniqueGameId();
  const game = new Game(gameId);

  gameSessions.push(game);
  return game;
};

// 게임을 gameSessions에서 삭제하는 함수
export const removeGame = (id) => {
  const gameIndex = gameSessions.findIndex((game) => game.id === id);
  if (gameIndex !== -1) {
    return gameSessions.splice(gameIndex, 1)[0];
  }
};

// 게임을 gameSessions에서 id로 찾아 가져오는 함수
export const getGame = (id) => {
  return gameSessions.find((game) => game.id === id);
};

// gameSessions를 가져오는 함수
export const getGameSessions = () => {
  return gameSessions;
};

// 이번 프로젝트에선 Game이 하나만 존재하므로 이 game을 반환해주는 함수를 따로 작성하였다.
export const getDefaultGame = () => {
  return getGameSessions()[0];
};
