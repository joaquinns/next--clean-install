import { createPool } from "mysql2/promise";
import { DATABASE_DB, HOST_DB, PASSWORD_DB, PORT_DB, USER_DB, } from "./config.js";

console.log("DATABASE_DB:", DATABASE_DB)


const pool = createPool({
    host: HOST_DB,
    user: USER_DB,
    password: PASSWORD_DB,
    port: PORT_DB,
    database: DATABASE_DB
});

export {pool};