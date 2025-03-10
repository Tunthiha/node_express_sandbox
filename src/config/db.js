import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

if(process.env.APP_ENV === "development"){
    
}
console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);

const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.APP_ENV === "development" ? "localhost" : process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_DBPORT,
});

pool.on("connect", () => {
    console.log("connected to the db");
});

export default pool;
