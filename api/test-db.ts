import pool from "./src/infra/database/db";

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected:", res.rows[0]);
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    pool.end();
  }
}

testConnection();
