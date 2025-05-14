import { Pool } from "pg";

const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "knowledge_base",
  password: "mypassword",
  port: 5432,
});

export default pool;
