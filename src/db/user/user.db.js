import { toCamelCase } from "../../utils/transformCamelCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "./user.queries.js";

// 클라이언트의 deviceID로 DB에서 user 정보를 찾는다.
export const findUserByDeviceId = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [
    deviceId,
  ]);

  return toCamelCase(rows[0]);
};

// 새로운 user를 DB에 추가해준다.
export const createUser = async (deviceId) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [deviceId]);
};

// 재접속한 유저의 lastLogin을 현재 시각으로 업데이트한다.
export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};

// 게임을 종료한 클라이언트의 현재 위치를 DB에 저장한다.
export const saveUserPos = async (id, x, y) => {
  await pools.USER_DB.query(SQL_QUERIES.SAVE_USER_POSITION, [x, y, id]);
};
