import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 현재 파일의 절대 경로. 이 경로는 파일의 이름을 포함한 전체 경로
const __filename = fileURLToPath(import.meta.url);

// path.dirname() 함수는 파일 경로에서 디렉토리 경로만 추출 (파일 이름을 제외한 디렉토리의 전체 경로)
const __dirname = path.dirname(__filename);

// sql 파일을 쿼리문으로 만들어 실행하는 함수
const executeSqlFile = async (pool, filePath) => {
  const sql = fs.readFileSync(filePath);

  const queries = sql
    .split(";")
    .map((query) => query.trim())
    .filter((query) => query.length > 0);

  for (const query of queries) {
    await pool.query(query);
  }
};

const createSchmas = async () => {
  const sqlDir = path.join(__dirname, "../sql");

  try {
    await executeSqlFile(pools.USER_DB, path.join(sqlDir, "user_db.sql"));
    console.log(`DB 테이블이 성공적으로 생성되었습니다.`);
  } catch (err) {
    console.error(`DB 테이블 생성 중 오류가 발생했습니다: ${err}`);
  }
};

createSchmas()
  .then(() => {
    console.log(`마이그레이션이 완료되었습니다.`);
    // 성공 : code 0
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    // 실패 : code 1
    process.exit(1);
  });
