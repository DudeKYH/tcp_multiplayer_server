import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5555;
export const HOST = process.env.HOST || "127.0.0.1";
export const CLIENT_VERSION = process.env.CLIENT_VERSION || "1.0.0";

export const USER_DB_NAME = process.env.USER_DB_NAME || "database1";
export const USER_DB_USER = process.env.USER_DB_USER || "user1";
export const USER_DB_PASSWORD = process.env.USER_DB_PASSWORD || "password1";
export const USER_DB_HOST = process.env.USER_DB_HOST || "localhost";
export const USER_DB_PORT = process.env.USER_DB_PORT || 3306;
