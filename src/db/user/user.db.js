import { toCamelCase } from "../../utils/transformCamelCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "./user.queries.js";

export const findUserByDeviceId = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [
    deviceId,
  ]);

  return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [deviceId]);
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};

export const saveUserPos = async (id, x, y) => {
  await pools.USER_DB.query(SQL_QUERIES.SAVE_USER_POSITION, [x, y, id]);
};
