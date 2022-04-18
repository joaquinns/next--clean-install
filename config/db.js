import { createPool } from "mysql2/promise";
import { DATABASEDB, HOSTDB, PASSWORDDB, PORTDB, USERDB } from "./config.js";

console.log("DATABASEDB:", DATABASEDB);

const pool = createPool({
  host: HOSTDB,
  user: USERDB,
  password: PASSWORDDB,
  database: DATABASEDB,
});

export { pool };
